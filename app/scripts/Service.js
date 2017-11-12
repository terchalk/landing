const axios = require('axios');

const API_PREFIX = '/app/api/';

const HTTP_VERBS = {
    post: 'post',
    get: 'get',
    put: 'put',
    delete: 'delete',
    deleteWithData: 'delete_with_data',
    getWithData: 'get_with_data'
};

function callAPI(url, type, data, isForm, isJson) {
    const prefix = API_PREFIX;
    const headers = {};

    if (isJson) {
        headers['Content-Type'] = 'application/json';
    } else if (isForm) {
        headers['Content-Type'] = 'multipart/form-data;';
    } else {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    let request = null;
    if (type === HTTP_VERBS.post) {
        request = axios.post(prefix + url, data, { headers });
    } else if (type === HTTP_VERBS.put) {
        request = axios.put(prefix + url, data, { headers });
    } else if (type === HTTP_VERBS.delete) {
        request = axios.delete(prefix + url, { headers });
    } else if (type === HTTP_VERBS.get) {
        request = axios.get(prefix + url, { headers });
    } else if (type === HTTP_VERBS.getWithData) {
        request = axios.get(prefix + url, { params: data }, { headers });
    } else if (type === HTTP_VERBS.deleteWithData) {
        request = axios.delete(prefix + url, { data }, { headers });
    }
    // disable new relic;
    return request;
}

function callExternalAPI(url, type, data, isForm, isJson) {
    let request = null;
    if (type === HTTP_VERBS.post) {
        request = axios.post(url, data);
    } else if (type === HTTP_VERBS.put) {
        request = axios.put(url, data);
    } else if (type === HTTP_VERBS.delete) {
        request = axios.delete(url, data);
    } else if (type === HTTP_VERBS.get) {
        request = axios.get(url);
    }
    // disable new relic;
    return request;
}

const Service = {
  userLogin(email, password) {
    const data = '';
    return callAPI('stub', HTTP_VERBS.post, { email, password }, false, true, false);
  }
};

export default Service;
