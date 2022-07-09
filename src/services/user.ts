import UserAPI from "../api/userAPI";
import { UserDataDTO } from "api/types";
import type { Dispatch } from "core";
import { transformUser, isErrorResponse } from "utilities";

type ChangeProfilePayload = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};
type ChangeAvatarData = {
    avatar: File;
};

type SearchByLoginData = {
    login: string;
};

export const updateUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: ChangeProfilePayload,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.updateUser(payload);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, authError: null });

    dispatch({ user: transformUser(response as UserDataDTO) });

    window.router.go("/chat");
};

export const changePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: ChangePasswordData,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.changePassword(payload);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, authError: null });

    window.router.go("/profile");
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: ChangeAvatarData,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();
    const response = await api.changeAvatar(payload);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, authError: null });
    dispatch({ user: transformUser(response as UserDataDTO) });

    window.router.go("/profile");
};

export const searchByLogin = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: SearchByLoginData,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.searchByLogin(payload);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }
};
