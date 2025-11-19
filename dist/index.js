import axios from 'axios';
import { encryptMessageWithMeta, decryptMessageWithMeta } from 'unsea';
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
    fetch: {
        get: fetchGet,
        post: fetchPost,
        put: fetchPut,
        patch: fetchPatch,
        delete: fetchDel,
    },
    fetchJSON: {
        get: fetchJSONGet,
        post: fetchJSONPost,
        put: fetchJSONPut,
        patch: fetchJSONPatch,
        delete: fetchJSONDel,
    },
    postEncrypted,
    putEncrypted,
    patchEncrypted,
    secure,
};
export default simple;
export { default as axios } from 'axios';
export { generateRandomPair, signMessage, verifyMessage, encryptMessageWithMeta, decryptMessageWithMeta, exportToPEM, importFromPEM, exportToJWK, importFromJWK, saveKeys, loadKeys, clearKeys, generateWork, verifyWork, generateSignedWork, verifySignedWork, getSecurityInfo, } from "unsea";
function asText(input) {
    return typeof input === 'string' ? input : JSON.stringify(input);
}
function fetchGet(url, init) {
    return () => fetch(url, { method: 'GET', ...(init || {}) });
}
function fetchPost(url, init) {
    return (payload) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
}
function fetchPut(url, init) {
    return (payload) => fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
}
function fetchPatch(url, init) {
    return (payload) => fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
}
function fetchDel(url, init) {
    return () => fetch(url, { method: 'DELETE', ...(init || {}) });
}
function fetchJSONGet(url, init) {
    return async () => {
        const res = await fetch(url, { method: 'GET', ...(init || {}) });
        return res.json();
    };
}
function fetchJSONPost(url, init) {
    return async (payload) => {
        const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
        return res.json();
    };
}
function fetchJSONPut(url, init) {
    return async (payload) => {
        const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
        return res.json();
    };
}
function fetchJSONPatch(url, init) {
    return async (payload) => {
        const res = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
        return res.json();
    };
}
function fetchJSONDel(url, init) {
    return async () => {
        const res = await fetch(url, { method: 'DELETE', ...(init || {}) });
        return res.json();
    };
}
function postEncrypted(url, keys, config) {
    return async (payload) => {
        const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
        return axios.post(url, encrypted, config);
    };
}
function putEncrypted(url, keys, config) {
    return async (payload) => {
        const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
        return axios.put(url, encrypted, config);
    };
}
function patchEncrypted(url, keys, config) {
    return async (payload) => {
        const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
        return axios.patch(url, encrypted, config);
    };
}
function secure(keys) {
    return {
        post(url, config) {
            return async (payload) => {
                const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                return axios.post(url, encrypted, config);
            };
        },
        put(url, config) {
            return async (payload) => {
                const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                return axios.put(url, encrypted, config);
            };
        },
        patch(url, config) {
            return async (payload) => {
                const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                return axios.patch(url, encrypted, config);
            };
        },
        fetch: {
            post(url, init) {
                return async (payload) => {
                    const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) });
                    return res.json();
                };
            },
            put(url, init) {
                return async (payload) => {
                    const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                    const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) });
                    return res.json();
                };
            },
            patch(url, init) {
                return async (payload) => {
                    const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                    const res = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) });
                    return res.json();
                };
            },
            expectDecrypted(epriv) {
                return {
                    post(url, init) {
                        return async (payload) => {
                            const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                            const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) });
                            const cipher = await res.json();
                            const plain = await decryptMessageWithMeta(cipher, epriv);
                            try {
                                return JSON.parse(plain);
                            }
                            catch {
                                return plain;
                            }
                        };
                    },
                };
            }
        },
        expectDecrypted(epriv) {
            return {
                post(url, config) {
                    return async (payload) => {
                        const encrypted = await encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
                        const resp = await axios.post(url, encrypted, config);
                        const plain = await decryptMessageWithMeta(resp.data, epriv);
                        try {
                            resp.data = JSON.parse(plain);
                        }
                        catch {
                            resp.data = plain;
                        }
                        return resp;
                    };
                },
            };
        },
    };
}
async function unseaEncrypt(payload, keys) {
    return encryptMessageWithMeta(asText(payload), { epub: keys.receiverPublicKey });
}
async function unseaDecrypt(cipher, opts) {
    return decryptMessageWithMeta(cipher, opts.receiver.epriv);
}
export const crypto = {
    encrypt: unseaEncrypt,
    decrypt: unseaDecrypt,
};
function expectDecrypted(epriv) {
    return {
        fetchJSON: {
            get(url, init) {
                return async () => {
                    const res = await fetch(url, { method: 'GET', ...(init || {}) });
                    const cipher = await res.json();
                    const plain = await decryptMessageWithMeta(cipher, epriv);
                    try {
                        return JSON.parse(plain);
                    }
                    catch {
                        return plain;
                    }
                };
            },
            post(url, init) {
                return async (payload) => {
                    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) });
                    const cipher = await res.json();
                    const plain = await decryptMessageWithMeta(cipher, epriv);
                    try {
                        return JSON.parse(plain);
                    }
                    catch {
                        return plain;
                    }
                };
            },
        },
    };
}
export const secureResponse = {
    expectDecrypted,
};
