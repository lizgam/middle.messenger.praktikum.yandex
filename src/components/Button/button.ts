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
        console.log("RENDER IN BUTTON");
        return `
            <div class="button-block">
                <button type="button" class="button button_form">{{btn_text}}</button>
            </div>
         `;

        /*
      return this._compile(template, {...this.props})
      //spread -> менять объект новый созданный а не сам обьект props
      */
    }
    //or TODO deepCompare
    // componentDidUpdate(oldProps: any, newProps: any): boolean {
    //     return oldProps.prop !== newProps.prop;
    // }
}
