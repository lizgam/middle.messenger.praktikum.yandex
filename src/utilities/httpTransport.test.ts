

//jest.mock('./Block', () => BlockMock);
// import 'regenerator-runtime/runtime';
// import '@testing-library/jest-dom';
// import 'whatwg-fetch';
// import { server } from './apiMock';

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

import { setupServer } from 'msw/node'; // eslint-disable-line
import { rest } from 'msw'; // eslint-disable-line
import HTTPTransport from './httpTransport';

const endpoint = 'https://api.test.com'
//handlers that we'd like to catch in testing
const handlers = [
    rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (_req, res, ctx) => {
        console.log('Endpoint was invoked');

        return res(ctx.status(200)); //return status 200 whatever reqest should be
    }),
];

const server = setupServer(...handlers);
server.listen();

describe('utilities/httpTransport', () => {

    test('should htttpTransport object created', () => {
        const httpTestObj = new HTTPTransport(endpoint);
        expect(httpTestObj).toBeInstanceOf(HTTPTransport);

    });
    // test('should post request work', async () => {
    //     const httpTestObj = new HTTPTransport(endpoint);
    //     const response: unknown = await httpTestObj.post(endpoint);
    //     console.log("response", response);
    //     await (() =>
    //         expect((response as any).status).toEqual(200)
    //     );
    // });
});


//jest.mock('./Block', () => BlockMock);

// jest.mock('./Block',()) => {
//     return jest.fn().mockImplementation
// } ;
