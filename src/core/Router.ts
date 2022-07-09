import renderDOM from "./renderDOM";
import Block, { BlockClass } from "../core/Block";

type props = Record<string, any>;

function isEqual(lhs: string, rhs: string): boolean {
    return lhs === rhs;
}

class Route<P = any>{
    #pathname: string;
    #blockClass: BlockClass<P>;
    #block: Block | null = null;
    #props: props;
    #isPrefixId: boolean | undefined;

    constructor(pathname: string, view: BlockClass<P>, props: props) {
        this.#isPrefixId = pathname.includes(":id");
        this.#pathname = pathname.replace("/:id", "");
        this.#blockClass = view;
        this.#props = props;
    }
    //метод для отображения вьюшки, если переданный URL совпадает с URL текущего Route;
    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
        }
    }
    leave() {
        if (this.#block) {
            this.#block.hide();
            this.#block = null;
        }
    }
    match(pathname: string) {
        if (this.#isPrefixId) {
            pathname = pathname.replace(/\/\d+/, "");
        }
        return isEqual(pathname, this.#pathname);
    }
    #prefixHandler() {
        const id = Number(window.location.pathname.replace(/[a-zA-Z/]+/, ""));
        return { id };
    }
    //создаёт блок, если тот ещё не был создан (нужно создавать блок только после первого перехода на страницу), иначе вызывает у блока метод show
    render() {
        const { id } = this.#prefixHandler();
        if (!this.#block) {
            // this.#block = new this.#blockClass({ ...this.#props, idPath: id });
            this.#block = new this.#blockClass(this.#props);
            renderDOM(this.#block);
            return;
        }

        this.#block.setProps({ idPath: id });
        this.#block.show();
    }
}


export default class Router {
    static __instance: Router;
    #routers: Array<Route> = [];
    #history: History = window.history;
    #currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        Router.__instance = this;
    }
    //регистрирует блок по пути в роут и возвращает себя — чтобы можно было выстроить в цепочку
    use<P>(pathname: string, block: BlockClass<P>, props: props = {}) {
        const route = new Route(pathname, block, props);

        this.#routers.push(route);

        return this;
    }
    //по событию onpopstate запускает приложение
    start() {
        window.onpopstate = ((event) => {
            this._onRoute(event.currentTarget?.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this.#currentRoute && this.#currentRoute !== route) {
            this.#currentRoute.leave();
        }

        this.#currentRoute = route;
        route.render();
    }
    //переходит на нужный роут и отображает нужный блок;
    go(pathname: string) {
        this.#history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }
    //возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию;
    back() {
        this.#history.back();
    }

    forward() {
        this.#history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        const router = this.#routers.find(route => route.match(pathname));
        return router || this.#routers.find(route => route.match("*"));
    }
}
