<template>
  <div style="padding:16px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <h1 style="font-size:18px;margin:0 0 12px">simple-apis Fullstack</h1>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">
      <button @click="health">GET /health</button>
      <button @click="postUser">POST /users</button>
      <button @click="secureAxios">Secure axios</button>
      <button @click="secureFetch">Secure fetch</button>
      <button @click="secureResponse">Secure response</button>
      <button @click="manualEncrypt">Manual encrypt</button>
    </div>
    <pre style="background:#f6f8fa;border:1px solid #eaecef;padding:12px;white-space:pre-wrap">{{ out }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { simple, generateRandomPair, crypto, secureResponse as secureResponseAPI } from 'simple-apis'

const out = ref('ready')
const base = 'http://localhost:3000'
let serverPub: any
let clientKeys: any

onMounted(async () => {
  const data = await simple.fetchJSON.get<{ recipient: { epub: any } }>(`${base}/keys/public`)()
  serverPub = data.recipient.epub
  clientKeys = await generateRandomPair()
})

const show = (label: string, data: any) => {
  out.value = label + '\n' + JSON.stringify(data, null, 2)
}

const health = async () => {
  try {
    const data = await simple.fetchJSON.get(`${base}/health`)()
    show('GET /health', data)
  } catch (e: any) {
    show('Error', { message: e?.message })
  }
}

const postUser = async () => {
  try {
    const res = await simple.post(`${base}/users`)({ name: 'Alice' })
    show('POST /users', res.data)
  } catch (e: any) {
    show('Error', { message: e?.message })
  }
}

const secureAxios = async () => {
  try {
    const res = await simple.secure({ sender: clientKeys, receiverPublicKey: serverPub })
      .post(`${base}/secure`)({ secret: 'top' })
    show('POST /secure axios', res.data)
  } catch (e: any) {
    show('Error', { message: e?.message })
  }
}

const secureFetch = async () => {
  try {
    const data = await simple.secure({ sender: clientKeys, receiverPublicKey: serverPub })
      .fetch.post(`${base}/secure`)({ secret: 'top' })
    show('POST /secure fetch', data)
  } catch (e: any) {
    show('Error', { message: e?.message })
  }
}

const manualEncrypt = async () => {
  try {
    const cipher = await crypto.encrypt({ hello: 'world' }, { sender: clientKeys, receiverPublicKey: serverPub })
    const data = await simple.fetchJSON.post(`${base}/secure`)(cipher)
    show('POST /secure manual', data)
  } catch (e: any) {
    show('Error', { message: e?.message })
  }
}

const secureResponse = async () => {
  try {
    const data = await secureResponseAPI.expectDecrypted<string>(clientKeys.epriv).fetchJSON.get(`${base}/secure/respond`, {
      headers: { 'x-unsea-target-epub': clientKeys.epub }
    })()
    show('GET /secure/respond', data)
  } catch (e: any) {
    show('Error', { message: e?.message })
  }
}
</script>

<style scoped>
button { padding: 6px 10px }
</style>