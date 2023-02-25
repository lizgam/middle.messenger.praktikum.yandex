import { setupServer } from 'msw/node'; // eslint-disable-line
import { rest } from 'msw'; // eslint-disable-line
import HTTPTransport from "./httpTransport";

const prefix = "/api";

const handlers = [
    rest.post(`${process.env.API_ENDPOINT}${prefix}/test`, (_req, res, ctx) => {
        console.log("Endpoint was INVOKED");

        return res(ctx.status(200)); //return status 200 whatever reqest should be
    }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("utilities/httpTransport", () => {

    test("should htttpTransport object created", () => {
        const httpTestObj = new HTTPTransport(prefix);
        expect(httpTestObj).toBeInstanceOf(HTTPTransport);

    });

    test("should post request work", async () => {
        const httpTestObj = new HTTPTransport(prefix);
        const response = httpTestObj.post("/test", { data: "data" });
        await (() =>
            expect((response as any).status).toEqual(200)
        );
    });
});
