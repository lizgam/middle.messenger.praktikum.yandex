declare global {
    export type Nullable<T> = T | null;
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type Indexed<T = unknown> = {
        [key in string]: T;
    };

    type PlainObject<T = unknown> = {
        [k in string]: T;
    };

    type EnumType = { [s: any]: any }

    export type Chat = Record<number, ChatMessage[]>;

    export type AppState = {
        isLoading: boolean;
        informBar: string | null;
        authError: string | null,
        user: UserData | null,
        cards: CardInfo[] | null,
        selectedCard: CardInfo | null,
        messages: Chat,
    }
    export type UserData = {
        id: number;
        avatar?: string | null;
        login: string;
        first_name: string;
        second_name: string;
        display_name?: string;
        email: string;
        password?: string;
        phone: string;
    };

    export type CardInfo = {
        id: number;
        title: string;
        avatar: string;
        unread_count: number;
        last_message: LastMessage;
    };
    export type LastMessage = {
        user: User<Omit<User, "id">>;
        time: string;
        content: string;
    };

    // {"id":1,"user_id":4614,"chat_id":81,"type":"message","time":"2022-07-03T06:13:19+00:00","content":"some test message","is_read":true,"file":null
    export type ChatMessage = {
        id: number;
        userId: number;
        chatId: number;
        time: Date;
        content: string;
        isRead: boolean;
        isHost: boolean;
    };

    export type ChatGroup = {
        id: number;
        avatar?: string;
        users: CardInfo[];
    };
}

export { };
