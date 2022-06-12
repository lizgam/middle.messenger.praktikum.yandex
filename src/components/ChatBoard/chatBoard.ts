import { Block } from "core";
import { CardsSectionStub } from "../../data/data";
// import { Mode } from "model/types/types";

interface ChatBoardProps {
    mode: Mode;
    profile_mode?: boolean;
    chat_mode?: boolean;
    addgroup_mode?: boolean;
    users: CardInfo[];
    setMode?: () => void;
}

export class ChatBoard extends Block {
    static componentName = "ChatBoard";

    constructor({ ...props }: ChatBoardProps) {
        super({
            ...props,
            users: CardsSectionStub,
            setMode: () => {},
        });
        this.props.profile_mode = this.props.mode === "Profile";
        this.props.chat_mode = this.props.mode === "Chat";
        this.props.addgroup_mode = this.props.mode === "Addgroup";
    }
    protected getStateFromProps() {
        this.state = {};
    }

    render(): string {
        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ Input placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <ul id="nav-list" class="card-section__nav-list">
                            {{#each users}}
                            <li>
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

                    {{{Navigation onClick=setMode}}}

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
