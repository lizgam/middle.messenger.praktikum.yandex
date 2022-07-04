import Card from "components/Card";
import { Block, Router, Store } from "core";
import { withStore, withRouter, withUser, Mode } from 'utilities';
import { CardsSectionStub } from "../data/data";
import { createChat } from "services/chats";
import { getChats } from "services/chats"

interface ChatPageProps {
    users: CardInfo[];
    setMode?: (e: Event) => void;
    router: Router;
    store: Store<AppState>;
    user: UserData;
    onChooseCard?: (card: CardInfo) => void;
    mode: Mode;
    showUser?: UserData | null;
    cards?: CardInfo[] | null;
}

export class ChatPage extends Block<ChatPageProps>{
    static componentName = "ChatPage";

    constructor(props: ChatPageProps) {
        super(props);

        console.log('constructor called');
        this.setProps({
            chat_mode: true,
            onChooseCard: (card: CardInfo) => {
                // console.log(">>>", card);
                // debugger;

                // this.props.store.dispatch(createChat, {userId: this.props.user.id, chatId: "81"});
                // call cardAPI(userId, ) create webSocket
            },
            //showUser: this.props.store.getState().user,
            setMode: (e: Event) => {
                debugger;
                const item = (e.target as HTMLUListElement).getAttribute(
                    "name"
                );

                // this.props.store.dispatch({ mode: item });
                // console.log('setting props', this.props);
                let typedMode = item as Mode;
                this.setProps({ mode: typedMode });
                console.log('typedMode', typedMode);

                // this.props.profile_mode = false;
                // this.props.chat_mode = true;
                // this.props.addgroup_mode = false;;

            },
        })
    }

    async componentDidMount() {
        // debugger;
        const cardsList = this.props.store.getState().cards
        if (!cardsList) {
            await this.props.store.dispatch(getChats);
        }
    }

    render(): string {
        const user: {} | UserData = this.props.store.getState().user;
        const { ...values } = user;
        console.log('cards received: ', this.props.store.getState().cards);

        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ InputControl placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <div style="display: block;position: absolute;left: 1000px;top: 150px;width: 20%;">Hello, ${values.displayed_name}</div>
                        <ul id="nav-list" class="card-section__nav-list">
                            {{#each store.state.cards}}
                            <li class="user-card">
                                {{{ Card
                                    selected=store.state.selectedCard
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
                    {{{ Chat }}}




                </section>
            </div>
    `;
    }
}

export default withRouter(withStore(withUser(ChatPage)));

// {{#if selectedCard}}
// {{else }}<h3>Hello, ${this.props.user.first_name} <br>Select chat to start chatting or create new Chat</h3>
// {{/if}}
