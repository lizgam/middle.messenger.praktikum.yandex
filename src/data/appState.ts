    export const enum Mode {
        Profile = "Profile",
        Chat = "Chat",
        Addgroup = "Addgroup",
    }

export const defaultState: AppState = {
    isLoading: true,
    page: null,
    authError: "test error from state",
    user: null,
    mode: Mode.Profile,
    cards: null,
    selectedCard:  null,
};
