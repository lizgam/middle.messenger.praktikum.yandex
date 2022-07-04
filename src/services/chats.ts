
import ChatsAPI from "../api/chatsAPI";
import { APIError } from "api/types";
import type { Dispatch } from "core";
import { transformCards, isErrorResponse } from "utilities";

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
    console.log('before cards dispatch');
    dispatch({ isLoading: false, cards: transformCards(response as CardDTO[]) });
    console.log('after cards dispatch');
};

export const addUserToChat = async (dispatch: Dispatch<AppState>, state: AppState, action: AddUserRequestData) => {

};

export const createChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    payload: CreateChatPayload,
) => {
    debugger;

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
            debugger;
            console.log('connection established');
            openConnections[payload.chatId] = socket;

            // get list of all the previous messages
            socket.send(JSON.stringify({
                content: "0",
                type: "get old",
            }));
        });

        socket.addEventListener('close', event => {
            debugger;
            delete openConnections[payload.chatId];
            openConnections[payload.chatId] = null;
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }

            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        // socket.addEventListener('message', _receiveMessages.bind(null, dispatch, payload));
        socket.addEventListener('message', event => { receiveMessages(event.data, dispatch, payload) });

        socket.addEventListener('error', event => {
            debugger;
            console.log('Ошибка', event.message);
        });
    }


    function receiveMessages(data: string, dispatch: Dispatch<AppState>, payload:CreateChatPayload) {
        debugger;
        console.log('Получены данные', data);
        const parsedData = JSON.parse(data);
        console.log(parsedData);

    }
    //  else {
    //     debugger;
    //     socket = openConnections[payload.chatId] as WebSocket;
    //     socket.send(JSON.stringify({
    //         content: "some test message",
    //         type: "message",
    //     }));
    // }
}
