import Block from "core/Block";
import { withStore, withRouter } from 'utilities';


export class ChatPage extends Block {
    static componentName = "ChatPage";

    protected render() {
        return `
            {{#ChatBoard}}

            {{/ChatBoard}}
        `;
    }
}

export default withRouter(withStore(ChatPage));
