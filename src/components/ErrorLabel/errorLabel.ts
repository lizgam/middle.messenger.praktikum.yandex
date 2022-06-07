import Block from "../../core/Block";

export interface ErrorLabelProps {
    errorMsg: string;
}

export class ErrorLabel extends Block {
    static componentName = "ErrorLabel";

    protected render(): string {
        console.log("RENDER IN ErrorMsg");
        return `
            <span>{{errorMsg}}</span>
         `;
    }
}
