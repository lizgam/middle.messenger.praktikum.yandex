import Block from "core/Block";

export class ChatPage extends Block {
    static componentName = "ChatPage";

    protected render() {
        return `
            {{#ChatBoard}}

            {{/ChatBoard}}
        `;
    }
}
