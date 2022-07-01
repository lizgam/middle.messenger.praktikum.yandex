import Block from "../../core/Block";

interface NavigationProps {
    mode: string;
    onClick: () => void;
}

export class Navigation extends Block {
    constructor({ onClick, ...props }: NavigationProps) {
        super({
            events: { click: onClick },
            ...props,
            isProfile: props.mode === "Profile",
            isChat: props.mode === "Chat",
            isAddgroup: props.mode === "Addgroup",
        });
    }

    static componentName = "Navigation";
    // hide(): void {
    //     this.getContent().style.display = "block";
    // }

    protected render(): string {
        return `
            <nav class="main-board__navigation">
                <ul class="main-board__nav-list">
                    <li class="{{#if isProfile}} active-mode{{/if}}" name="Profile">My profile</li>
                    <li class="{{#if isChat}} active-mode{{/if}}" name="Chat">Chat</li>
                    <li class="{{#if isAddgroup}} active-mode{{/if}}" name="Addgroup">Add group</li>
                </ul>
            </nav>
         `;
    }
}
