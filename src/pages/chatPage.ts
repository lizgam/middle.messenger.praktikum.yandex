import { Block, Router, Store } from "core";
import { withStore, withRouter, withUser } from "utilities";
import { openChat } from "services/chats";
import { getChats } from "services/chats";

type ChatPageProps = {
    router: Router;
    store: Store<AppState>;
    user: UserData;
    onChooseCard?: (card: CardInfo) => void;
    cards?: CardInfo[] | null;
    selectedCard?: CardInfo;
    getName: () => void;
}

export class ChatPage extends Block<ChatPageProps>{
    static componentName = "ChatPage";

    constructor(props: ChatPageProps) {
        super(props);
        this.setProps({
            onChooseCard: (card: CardInfo) => {
                this.setProps({ selectedCard: card });
                this.props.store.dispatch(openChat, { userId: this.props.user.id, chatId: card.id });
            }
        });
    }

    async componentDidMount() {
        const cardsList = this.props.store.getState().cards;
        if (!cardsList) {
            await this.props.store.dispatch(getChats);
        }
        if (!this.props.store.getState().user) {
            this.props.router.go("/login");
        }
    }

    render(): string {
        const chatName = this.props.user.display_name ?
            this.props.user.display_name :
            this.props.user.login;

        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ InputControl placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <ul id="nav-list" class="card-section__nav-list">
                            {{#each store.state.cards}}
                            <li class="user-card">
                                {{{ Card
                                    selectedCard=../selectedCard
                                    ref="card"
                                    card=this
                                    onChooseCard=../onChooseCard
                                }}}
                            </li>
                            {{/each}}
                        </ul>
                    </div>
                </section>
                <section class="main-board-section">
                    {{{ Navigation}}}
                    {{#if selectedCard}}
                        {{{ Chat selectedCard=selectedCard messages=store.state.messages}}}
                    {{else }}
                        <div> <h3>Hello, ${chatName} </h3> <p>Select chat to start chatting or create new Chat</p></div>
                    {{/if}}
                </section>
            </div>
    `;
    }
}

export default withRouter(withStore(withUser(ChatPage)));


