# Fullstack Demo Startup Guide (Express + Vue3)

## Requirements
- Node.js `>= 18`
- Recommended package manager: `pnpm`

## One-time: build the library
- From repo root:
  - `pnpm install`
  - `pnpm run build`

> Note: The frontend & backend demos import the library via an alias to `dist/index.js`. The library must be built first.

## Start Backend (Express)
- Install & start:
  - `pnpm -C examples/fullstack/server install`
  - `pnpm -C examples/fullstack/server start`
- Visit:
  - `http://localhost:3000/health`

### Backend endpoints
- `GET /health`: health check
- `GET /keys/public`: exposes server recipient public key (`epub`) for encryption
- `POST /secure`: accepts encrypted request body and returns decrypted content
- `GET /secure/respond`: server encrypts a response for the client and returns it (requires header `x-unsea-target-epub` with the client `epub`)

## Start Frontend (Vue3 + Vite)
- Install & start:
  - `pnpm -C examples/fullstack/client install`
  - `pnpm -C examples/fullstack/client dev`
- Visit:
  - `http://localhost:5173/`

### Frontend demo buttons
- `GET /health`: demonstrates `fetchJSON.get`
- `POST /users`: demonstrates curried `axios.post`
- `Secure axios`: `simple.secure(...).post(url)(payload)` (encrypted request body)
- `Secure fetch`: `simple.secure(...).fetch.post(url)(payload)` (encrypted request body)
- `Secure response`: automatically decrypt server’s encrypted response (`secureResponse.expectDecrypted(epriv).fetchJSON.get(...)()`)
- `Manual encrypt`: use `crypto.encrypt` to manually encrypt an object and send it

## Troubleshooting
- Missing build alias: ensure you ran `pnpm run build` in the repo root.
- Port conflicts: backend uses `3000`, frontend uses `5173`. Change ports or stop conflicting processes if needed.
- `pnpm approve-builds` warning: run `pnpm approve-builds` if you need to allow dependency build scripts.

## Stop services
- Press `Ctrl + C` in the respective terminal to stop backend or frontend servers.