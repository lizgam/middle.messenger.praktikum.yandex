import AuthAPI from "../api/authAPI";
import { UserDataDTO, APIError } from "api/types";
import type { Dispatch } from "core";
import { transformUser, isErrorResponse } from "utilities";

type LoginPayload = {
  login: string;
  password: string;
};

type RegisterPayload = {
    login: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
    password: string;
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
    dispatch({ isLoading: true });

    const api: AuthAPI = new AuthAPI();
    console.log('controller', action);

    const response = await api.signIn(action);

    if (isErrorResponse(response)) {
        console.log("RESPONCE ERROR", response);
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    const responseReadUser = await api.readUser();

    dispatch({ isLoading: false, authError: null });

    if (isErrorResponse(response)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseReadUser as UserDataDTO) });

    window.router.go('/chat');
};

export const register = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: RegisterPayload,
) => {
    dispatch({ isLoading: true });

    const api: AuthAPI = new AuthAPI();

    const response = await api.signUp(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    const responseReadUser = await api.readUser();

    dispatch({ isLoading: false, authError: null });

    if (isErrorResponse(response)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseReadUser as UserDataDTO) });

    window.router.go('/chat');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });
    const api: AuthAPI = new AuthAPI();

    await api.logout();

    dispatch({ isLoading: false, user: null });

    window.router.go('/login');
};
