import Router from './Router';
// import BlockClass from './Block';
// import registerComponent from './registerComponent';

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let testRouter: Router;

// class myTempBlock extends BlockClass<any> {
//     constructor(props: P = {}) {
//         super(props);
//     }

//     render(): string {
//         const tmpl = new Templator(TEMPLATE);
//         return tmpl.compile(this.props);
//     }
// }

// registerComponent(myTempBlock);


describe('core/Router', () => {
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`, { url: 'https://localhost:1234' });
    console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
    const router = new Router();;
    testRouter = router;


    // test('should register route and return itself', () => {
    //     testRouter.use("/testUrl", myTempBlock);
    //     const check = testRouter.getRoute("/testUrl");
    //     console.log(check);

    //     expect(check?.match("/testUrl")).toEqual(true);
    // });

    test('should go to particular route', () => {
        testRouter.go('/changePage1');
        testRouter.go('/changePage2');

        expect(window.history.length).toEqual(3);
        expect(window.location.pathname).toEqual('/changePage2');
    });
});

