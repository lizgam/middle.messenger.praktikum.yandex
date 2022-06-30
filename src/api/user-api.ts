import BaseAPI from "./BaseAPI";

// class UserAPI extends BaseAPI {
//     create() {
//         return api.post('/', {})
//             // И то, только в случае, если уверены в результате,
//             // иначе контроллер проверит все сам дальше
//             .then({user: {info}} => info);
//     }
// }

// class LoginAPI extends BaseAPI {
//   public request(user: LoginRequest) {
//     return authAPIInstance.post<LoginRequest, LoginResponse>('/login', user)
//       .then(({user_id}) => user_id); // Обрабатываем получение данных из сервиса далее
//   }
// }
