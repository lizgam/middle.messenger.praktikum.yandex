import AuthAPI from "../api/authAPI";
import { UserDataDTO, APIError } from "api/types";
import type { Dispatch } from "core";
import { transformUser } from "utilities/apiTransformers";

export function hasError(response: any): response is APIError {
    return response && response.reason;
}

export async function initApp(dispatch: Dispatch<AppState>) {
    try {
        const api: AuthAPI = new AuthAPI();

        const response = await api.readUser();

        if (hasError(response)) {
            return;
        }
        dispatch({ user: transformUser(response as UserDataDTO) });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ isLoading: false });
        // window.router.go('/chat');
    }
}
