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

    export type AppState = {
        isLoading: boolean;
        page: Page | null,
        authError: string | null,
        user: UserData | null,
        mode: EnumType | null,
        cards: CardInfo[] | null,
        selectedCard: CardInfo | null,
    }
    export type UserData = {
        id: number;
        avatar: string;
        login: string;
        first_name: string;
        second_name: string;
        displayed_name?: string;
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
        time: Date;
        content: string;
    };

    export type Message = {
        text: string;
        date: string; //TODO: change to new Date() ->
        //use format: get Date()/ getMonth() and getHours(): getMinutes()
        id: number;
    };
    export type ChatGroup = {
        id: number;
        avatar?: string;
        users: CardInfo[];
    };
}

export {};
