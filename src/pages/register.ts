import { ValidationRule } from "../utilities/validation";
import { register } from "../services/auth";
import { Block, Router, Store } from "core";
import { withStore, withRouter } from 'utilities';

interface RegisterPageProps {
    onRegister?: () => void;
    errorMsg?: string;
    router: Router;
    store: Store<AppState>;
    formError?: () => string | null;
}

export class RegisterPage extends Block<RegisterPageProps> {
    constructor(props: RegisterPageProps) {
        super({
            ...props,
            onRegister: () => {
                const loginData: Partial<UserData> = {
                    login: (
                        this.element?.querySelector('[name="login"]') as HTMLInputElement
                    ).value,
                    first_name: (
                        this.element?.querySelector('[name="first_name"]') as HTMLInputElement
                    ).value,
                    second_name: (
                        this.element?.querySelector('[name="second_name"]') as HTMLInputElement
                    ).value,
                    email: (
                        this.element?.querySelector('[name="email"]') as HTMLInputElement
                    ).value,
                    password: (
                        this.element?.querySelector('[name="password"]') as HTMLInputElement
                    ).value,
                    phone: (
                        this.element?.querySelector('[name="phone"]') as HTMLInputElement
                    ).value,
                };

                if (this.checkFormValidity()) {
                    this.props.store.dispatch(register, loginData)
                }
            },
        });

        this.setProps({
            formError: () => this.props.store.getState().authError,
        });
    }

    protected getStateFromProps(): void {
        this.state = {

        }
    }
    componentDidMount() {
        if (this.props.store.getState().user) {
            this.props.router.go('/profile');
        }
    }

    checkFormValidity() {
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

    protected render() {
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
                    {{{ InputControl label="Email" id="email" name="email" ref="email" validationRule = "${ValidationRule.Email}" inputType="email" placeholder="email@gmail.com"}}}
                    {{{ InputControl label="Login" id="login" name="login" ref="login" validationRule = "${ValidationRule.Login}" inputType="text" }}}
                    {{{ InputControl label="First Name" id="first_name" name="first_name" ref="first_name" validationRule = "${ValidationRule.First_name}" inputType="text" }}}
                    {{{ InputControl label="Second Name" id="second_name" name="second_name" ref="second_name" validationRule = "${ValidationRule.Second_name}" inputType="text" }}}
                    {{{ InputControl label="Password" id="password" name="password" ref="password" validationRule = "${ValidationRule.Password}" inputType="password" }}}
                    {{{ InputControl label="Phone" id="phone" name="phone" ref="phone" validationRule = "${ValidationRule.Phone}" inputType="tel" placeholder="+1234567890" }}}
                    {{{ErrorLabel errorMsg=formError}}}
                    {{{ Button btnText="Register" onClick=onRegister}}}
                    <span>${staticData.textForReffer}</span>
                    {{{ Link reasonText=textForReffer address="${staticData.href}" linkText="${staticData.linkText}"}}}
                </form>
            </section>
        `;
    }
}

export default withRouter(withStore(RegisterPage));
