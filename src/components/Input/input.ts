import { InputControlProps } from "../InputControl";
import { ValidationRule, validateInput } from "../../utilities/validation";
import Block from "../../core/Block";

interface InputProps extends InputControlProps {
    label?: string;
    avatar?: string;
    edit?: boolean;
    value?: string;
    validationRule?: ValidationRule;
}

export class Input extends Block {
    static componentName = "Input";
    constructor({
        label,
        avatar,
        value,
        edit,
        validationRule,
        ...props
    }: InputProps) {
        super({
            ...props,
            label,
            avatar,
            edit,
            value,
            validationRule,
            onChange: (e: Event) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
            },
            onEnter: (e: KeyboardEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                if (e.key === "Enter" && value) {
                    input.value = "";
                    console.log("Entered Message: ", value);
                }
            },
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                this.refs.error.setProps({ errorMsg: "" });
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;

                if (validationRule) {
                    const errorMsg = validateInput(validationRule, value);
                    this.refs.error.setProps({ errorMsg: errorMsg });
                }
            },
        });
    }

    protected render(): string {
        return `
        <div class="form_input" class="{{name}}">
            {{#if label}}
                <label for="{{name}}" class="input_label">{{label}}</label>
            {{/if}}

            {{#if avatar}}
                {{{InputControl inputType=inputType name=name}}}

            {{else}}
                {{{InputControl
                    id=id
                    inputType=inputType
                    ref=ref
                    name=name
                    placeholder=placeholder
                    value=value
                    onChange=onChange
                    onFocus=onFocus
                    onBlur=onBlur
                    onEnter=onEnter
                    disabled=disabled}}}

            {{/if}}

            <div class="input__error">
                {{{ErrorLabel ref="error"}}}
            </div>

            {{#if edit}}
                <span class="form_editMode">Edit</span>
            {{/if}}
        </div>
            `;
    }
}
