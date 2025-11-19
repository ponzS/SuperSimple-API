import { AxiosRequestConfig, AxiosResponse } from 'axios';
type CurriedRequest<TReq, TResp> = (payload: TReq) => Promise<AxiosResponse<TResp>>;
declare function get<TResp = unknown>(url: string, config?: AxiosRequestConfig): () => Promise<AxiosResponse<TResp>>;
declare function post<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
declare function put<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
declare function patch<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
declare function del<TResp = unknown>(url: string, config?: AxiosRequestConfig): () => Promise<AxiosResponse<TResp>>;
export declare const simple: {
    get: typeof get;
    post: typeof post;
    put: typeof put;
    patch: typeof patch;
    delete: typeof del;
    fetch: {
        get: typeof fetchGet;
        post: typeof fetchPost;
        put: typeof fetchPut;
        patch: typeof fetchPatch;
        delete: typeof fetchDel;
    };
    fetchJSON: {
        get: typeof fetchJSONGet;
        post: typeof fetchJSONPost;
        put: typeof fetchJSONPut;
        patch: typeof fetchJSONPatch;
        delete: typeof fetchJSONDel;
    };
    postEncrypted: typeof postEncrypted;
    putEncrypted: typeof putEncrypted;
    patchEncrypted: typeof patchEncrypted;
    secure: typeof secure;
};
export default simple;
export { default as axios } from 'axios';
export { generateRandomPair, signMessage, verifyMessage, encryptMessageWithMeta, decryptMessageWithMeta, exportToPEM, importFromPEM, exportToJWK, importFromJWK, saveKeys, loadKeys, clearKeys, generateWork, verifyWork, generateSignedWork, verifySignedWork, getSecurityInfo, } from "unsea";
type CurriedFetch<TReq, TResp> = (payload?: TReq) => Promise<TResp>;
declare function fetchGet(url: string, init?: any): () => Promise<any>;
declare function fetchPost<TReq = unknown>(url: string, init?: any): (payload: TReq) => Promise<any>;
declare function fetchPut<TReq = unknown>(url: string, init?: any): (payload: TReq) => Promise<any>;
declare function fetchPatch<TReq = unknown>(url: string, init?: any): (payload: TReq) => Promise<any>;
declare function fetchDel(url: string, init?: any): () => Promise<any>;
declare function fetchJSONGet<TResp = unknown>(url: string, init?: any): () => Promise<TResp>;
declare function fetchJSONPost<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
declare function fetchJSONPut<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
declare function fetchJSONPatch<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
declare function fetchJSONDel<TResp = unknown>(url: string, init?: any): () => Promise<TResp>;
type SecureKeys = {
    sender?: any;
    receiverPublicKey: any;
};
declare function postEncrypted<TReq = unknown, TResp = unknown>(url: string, keys: SecureKeys, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
declare function putEncrypted<TReq = unknown, TResp = unknown>(url: string, keys: SecureKeys, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
declare function patchEncrypted<TReq = unknown, TResp = unknown>(url: string, keys: SecureKeys, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
declare function secure(keys: SecureKeys): {
    post<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
    put<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
    patch<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp>;
    fetch: {
        post<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
        put<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
        patch<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
        expectDecrypted<TReq = unknown, TResp = unknown>(epriv: string): {
            post(url: string, init?: any): CurriedFetch<TReq, TResp>;
        };
    };
    expectDecrypted<TResp = unknown>(epriv: string): {
        post(url: string, config?: AxiosRequestConfig): CurriedRequest<any, TResp>;
    };
};
declare function unseaEncrypt<T = unknown>(payload: T, keys: SecureKeys): Promise<any>;
declare function unseaDecrypt<T = unknown>(cipher: any, opts: {
    receiver: any;
}): Promise<T>;
export declare const crypto: {
    encrypt: typeof unseaEncrypt;
    decrypt: typeof unseaDecrypt;
};
declare function expectDecrypted(epriv: string): {
    fetchJSON: {
        get<TResp = unknown>(url: string, init?: any): () => Promise<TResp>;
        post<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp>;
    };
};
export declare const secureResponse: {
    expectDecrypted: typeof expectDecrypted;
};
//# sourceMappingURL=index.d.ts.map