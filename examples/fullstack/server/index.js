import express from 'express'
import cors from 'cors'
import { generateRandomPair, encryptMessageWithMeta, decryptMessageWithMeta } from '../../../dist/index.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

const serverKeys = await generateRandomPair()

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

app.get('/keys/public', (req, res) => {
  res.json({ recipient: { epub: serverKeys.epub } })
})

app.post('/users', (req, res) => {
  res.json({ received: req.body })
})

app.post('/secure', async (req, res) => {
  const decrypted = await decryptMessageWithMeta(req.body, serverKeys.epriv)
  res.json({ ok: true, decrypted })
})

app.get('/secure/respond', async (req, res) => {
  const clientEpub = req.header('x-unsea-target-epub') || ''
  if (!clientEpub) return res.status(400).json({ error: 'missing x-unsea-target-epub' })
  const payload = { from: 'server', time: Date.now() }
  const cipher = await encryptMessageWithMeta(JSON.stringify(payload), { epub: clientEpub })
  res.json(cipher)
})

app.listen(3000, () => {
  console.log('server: http://localhost:3000')
})