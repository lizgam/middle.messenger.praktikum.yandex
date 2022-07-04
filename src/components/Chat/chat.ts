import { SelectedUserStub } from "../../data/data";
import Block from "../../core/Block";

interface ChatProps {
    // messagedUserInfo: CardInfo;
}

export class Chat extends Block<ChatProps> {
    static componentName = "Chat";
    constructor(props: ChatProps) {
        super({
            ...props,
            // messagedUserInfo: SelectedUserStub,
        });
    }

    render() {
        return `
            <article class="messages-board">
                {{#if messagedUserInfo}}
                    <div class="messages-board__info-block">
                        <div class="item__selected">{{messagedUserInfo.name}}
                            <span class="icon-info">&#x2630;</span>
                        </div>
                    </div>
                    {{{ MessageBoard }}}
                {{/if }}

                <div class="chat-section__input">
                    {{{ InputControl name="message" id="message" ref="message" onEnter=onEnter placeholderMsg="Enter message" inputType="text"}}}
                </div>
            </article>

        `;
    }
}
