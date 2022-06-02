import Block from "./Block";
import Handlebars, { HelperOptions } from "handlebars";

interface BlockConstructable<Props = any> {
    new (props: Props): Block; //------- ??????ß
    componentName: string;
}

export default function registerComponent<Props = any>(
    Component: BlockConstructable
) {
    //console.log(">>> in RegisterComponent C:", Component);
    //console.log(">>> in RegisterComponent C.name:", Component.name);
    //console.log(">>> in RegisterComponent_C.componentName:",Component.componentName);
    Handlebars.registerHelper(
        Component.componentName,
        //hash - its parameters in Component ({{Button label="singin"}}) - label
        //data - all that was provided in to templator
        function (
            this: Props,
            { hash: { ref, ...hash }, data }: HelperOptions
        ) {
            if (!data.root.children) {
                data.root.children = {};
            }

            if (!data.root.refs) {
                data.root.refs = {};
            }

            const { children, refs } = data.root;
            console.log(">>> in RegirsterComponent: DATA.root ", data.root);

            /**
             * Костыль для того, чтобы передавать переменные
             * внутрь блоков вручную подменяя значение
             */
            // (Object.keys(hash) as any).forEach((key: keyof Props) => {
            //     if (this[key]) {
            //         hash[key] = hash[key].replace(
            //             new RegExp(`{{${key}}}`, "i"),
            //             this[key]
            //         );
            //     }
            // });

            const component = new Component(hash);
            console.log(
                ">>> in RegirsterComponent- component/it's hash:",
                component,
                hash
            );

            //rendering of the dummy
            children[component.id] = component;

            if (ref) {
                //мех-зм позволяюший обратиться к DOM elements
                console.log(">>> in RegirsterComponent- it's ref: ", ref);
                refs[ref] = component.getContent();
            }

            return `<div data-id="id-${component.id}"></div>`; //dummy
        }
    );
}
