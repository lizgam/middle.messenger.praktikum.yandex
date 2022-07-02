import Card from "components/Card";
import { Block, Router, Store } from "core";
import { withStore, withRouter, withUser, Mode } from 'utilities';
import { CardsSectionStub } from "../../data/data";

interface ChatBoardProps {
    users: CardInfo[];
    setMode?: () => void;
    router: Router;
    store: Store<AppState>;
    onChooseCard: (e: Event) => void;
    mode: Mode;
}

export class ChatBoard extends Block<ChatBoardProps>{
    static componentName = "ChatBoard";

    constructor({ setMode, ...props }: ChatBoardProps) {
        super({
            props,
            users: CardsSectionStub,
            setMode: (e: Event) => {
                const item = (e.target as HTMLUListElement).getAttribute(
                    "name"
                );
                this.setProps({
                    mode: item,
                });

                this.props.profile_mode = this.props.mode === "Profile";
                this.props.chat_mode = this.props.mode === "Chat";
                this.props.addgroup_mode = this.props.mode === "Addgroup";

                // let user = this.props.store.getState().user;
                // console.log("!!!!! user", user);
            },
             onChooseCard: (e: Event) => {
                const selectedCard = e.currentTarget;
                console.log(">>>", selectedCard);
                // this.props.store.dispatch({selectedCard: card})
                // call cardAPI(userId, ) create webSocket
             }


        });
        this.setProps({
            // onChooseUser: (card: Card) => {
            //     debugger;
            //     const selectedCard = card;
            //     console.log(">>>", selectedCard);
                // this.props.store.dispatch({selectedCard: card})
                //call cardAPI(userId, ) create webSocket
            // }
        })
        // debugger;
    }

    render(): string {

        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ InputControl placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <div style="display: block;position: absolute;left: 1000px;top: 150px;width: 20%;">Hello, ${this.props.mode}</div>
                        <ul id="nav-list" class="card-section__nav-list">
                            {{#each users}}
                            <li class="user-card">
                                {{{ Card
                                    selected=store.state.selectedCard
                                    ref="card"
                                    name=this.name
                                    message=this.message
                                    date=this.date
                                    count=this.count
                                    avatar=this.avatar
                                    onChooseCard=../onChooseCard
                                }}}
                            </li>
                            {{/each}}

                        </ul>
                    </div>
                </section>
                <section class="main-board-section">

                    {{{ Navigation onClick=setMode mode="${this.props.mode}"}}}

                    {{#if profile_mode}}
                        {{{ Profile }}}
                    {{/if }}
                    {{#if chat_mode }}
                        {{{ Chat }}}
                    {{/if }}
                    {{#if addgroup_mode }}
                        {{{ Addgroup }}}
                    {{/if }}

                </section>
            </div>
    `;
    }
}

export default withRouter(withStore(withUser(ChatBoard)));
