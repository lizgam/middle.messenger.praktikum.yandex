
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

export const getChats = async (dispatch: Dispatch<AppState>, state: AppState, payload: CardsRequestData) => {
    dispatch({ isLoading: true });

    const api: ChatsAPI = new ChatsAPI();

    const response = await api.getChats(payload);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }

    dispatch({ isLoading: false, cards: transformCards(response as CardDTO[]) });
};

export const addUserToChat = async (userLogin: string, chatId: number) => {

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
        // TODO: implement functionality for selecting particular user from list of returned users by login. Now - the first one is taken
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
        // TODO: implement functionality for selecting particular user from list of returned users by login. Now - the first one is taken
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

    await getChats(dispatch, state, {});
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
    state: AppState,
    payload: CreateChatPayload,
) => {
    let socket: WebSocket;
    let interval: ReturnType<typeof setInterval>;

    if (!openConnections[payload.chatId]) {
        const api: ChatsAPI = new ChatsAPI();
        const chatToken = await api.getToken(payload.chatId);

        if (isErrorResponse(chatToken)) {
            console.log("somehow display the error: ", chatToken);
            return;
        }

        console.log("chat token received: ", chatToken);
        console.log("userId: ", payload.userId);

        const socketURI = `wss://ya-praktikum.tech/ws/chats/${payload.userId}/${payload.chatId}/${chatToken.token}`;
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
        });

        socket.addEventListener("error", event => {
            console.log("Ошибка", event.message);
        });
    }
};

