//require("babel-core/register");

import { Block, renderDOM, registerComponent } from "./core/index";

import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";

import Button from "./components/Button";
import InputControl from "./components/InputControl";
import Input from "./components/Input";
import Link from "./components/Link";

import "./sass/style.scss";

registerComponent(Button);
registerComponent(Input);
registerComponent(InputControl);
registerComponent(Link);

// const components = require("./components/**/index.ts") as {
//     [key: string]: { default: typeof Block };
// };
// console.log(components);
// Object.values(components).forEach((component) => {
//     registerComponent(component.default);
// });

document.addEventListener("DOMContentLoaded", () => {
    if (document.location.pathname === "/register") {
        renderDOM(RegisterPage);
    } else if (document.location.pathname === "/chat") {
        // renderDOM(ChatPage);
        console.log("Chat page requested");
    } else if (document.location.pathname === "/login") {
        renderDOM(LoginPage);
    } else {
        renderDOM(LoginPage);
    }
});
