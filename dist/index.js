import axios from 'axios';
function get(url, config) {
    return () => axios.get(url, config);
}
function post(url, config) {
    return (payload) => axios.post(url, payload, config);
}
function put(url, config) {
    return (payload) => axios.put(url, payload, config);
}
function patch(url, config) {
    return (payload) => axios.patch(url, payload, config);
}
function del(url, config) {
    return () => axios.delete(url, config);
}
export const simple = {
    get,
    post,
    put,
    patch,
    delete: del,
};
export default simple;
