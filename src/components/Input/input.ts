import Block from "../../core/Block";

type InputProps = {
    id?: string;
    inputType?: "text" | "password" | "email" | "tel" | "file";
    name?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    acceptfile?: string;

    onChange?: () => void;
    onEnter?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class Input extends Block {
    constructor({
        onChange,
        onEnter,
        onFocus,
        onBlur,
        ...props
    }: InputProps) {
        super({
            events: {
                click: onChange,
                keyup: onEnter,
                focus: onFocus,
                blur: onBlur,
            },
            ...props,
        });
    }

    static componentName = "Input";

    protected render(): string {
        return `
         <input
            id="{{id}}"
            type="{{inputType}}"
            name="{{name}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            {{#if disabled}} disabled {{/if}}
            {{#if acceptfile}} accept="{{acceptfile}}{{/if}}"
         />
         `;
    }
}
