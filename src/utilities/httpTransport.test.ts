import { setupServer } from 'msw/node'; // eslint-disable-line
import { rest } from 'msw'; // eslint-disable-line
import HTTPTransport from './httpTransport';

const endpoint = 'api.com';
const url = `${endpoint}/`;
const handlers = [
    rest.post('http://localhost/undefined/test/api.com/', (_req, res, ctx) => {
        console.log('Endpoint was INVOKED');

        return res(ctx.status(200)); //return status 200 whatever reqest should be
    }),
];

const server = setupServer(...handlers);

describe('utilities/httpTransport', () => {

    test('should htttpTransport object created', () => {
        const httpTestObj = new HTTPTransport(endpoint);
        expect(httpTestObj).toBeInstanceOf(HTTPTransport);

    });

    test('should post request work', async () => {
        server.listen();
        const httpTestObj = new HTTPTransport("/test/");
        const response = httpTestObj.post(url, { data: 'data', headers: { "Content-Type": "application/json" } });
        await (() =>
            expect((response as any).status).toEqual(200)
        );
        server.resetHandlers();
        server.close();
    });
});
