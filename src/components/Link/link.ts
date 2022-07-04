import Block from "../../core/Block";

interface LinkProps {
    linkText: string;
    address: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        const onClick = (e: MouseEvent) => {
            console.log("go to:", this.props.address);
            window.router.go(this.props.address);
            e.preventDefault();
        };

        super({ ...props, events: { click: onClick } });
    }
    static componentName = "Link";

    render() {
        return `
        <a href="{{address}}"> {{ linkText }}</a>
        `;
    }
}
