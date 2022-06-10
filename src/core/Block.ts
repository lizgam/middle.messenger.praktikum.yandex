import EventBus from "./EventBus";
import { nanoid } from "nanoid";
import Handlebars from "handlebars";

// interface BlockMeta<P = any> {
//     props: P;
// }

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    } as const;

    public id = nanoid(6);
    static componentName: string;
    //private readonly _meta: BlockMeta;
    protected _element: Nullable<HTMLElement> = null;
    protected readonly props: P;
    protected children: { [id: string]: Block } = {};

    eventBus: () => EventBus<Events>;

    protected state: any = {};
    protected refs: { [key: string]: Block } = {};

    public constructor(props?: P) {
        const eventBus = new EventBus<Events>();

        // this._meta = {
        //     props,
        // };

        this.getStateFromProps(props);

        this.props = this._makePropsProxy(props || ({} as P));
        this.state = this._makePropsProxy(this.state);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    _registerEvents(eventBus: EventBus<Events>) {
        // eventBus.on(Block.EVENTS.INIT, this._createResources.bind(this));
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        // can be removed later
        this._element = this._createDocumentElement("div");
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    protected getStateFromProps(props: any): void {
        //on props's base prepare state for component
        this.state = {};
    }

    init() {
        // ------???? почему init дергает сразу render?  А не CDM как в теориию Тема Трггеры
        this._createResources(); //delete - explanation on min 50
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
    }

    _componentDidMount(props: P) {
        this.componentDidMount(props);
        //console.log("CDM");
        //последовательно стриггерить componentDidMount hook для всех потомков компонента:
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        //console.log("DISPATCH CDM");
    }

    //mount - inserted into the tree (a good place for subscriptions / load data from a remote endpoint - to instantiate the network request)
    //we should redefine it in components class:
    protected componentDidMount(props: P) {}

    _componentDidUpdate(oldProps: P, newProps: P) {
        //отрисует новые данные
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        //this._render(); -----?????  почему так не вызывать ? разница?
        // console.log("_CDU");
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidUpdate(oldProps: P, newProps: P) {
        //todo: later - util for deep compare
        console.log("CDU = TRUE");
        return true;
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
    };

    setState = (nextState: any) => {
        if (!nextState) {
            return;
        }
        //add new props to state
        //if state changed -> rerender block
        Object.assign(this.state, nextState);
    };

    get element() {
        return this._element;
    }

    getContent(): HTMLElement {
        ///-----?????
        // Хак, чтобы вызвать CDM только после добавления в DOM
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
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                //console.log("PROXY . GET", value);
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                const oldProps = { ...target };
                console.log("PROXY . SET- old/new", oldProps, target);
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Have No Access");
            },
        }) as unknown as P;
    }

    _render() {
        //return dom-node (fragment) from compile
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
        //TODO: avoid memoryleaking! Props have changed => reffer to element can be lost
        //! save link to element ahead
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

    //take template and props/locals/context
    // compile(template: any, context: any {

    // })
    _compile(): DocumentFragment {
        //ставит заглушки
        //const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
        const fragment = document.createElement("template");
        const template = Handlebars.compile(this.render()); // !!! compiled function
        //template - принимает контекст-> return string
        // переменные заменены на то что передалт в props
        //starting registerComponent, all renderings of the component
        fragment.innerHTML = template({
            ...this.state,
            ...this.props,
            children: this.children,
            refs: this.refs,
        });
        console.log("--in _compile. refs/children:", this.refs, this.children);

        //as helper return the dummy = > make dummy here and replace to real component
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
            const layoutContent = content.querySelector('[data-layout="1"]');

            if (layoutContent && stubChilds.length) {
                layoutContent.append(...stubChilds);
            }
        });

        return fragment.content;
    }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        console.log("HIDDEN");
        this.getContent().style.display = "none";
    }
}
