import BaseAPI from "./BaseAPI";

type SignUpData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

type SignInData = {
    login: string;
    password: string;
}

export default class AuthAPI extends BaseAPI {
    constructor() {
        super("/auth");
    }

    signUp(data: SignUpData): Promise<unknown> {
        return this.http.post("/signup", { data });
    }

    signIn(data: SignInData): Promise<unknown> {
        return this.http.post("/signin", { data });
    }

    logout(): Promise<unknown> {
        return this.http.post("/logout");
    }

    readUser(): Promise<unknown> {
        return this.http.get("/user");
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}
