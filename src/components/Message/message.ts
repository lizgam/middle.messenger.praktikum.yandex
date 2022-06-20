import Block from "../../core/Block";

export interface MessageProps {
    msg: string;
    date: string;
    userId: number;
    hostId: number;
}

export class Message extends Block<MessageProps> {
    static componentName = "Message";
    constructor({ ...props }: MessageProps) {
        super({
            ...props,
            hostId: 1010, //temp stub data
        });
    }

    protected render(): string {
        const hostId = this.props.userId == this.props.hostId;
        return `
            <div class="message {{#if ${hostId} }}host-msg{{/if}}">
                <p class="message-text">{{msg}}</p>
                <span class="message-time">{{date}}</span>
            </div>
         `;
    }
}
