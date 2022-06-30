import BaseAPI from "./BaseAPI";

export interface SignUpData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export interface SignInData {
    login: string;
    password: string;
}
type APIError = {
  reason: string;
};

export default class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signUp(data: SignUpData): Promise<unknown> {
        return this.http.post('/signup', { data, headers: { "Content-Type": "application/json" } });
        // return this.http.post('/signup', { data, headers: { "Content-Type": "application/json" } });
    }

    signIn(data: SignInData): Promise<unknown> {
        return this.http.post('/signin', { data, headers: { "Content-Type": "application/json" } })
            .then(data => {
                console.log("readUser on register: ", data);
                return data;
            })
        /*return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
      .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее */

    }

    logout(): Promise<unknown> {
        return this.http.post('/logout');
    }

    readUser(): Promise<unknown> {
        return this.http.get('/user')
            .then(data => {
                console.log("readUser: ", data);
                return data;
            });
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}
