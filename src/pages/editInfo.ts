import { ValidationRule } from "../utilities/validation";
import { Block, Router, Store } from "core";
import { changeAvatar, changePassword } from "../services/user"; //TODO
import { withStore, withRouter } from "utilities";

type UserDataKey = keyof UserData;

interface EditInfoPageProps {
    user?: UserData;
    errorMsg?: string;
    router: Router;
    store: Store<AppState>;
    isEditAvatar: boolean;
    onClose?: () => void;
    onSave?: () => void;
    uploadFile?: () => void;
}

export class EditInfoPage extends Block<EditInfoPageProps> {
    static componentName = "EditInfoPage";
    constructor(props: EditInfoPageProps) {
        super({
            ...props,
            onSave: () => {
                const passwordSet = {
                    oldPassword: (
                        this.element?.querySelector("[name=\"oldPassword\"]") as HTMLInputElement
                    ).value,
                    newPassword: (
                        this.element?.querySelector("[name=\"newPassword\"]") as HTMLInputElement
                    ).value,
                };
                if (this.checkFormValidity()) {
                    this.props.store.dispatch(changePassword, passwordSet);
                }
            },
            uploadFile: () => {
                const avatar: HTMLInputElement = document.getElementById("avatar") as HTMLInputElement;
                if (avatar && avatar.files) {
                    let image: File = avatar.files[0];
                    const form = new FormData();
                    form.append("avatar", image);
                    this.props.store.dispatch(changeAvatar, form);
                }

            },
            onClose: () => {
                this.props.router.go("/profile");
            }
        });
    }
    checkFormValidity() {
        const oldPasswordError = (this.refs.oldPassword as EditInfoPage).refs.error;
        const newPasswordError = (this.refs.newPassword as EditInfoPage).refs.error;

        const inputMsgValidArray = [oldPasswordError, newPasswordError];

        if (
            inputMsgValidArray.every(
                (msgInput) => (msgInput as EditInfoPage).props.errorMsg === ""
            )
        ) {
            return true;
        } else {
            inputMsgValidArray
                .filter(
                    (errorLabel) =>
                        (errorLabel as EditInfoPage).props.errorMsg === undefined
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
        console.log("render editInfo", this.props.isEditAvatar);

        return `
            <div class="chat-board edit_mode">
                <section class="form_container">
                    <h2>Edit Info:</h2>
                    <form action="#" method="post" id="useEditForm">

                        {{#if isEditAvatar}}
                            {{{InputControl
                                label = "Choose file for avatar"
                                id="avatar"
                                name = "avatar"
                                ref="avatar"
                                inputType = "file"
                                acceptfile = "image/*"

                            }}}
                        {{else}}
                            {{{InputControl
                                label = "Enter old password"
                                id="oldPassword"
                                name = "oldPassword"
                                validationRule = "${ValidationRule.Password}"
                                ref="oldPassword"
                                inputType = "password"
                            }}}
                            {{{InputControl
                                label = "Enter new password"
                                id="newPassword"
                                name = "newPassword"
                                validationRule = "${ValidationRule.Password}"
                                ref="newPassword"
                                inputType = "password"
                            }}}
                        {{/if}}

                        <div class="button-container">

                        {{{ Button
                            btnText="Close"
                            onClick=onClose
                            passive="passive"
                        }}}
                        {{#if isEditAvatar}}
                            {{{ Button
                                btnText="Upload"
                                onClick=uploadFile
                            }}}
                        {{else}}
                            {{{ Button
                                btnText="Update"
                                onClick=onSave
                            }}}
                        {{/if}}

                        </div>
                    </form>
                </section>
            </div>
         `;
    }
}

export default withRouter(withStore(EditInfoPage));
