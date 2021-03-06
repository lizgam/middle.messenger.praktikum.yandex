import { ValidationRule } from "../utilities/validation";
import { Block, Router, Store } from "core";
import { updateUser } from "../services/user";
import { logout } from "../services/auth";
import { withStore, withRouter, withUser, isValidInfo } from "utilities";

type EditInfoPageProps = {
    isEditAvatar?: boolean;
    errorMsg?: string;
    user: UserData;
    router: Router;
    store: Store<AppState>;
    onClose?: () => void;
    onSave?: () => void;
    onLogout?: () => void;
    editAvaClick?: () => void;
    editPasswordClick?: () => void;
    formError?: () => string | null;
    avatar?: () => string | null | undefined;

}

export class ProfilePage extends Block<EditInfoPageProps> {
    static componentName = "Profile";
    constructor(props: EditInfoPageProps) {
        super({
            ...props,
            onSave: () => {
                const loginData: Partial<UserData> = {
                    login: (
                        this.element?.querySelector("[name=\"login\"]") as HTMLInputElement
                    ).value,
                    first_name: (
                        this.element?.querySelector("[name=\"first_name\"]") as HTMLInputElement
                    ).value,
                    second_name: (
                        this.element?.querySelector("[name=\"second_name\"]") as HTMLInputElement
                    ).value,
                    display_name: (
                        this.element?.querySelector("[name=\"display_name\"]") as HTMLInputElement
                    ).value,
                    email: (
                        this.element?.querySelector("[name=\"email\"]") as HTMLInputElement
                    ).value,
                    phone: (
                        this.element?.querySelector("[name=\"phone\"]") as HTMLInputElement
                    ).value,
                };

                if (this.checkFormValidity(loginData)) {
                    this.props.store.dispatch(updateUser, loginData);
                }
            },
            onClose: () => {
                this.props.router.go("/chat");
            },
            onLogout: () => {
                this.props.store.dispatch(logout);
                this.props.router.go("/login");
            },
            editAvaClick: () => {
                this.props.router.go("/editInfo/avatar");
            },
            editPasswordClick: () => {
                this.props.router.go("/editInfo/password");
            },
        });
        this.setProps({
            formError: () => this.props.store.getState().authError,
            avatar: () => this.props.store.getState().user?.avatar,
        });
    }

    protected render() {
        const { ...values } = this.props.user;
        return `
            <div class="chat-board edit_mode">
                <section class="form_container">
                    <h2>Hello, ${values.login} </h2>
                    {{{ Button btnText="Log out" onClick=onLogout }}}
                    <form action="#" method="post" class="profile_mode">
                        <div class="avatar_block">
                            {{#if avatar}}
                                <img src="{{avatar}}" alt="user avatar">
                            {{else}}
                                <div class="profile-avatar"></div>
                            {{/if}}
                            {{{ActionClick actionText="Edit avatar" editClick=editAvaClick}}}
                        </div>
                        {{{ InputControl label="First Name" id="first_name" name="first_name" ref="first_name" inputType="text" validationRule = "${ValidationRule.First_name}" value="${values.first_name}"}}}
                        {{{ InputControl label="Second Name" id="second_name" name="second_name" ref="second_name" inputType="text" validationRule = "${ValidationRule.Second_name}" value="${values.second_name}"}}}
                        {{{ InputControl label="Displayed Name" id="display_name" name="display_name" ref="display_name" inputType="text" validationRule = "${ValidationRule.Login}" value="${values.display_name}"}}}
                        {{{ InputControl label="Email" id="email" name="email" ref="email" inputType="email" validationRule = "${ValidationRule.Email}" value="${values.email}"}}}
                        {{{ InputControl label="Login" id="login" name="login" ref="login" inputType="text" validationRule = "${ValidationRule.Login}" value="${values.login}"}}}
                        {{{ActionClick actionText="Edit password" editClick=editPasswordClick}}}
                        {{{ InputControl label="Password" id="password" name="password" ref="password" inputType="password" value="${values.password}" disabled=true}}}
                        {{{ InputControl label="Phone" id="phone" name="phone" ref="phone" inputType="tel" validationRule = "${ValidationRule.Phone}" value="${values.phone}"}}}
                    </form>
                        {{{ErrorLabel errorMsg=formError}}}
                        <div class="button-container">
                            {{{ Button
                                btnText="Close"
                                onClick=onClose
                                passive="passive"
                            }}}
                            {{{ Button
                                btnText="Save"
                                onClick=onSave
                            }}}
                        </div>
                    </form>
                </section>
            </div>
         `;
    }


    checkFormValidity(data: Partial<UserData>) {
        const loginError = (this.refs.login as ProfilePage).refs.error;
        const first_nameError = (this.refs.first_name as ProfilePage).refs
            .error;
        const display_nameError = (this.refs.display_name as ProfilePage).refs
            .error;
        const second_nameError = (this.refs.second_name as ProfilePage).refs
            .error;
        const emailError = (this.refs.email as ProfilePage).refs.error;
        const phoneError = (this.refs.phone as ProfilePage).refs.error;

        const inputMsgValidArray = [
            loginError,
            first_nameError,
            second_nameError,
            display_nameError,
            emailError,
            phoneError,
        ];

        if (Object.values(data).every(isValidInfo) &&
            inputMsgValidArray.every(
                (msgInput) => (!(msgInput as ProfilePage).props.errorMsg))
        ) {
            return true;
        } else {
            return false;
        }
    }
}

export default withRouter(withStore(withUser(ProfilePage)));
