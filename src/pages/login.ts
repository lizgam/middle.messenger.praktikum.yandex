import { ValidationRule } from "../utilities/validation";
import Block from "../core/Block";

interface LoginPageProps {}

export class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        super({
            ...props,
            onLogin: () => {
                const loginData: Partial<UserData> = {
                    login: (
                        document.getElementById("login") as HTMLInputElement
                    ).value,
                    password: (
                        document.getElementById("password") as HTMLInputElement
                    ).value,
                };
                if (this.checkFormValidity()) {
                    //e.preventDefault();
                    console.log("Submited values on the Page:", loginData);
                }
            },
        });
    }

    checkFormValidity() {
        const loginError = (this.refs.login as LoginPage).refs.error;
        const passwordError = (this.refs.password as LoginPage).refs.error;

        const inputMsgValidArray = [loginError, passwordError];

        if (
            inputMsgValidArray.every(
                (msgInput) => (msgInput as LoginPage).props.errorMsg === ""
            )
        ) {
            return true;
        } else {
            inputMsgValidArray
                .filter(
                    (errorLabel) =>
                        (errorLabel as LoginPage).props.errorMsg === undefined
                )
                .map((errorLabel) =>
                    errorLabel.setProps({
                        errorMsg: "Field can not be empty",
                    })
                );
            return false;
        }
    }

    protected render() {
        const staticData = {
            pageName: "Login page",
            textForReffer: "Don’t have a Chatopolis account?",
            href: "#register",
            linkText: "Register",
            values: "12",
        };
        return `
            <section class="form_container">
                <h2>${staticData.pageName}</h2>
                <form action="#" method="post">
                {{{Input
                    label = "Login"
                    id="login"
                    name = "login"
                    validationRule = "${ValidationRule.Login}"
                    ref="login"
                    inputType = "text"
                }}}
                {{{Input
                    label = "Password"
                    id="password"
                    name = "password"
                    validationRule = "${ValidationRule.Password}"
                    ref="password"
                    inputType = "password"
                }}}
                {{{ Button
                    btn_text="Log in"
                    onClick=onLogin
                }}}

                <span>${staticData.textForReffer}</span>
                {{{ Link
                    address="${staticData.href}"
                    linkText="${staticData.linkText}"
                }}}
                </form>
            </section>
                    `;
    }
}
