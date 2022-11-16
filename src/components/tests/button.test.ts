import Button from "../Button";
import renderDOM from "core/renderDOM";


describe("core/Block", () => {
    test("should render Button", () => {
        const button = new Button({

            onClick: () => {
                document.querySelector("button")!.value = "Click";
            }, btnText: "test"
        });
        expect(button).toBeInstanceOf(Button);

        document.body.innerHTML = "<div id=\"app\"></div>";
        renderDOM(button);
        expect(document.querySelector("button")).toBeInstanceOf(HTMLButtonElement);
    });

    test("should call Click after click", () => {
        const button = new Button({

            onClick: () => {
                document.querySelector("button")!.value = "Click";
            }, btnText: "test"
        });
        expect(button).toBeInstanceOf(Button);

        document.body.innerHTML = "<div id=\"app\"></div>";
        renderDOM(button);
        const buttonEl = document.querySelector("button");
        buttonEl?.click();
        expect(buttonEl?.value).toBe("Click");
        expect(buttonEl?.value).not.toBe("Clock");
    });
});
