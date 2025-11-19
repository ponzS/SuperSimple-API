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
};
export default simple;
//# sourceMappingURL=index.d.ts.map