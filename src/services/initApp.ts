import AuthAPI from "../api/authAPI";
import { UserDataDTO, APIError } from "api/types";
import type { Dispatch } from "core";
import { transformUser } from "utilities/apiTransformers";

export function hasError(response: any): response is APIError {
    return response && response.reason;
}

export async function initApp(dispatch: Dispatch<AppState>) {

    // console.log('enter initApp');
    // dispatch({ isLoading: true });

    try {
        const api: AuthAPI = new AuthAPI();

        const response = await api.readUser();
        // console.log('loaded initASpp');

        if (hasError(response)) {
            // console.log("hasError");
            return;
        }
        // console.log("from initApp: user", user);
        dispatch({ user: transformUser(response as UserDataDTO) });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ isLoading: false });
        // window.router.go('/chat');
        // console.log('exit initApp');
    }
}
