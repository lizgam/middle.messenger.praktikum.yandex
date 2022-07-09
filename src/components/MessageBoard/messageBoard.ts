import Block from "../../core/Block";

type MessageBoardProps = {
    messages?: Chat;
    chatId: number;
    currentChatMessages?: ChatMessage[];
}

export class MessageBoard extends Block {
    static componentName = "MessageBoard";
    constructor(props: MessageBoardProps) {
        super(props);

        if (this.props.messages) {
            this.setProps({
                currentChatMessages: this.props.messages[this.props.chatId]
            });
        }
    }
    async componentDidMount() {
        document.getElementById("hidden")?.scrollIntoView();
    }

    protected render(): string {
        return `
            <div class="messages-board__messages" id="message-container">
            {{#each currentChatMessages}}
                {{{ Message message=this }}}
            {{/each}}
            <span id="hidden"></span>
            </div>
         `;
    }
}
