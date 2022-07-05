import Block from "../../core/Block";

export interface MessageBoardProps {
    chatMessages?: ChatMessage[];
}

export class MessageBoard extends Block {
    static componentName = "MessageBoard";
    constructor(props: MessageBoardProps) {
        super(props);
    }

    protected render(): string {
        return `
            <div class="messages-board__messages">
            {{#each chatMessages}}
                {{{ Message message=this }}}
            {{/each}}
            </div>
         `;
    }
}
