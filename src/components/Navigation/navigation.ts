import Block from "../../core/Block";

interface NavigationProps {
    mode: string;
    onClick: () => void;
}

export class Navigation extends Block {
    constructor({ onClick, ...props }: NavigationProps) {
        super({
            ...props,
            events: { click: onClick },
        });
    }

    static componentName = "Navigation";

    protected render(): string {
        return `
            <nav class="main-board__navigation">
                <ul class="main-board__nav-list" onClick=setMode>
                    <li class="{{#if profile_mode}}active-mode{{/if}}">My profile</li>
                    <li class="{{#if chat_mode}}active-mode{{/if}}">Chat</li>
                    <li class="{{#if addgroup_mode}}active-mode{{/if}}">Add group</li>
                </ul>
            </nav>
         `;
    }
}
