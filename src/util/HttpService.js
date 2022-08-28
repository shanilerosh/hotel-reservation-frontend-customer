import axios from "axios";

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

const _axios = axios.create();
const baseUrl = "http://localhost:9008"
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};
const configure = () => {
    _axios.interceptors.request.use((config) => {
        const token=sessionStorage.getItem('token')
        if (token) {
            const decodedJwt = parseJwt(token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                sessionStorage.clear('token')
                window.location.href = '/sign-in'
            }
            config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
            // config.headers["Access-Control-Allow-Origin"] = "*";

            return config;

        }
    });
};


const get = (path = "") => {
    let url = baseUrl + path;
    return _axios.get(url,null,configure());
}

// const put = (path = "", payload: any) => {
//     let url = baseUrl + restVersionPath + path;
//     return _axios.put(url, payload);
// }
//
// const post = (path = "", payload: any) => {
//     let url = baseUrl + restVersionPath + path;
//     return _axios.post(url, payload);
// }
//
// const deleteOne = (path = "") => {
//     let url = baseUrl + restVersionPath + path;
//     return _axios.delete(url);
// }
// const updateStatus = (path = "") => {
//     let url = baseUrl + restVersionPath + path;
//     return _axios.put(url);
// }
const getAxiosClient = () => _axios;

const HttpService = {
    HttpMethods,
    configure,
    getAxiosClient,
    get,
    // put,
    // post,
    // deleteOne,
    // updateStatus
};


export default HttpService;