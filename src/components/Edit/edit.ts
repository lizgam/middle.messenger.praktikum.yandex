import Block from "../../core/Block";

interface EditProps {
    editText: string;
    editClick: () => void;
}

export class Edit extends Block {
    constructor({ editClick, ...props }: EditProps) {
        super({
            events: { click: editClick },
            ...props
        });
    }
    static componentName = "Edit";

    render() {
        return `
            <span class="form_edit_component" >{{ editText }}</span>
        `;
    }
}
