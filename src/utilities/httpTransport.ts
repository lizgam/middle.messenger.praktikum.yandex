const enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}
interface RequestOptions {
    headers?: { [key: string]: string };
    timeout?: number;
    method?: Methods;
    data?: any;
}

function queryStringify(data: any = {}) {
    if (typeof data !== "object") {
        throw new Error("Data must be object");
    }
    const str = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    return `?${str.join("&")}`;
}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    get = (url: string, options: RequestOptions = {}) => {
        const dataUrl = queryStringify(options.data);
        const getUrl = dataUrl ? `${url}${dataUrl}` : url;
        return this.request(getUrl, { ...options, method: Methods.GET });
    };

    post = (url: string, options: RequestOptions = {}) => {
        return this.request(
            url,
            { ...options, method: Methods.POST },
            options.timeout
        );
    };

    put = (url: string, options: RequestOptions = {}) => {
        return this.request(
            url,
            { ...options, method: Methods.PUT },
            options.timeout
        );
    };

    delete = (url: string, options: RequestOptions = {}) => {
        return this.request(
            url,
            { ...options, method: Methods.DELETE },
            options.timeout
        );
    };

    request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
        const { method, data, headers = {} } = options;

        const nomilizedUrl = `${HTTPTransport.API_URL}${this.prefix}${url}`


        return new Promise((resolve, reject) => {
            if (!method) {
                reject("No method");
                return;
            }
            const req = new XMLHttpRequest();
            req.responseType = 'json';

            req.open(method, nomilizedUrl);

            Object.keys(headers).forEach((key) => {
                req.setRequestHeader(key, headers[key]);
            });

            req.onload = function () {
                const responsonseData = req.response;
                if (req.status === 200 || (req.status >= 400 && req.status < 500)) {
                    resolve(responsonseData);
                } else {
                    reject(responsonseData);
                }
            };

            req.onabort = reject;
            req.onerror = reject;
            req.timeout = timeout;
            req.ontimeout = reject;
            req.withCredentials = true;

            if (method === Methods.GET || !data) {
                req.send();
            } else {
                req.send(JSON.stringify(data));
            }
        });
    };
}
