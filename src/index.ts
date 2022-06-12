//require("babel-core/register");

import { Block, renderDOM, registerComponent } from "./core/index";

import { ChatPage } from "./pages/chat";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { ErrorPage } from "./pages/errorPage";
import { EditInfoPage } from "./pages/editInfo";

import Addgroup from "./components/Addgroup";
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
import Navigation from "./components/Navigation";
import Profile from "./components/Profile";

import "./sass/style.scss";

registerComponent(Addgroup);
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
registerComponent(Navigation);
registerComponent(Profile);

document.addEventListener("DOMContentLoaded", () => {
    if (document.location.hash === "#register") {
        renderDOM(new RegisterPage({}));
    } else if (document.location.hash === "#login") {
        renderDOM(new LoginPage({}));
    } else if (document.location.hash === "#chat") {
        renderDOM(new ChatPage({}));
    } else if (document.location.hash === "#errorPage") {
        renderDOM(new ErrorPage({}));
    } else if (document.location.hash === "#editInfo") {
        renderDOM(new EditInfoPage({}));
    } else {
        console.log("Default page");
        renderDOM(new LoginPage({}));
    }
});
