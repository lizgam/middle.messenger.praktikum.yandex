import Block from "../../core/Block";

interface ActionClickProps {
    actionText: string;
    editClick: () => void;
}

export class ActionClick extends Block {
    constructor({ editClick, ...props }: ActionClickProps) {
        super({
            events: { click: editClick },
            ...props
        });
    }
    static componentName = "ActionClick";

    render() {
        return `
            <span class="click_action_component" >{{ actionText }}</span>
        `;
    }
}
