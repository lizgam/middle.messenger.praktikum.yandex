
import ChatsAPI from "../api/chatsAPI";
import { APIError } from "api/types";
import type { Dispatch } from "core";
import { transformCards, isErrorResponse } from "utilities";
import { transformMessages } from "utilities/apiTransformers";

type CardsRequestData = {
    offset?: number;
    limit?: number;
    title?: string;
}

type AddUserRequestData = {
    users: number[],
    chatId: number
}

type CreateChatPayload = {
    userId: number;
    chatId: number;
}

const openConnections: Record<string, WebSocket | null> = {};

export const getChats = async (dispatch: Dispatch<AppState>, state: AppState, action: CardsRequestData) => {
    dispatch({ isLoading: true });

    const api: ChatsAPI = new ChatsAPI();

    const response = await api.getChats(action);

    if (isErrorResponse(response)) {
        dispatch({ isLoading: false, authError: response.reason });
        return;
    }
    // console.log('before cards dispatch');
    dispatch({ isLoading: false, cards: transformCards(response as CardDTO[]) });
    // console.log('after cards dispatch');
};

export const addUserToChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserRequestData) => {

};
export const removeUserFromChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserRequestData) => {

};

export const sendMessage = (chatId: number, message: string) => {
    // debugger;
    if (openConnections[chatId]) {
        const socket = openConnections[chatId];
        socket?.send(JSON.stringify({
            content: message,
            type: "message",
        }));
    } else {
        console.log('No connection. Needs to reconnect');
    }
}


export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: CreateChatPayload,
) => {
    let socket: WebSocket;
    if (!openConnections[payload.chatId]) {
        const api: ChatsAPI = new ChatsAPI();
        const chatToken = await api.getToken(payload.chatId);

        if (isErrorResponse(chatToken)) {
            // somehow display the error
            return;
        }

        console.log('chat token received: ', chatToken);
        console.log('userId: ', payload.userId);

        let socketURI = `wss://ya-praktikum.tech/ws/chats/${payload.userId}/${payload.chatId}/${chatToken.token}`;
        console.log(socketURI);
        socket = new WebSocket(socketURI);

        socket.addEventListener('open', () => {
            //         debugger;
            console.log('connection established');
            openConnections[payload.chatId] = socket;

            // get list of all the previous messages
            socket.send(JSON.stringify({
                content: "0",
                type: "get old",
            }));
        });

        socket.addEventListener('close', event => {
            delete openConnections[payload.chatId];
            openConnections[payload.chatId] = null;
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        socket.addEventListener('message', event => {
            let parsedData: any[] = JSON.parse(event.data);
            if (!Array.isArray(parsedData)) {
                parsedData = [parsedData];
            }

            const messages = parsedData.map((msg: any) => transformMessages(msg, payload.userId));
            messages.sort((d1: ChatMessage, d2: ChatMessage) => { return d2.id - d1.id });
            dispatch({ messages: [...(window.store.getState().messages || []), ...messages] });
        });

        socket.addEventListener('error', event => {
            console.log('Ошибка', event.message);
        });
    }
}

