import { UserDataDTO } from 'api/types';

export const transformUser = (data: UserDataDTO): UserData => {
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
