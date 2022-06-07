import { InputControlProps } from "../InputControl";
import { ValidationRule, validateInput } from "../../utilities/validation";
import Block from "../../core/Block";

interface InputProps extends InputControlProps {
    label?: string;
    avatar?: Blob;
    edit?: boolean;
    validationRule?: ValidationRule;
}

export class Input extends Block {
    constructor({ label, edit, validationRule, ...props }: InputProps) {
        super({
            ...props,
            label,
            edit,
            validationRule,
            // onChange: (e: InputEvent) => {
            //     const input = e.target as HTMLInputElement;
            //     const value = input.value;
            //     console.log("onChange");
            // },
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                console.log("focus");
                this.refs.error.setProps({ errorMsg: "" });
                console.log("cleared");
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                console.log("blur. validationRule", validationRule);

                if (validationRule) {
                    const errorMsg = validateInput(validationRule, value);
                    console.log("********this.refs", this.refs);
                    this.refs.error.setProps({ errorMsg: errorMsg });
                }
                console.log("onBlur val", value);
            },
        });
    }
    static componentName = "Input";
    // protected getStateFromProps() {
    //     console.log("input getStateFromProps");
    //     console.log("this.id", this.id);
    //     this.state = {
    //         values: {
    //             login: "abc",
    //             password: "67",
    //         },
    //         errors: {
    //             login: "test",
    //             errorMsg: "cool test",
    //         },
    //         onBlur: (e: FocusEvent) => {
    //             const input = e.target as HTMLInputElement;
    //             const value = input.value;
    //             console.log("blur");
    //             const result = "Error finale";
    //             const newState = {
    //                 errors: {
    //                     errorMsg: result,
    //                 },
    //             };
    //             debugger;
    //             console.log("blur, this.state", this.state);

    //             this.setState(newState);
    //             console.log("blur, this.state", this.state);
    //         },
    //     };
    // }

    protected render(): string {
        //make an input as a separate block - {{{InputControl}}} - to add events for this
        //OR change eventSystem (in class examples - adding events only for firstChildElement)
        console.log("ReNDER IN INPUT");
        //const { errors, values } = this.state;
        return `
        <div class="form_input" class="{{name}}">
            {{#if label}}
                <label for="{{name}}" class="input_label">{{label}}</label>
            {{/if}}

            {{#if avatar}}
                {{{InputControl inputType=inputType name=name}}}

            {{else}}
                {{{InputControl id=id inputType=inputType ref=ref name=name placeholder=placeholder
                 onChange=onChange onFocus=onFocus onBlur=onBlur}}}

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
