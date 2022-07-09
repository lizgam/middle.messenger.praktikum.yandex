import Block from "../../core/Block";

type MessageProps = {
    message: ChatMessage;
}

export class Message extends Block<MessageProps> {
    constructor(props: MessageProps) {
        super(props);
    }
    static componentName = "Message";

    async componentDidMount() {
        document.getElementById("message")?.focus();
    }

    protected render(): string {
        return `
            <div class="message {{#if ${this.props.message.isHost} }}host-msg{{/if}}">
                <p class="message-text">{{message.content}}</p>
                <span class="message-time">{{message.time}}</span>
            </div>
         `;
    }
}
