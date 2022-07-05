import { ValidationRule } from "../utilities/validation";
import { UserInfoProfileStub } from "../data/data";
import { Block, Router, Store } from "core";
import { withStore, withRouter } from 'utilities';
import { searchByLogin } from "../services/user"; //TODO
import { createChat } from "../services/chats"; //TODO

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
                    console.log("create success");
                    this.props.store.dispatch(createChat, chatName);
                    //succesful message
                    window.router.go('/chat');
                } else if ((chatNameError as CreateChatPage).props.errorMsg === undefined) {
                    chatNameError.setProps({
                        errorMsg: "Field can not be empty",
                    })
                    console.log("create NOT success");
                }
            },


            onClose: () => {
                window.router.go('/chat');
            },
            onCreate: () => { }
        });
    }
    componentDidMount() {
        if (this.props.store.getState().user === {}) {
            this.props.router.go('/login');
        }
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
                            validationRule = "${ValidationRule.First_name}"
                            inputType="text"
                            id="chatName" name="chatName" ref="first_name"
                        }}}
                        <div class="button-container">
                            {{{ Button
                                btnText="Back to chats"
                                onClick=onClose
                                passive="passive"
                            }}}
                            {{{ Button
                                btnText="Create"
                                onClick=onCreate
                            }}}
                        </div>
                    </form>
                </section>
            </div>
         `;
    }
}

export default withRouter(withStore(CreateChatPage));
