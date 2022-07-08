import { UserDataDTO, CardDTO, LastMessageDTO, ChatMessageDTO } from "api/types";

export const transformUser = (data: UserDataDTO): UserData => {
    const avatar = data.avatar ? `https://ya-praktikum.tech/api/v2/resources${data.avatar}` : null;
    return {
        id: data.id,
        avatar: avatar,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        email: data.email,
        phone: data.phone
    };
};

export const transformSearchedUsers = (data: UserDataDTO[]): UserData[] => {
    return data.map((i): UserData => {
        return {
            id: i.id,
            avatar: i.avatar,
            login: i.login,
            first_name: i.first_name,
            second_name: i.second_name,
            display_name: i.display_name,
            email: i.email,
            phone: i.phone
        } as UserData;
    });
};

export const transformCards = (data: CardDTO[]): CardInfo[] => {
    return data.map((i) => {
        return {
            id: i.id,
            title: i.title,
            avatar: i.avatar,
            unread_count: i.unread_count,
            last_message: transformLastMessage(i.last_message)
        } as CardInfo;
    });
};

export const transformLastMessage = (data: LastMessageDTO): LastMessage | null => {
    if (data) {
        return {
            user: transformUser(data.user),
            time: new Date(data.time).toLocaleDateString(),
            content: data.content
        };
    }

    return null;
};

export const transformMessages = (data: ChatMessageDTO, userId: number): ChatMessage => {
    return {
        id: data.id,
        userId: data.user_id,
        chatId: data.chat_id,
        time: data.time,
        content: data.content,
        isRead: data.is_read,
        isHost: (data.user_id === userId) ? true : false,
    };
};
