import Block from "../../core/Block";

interface ButtonProps {
    btnText: string;
    onClick: () => void;
}

export class Button extends Block {
    constructor({ onClick, ...props }: ButtonProps) {
        super({ events: { click: onClick }, ...props });
    }

    static componentName = "Button";

    protected render(): string {
        return `
            <div class="button-block">
                <button type="button" class="button button_form {{#if passive}}{{passive}}{{/if}}">{{btnText}}</button>
            </div>
         `;
    }
}
