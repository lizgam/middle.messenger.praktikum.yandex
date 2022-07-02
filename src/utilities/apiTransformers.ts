import { UserDataDTO, CardDTO, LastMessageDTO } from 'api/types';

export const transformUser = (data: UserDataDTO): UserData => {
    console.log("in transform", data);
    return {
        id: data.id,
        avatar: data.avatar,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        displayed_name: data.display_name,
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
        }
    })
}
export const transformLastMessage = (data: LastMessageDTO): LastMessage => {
    return {
        user: transformUser(data.user),
        time: new Date(data.time),
        content: data.content
    }
}

