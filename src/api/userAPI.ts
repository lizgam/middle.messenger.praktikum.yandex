import BaseAPI from "./BaseAPI";

type ChangeProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
};
type ChangeAvatarData = {
    avatar: string;
};

type SearchByLoginData = {
    login: string;
};

export default class UserAPI extends BaseAPI {
    constructor() {
        super("/user");
    }

    updateUser(data: ChangeProfileData): Promise<unknown> {
        return this.http.put("/profile", {
            data, headers: { "Content-Type": "application/json" }
        });
    }
    changePassword(data: ChangePasswordData): Promise<unknown> {
        return this.http.put("/password", {
            data, headers: { "Content-Type": "application/json" }
        });
    }
    changeAvatar(data: ChangeAvatarData): Promise<unknown> {
        return this.http.put("/profile/avatar", {
            data
        });
    }
    searchByLogin(data: SearchByLoginData): Promise<unknown> {
        return this.http.post("/search", {
            data, headers: { "Content-Type": "application/json" }
        });
    }
    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}
