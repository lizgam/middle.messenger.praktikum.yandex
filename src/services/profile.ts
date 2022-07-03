
import ChatsAPI from "../api/chatsAPI";
import { APIError } from "api/types";
import type { Dispatch } from "core";
import { transformCards, isErrorResponse } from "utilities";



export const setEditMode = async (dispatch: Dispatch<AppState>) => {

    dispatch({ isEditAvatar: true });
};

