import {
    registerComponent,
    Router,
    Store
} from "./core/index";
import { defaultState } from "./data/appState";

import { initApp } from "./services/initApp";

import EditInfoPage from "./pages/editInfo";
import ErrorPage from "./pages/errorPage";
import ChatPage from "./pages/chatPage";
import CreateChatPage from "./pages/createChat";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/register";

import ActionClick from "./components/ActionClick";
import Button from "./components/Button";
import Card from "./components/Card";
import Chat from "./components/Chat";
import Dialog from "./components/Dialog";
import ErrorLabel from "./components/ErrorLabel";
import Input from "./components/Input";
import InputControl from "./components/InputControl";
import Link from "./components/Link";
import MessageBoard from "./components/MessageBoard";
import Message from "./components/Message";
import Navigation from "./components/Navigation";

import "./sass/style.scss";

registerComponent(Button);
registerComponent(Card);
registerComponent(Chat);
registerComponent(Dialog);
registerComponent(ErrorLabel);
registerComponent(Input);
registerComponent(InputControl);
registerComponent(Link);
registerComponent(ActionClick);
registerComponent(MessageBoard);
registerComponent(Message);
registerComponent(Navigation);


declare global {
    interface Window {
        store: Store<AppState>;
        router: Router;
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const store = new Store<AppState>(defaultState);
    const router = new Router();

    /**
     * Помещаем роутер и стор в глобальную область для доступа в хоках with*
     * @warning Не использовать такой способ на реальный проектах
     */
    window.router = router;
    window.store = store;

    /**
     * Глобальный слушатель изменений в сторе
     * для переключения активного экрана
     */
    store.on("changed", (prevState, nextState) => {
        router.start();
    });

    /**
     * Инициализируем роутинг
     */

    router
        .use("/login", LoginPage)
        .use("/register", RegisterPage)
        .use("/chat", ChatPage)
        .use("/errorPage", ErrorPage)
        .use("/profile", ProfilePage)
        .use("/editInfo/avatar", EditInfoPage, { isEditAvatar: true })
        .use("/editInfo/password", EditInfoPage, { isEditAvatar: false })
        .use("/createChat", CreateChatPage)
        .use("/", LoginPage)
        .use("*", ErrorPage);

    /**
     * Загружаем данные для приложения
     */
    setTimeout(() => {
        console.log("Going to init");
        store.dispatch(initApp);
    }, 100);

});
