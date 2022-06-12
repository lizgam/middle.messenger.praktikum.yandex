import Block from "core/Block";

interface ChatPageProps {
    // mode: Mode; // "Profile" | "Chat" | "Addgroup"
}

export class ChatPage extends Block {
    static componentName = "ChatPage";

    constructor(props: ChatPageProps) {
        super(props);
        this.setState({
            mode: "Chat",
        });
    }

    render() {
        return `
        {{#ChatBoard  mode="${this.state.mode}"}}

        {{/ChatBoard}}
    `;
    }
}
