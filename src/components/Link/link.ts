import Block from "../../core/Block";

type LinkProps = {
    linkText: string;
    address: string;
}

export class Link extends Block {
    static componentName = "Link";
    constructor(props: LinkProps) {
        const onClick = (e: MouseEvent) => {
            window.router.go(this.props.address);
            e.preventDefault();
        };
        super({ events: { click: onClick }, ...props });
    }

    render() {
        return `
        <a href="{{address}}"> {{ linkText }}</a>
        `;
    }
}
