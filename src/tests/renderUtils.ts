import { BlockClass, renderDOM, registerComponent, Store, Router } from "core";
import { defaultState } from "data/appState";
import Button from "../components/Button";

type RenderBlockParams<T> = {
    Block: BlockClass<T>;
    props: T;
    state?: Partial<AppState>;
}

//rendering Block into DOM
//eslint-disable-next-line
export async function renderBlock<T extends Object>({ Block, props, state = defaultState }: RenderBlockParams<T>) {
    // Object.values(components).forEach((Component: any) => {
    registerComponent(Button);
    // });

    //creating store and router object
    const store = new Store<AppState>({ ...defaultState, ...state });
    const router = new MockedRouter(); //cteate rest router for tests! redefine method GO

    // into global variable
    window.router = router;
    window.store = store;

    //initial html container:
    document.body.innerHTML = "<div id=\"app\"></div>";

    //will render block into DOM
    renderDOM(new Block(props as T));

    store.on("changed", (_prevState, _nextState) => {
        router.start();
    });

    // initRouter(router, store);

    /**
     * Ждем вызова componentDidMount,
     * медота жизненного цикла компонента,
     * который вызывается через 100мс в Block.getContent
     *
     */
    await sleep(); //задержка
}

export async function step(_name: string, callback: () => void) {
    await callback();
}

export function sleep(ms = 200) {
    return new Promise(r => setTimeout(r, ms));
}

export class MockedRouter extends Router {
    go(hash: string) {
        window.location.hash = hash;
        this._onRoute(hash);
    }
}
