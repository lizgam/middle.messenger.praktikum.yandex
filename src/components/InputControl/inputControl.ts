import Block from "../../core/Block";

export interface InputControlProps {
    id?: string;
    inputType?: "text" | "password" | "email" | "tel" | "file";
    name?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;

    onChange?: () => void;
    onEnter?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class InputControl extends Block {
    constructor({
        onChange,
        onEnter,
        onFocus,
        onBlur,
        ...props
    }: InputControlProps) {
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

    static componentName = "InputControl";

    protected render(): string {
        return `
         <input
            id="{{id}}"
            type="{{inputType}}"
            name="{{name}}"
            placeholder="{{placeholder}}"
            value="{{value}}"
            {{#if disabled}} disabled {{/if}}
         />
         `;
    }
    //or TODO deepCompare
    // componentDidUpdate(oldProps: any, newProps: any): boolean {
    //     return oldProps.prop !== newProps.prop;
    // }
}
