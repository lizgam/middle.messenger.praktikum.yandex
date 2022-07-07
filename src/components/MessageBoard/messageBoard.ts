import Block from "../../core/Block";

export interface MessageBoardProps {
    chatMessages?: ChatMessage[];
}

export class MessageBoard extends Block {
    static componentName = "MessageBoard";
    constructor(props: MessageBoardProps) {
        super(props);
    }
    async componentDidMount() {
        document.getElementById("hidden")?.scrollIntoView();
    }

    protected render(): string {

        return `
            <div class="messages-board__messages" id="message-container">
            {{#each chatMessages}}
                {{{ Message message=this }}}
            {{/each}}
            <span id="hidden"></span>
            </div>
         `;
    }
}
