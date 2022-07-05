import Block from "./Block";

export default function renderDOM(block: Block) {
    // console.log('enter renderDOM');
    const root = document.querySelector("#app");

    root!.innerHTML = "";
    const renderedBlock = block.getContent();

    root!.appendChild(renderedBlock);
}
