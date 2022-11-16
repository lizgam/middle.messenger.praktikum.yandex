import ChatsAPI from "api/chatsAPI";
import UserAPI from "api/userAPI";
import { CardDTO, SearchedUsersByLoginDTO, UserDataDTO } from "api/types";
import type { Dispatch } from "core";
import { transformCards, isErrorResponse, transformMessages, transformSearchedUsers } from "utilities";

type CardsRequestData = {
    offset?: number;
    limit?: number;
    title?: string;
}

type AddUserRequestData = {
    users: number[],
    chatId: number
}
type RemoveUserRequestData = {
    users: number[],
    chatId: number
}
type CreateNewChatPayload = {
    title: string;
}

type CreateChatPayload = {
    userId: number;
    chatId: number;
}

type SearchByLoginData = {
    login: string;
};


const openConnections: Record<string, WebSocket | null> = {};

export const getChats = async (dispatch: Dispatch<AppState>, _state: AppState, payload: CardsRequestData) => {
    dispatch({ isLoading: true });

    const api: ChatsAPI = new ChatsAPI();

    const response = await api.getChats(payload).catch((error) => {
        console.log(error);
    });

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, cards: transformCards(response as CardDTO[]) });
};

export const addUserToChat = async (userLogin: string, chatId: number) => {

    const apiUser: UserAPI = new UserAPI();

    const responseUserLogin = await apiUser.searchByLogin({ login: userLogin } as SearchByLoginData).catch((error) => {
        console.log(error);
    });


    if (isErrorResponse(responseUserLogin)) {
        console.log(responseUserLogin.reason);
        window.store.dispatch({ isLoading: false, authError: responseUserLogin.reason });
        return;
    }

    const api: ChatsAPI = new ChatsAPI();

    const searchedUsers: SearchedUsersByLoginDTO = transformSearchedUsers(responseUserLogin as UserDataDTO[]);

    if (searchedUsers.length > 0) {
        const userForAdding = searchedUsers[0].id;
        const response = await api.addUserToChat({ users: [userForAdding], chatId: chatId } as AddUserRequestData);
        alert(`User ${searchedUsers[0].login} added`);

        if (isErrorResponse(response)) {
            console.log(response.reason);
            return;
        }
    } else {
        alert("No users with such login exist");
    }
};

export const removeUserFromChat = async (userLogin: string, chatId: number) => {

    const apiUser: UserAPI = new UserAPI();

    const responseUserLogin = await apiUser.searchByLogin({ login: userLogin } as SearchByLoginData);


    if (isErrorResponse(responseUserLogin)) {
        console.log(responseUserLogin.reason);
        window.store.dispatch({ isLoading: false, authError: responseUserLogin.reason });
        return;
    }

    const api: ChatsAPI = new ChatsAPI();

    const searchedUsers: SearchedUsersByLoginDTO = transformSearchedUsers(responseUserLogin as UserDataDTO[]);

    if (searchedUsers.length > 0) {
        const userForAdding = searchedUsers[0].id;
        const response = await api.removeUserFromChat({ users: [userForAdding], chatId: chatId } as RemoveUserRequestData);
        alert(`User ${searchedUsers[0].login} removed`);

        if (isErrorResponse(response)) {
            console.log(response.reason);
            return;
        }
    } else {
        alert("No users with such login exist");
    }
};

export const createNewChat = async (dispatch: Dispatch<AppState>, state: AppState, payload: CreateNewChatPayload) => {
    dispatch({ isLoading: true });

    const api: ChatsAPI = new ChatsAPI();
    const response = await api.createChat(payload);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    await getChats(dispatch, state, {}).catch((error) => {
        console.log(error);
    });
    dispatch({ isLoading: false });
    window.router.go("/chat");
};

export const sendMessage = (chatId: number, message: string) => {
    if (openConnections[chatId]) {
        const socket = openConnections[chatId];
        socket?.send(JSON.stringify({
            content: message,
            type: "message",
        }));
    } else {
        console.log("No connection. Needs to reconnect");
    }
};


export const openChat = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    payload: CreateChatPayload,
) => {
    let socket: WebSocket;

    if (!openConnections[payload.chatId]) {
        const api: ChatsAPI = new ChatsAPI();
        try {
            const chatToken = await api.getToken(payload.chatId);
            if (isErrorResponse(chatToken)) {
                console.log("somehow display the error: ", chatToken);
                return;
            }

            const token = (chatToken as { token: string }).token;
            console.log("chat token received: ", token);
            console.log("userId: ", payload.userId);

            const socketURI = `${process.env.WS_ENDPOINT}/${payload.userId}/${payload.chatId}/${token}`;
            console.log(socketURI);
            socket = new WebSocket(socketURI);

            socket.addEventListener("open", () => {
                console.log("connection established");
                openConnections[payload.chatId] = socket;

                // get list of all the previous messages
                socket.send(JSON.stringify({
                    content: "0",
                    type: "get old",
                }));
            });

            socket.addEventListener("close", event => {
                delete openConnections[payload.chatId];
                openConnections[payload.chatId] = null;
                if (event.wasClean) {
                    console.log("Соединение закрыто чисто");
                } else {
                    console.log("Обрыв соединения");
                }

                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
            });

            socket.addEventListener("message", event => {
                try {
                    let parsedData: any[] = JSON.parse(event.data);
                    if (!Array.isArray(parsedData)) {
                        parsedData = [parsedData];
                    }

                    const messages = parsedData.map((msg: any) => transformMessages(msg, payload.userId));
                    messages.sort((d1: ChatMessage, d2: ChatMessage) => { return d2.id - d1.id; });

                    const updatedMessages: Chat = window.store.getState().messages;
                    if (payload.chatId in window.store.getState().messages) {
                        updatedMessages[payload.chatId] = [...window.store.getState().messages[payload.chatId], ...messages];
                    }
                    else {
                        updatedMessages[payload.chatId] = messages;
                    }

                    dispatch({ messages: updatedMessages });
                } catch (e) {
                    console.error("Something went wrong: ", e);
                }
            });

            socket.addEventListener("error", event => {
                console.log("Ошибка", event);
            });

        } catch (error) {
            console.log(error);
        }
    }
};

