import {
    renderDOM,
    registerComponent,
    Router,
    Store
} from "./core/index";
import { defaultState } from './data/appState';

import { initApp } from './services/initApp';

import ChatPage from "./pages/chatPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ErrorPage from "./pages/errorPage";
import EditInfoPage from "./pages/editInfo";

import Addgroup from "./components/Addgroup";
import Button from "./components/Button";
import Card from "./components/Card";
import Chat from "./components/Chat";
import ErrorLabel from "./components/ErrorLabel";
import Input from "./components/Input";
import InputControl from "./components/InputControl";
import Link from "./components/Link";
import MessageBoard from "./components/MessageBoard";
import Message from "./components/Message";
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";

import "./sass/style.scss";

registerComponent(Addgroup);
registerComponent(Button);
registerComponent(Card);
registerComponent(Chat);
registerComponent(ErrorLabel);
registerComponent(Input);
registerComponent(InputControl);
registerComponent(Link);
registerComponent(MessageBoard);
registerComponent(Message);
registerComponent(Navigation);
registerComponent(Profile);


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
    store.on('changed', (prevState, nextState) => {
        router.start();
        //if (process.env.DEBUG) {
        console.log(
            '%cstore updated',
            'background: #222; color: #bada55',
            nextState
        );
    });

    /**
     * Инициализируем роутинг
     */

    router
        .use('/login', LoginPage)
        .use('/register', RegisterPage)
        .use('/chat', ChatPage)
        .use('/errorPage', ErrorPage)
        .use('/editInfo', EditInfoPage)
        .use('/', LoginPage)
        .use('*', LoginPage)

    /**
     * Загружаем данные для приложения
     */
    setTimeout(() => {
        store.dispatch(initApp);
    }, 100);

});
