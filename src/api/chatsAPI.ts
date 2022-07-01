import BaseAPI from "./BaseAPI";

type ChatRequestData = {
   title: string;
}

type ChatsRequestData = {
   offset?: number;
   limit?: number;
   title?: string;
}

type ChatUserRequestData = {
   users: number[];
   chatId: number;
}

export default class ChatAPI extends BaseAPI {
   constructor() {
       super("/chats");
   }

   createChat(data: ChatRequestData): Promise<unknown> {
       return this.http.post("", { data, headers: { "Content-Type": "application/json" } });
   }

   getChats(data: ChatsRequestData): Promise<unknown> {
       return this.http.get("", { data });
   }

   addUserToChat(data: ChatUserRequestData): Promise<unknown> {
       return this.http.put("/users", { data, headers: { "Content-Type": "application/json" } });
   }

   removeUserFromChat(data: ChatUserRequestData): Promise<unknown> {
       return this.http.delete("/users", { data, headers: { "Content-Type": "application/json" } });
   }

   create = undefined;
   read = undefined;
   update = undefined;
   delete = undefined;
}

