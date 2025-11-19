import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { encryptMessageWithMeta, decryptMessageWithMeta } from 'unsea'

type CurriedRequest<TReq, TResp> = (payload: TReq) => Promise<AxiosResponse<TResp>>

function get<TResp = unknown>(url: string, config?: AxiosRequestConfig): () => Promise<AxiosResponse<TResp>> {
  return () => axios.get<TResp>(url, config)
}

function post<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
  return (payload: TReq) => axios.post<TResp>(url, payload, config)
}

function put<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
  return (payload: TReq) => axios.put<TResp>(url, payload, config)
}

function patch<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
  return (payload: TReq) => axios.patch<TResp>(url, payload, config)
}

function del<TResp = unknown>(url: string, config?: AxiosRequestConfig): () => Promise<AxiosResponse<TResp>> {
  return () => axios.delete<TResp>(url, config)
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
}

export default simple
export { default as axios } from 'axios'

export {
	generateRandomPair,
	signMessage,
	verifyMessage,
	encryptMessageWithMeta,
	decryptMessageWithMeta,
	exportToPEM,
	importFromPEM,
	exportToJWK,
	importFromJWK,
	saveKeys,
	loadKeys,
	clearKeys,
	generateWork,
	verifyWork,
	generateSignedWork,
	verifySignedWork,
	getSecurityInfo,
} from "unsea";

type CurriedFetch<TReq, TResp> = (payload?: TReq) => Promise<TResp>

function asText(input: any): string {
  return typeof input === 'string' ? input : JSON.stringify(input)
}

function fetchGet(url: string, init?: any): () => Promise<any> {
  return () => fetch(url, { method: 'GET', ...(init || {}) } as any)
}

function fetchPost<TReq = unknown>(url: string, init?: any): (payload: TReq) => Promise<any> {
  return (payload: TReq) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
}

function fetchPut<TReq = unknown>(url: string, init?: any): (payload: TReq) => Promise<any> {
  return (payload: TReq) => fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
}

function fetchPatch<TReq = unknown>(url: string, init?: any): (payload: TReq) => Promise<any> {
  return (payload: TReq) => fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
}

function fetchDel(url: string, init?: any): () => Promise<any> {
  return () => fetch(url, { method: 'DELETE', ...(init || {}) } as any)
}

function fetchJSONGet<TResp = unknown>(url: string, init?: any): () => Promise<TResp> {
  return async () => {
    const res: any = await fetch(url, { method: 'GET', ...(init || {}) } as any)
    return res.json() as Promise<TResp>
  }
}

function fetchJSONPost<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
  return async (payload?: TReq) => {
    const res: any = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
    return res.json() as Promise<TResp>
  }
}

function fetchJSONPut<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
  return async (payload?: TReq) => {
    const res: any = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
    return res.json() as Promise<TResp>
  }
}

function fetchJSONPatch<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
  return async (payload?: TReq) => {
    const res: any = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
    return res.json() as Promise<TResp>
  }
}

function fetchJSONDel<TResp = unknown>(url: string, init?: any): () => Promise<TResp> {
  return async () => {
    const res: any = await fetch(url, { method: 'DELETE', ...(init || {}) } as any)
    return res.json() as Promise<TResp>
  }
}

type SecureKeys = { sender?: any; receiverPublicKey: any }

function postEncrypted<TReq = unknown, TResp = unknown>(url: string, keys: SecureKeys, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
  return async (payload: TReq) => {
    const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
    return axios.post<TResp>(url, encrypted, config)
  }
}

function putEncrypted<TReq = unknown, TResp = unknown>(url: string, keys: SecureKeys, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
  return async (payload: TReq) => {
    const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
    return axios.put<TResp>(url, encrypted, config)
  }
}

function patchEncrypted<TReq = unknown, TResp = unknown>(url: string, keys: SecureKeys, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
  return async (payload: TReq) => {
    const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
    return axios.patch<TResp>(url, encrypted, config)
  }
}

function secure(keys: SecureKeys) {
  return {
    post<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
      return async (payload: TReq) => {
        const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
        return axios.post<TResp>(url, encrypted, config)
      }
    },
    put<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
      return async (payload: TReq) => {
        const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
        return axios.put<TResp>(url, encrypted, config)
      }
    },
    patch<TReq = unknown, TResp = unknown>(url: string, config?: AxiosRequestConfig): CurriedRequest<TReq, TResp> {
      return async (payload: TReq) => {
        const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
        return axios.patch<TResp>(url, encrypted, config)
      }
    },
    fetch: {
      post<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
        return async (payload?: TReq) => {
          const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
          const res: any = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) } as any)
          return res.json() as Promise<TResp>
        }
      },
      put<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
        return async (payload?: TReq) => {
          const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
          const res: any = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) } as any)
          return res.json() as Promise<TResp>
        }
      },
      patch<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
        return async (payload?: TReq) => {
          const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
          const res: any = await fetch(url, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) } as any)
          return res.json() as Promise<TResp>
        }
      },
      expectDecrypted<TReq = unknown, TResp = unknown>(epriv: string) {
        return {
          post(url: string, init?: any): CurriedFetch<TReq, TResp> {
            return async (payload?: TReq) => {
              const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
              const res: any = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(encrypted) } as any)
              const cipher = await res.json()
              const plain = await decryptMessageWithMeta(cipher, epriv)
              try { return JSON.parse(plain) as TResp } catch { return plain as any as TResp }
            }
          },
        }
      }
    },
    expectDecrypted<TResp = unknown>(epriv: string) {
      return {
        post(url: string, config?: AxiosRequestConfig): CurriedRequest<any, TResp> {
          return async (payload: any) => {
            const encrypted = await encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
            const resp = await axios.post(url, encrypted, config)
            const plain = await decryptMessageWithMeta(resp.data, epriv)
            try { (resp as any).data = JSON.parse(plain) } catch { (resp as any).data = plain }
            return resp as any
          }
        },
      }
    },
  }
}

async function unseaEncrypt<T = unknown>(payload: T, keys: SecureKeys): Promise<any> {
  return encryptMessageWithMeta(asText(payload as any), { epub: keys.receiverPublicKey })
}

async function unseaDecrypt<T = unknown>(cipher: any, opts: { receiver: any }): Promise<T> {
  return decryptMessageWithMeta(cipher, (opts.receiver as any).epriv)
}

export const crypto = {
  encrypt: unseaEncrypt,
  decrypt: unseaDecrypt,
}

function expectDecrypted(epriv: string) {
  return {
    fetchJSON: {
      get<TResp = unknown>(url: string, init?: any): () => Promise<TResp> {
        return async () => {
          const res: any = await fetch(url, { method: 'GET', ...(init || {}) } as any)
          const cipher = await res.json()
          const plain = await decryptMessageWithMeta(cipher, epriv)
          try { return JSON.parse(plain) as TResp } catch { return plain as any as TResp }
        }
      },
      post<TReq = unknown, TResp = unknown>(url: string, init?: any): CurriedFetch<TReq, TResp> {
        return async (payload?: TReq) => {
          const res: any = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...((init && init.headers) || {}) }, ...(init || {}), body: JSON.stringify(payload) } as any)
          const cipher = await res.json()
          const plain = await decryptMessageWithMeta(cipher, epriv)
          try { return JSON.parse(plain) as TResp } catch { return plain as any as TResp }
        }
      },
    },
  }
}

export const secureResponse = {
  expectDecrypted,
}