import { InputControlProps } from "../InputControl";
import Block from "../../core/Block";

interface InputProps extends InputControlProps {
    label?: string;
    error?: string;
    edit?: boolean;
}

export class Input extends Block {
    constructor({ label, error, edit, ...props }: InputProps) {
        super({
            ...props,
            label,
            error,
            edit,
            // onChange: (e: InputEvent) => {
            //     const input = e.target as HTMLInputElement;
            //     const value = input.value;
            //     console.log("onChange");
            // },
            onFocus: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                console.log("focus");
            },
            onBlur: (e: FocusEvent) => {
                const input = e.target as HTMLInputElement;
                const value = input.value;
                console.log("blur");
                // debugger;
                // const newState = {
                //     errors: {
                //         login: "test error",
                //         password: "",
                //     },
                // };
                // console.log("blur, this.state", this.state);

                // this.setState(newState);
                // console.log("blur, this.state", this.state);
            },
        });
    }
    static componentName = "Input";

    protected render(): string {
        //make an input as a separate block - {{{InputControl}}} - to add events for this
        //OR change eventSystem (in class examples - adding events only for firstChildElement)
        console.log("ReNDER IN INPUT");

        return `
        <div class="form_input" class="{{name}}">
            {{#if label}}
                <label for="{{name}}" class="input_label">{{label}}</label>
            {{/if}}

            {{#if avatar}}
                {{{InputControl inputType=inputType name=name}}}

            {{else}}
                {{{InputControl id=id inputType=inputType name=name placeholder=placeholder
                    value=value onChange=onChange onFocus=onFocus onBlur=onBlur}}}

            {{/if}}

            <div class="input__error">
                {{#if error}}{{error}}{{/if}}
            </div>

            {{#if edit}}
                <span class="form_editMode">Edit</span>
            {{/if}}
        </div>
            `;
    }
}
