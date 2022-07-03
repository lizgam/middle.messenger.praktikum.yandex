import Card from "components/Card";
import { Block, Router, Store } from "core";
import { withStore, withRouter, withUser, Mode } from 'utilities';
import { CardsSectionStub } from "../data/data";

interface ChatPageProps {
    users: CardInfo[];
    setMode?: (e: Event) => void;
    router: Router;
    store: Store<AppState>;
    user: UserData;
    onChooseCard?: (e: Event) => void;
    mode: Mode;
    showUser?: UserData | null;
}

export class ChatPage extends Block<ChatPageProps>{
    static componentName = "ChatPage";

    constructor({ setMode, ...props }: ChatPageProps) {
        super({
            ...props,
            users: CardsSectionStub,
            onChooseCard: (e: Event) => {
                const selectedCard = e.currentTarget;
                console.log(">>>", selectedCard);
                // this.props.store.dispatch({selectedCard: card})
                // call cardAPI(userId, ) create webSocket
            }


        });
        this.setProps({
            //showUser: this.props.store.getState().user,
            setMode: (e: Event) => {
                const item = (e.target as HTMLUListElement).getAttribute(
                    "name"
                );

                // this.props.store.dispatch({ mode: item });
                // console.log('setting props', this.props);
                let typedMode = item as Mode;
                this.setProps({ mode: typedMode });
                console.log('typedMode', typedMode);

                this.props.profile_mode = this.props.mode === "Profile";
                this.props.chat_mode = this.props.mode === "Chat";
                this.props.addgroup_mode = this.props.mode === "Addgroup";

            },
        })
    }

    render(): string {
        const user: {} | UserData = this.props.store.getState().user;
        const { ...values } = user;
        //console.log("###", user);
        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ InputControl placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <div style="display: block;position: absolute;left: 1000px;top: 150px;width: 20%;">Hello, ${values.displayed_name}</div>
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

export default withRouter(withStore(withUser(ChatPage)));
