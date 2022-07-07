import { ValidationRule } from "utilities/validation";
import { Block, Router, Store } from "core";
import { withStore, withRouter } from "utilities";
import { createNewChat, getChats } from "services/chats";

//type UserDataKey = keyof UserData;

type CreateChatPageProps = {
    router: Router;
    store: Store<AppState>;
    errorMsg?: string;
    createChat?: () => void;
    onClose?: () => void;
    onCreate?: () => void;
}

export class CreateChatPage extends Block<CreateChatPageProps> {
    constructor(props: CreateChatPageProps) {
        super({
            ...props,
            createChat: () => {
                const chatName: string =
                    (this.element?.querySelector('[name="chatName"]') as HTMLInputElement
                    ).value;
                const chatNameError = (this.refs.first_name as CreateChatPage).refs.error;
                if ((chatNameError as CreateChatPage).props.errorMsg === "") {
                    this.props.store.dispatch(createNewChat, { title: chatName });
                    let oldCards = this.props.store.getState().cards;
                    //oldCards?.push({ title: chatName })
                } else if ((chatNameError as CreateChatPage).props.errorMsg === undefined) {
                    chatNameError.setProps({
                        errorMsg: "Field can not be empty",
                    })
                }
            },

            onClose: () => {
                this.props.router.go('/chat');
            },
        });
    }

    protected render() {

        return `
            <div class="chat-board edit_mode">
                <section class="form_container">
                    <h2>Create new Chat</h2>
                    <form action="#" method="post">
                        <div class="avatar_block">
                        </div>
                        {{{ InputControl label="Chat name" placeholder="Enter chat name"
                            validationRule = "${ValidationRule.Login}"
                            inputType="text"
                            id="chatName" name="chatName" ref="first_name"
                        }}}
                        <div class="button-container">
                            {{{ Button
                                btnText="Cancel"
                                onClick=onClose
                                passive="passive"
                            }}}
                            {{{ Button
                                btnText="Create"
                                onClick=createChat
                            }}}
                        </div>
                    </form>
                </section>
            </div>
         `;
    }
}

export default withRouter(withStore(CreateChatPage));
