import Block from "../../core/Block";

type ErrorLabelProps = {
    errorMsg: string;
}

export class ErrorLabel extends Block<ErrorLabelProps> {
    static componentName = "ErrorLabel";

    protected render(): string {
        return `
            <p style="color: red;">{{errorMsg}}</p>
         `;
    }
}
