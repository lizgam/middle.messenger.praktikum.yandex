import Block from "../../core/Block";

interface LinkProps {
    linkText: string;
    address: string;
    linkClass?: string;
    editClick?: () => void;
    events?: Record<string, unknown>;
}

export class Link extends Block<LinkProps> {
    static componentName = "Link";
    constructor({ editClick, ...props }: LinkProps) {
        super({
            events: { click: editClick },
            ...props,
        });
        // onClick: (e: MouseEvent) => {
        //     console.log("clicked on link", props.address);
        //     document.location.pathname = props.address;
        //     e.preventDefault();
        // },
    }


    protected render() {
        return `
        <a class="{{linkClass}}" href="{{address}}"> {{ linkText }}</a>
        `;
    }
}
