import { UserInfoProfileStub } from "../data/data";
import Block from "../core/Block";

type UserDataKey = keyof UserData;

interface EditInfoPageProps {
    userInfo?: UserData;
    editedField?: UserDataKey;
    isPassword?: boolean;
    errorMsg?: string;
    onClose?: () => void;
    onSave?: () => void;
}

export class EditInfoPage extends Block {
    constructor(props: EditInfoPageProps) {
        super({
            ...props,
            userInfo: UserInfoProfileStub,
            editedField: "login",
            isPassword: false,
            onSave: () => {
                const field = this.props.editedField;
                const editedData = {
                    editedField: (
                        document.getElementById(field) as HTMLInputElement
                    ).value,
                };

                const fieldError = (this.refs[field] as EditInfoPage).refs
                    .error;

                if ((fieldError as EditInfoPage).props.errorMsg === "") {
                    console.log("New", field, "was setted!", editedData);
                }
            },
        });
    }

    protected render() {
        const userDataObj = this.props.userInfo;
        const editField = this.props.editedField;
        let val = this.props.isPassword ? "" : userDataObj[editField];
        let infoType = "";
        switch (editField) {
            case "email":
                infoType = "email";
                break;
            case "password":
                infoType = "password";
                val = "";
                break;
            case "phone":
                infoType = "tel";
                break;
            default:
                infoType = "text";
        }

        return `
            <div class="chat-board edit_mode">
                <section class="form_container">
                    <h2>Edit ${editField}:</h2>
                    <form action="#" method="post">
                        {{{Input
                            label = "${editField}"
                            id="${editField}"
                            name = "${editField}"
                            validationRule = "${editField}"
                            value="${val}"
                            ref="${editField}"
                            inputType = "${infoType}"
                        }}}
                        {{#if isPassword}}
                            {{{Input
                                label = "Repeat password"
                                id="passwordConfermed"
                                name = "password"
                                value="${val}"
                                ref="passwordConfermed"
                                inputType = "password"
                            }}}
                        {{/if}}

                        <div class="button-container">
                            {{{ Button
                                btn_text="Close"
                                onClick=onClose
                                passive="passive"
                            }}}
                            {{{ Button
                                btn_text="Save"
                                onClick=onSave
                            }}}
                        </div>
                    </form>
                </section>
            </div>
         `;
    }
}
