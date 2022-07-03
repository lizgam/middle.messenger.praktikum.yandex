import { InputProps } from "../Input";
import { ValidationRule, validateInput } from "../../utilities/validation";
import Block from "../../core/Block";

interface InputControlProps extends InputProps {
    label?: string;
    avatar?: string;
    edit?: boolean;
    value?: string;
    validationRule?: ValidationRule;
}

export class InputControl extends Block {
    static componentName = "InputControl";
    constructor({
        label,
        avatar,
        value,
        edit,
        validationRule,
        ...props
    }: InputControlProps) {
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
                {{{Input inputType=inputType name=name}}}

            {{else}}
                {{{Input
                    id=id
                    inputType=inputType
                    ref="input"
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
                {{{ Link linkClass="form_editMode" address="/editInfo" linkText="Edit"}}}
            {{/if}}
        </div>
            `;
    }
}

