import { Block } from "core";
import { addUserToChat, removeUserFromChat } from "services/chats";

interface DialogProps {
    userId: number;
    chatId: number;
    remove: boolean;
    onAction: () => void;
    onCancel: () => void;

}

export class Dialog extends Block<DialogProps> {
    constructor(props: DialogProps) {
        super({
            ...props,
            onAction: () => {
                const userId = (this.element?.querySelector('[name="userId"]') as HTMLInputElement
                ).value;
                if (userId === "") {
                    const userIdError = (this.refs.userId as Dialog).refs.error;
                    userIdError.setProps({
                        errorMsg: "Field can not be empty",
                    })
                } else {
                    const user = parseInt(userId);
                    props.remove ? removeUserFromChat({ users: [user], chatId: this.props.chatId }) :
                        addUserToChat({ users: [user], chatId: this.props.chatId });
                    (document.getElementById('userIdInput') as HTMLInputElement).value = "";
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
                            label="User Id"
                            id="userIdInput"
                            placeholder="Enter user Id"
                            name="userId"
                            inputType="number"
                            ref="userId"
                        }}}
                        <div class="button-container">
                            {{{ Button
                                btnText="Cancel"
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

