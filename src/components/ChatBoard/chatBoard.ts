import { Block } from "core";
import { CardsSectionStub } from "../../data/data";

interface ChatBoardProps {
    users: CardInfo[];
    setMode?: () => void;
}

export class ChatBoard extends Block {
    static componentName = "ChatBoard";

    constructor({ setMode, ...props }: ChatBoardProps) {
        super({
            ...props,
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
            },
        });
    }

    render(): string {
        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ InputControl placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <ul id="nav-list" class="card-section__nav-list">
                            {{#each users}}
                            <li class="user-card">
                                {{{ Card
                                    selected=this.selected
                                    ref="card"
                                    name=this.name
                                    message=this.message
                                    date=this.date
                                    count=this.count
                                    avatar=this.avatar
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
