import { UserInfoProfileStub } from "../../data/data";
import Block from "../../core/Block";

interface ProfileProps {
    userInfo: UserData;
    onLogout?: () => void;
}

export class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super({
            ...props,
            userInfo: UserInfoProfileStub,
            onLogout: () => {
                console.log("LOGED OUT from the Page");
            },
        });
    }

    static componentName = "Profile";

    render() {
        const { ...values } = this.props.userInfo;
        return `
        <section class="messages-board form_container profile_mode">
            {{{ Button btn_text="Log out" onClick=onLogout }}}
            <form action="#" method="post">
                <div class="avatar_block">
                    {{#if data.avatar}}
                        <img src="{{this.avatar}}" alt="">
                    {{else}}
                        <div class="profile-avatar"></div>
                    {{/if}}
                    <span class="form_edit avatar_block__span">Edit</span>
                </div>
                {{{ Input label="First Name" id="first_name" name="first_name" ref="first_name" inputType="text" value="${values.first_name}" edit=true disabled=true}}}
                {{{ Input label="Second Name" id="second_name" name="second_name" ref="second_name" inputType="text" value="${values.second_name}" edit=true disabled=true}}}
                {{{ Input label="Displayed Name" id="displayed_name" name="displayed_name" ref="displayed_name" inputType="text" value="${values.displayed_name}" edit=true disabled=true}}}
                {{{ Input label="Email" id="email" name="email" ref="email" inputType="email" value="${values.email}" edit=true disabled=true}}}
                {{{ Input label="Login" id="login" name="login" ref="login" inputType="text" value="${values.login}" edit=true disabled=true}}}
                {{{ Input label="Password" id="password" name="password" ref="password" inputType="password" value="${values.password}" edit=true disabled=true}}}
                {{{ Input label="Phone" id="phone" name="phone" ref="phone" inputType="tel" value="${values.phone}" edit=true disabled=true}}}
            </form>
        </section>

        `;
    }
}
