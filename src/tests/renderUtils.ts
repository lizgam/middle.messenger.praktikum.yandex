import { BlockClass, renderDOM, registerComponent, Store } from 'core';
import { defaultState } from 'store';
import * as components from '../components';
import { initRouter } from '../router';
import { MockedHashRouter } from 'tests/MockedHashRouter';
import { sleep } from 'utils/sleep';

type RenderBlockParams<T> = {
    Block: BlockClass<T>;
    props: T;
    state?: Partial<AppState>;
}

//rendering into DOM
export async function renderBlock<T extends Object>({ Block, props, state = defaultState }: RenderBlockParams<T>) {
    Object.values(components).forEach((Component: any) => {
        registerComponent(Component);
    });

    //creating store and router object
    const store = new Store<AppState>({ ...defaultState, ...state });
    const router = new MockedHashRouter(); //cteate rest router for tests! redefine method GO

    // into global variable
    window.router = router;
    window.store = store;

    //initial html container:
    document.body.innerHTML = '<div id="app"></div>';

    //will render block into DOM
    renderDOM(new Block(props as T));

    initRouter(router, store);

    /**
     * Ждем вызова componentDidMount,
     * медота жизненного цикла компонента,
     * который вызывается через 100мс в Block.getContent
     *
     * export function sleep(ms: number = 200) {
            return new Promise(r => setTimeout(r, ms));
        }
     */
    await sleep(); //задержка
}

export async function step(name: string, callback: () => void) {
    await callback();
}
