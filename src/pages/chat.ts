import Block from "core/Block";

type ChatPageProps = {
    mode?: Mode;
};

export class ChatPage extends Block<ChatPageProps> {
    static componentName = "ChatPage";

    constructor(props: ChatPageProps) {
        super({ ...props });
        //console.log("MODE", this.props.mode);
        // this.setProps({
        //     onLogout: () => this.props.store.dispatch(logout),
        // });
    }

    render() {
        const staticData = {
            mode: "Addgroup", // "Profile" | "Chat" | "Addgroup"
        };
        return `
        {{#ChatBoard mode="${staticData.mode}" }}

        {{/ChatBoard}}
    `;
    }
}
