import AuthAPI from "../api/authAPI";
import UserAPI from "../api/userAPI";
import { UserDataDTO, APIError } from "api/types";
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
    avatar: string;
};

type SearchByLoginData = {
    login: string;
};

export const updateUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangeProfilePayload,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.updateUser(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    //const responseReadUser = await api.readUser();

    dispatch({ isLoading: false, authError: null });

    dispatch({ user: transformUser(response as UserDataDTO) });

    window.router.go('/chat');
};

export const changePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangePasswordData,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.changePassword(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, authError: null }); //show succesful message

    window.router.go('/profile');
};

export const changeAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangeAvatarData,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.changeAvatar(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, authError: null }); //show succesful message

    window.router.go('/profile');
};

export const searchByLogin = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SearchByLoginData,
) => {
    dispatch({ isLoading: true });

    const api: UserAPI = new UserAPI();

    const response = await api.searchByLogin(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    // dispatch({ isLoading: false, authError: null }); //show user By login
};
