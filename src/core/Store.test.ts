import { Store } from './Store';

describe('core/Store', () => {
    it('should get state', () => {
        const store = new Store({ user: 11 });

        expect(store.getState()).toEqual({ user: 11 });
    });

    it('should set state', () => {
        const store = new Store({});
        store.set({ user: 12 });

        //// @ts-expect-error
        expect(store.getState()).toEqual({ user: 12 });
    });

    it('should dispatch event after store was update', () => {
        const store = new Store({ user: 1 });
        const mock = jest.fn();

        store.on('changed', mock);

        store.set({ user: 2 });

        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith({ user: 1 }, { user: 2 })
    });
});
