import { Block } from "core";
import { CardsSectionStub } from "../../data/data";

interface ChatBoardProps {
    mode: Mode;
    profile_mode?: boolean;
    chat_mode?: boolean;
    addgroup_mode?: boolean;
    users: CardInfo[];
}

export class ChatBoard extends Block<ChatBoardProps> {
    static componentName = "ChatBoard";

    constructor({ ...props }: ChatBoardProps) {
        super({
            ...props,
            users: CardsSectionStub,
        });
        this.props.profile_mode = this.props.mode === "Profile";
        this.props.chat_mode = this.props.mode === "Chat";
        this.props.addgroup_mode = this.props.mode === "Addgroup";
    }
    // protected getStateFromProps() {
    //     console.log("input getStateFromProps");
    //     console.log("this.id", this.id);
    //     this.state = {
    //         values: {
    //             login: "abc",
    //             password: "67",
    //         },
    //         errors: {
    //             login: "test",
    //             errorMsg: "cool test",
    //         },
    //         onBlur: (e: FocusEvent) => {
    //             const input = e.target as HTMLInputElement;
    //             const value = input.value;
    //             console.log("blur");
    //             const result = "Error finale";
    //             const newState = {
    //                 errors: {
    //                     errorMsg: result,
    //                 },
    //             };
    //             debugger;
    //             console.log("blur, this.state", this.state);

    //             this.setState(newState);
    //             console.log("blur, this.state", this.state);
    //         },
    //     };
    // }

    protected render(): string {
        return `
            <div class="chat-board">
                <section class="cards-section">
                    <div class="chat-section__input">
                        {{{ Input placeholder="Enter searching name" inputType="search" }}}
                    </div>
                    <div class="cards-section__chat-panel">
                        <ul class="card-section__nav-list">
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

                    <nav class="main-board__navigation">
                        <ul class="main-board__nav-list">
                            <li class="{{#if profile_mode}}active-mode{{/if}}">My profile</li>
                            <li class="{{#if chat_mode}}active-mode{{/if}}">Chat</li>
                            <li class="{{#if addgroup_mode}}active-mode{{/if}}">Add group</li>
                        </ul>
                    </nav>

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
