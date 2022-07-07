import { BlockClass } from 'core';
import { isEqual } from "utilities/helpers";

type WithUserProps = {
    user: UserData | null;
}

/**
 * HOC не подписан на изменения стора, поэтому будет корректно работать
 * только при обернутом withStore хоке.
 */
export function withUser<P extends WithUserProps>(WrappedBlock: BlockClass<P>) {
    // @ts-expect-error No base constructor has the specified number of type arguments
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName || WrappedBlock.name;

        constructor(props: P) {
            super({ ...props, user: window.store.getState().user });
        }
        __onChangeUserCallback = (prevStoreState: AppState, newStoreState: AppState) => {

            /**
             * TODO: проверить что стор реально обновлен
             * и прокидывать не целый стор, а необходимые поля
             * с помощью метода mapStateToProps
             */
            if (!isEqual(prevStoreState.user, newStoreState.user)) {
                // @ts-expect-error this is not typed
                this.setProps({ ...this.props, user: newStoreState.user });
            }
        }

        componentDidMount(props: P) {
            super.componentDidMount(props);
            window.store.on('changed', this.__onChangeUserCallback);
        }

        componentWillUnmount() {
            super.componentWillUnmount();
            window.store.off('changed', this.__onChangeUserCallback);
        }
    } as BlockClass<Omit<P, "user">>;

}
