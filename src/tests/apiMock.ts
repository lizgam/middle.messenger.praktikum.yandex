import { setupServer } from 'msw/node'; // eslint-disable-line
import { rest } from 'msw'; // eslint-disable-line

const handlers = [
    rest.post(`${process.env.API_ENDPOINT}/auth/logout`, (req, res, ctx) => {
        console.log('Call logout endpoind');

        return res(ctx.status(200));
    }),
];

export const server = setupServer(...handlers);
