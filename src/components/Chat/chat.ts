import Block from "../../core/Block";
import { sendMessage } from "services/chats";

interface ChatProps {
    selectedCard?: CardInfo | null;
    addUserClick: () => void;
    removeUserClick: () => void;
    onCancelClick: () => void;
    messages?: ChatMessage[] | null;
    chatId: number;
    onSendMessage?: (e: Event) => void;
    showAddDialog: boolean;
    showRemoveDialog: boolean;
}

export class Chat extends Block<ChatProps> {
    static componentName = "Chat";
    constructor(props: ChatProps) {
        super({
            ...props,
            addUserClick: () => {
                this.props.showRemoveDialog = false;
                this.props.showAddDialog = true;
            },
            onCancelClick: () => {
                this.props.showAddDialog = false;
                this.props.showRemoveDialog = false;
            },
            removeUserClick: () => {
                this.props.showAddDialog = false;
                this.props.showRemoveDialog = true;
            },
        });

        this.setProps({
            onSendMessage: (e: Event) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                if ((e as KeyboardEvent).key === "Enter" && value) {
                    input.value = "";
                    if (this.props.selectedCard) {
                        sendMessage(this.props.selectedCard.id, value);
                    }
                }
            },
        });
    }

    render() {
        return `
            <article class="messages-board">
                {{#if selectedCard}}
                    <div class="messages-board__info-block">
                        <div class="">{{selectedCard.title}}
                        <span class="icon-info">&#x2630;</span>
                            <span class="action action__top">
                                {{{ActionClick actionText="add" editClick=addUserClick}}}
                            </span>
                            <span class="action action__bottom">
                                {{{ActionClick actionText="remove" editClick=removeUserClick}}}
                            </span>
                        </div>
                        {{#if showAddDialog}}
                            {{{Dialog userId=userId chatId=selectedCard.id
                                onAction=addUserClick onCancel=onCancelClick
                            }}}
                        {{/if}}
                        {{#if showRemoveDialog}}
                            {{{Dialog userId=userId chatId=selectedCard.id remove=true
                                onAction=removeUserClick onCancel=onCancelClick
                            }}}
                        {{/if}}
                    </div>
                    {{{ MessageBoard chatMessages=messages}}}
                {{/if }}

                <div class="chat-section__input">
                    {{{ InputControl name="message" id="message" ref="message"
                    onEnter=onSendMessage placeholderMsg="Enter message" inputType="text"}}}
                </div>
            </article>

        `;
    }
}
