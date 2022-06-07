import { ValidationRule } from "../utilities/validation";
import Block from "../core/Block";

interface RegisterPageProps {
    onRegister: () => void;
}

export class RegisterPage extends Block {
    constructor(props: RegisterPageProps) {
        super({
            ...props,
            onRegister: (e: SubmitEvent) => {
                const loginData: any = {
                    login: (
                        document.getElementById("login") as HTMLInputElement
                    ).value,
                    first_name: (
                        document.getElementById(
                            "first_name"
                        ) as HTMLInputElement
                    ).value,
                    second_name: (
                        document.getElementById(
                            "second_name"
                        ) as HTMLInputElement
                    ).value,
                    email: (
                        document.getElementById("email") as HTMLInputElement
                    ).value,
                    password: (
                        document.getElementById("password") as HTMLInputElement
                    ).value,
                    phone: (
                        document.getElementById("phone") as HTMLInputElement
                    ).value,
                };

                /*
                1. можно ли как-то со страницы логина/регистрации дернуть вызов метода c дочернего компонента (onBlur/onFocus - это мои ивенты на Input-компонентах)?
                (я хочу на клик кнопки Логина проверить валидны ли инпуты, но чтобы не делать проверки на странице Логина)
                    let temp = this.refs.login.setProps(onblur) -?

                2. мне надо получить доступ к полю с текстом об ошибке со страницы регистрации. Структура такая:
                  RegisterPage:
                             | -> {{ ControlledInput }}, {{Button}}
                                             |-> {{Input}} , {{Error}}
                Я использую вот такую запись:
                const passwordError = this.refs.password.refs.error.props.errorMsg;
                только TS ругается:...

                С таким вот указанием типов вроде ошибки TS перестал показывать, но меня смущает как выглядит эта запись (или нормально? я не уверенна...)
                const passwordError = ((this.refs.password as RegisterPage).refs.error as RegisterPage).props.errorMsg;
                Что мне нужно исправить/На что обратить внимание? Или такой вариант имеет место быть?
                */

                if (this.checkFormValide()) {
                    e.preventDefault();
                    console.log("SUBMITED values on the Page:", loginData);
                }
            },
        });
    }

    checkFormValide() {
        const loginError = (this.refs.login as RegisterPage).refs.error;
        const passwordError = (this.refs.password as RegisterPage).refs.error;
        const first_nameError = (this.refs.first_name as RegisterPage).refs
            .error;
        const second_nameError = (this.refs.second_name as RegisterPage).refs
            .error;
        const emailError = (this.refs.email as RegisterPage).refs.error;
        const phoneError = (this.refs.phone as RegisterPage).refs.error;

        const inputMsgValidArray = [
            loginError,
            passwordError,
            first_nameError,
            second_nameError,
            emailError,
            phoneError,
        ];

        if (
            inputMsgValidArray.every(
                (msgInput) => (msgInput as RegisterPage).props.errorMsg === ""
            )
        ) {
            return true;
        } else {
            inputMsgValidArray
                .filter(
                    (errorLabel) =>
                        (errorLabel as RegisterPage).props.errorMsg ===
                        undefined
                )
                .map((errorLabel) =>
                    errorLabel.setProps({
                        errorMsg: "Field can not be empty",
                    })
                );
            return false;
        }
    }

    render() {
        const staticData = {
            pageName: "Registration Page",
            textForReffer: "Already have a Chatopolis account?",
            href: "/login",
            linkText: "Log in",
        };
        return `
            <section class="form_container">
                <h2>${staticData.pageName}</h2>
                <form action="#" method="post">
                    {{{ Input label="Email" id="email" name="email" ref="email" validationRule = "${ValidationRule.Email}" inputType="email" placeholder="email@gmail.com"}}}
                    {{{ Input label="Login" id="login" name="login" ref="login" validationRule = "${ValidationRule.Login}" inputType="text" }}}
                    {{{ Input label="First Name" id="first_name" name="first_name" ref="first_name" validationRule = "${ValidationRule.First_name}" inputType="text" }}}
                    {{{ Input label="Second Name" id="second_name" name="second_name" ref="second_name" validationRule = "${ValidationRule.Second_name}" inputType="text" }}}
                    {{{ Input label="Password" id="password" name="password" ref="password" validationRule = "${ValidationRule.Password}" inputType="password" }}}
                    {{{ Input label="Phone" id="phone" name="phone" ref="phone" validationRule = "${ValidationRule.Phone}" inputType="tel" placeholder="+1234567890" }}}
                    {{{ Button btn_text="Register" onClick=onRegister}}}
                    <span>${staticData.textForReffer}</span>
                    {{{ Link reasonText=textForReffer address="${staticData.href}" linkText="${staticData.linkText}"}}}
                </form>
            </section>
        `;
    }
}
//
