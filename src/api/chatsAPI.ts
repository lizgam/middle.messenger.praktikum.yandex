import BaseAPI from "./BaseAPI";

type ChatRequestData = {
    title: string;
}

type CardsRequestData = {
    offset?: number;
    limit?: number;
    title?: string;
}

type ChatUserRequestData = {
    users: number[];
    chatId: number;
}


export default class ChatsAPI extends BaseAPI {
    constructor() {
        super("/chats");
    }

    createChat(data: ChatRequestData): Promise<unknown> {
        return this.http.post("", { data });
    }

    getChats(data: CardsRequestData): Promise<unknown> {
        return this.http.get("", { data });
    }

    addUserToChat(data: ChatUserRequestData): Promise<unknown> {
        return this.http.put("/users", { data });
    }

    removeUserFromChat(data: ChatUserRequestData): Promise<unknown> {
        return this.http.delete("/users", { data });
    }

    getToken(chatId: number): Promise<unknown> {
        return this.http.post(`/token/${chatId}`);
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

