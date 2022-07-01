import Block from "../../core/Block";

export interface ErrorLabelProps {
    errorMsg: string;
}

export class ErrorLabel extends Block {
    static componentName = "ErrorLabel";

    protected render(): string {
        return `
            <p style="color: red;">{{errorMsg}}</p>
         `;
    }
}