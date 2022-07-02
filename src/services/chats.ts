
import ChatsAPI from "../api/chatsAPI";
import {  APIError } from "api/types";
import type { Dispatch } from "core";
import { transformCards, isErrorResponse } from "utilities";

type CardsRequestData = {
   offset?: number;
   limit?: number;
   title?: string;
}


export const getChats = async (dispatch: Dispatch<AppState>, state: AppState, action: CardsRequestData) => {
    dispatch({ isLoading: true });

    const api: ChatsAPI = new ChatsAPI();

    const response = await api.getChats(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }
    dispatch({ isLoading: false, cards: transformCards(response as CardInfo[]) });
};
