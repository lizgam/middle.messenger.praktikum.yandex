import { MessageStub } from "../../data/data";
import Block from "../../core/Block";

export interface MessageBoardProps {
    chatMessages: Message[];
}

export class MessageBoard extends Block {
    static componentName = "MessageBoard";
    constructor({ ...props }: MessageBoardProps) {
        super({
            ...props,
            chatMessages: MessageStub,
        });
    }

    protected render(): string {
        return `
            <div class="messages-board__messages">
            {{#each chatMessages}}
                {{{Message msg=this.text date=this.date userId=this.id}}}
            {{/each}}
            </div>
         `;
    }
}
