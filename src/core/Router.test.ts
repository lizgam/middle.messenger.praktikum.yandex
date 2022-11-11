import Router from './Router';
import BlockClass from './Block';
import registerComponent from './registerComponent';


class myTempBlock extends BlockClass<any> { }

registerComponent(myTempBlock);


describe('core/Router', () => {
    const testRouter = new Router();

    test('should register route', () => {
        testRouter.use("/testUrl", myTempBlock);
        const check = testRouter.getRoute("/testUrl");

        expect(check?.match("/testUrl")).toEqual(true);
    });

    test('should go to the route and push it to history', () => {
        testRouter.go('/changePage1');
        testRouter.go('/changePage2');

        expect(window.history.length).toEqual(3);
        expect(window.location.pathname).toEqual('/changePage2');
    });

    test("should work with history back function", () => {
        const methodMock = jest.spyOn(window.history, "back");
        testRouter.back();

        expect(methodMock).toHaveBeenCalled();
    });
});

