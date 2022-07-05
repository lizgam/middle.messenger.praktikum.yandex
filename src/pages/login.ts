import { ValidationRule } from "../utilities/validation";
import { Block, Router, Store } from "core";
import { login } from "../services/auth";
import { withStore, withRouter } from 'utilities';

type LoginPageProps = {
    onLogin?: () => void;
    errorMsg?: string;
    router: Router;
    store: Store<AppState>;
    formError?: () => string | null;
};

export class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
        // console.log('enter LoginPage. props', props);
        super({
            ...props,
            onLogin: () => {
                const loginData: Partial<UserData> = {
                    login: (
                        this.element?.querySelector('[name="login"]') as HTMLInputElement
                    ).value,
                    password: (
                        this.element?.querySelector('[name="password"]') as HTMLInputElement
                    ).value,
                };
                if (this.checkFormValidity()) {
                    this.props.store.dispatch(login, loginData);
                }
            },
        });

        this.setProps({
            formError: () => this.props.store.getState().authError,
        });
        // console.log('enter LoginPage. props', props); //??? 2 times?
    }

    protected getStateFromProps(): void {
        this.state = {

        }
    }
    componentDidMount() {
        if (this.props.store.getState().user === {}) {
            this.props.router.go('/chat');
        }
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
            href: "/register",
            linkText: "Register",
            values: "12",
        };
        return `
            <section class="form_container">
                <h2>${staticData.pageName}</h2>
                <form action="#" method="post">
                {{{InputControl
                    label = "Login"
                    id="login"
                    name = "login"
                    validationRule = "${ValidationRule.Login}"
                    ref="login"
                    inputType = "text"
                }}}
                {{{InputControl
                    label = "Password"
                    id="password"
                    name = "password"
                    validationRule = "${ValidationRule.Password}"
                    ref="password"
                    inputType = "password"
                }}}
                {{{ Button
                    btnText="Log in"
                    onClick=onLogin
                }}}
                {{{ErrorLabel errorMsg=formError}}}

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

export default withRouter(withStore(LoginPage));
