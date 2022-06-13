import Block from "../../core/Block";

interface ButtonProps {
    btn_text: string;
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
                <button type="button" class="button button_form {{#if passive}}{{passive}}{{/if}}">{{btn_text}}</button>
            </div>
         `;
    }
}
