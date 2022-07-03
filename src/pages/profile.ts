// import { UserInfoProfileStub } from "../data/data";
import { Block, Router, Store } from "core";
import { setEditMode } from "../services/profile"; //TODO
import { updateUser } from "../services/user"; //TODO
import { logout } from "../services/auth";
import { withStore, withRouter, withUser } from 'utilities';

type UserDataKey = keyof UserData;

interface EditInfoPageProps {
    userInfo?: UserData;
    editedField?: UserDataKey;
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

}

export class ProfilePage extends Block<EditInfoPageProps> {
    static componentName = "Profile";
    constructor(props: EditInfoPageProps) {
        super({
            ...props,
            onSave: () => {
                console.log("SAVE INFO");

                //TODO: import register validation here???
                //this.props.store.dispatch(updateUser);
            },
            onClose: () => {
                console.log("GO TO CHATS");
                window.router.go('/chat');
            },
            onLogout: () => {
                console.log("GO TO LOGIN");
                this.props.store.dispatch(logout);
            },
            editAvaClick: () => {
                console.log("EDIT AVA");
                this.props.store.dispatch(setEditMode);
            },
            editPasswordClick: () => {
                this.setProps({ isEditAvatar: false });
                console.log("EDIT PASSWWORD");
            }
        });
    }

    protected render() {
        const { ...values } = this.props.user;
        const staticData = {
            href: "/editInfo",
            linkText: "Edit",
        };
        return `
            <div class="chat-board edit_mode">
                <section class="form_container">
                    <h2>Profile: Hello, ${values.login} </h2>
                    {{{ Button btnText="Log out" onClick=onLogout }}}
                    <form action="#" method="post" class="profile_mode">
                        <div class="avatar_block">
                            {{#if data.avatar}}
                                <img src="${values.first_name}" alt="user avatar">
                            {{else}}
                                <div class="profile-avatar"></div>
                            {{/if}}
                            {{{ Link linkClass="form_edit avatar_block__span" address="/editInfo" linkText="Edit" editClick=editAvaClick}}}
                        </div>
                        {{{ InputControl label="First Name" id="first_name" name="first_name" ref="first_name" inputType="text" value="${values.first_name}"}}}
                        {{{ InputControl label="Second Name" id="second_name" name="second_name" ref="second_name" inputType="text" value="${values.second_name}"}}}
                        {{{ InputControl label="Displayed Name" id="displayed_name" name="displayed_name" ref="displayed_name" inputType="text" value="${values.displayed_name}"}}}
                        {{{ InputControl label="Email" id="email" name="email" ref="email" inputType="email" value="${values.email}"}}}
                        {{{ InputControl label="Login" id="login" name="login" ref="login" inputType="text" value="${values.login}"}}}
                        {{{ InputControl label="Password" id="password" name="password" ref="password" inputType="password" value="${values.password}" edit=true disabled=true}}}
                        {{{ InputControl label="Phone" id="phone" name="phone" ref="phone" inputType="tel" value="${values.phone}"}}}
                    </form>

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
}

export default withRouter(withStore(withUser(ProfilePage)));
