import { Block } from "core";
import { addUserToChat, removeUserFromChat } from "services/chats";

type DialogProps = {
    userLogin: string;
    chatId: number;
    remove: boolean;
    onAction: () => void;
    onCancel: () => void;

}

export class Dialog extends Block<DialogProps> {
    constructor({ remove, ...props }: DialogProps) {
        super({
            ...props,
            remove,
            onAction: () => {
                const userLogin = this.element?.querySelector<HTMLInputElement>("[name=\"userLogin\"]")?.value;
                if (!userLogin) {
                    return;
                } else {
                    if (userLogin === "") {
                        const userIdError = (this.refs.userLogin as Dialog).refs.error;
                        userIdError.setProps({
                            errorMsg: "Field can not be empty",
                        });
                    } else {
                        remove ? removeUserFromChat(userLogin, this.props.chatId) : addUserToChat(userLogin, this.props.chatId);
                        const inputLogin = document.querySelector<HTMLInputElement>("#userLoginInput");
                        if (inputLogin) {
                            inputLogin.value = "";
                        } else {
                            return;
                        }
                    }
                }

            }
        });
    }
    static componentName = "Dialog";

    render() {
        return `
            <dialog open class="dialog">
                <section class="form_container">
                    <h2>{{#if remove}}Remove{{else}}Add{{/if}} user:</h2>
                    <form action="#" method="post">
                        {{{ InputControl
                            label="User Login"
                            id="userLoginInput"
                            placeholder="Enter user login"
                            name="userLogin"
                            inputType="text"
                            ref="userLogin"
                        }}}
                        <div class="button-container">
                            {{{ Button
                                btnText="Close"
                                onClick=onCancel
                                passive="passive"
                            }}}
                            {{#if remove}}
                                {{{ Button
                                    btnText="Remove"
                                    onClick=onAction
                                }}}
                            {{else}}

                                {{{ Button
                                    btnText="Add"
                                    onClick=onAction
                                }}}
                            {{/if}}
                        </div>
                    </form>
                </section>
            </dialog>
        `;
    }
}

