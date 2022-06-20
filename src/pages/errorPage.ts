import Block from "../core/Block";

export class ErrorPage extends Block {
    protected render() {
        const staticData = {
            pageName: "404",
            errorTitle: "We cannot find the requested page",
            href: "#login",
            linkText: "Back to Login Page",
        };
        return `
            <section class="fail-section">
                <h1 class="fail-msg">${staticData.pageName}</h1>
                <h3 class="fail-msg">${staticData.errorTitle}</h3>
                {{{ Link
                    address="${staticData.href}"
                    linkText="${staticData.linkText}"
                }}}
            </section>
        `;
    }
}
