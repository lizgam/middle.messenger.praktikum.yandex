import Block from "../../core/Block";

export class Navigation extends Block {
    static componentName = "Navigation";

    protected render(): string {
        return `
            <nav class="main-board__navigation">
                <ul class="main-board__nav-list">
                    <li name="Profile">
                        {{{Link
                        address="/profile"
                        linkText="Profile"}}}
                    </li>
                    <li name="Addchat">
                        {{{Link
                        address="/createChat"
                        linkText="Add chat"}}}
                    </li>
                </ul>
            </nav>
         `;
    }
}
