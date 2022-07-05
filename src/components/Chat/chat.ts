import Block from "../../core/Block";
import { sendMessage } from "services/chats";

interface ChatProps {
    selectedCard?: CardInfo | null;
    addUserClick: () => void;
    deleteUserClick: () => void;
    messages?: ChatMessage[] | null;
    chatId: number;
    onSendMessage?: (e: Event) => void;
}

export class Chat extends Block<ChatProps> {
    static componentName = "Chat";
    constructor(props: ChatProps) {
        super({
            ...props,
            addUserClick: () => {
                // this.props.store.dispatch({ isEditAvatar: true });
                console.log("TOP");
                window.router.go("/editInfo/avatar");
            },
            deleteUserClick: () => {
                // this.props.store.dispatch({ isEditAvatar: true });
                console.log("BOTTOM");
                window.router.go("/editInfo/avatar");
            },
        });

        this.setProps({
            onSendMessage: (e: Event) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                if (e.key === "Enter" && value) {
                    input.value = "";
                    if (this.props.selectedCard) {
                        sendMessage(this.props.selectedCard.id, value);
                    }
                }
            },
        });
    }

    render() {
        const addClick = " &#x2265;";
        const removeClick = "&#x2295;"
        return `
            <article class="messages-board">
                {{#if selectedCard}}
                    <div class="messages-board__info-block">
                        <div class="item__selected">{{selectedCard.title}}
                            <span class="action action__top">
                                {{{ActionClick actionText="add" editClick=addUserClick}}}
                            </span>
                            <span class="action action__bottom">
                                {{{ActionClick actionText="remove" editClick=removeUserClick}}}
                            </span>
                        </div>
                    </div>
                    {{{ MessageBoard chatMessages=messages}}}
                {{/if }}

                <div class="chat-section__input">
                    {{{ InputControl name="message" id="message" ref="message" onEnter=onSendMessage placeholderMsg="Enter message" inputType="text"}}}
                </div>
            </article>

        `;
    }
}
