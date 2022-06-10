//require("babel-core/register");

import { Block, renderDOM, registerComponent } from "./core/index";

import { ChatPage } from "./pages/chat";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ErrorPage } from "./pages/errorPage";
// import { EditInfoPage } from "./pages/editInfo";

import Button from "./components/Button";
import Card from "./components/Card";
import Chat from "./components/Chat";
import ChatBoard from "./components/ChatBoard";
import ErrorLabel from "./components/ErrorLabel";
import InputControl from "./components/InputControl";
import Input from "./components/Input";
import Link from "./components/Link";
import MessageBoard from "./components/MessageBoard";
import Message from "./components/Message";
import Profile from "./components/Profile";
import Addgroup from "./components/Addgroup";

import "./sass/style.scss";

registerComponent(Button);
registerComponent(Card);
registerComponent(Chat);
registerComponent(ChatBoard);
registerComponent(ErrorLabel);
registerComponent(Input);
registerComponent(InputControl);
registerComponent(Link);
registerComponent(MessageBoard);
registerComponent(Message);
registerComponent(Profile);
registerComponent(Addgroup);

// const components = require("./components/**/index.ts") as {
//     [key: string]: { default: typeof Block };
// };
// console.log(components);
// Object.values(components).forEach((component) => {
//     registerComponent(component.default);
// });

document.addEventListener("DOMContentLoaded", () => {
    if (document.location.pathname === "/register") {
        renderDOM(new RegisterPage({}));
    } else if (document.location.pathname === "/login") {
        renderDOM(new LoginPage({}));
    } else if (document.location.pathname === "/chat") {
        renderDOM(new ChatPage({}));
    } else if (document.location.pathname === "/errorPage") {
        renderDOM(new ErrorPage({}));
        console.log("ErrorPage");
    } else if (document.location.pathname === "/editInfo") {
        //renderDOM(new EditInfoPage({ }));
        console.log("editInfoPage");
    } else {
        console.log("Default page - ChatPage(if loged in)");
        // renderDOM(new ChatPage({}));
    }
});
