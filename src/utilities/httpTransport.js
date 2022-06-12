const METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data) {
    const str = Object.entries(data).map(([key, value]) => `${key}=${value}`);
    return `?${str.join("&")}`;
}

class HTTPTransport {
    get = (url, options = {}) => {
        const dataUrl = queryStringify(options.data);
        const getUrl = dataUrl ? `${url}${dataUrl}` : url;
        return this.request(getUrl, { ...options, method: METHODS.GET });
    };

    post = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.POST },
            options.timeout
        );
    };

    put = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.PUT },
            options.timeout
        );
    };

    delete = (url, options = {}) => {
        return this.request(
            url,
            { ...options, method: METHODS.DELETE },
            options.timeout
        );
    };

    request = (url, options = {}, timeout = 5000) => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open(method, url);

            /*Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });*/

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
