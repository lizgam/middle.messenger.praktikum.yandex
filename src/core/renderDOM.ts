import Block from "./Block";

export default function renderDOM(BlockPage: typeof Block) {
    const block = new BlockPage();

    const root = document.querySelector("#app");

    root!.innerHTML = "";
    const renderedBlock = block.getContent();
    console.log("+++renderedBlock++++++", renderedBlock);

    root!.appendChild(renderedBlock);
    block.dispatchComponentDidMount(); //must be вызoв после того как компонент появился в дереве DOM
}
