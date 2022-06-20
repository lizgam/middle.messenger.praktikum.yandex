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

export class HTTPTransport {
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

        return new Promise((resolve, reject) => {
            if (!method) {
                reject("No method");
                return;
            }
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === Methods.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
