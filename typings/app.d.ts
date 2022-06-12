declare global {
    export type Nullable<T> = T | null;
    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type UserData = {
        id: number;
        avatar: string;
        login: string;
        first_name: string;
        second_name: string;
        displayed_name?: string;
        email: string;
        password: string;
        phone: string;
    };
    export enum Mode {
        Profile = "Profile",
        Chat = "Chat",
        Addgroup = "Addgroup",
    }
    export type CardInfo = {
        id: number;
        name: string;
        avatar?: string;
        message?: string;
        date?: string;
        count?: number;
        selected?: boolean;
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
