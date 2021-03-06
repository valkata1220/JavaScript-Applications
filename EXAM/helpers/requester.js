const requester = function () {
    const appKey = 'kid_rJh7EA7eE';
    const appSecret = '34e751508b4a4ea0b3864c3e3d72593b';
    const baseUrl = 'https://baas.kinvey.com/';

    function saveSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authtoken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        sessionStorage.setItem('username', username);
    }

    function makeAuthorisation(type) {
        return type === 'basic'
            ? 'Basic ' + btoa(`${appKey}:${appSecret}`)
            : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    function makeRequest(method, module, endpoint, auth) {
        return request = {
            method,
            url: `${baseUrl}${module}/${appKey}/${endpoint}`,
            headers: {
                'Authorization': makeAuthorisation(auth)
            }
        };
    }

    function get(module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    function post(module, endpoint, auth, data) {
        let request = makeRequest('POST', module, endpoint, auth);
        request.data = data;
        return $.ajax(request);
    }

    function update(module, endpoint, auth, data) {
        let request = makeRequest('PUT', module, endpoint, auth);
        request.data = data;
        return $.ajax(request);
    }

    function remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }

    return {
        get,
        post,
        update,
        remove,
        saveSession
    };
}();