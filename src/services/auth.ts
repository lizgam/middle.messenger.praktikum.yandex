import AuthAPI from "../api/authAPI";
import { UserDataDTO, APIError } from "api/types";
import type { Dispatch } from "core";
import { transformUser } from "utilities";
import { AppStore } from "../data/appState";


export function hasError(response: any): response is APIError {
  return response && response.reason;
}

type LoginPayload = {
  login: string;
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

    const response = await api.singIn(action);
    console.log('api response', response);

    if (hasError(response)) {
        dispatch({ isLoading: false, loginFormError: response.reason });
        return;
    }

    const responseReadUser = await api.readUser();
    console.log('api responseReadUser', responseReadUser);

    dispatch({ isLoading: false, loginFormError: null });

        // if (hasError(response)) {
        //     dispatch(logout);
        //     return;
        // }

        // dispatch({ user: transformUser(responseUser as UserDataDTO) });

        // window.router.go('/chats');
    };

    export const logout = async (dispatch: Dispatch<AppState>) => {
        dispatch({ isLoading: true });
        const api: AuthAPI = new AuthAPI();

        await api.logout();

        dispatch({ isLoading: false, user: null });

        window.router.go('/login');
    };
