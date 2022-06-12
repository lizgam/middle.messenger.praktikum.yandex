function fetchWithRetry(url, options = {}, tries = 1) {
    console.log("arg: ", arguments);
    console.log("tries: ", tries);
    let count = tries;

    //const { tries = 3 } = options;

    function errorCallback(err) {
        count = tries - 1;
        if (count <= 0) {
            throw err;
        }

        return fetchWithRetry(url, options, (tries = count));
    }

    return fetch(url, options).catch(errorCallback);
}

//console.log(fetchWithRetry('http://chats', { data: { a: 1, b: 2 } }, 3));
