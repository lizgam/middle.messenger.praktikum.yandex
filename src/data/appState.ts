import { Mode } from "utilities";

export const defaultState: AppState = {
    isLoading: true,
    page: null,
    authError: null,
    user: null,
    mode: Mode.Profile,
    cards: null,
    selectedCard:  null,
};
