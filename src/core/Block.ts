/* eslint-disable @typescript-eslint/no-explicit-any */

import EventBus from "./EventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";

type Events = Values<typeof Block.EVENTS>;

export interface BlockClass<P> extends Function {
    new(props: P): Block<P>;
    componentName?: string;
}

export default class Block<P = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_CWU: "flow:component-will-unmount",
        FLOW_RENDER: "flow:render",
    } as const;

    public id = nanoid(6);
    static componentName: string;
    protected _element: Nullable<HTMLElement> = null;
    protected readonly props: P;
    protected children: { [id: string]: Block } = {};

    eventBus: () => EventBus<Events>;

    protected state: any = {};
    protected refs: { [key: string]: Block } = {};

    public constructor(props?: P) {
        const eventBus = new EventBus<Events>();

        this.getStateFromProps(props);

        this.props = this._makePropsProxy(props || ({} as P));
        this.state = this._makePropsProxy(this.state);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    /**
     * Хелпер, который проверяет, находится ли элемент в DOM дереве
     * И есть нет, триггерит событие COMPONENT_WILL_UNMOUNT
     */
    _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    private _registerEvents(eventBus: EventBus<Events>) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        this._element = this._createDocumentElement("div");
    }

    private _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    protected getStateFromProps(_props: any): void {
        this.state = {};
    }

    private init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    private _componentDidMount(props: P) {
        this._checkInDom();
        this.componentDidMount(props);
    }

    //eslint-disable-next-line
    protected componentDidMount(_props: P): void { }

    private _componentWillUnmount() {
        this.eventBus().destroy();
        this.componentWillUnmount();
    }

    //eslint-disable-next-line
    protected componentWillUnmount() { }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(_oldProps: P, _newProps: P) {
        return true;
    }

    setProps = (nextProps: Partial<P>) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    setState = (nextState: any) => {
        if (!nextState) {
            return;
        }
        Object.assign(this.state, nextState);
    };

    get element() {
        return this._element;
    }

    getContent(): HTMLElement {
        if (
            this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE
        ) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !==
                    Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
                }
            }, 100);
        }
        return this.element!;
    }

    _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                const oldProps = { ...target };
                target[prop] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Have No Access");
            },
        }) as unknown as P;
    }

    _render() {
        const fragment = this._compile();
        this._removeEvents();
        const newElement = fragment.firstElementChild!;
        this._element!.replaceWith(newElement);
        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    protected render(): string {
        return "";
    }

    _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;
        if (!events || !this._element) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });
    }

    _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;
        if (!events) {
            return;
        }
        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        });
    }

    _compile(): DocumentFragment {
        const fragment = document.createElement("template");
        const template = Handlebars.compile(this.render());
        fragment.innerHTML = template({
            ...this.state,
            ...this.props,
            children: this.children,
            refs: this.refs,
        });

        Object.entries(this.children).forEach(([id, component]) => {
            const stub = fragment.content.querySelector(`[data-id="id-${id}"]`);
            if (!stub) {
                return;
            }
            const stubChilds = stub.childNodes.length ? stub.childNodes : [];
            /**
             * Заменяем заглушку на component._element
             */
            const content = component.getContent();
            stub.replaceWith(content);
            /**
             * Ищем элемент layout-а, куда вставлять детей
             */
            const layoutContent = content.querySelector("[data-layout='1']");

            if (layoutContent && stubChilds.length) {
                layoutContent.append(...stubChilds);
            }
        });

        return fragment.content;
    }

    show() {
        this.getContent().style.display = "flex";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}
