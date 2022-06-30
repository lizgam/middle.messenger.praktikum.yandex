import AuthAPI from "../api/authAPI";
import { UserDataDTO, APIError } from "api/types";
import type { Dispatch } from "core";
import { transformUser } from "utilities";

export function hasError(response: any): response is APIError {
  return response && response.reason;
}

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
    console.log('api response', response);

    if (hasError(response)) {
        console.log("RESPONCE ERROR");
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    const responseReadUser = await api.readUser();
    console.log('api responseReadUser', responseReadUser);

    dispatch({ isLoading: false, authError: null });

    if (hasError(response)) {
        dispatch(logout);
        return;
    }

    dispatch({ user: transformUser(responseReadUser as UserDataDTO) });

    window.router.go('/chats');
};

export const register = async (
//   dispatch: Dispatch<AppState>,
  //state: AppState,
  action: RegisterPayload,
) => {
    AppStore.dispatch({ isLoading: true });
    // dispatch({ isLoading: true });

    const api: AuthAPI = new AuthAPI();
    console.log('controller', action);

    const response = await api.signUp(action);
    console.log('api response', response);

    if (hasError(response)) {
        AppStore.dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    const responseReadUser = await api.readUser();
    console.log('api responseReadUser', transformUser(responseReadUser as UserDataDTO));

    AppStore.dispatch({ isLoading: false, authError: null });

    if (hasError(response)) {
        AppStore.dispatch(logout);
        return;
    }

    AppStore.dispatch({ user: transformUser(responseReadUser as UserDataDTO) });

    window.router.go('/chats');
};

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true });
    const api: AuthAPI = new AuthAPI();

    await api.logout();

    dispatch({ isLoading: false, user: null });

    window.router.go('/login');
};
