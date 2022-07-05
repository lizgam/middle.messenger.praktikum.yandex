import { Block, Router, Store } from "core";
import { withStore, withRouter, withUser, Mode } from 'utilities';
import { createChat } from "services/chats";
import { getChats } from "services/chats"

interface ChatPageProps {
    router: Router;
    store: Store<AppState>;
    user: UserData;
    onChooseCard?: (card: CardInfo) => void;
    cards?: CardInfo[] | null;
    selectedCard?: CardInfo;
}

export class ChatPage extends Block<ChatPageProps>{
    static componentName = "ChatPage";

    constructor(props: ChatPageProps) {
        super(props);
        this.setProps({
            onChooseCard: (card: CardInfo) => {
                this.setProps({ selectedCard: card });
                this.props.store.dispatch(createChat, { userId: this.props.user.id, chatId: card.id });
            },
        })
    }

    async componentDidMount() {
        const cardsList = this.props.store.getState().cards
        if (!cardsList) {
            await this.props.store.dispatch(getChats);
        }
    }

    render(): string {
        const chatName = this.props.user.displayed_name ?
            this.props.user.displayed_name :
            this.props.user.login;
        
        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ InputControl placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <div style="display: block;position: absolute;left: 1000px;top: 150px;width: 20%;">User: ${chatName}</div>
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
                    {{{ Chat selectedCard=selectedCard messages=store.state.messages}}}
                </section>
            </div>
    `;
    }
}

export default withRouter(withStore(withUser(ChatPage)));

// {{#if selectedCard}}
// {{else }}<h3>Hello, ${this.props.user.first_name} <br>Select chat to start chatting or create new Chat</h3>
// {{/if}}
