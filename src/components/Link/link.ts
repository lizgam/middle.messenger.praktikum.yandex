import Block from "../../core/Block";

interface LinkProps {
    linkText: string;
    address: string;
}

export class Link extends Block {
    constructor(props: LinkProps) {
        super({
            ...props,
            onClick: (e: MouseEvent) => {
                console.log("clicked on link", props.address);
                document.location.pathname = props.address;
                e.preventDefault();
            },
        });
    }
    static componentName = "Link";

    render() {
        return `
        <a href="{{address}}"> {{ linkText }}</a>
        `;
    }
}
