import { UserInfoProfileStub } from "../data/data";
import Block from "../core/Block";

type UserDataKey = keyof UserData;

interface EditInfoPageProps {
    userInfo?: UserData;
    editedField?: UserDataKey;
    onClose?: () => void;
    onSave?: () => void;
}

export class EditInfoPage extends Block {
    constructor(props: EditInfoPageProps) {
        super({
            ...props,
            userInfo: UserInfoProfileStub,
            editedField: "login", // stub value for selected edited info. TODO: get from store
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
            onClose: () => {},
        });
    }

    protected render() {
        const userDataObj = this.props.userInfo;
        const editField = this.props.editedField;
        const val = userDataObj[editField];

        return `
            <div class="chat-board edit_mode">
                <section class="form_container">
                    <h2>Edit ${editField}:</h2>
                    <form action="#" method="post">
                        {{{Input
                            label = "Login"
                            id="login"
                            name = "login"
                            validationRule = "${editField}"
                            value="${val}"
                            ref="login"
                            inputType = "text"
                        }}}

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
