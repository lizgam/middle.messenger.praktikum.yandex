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

type SearchByLoginData = {
    login: string;
};

export default class UserAPI extends BaseAPI {
    constructor() {
        super("/user");
    }

    updateUser(data: ChangeProfileData): Promise<unknown> {
        return this.http.put("/profile", {
            data
        });
    }
    changePassword(data: ChangePasswordData): Promise<unknown> {
        return this.http.put("/password", {
            data
        });
    }
    changeAvatar(data: FormData): Promise<unknown> {
        console.log("AVATAR:", data);
        return this.http.put("/profile/avatar", {
            data
        });
    }
    searchByLogin(data: SearchByLoginData): Promise<unknown> {
        return this.http.post("/search", {
            data
        });
    }
    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}
