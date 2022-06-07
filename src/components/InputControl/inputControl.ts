import Block from "../../core/Block";

export interface InputControlProps {
    id?: string;
    inputType?: "text" | "password" | "email" | "tel";
    name?: string;
    placeholder?: string;
    value?: string;

    onChange?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export class InputControl extends Block {
    constructor({ onChange, onFocus, onBlur, ...props }: InputControlProps) {
        super({
            events: { click: onChange, focus: onFocus, blur: onBlur },
            ...props,
        });
    }

    static componentName = "InputControl";

    protected render(): string {
        // language=hbs
        console.log("RENDER IN InputControl");
        return `
         <input id="{{id}}" type="{{inputType}}" name="{{name}}" placeholder="{{placeholder}}" value="{{value}}"/>
         `;
    }
    //or TODO deepCompare
    // componentDidUpdate(oldProps: any, newProps: any): boolean {
    //     return oldProps.prop !== newProps.prop;
    // }
}
