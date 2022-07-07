import { UserDataDTO, CardDTO, LastMessageDTO, ChatMessageDTO } from 'api/types';

export const transformUser = (data: UserDataDTO): UserData => {
    return {
        id: data.id,
        avatar: data.avatar,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        email: data.email,
        phone: data.phone
    }
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
    })
}

export const transformLastMessage = (data: LastMessageDTO): LastMessage | null => {
    if (data) {
        return {
            user: transformUser(data.user),
            time: new Date(data.time).toLocaleDateString(),
            content: data.content
        };
    }

    return null;
}

// {"id":1,"user_id":4614,"chat_id":81,"type":"message","time":"2022-07-03T06:13:19+00:00","content":"some test message","is_read":true,"file":null
export const transformMessages = (data: ChatMessageDTO, userId: number): ChatMessage => {
    return {
        id: data.id,
        userId: data.user_id,
        chatId: data.chat_id,
        time: data.time,
        content: data.content,
        isRead: data.is_read,
        isHost: (data.user_id === userId) ? true : false,
    }
};
