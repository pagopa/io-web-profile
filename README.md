# io-web-profile

**`io-web-profile`** is the web application that allows citizens to log out of their session on the IO App.  
This repository contains the full source code of the front-end project.

---

## 🚀 Running the Application

There are **three different ways** to run the app, depending on your needs and environment.

---

### 1. 🧪 Local Login Flow — Using `hub-spid-login` + Mock Backend (Mockoon)

This is the most complete local setup, simulating both authentication and backend services:

#### ➤ Setup `hub-spid-login`

Follow the official [`hub-spid-login-ms`](https://github.com/pagopa/hub-spid-login-ms) documentation and configure the following variables in its `.env` file:

```env
ENDPOINT_ERROR=http://localhost:3000/accedi/errore
ENDPOINT_SUCCESS=http://localhost:3000/it/accedi/
ENABLE_JWT=true
```

#### ➤ Setup `io-web-profile` `.env.local`

```env
NEXT_PUBLIC_URL_SPID_LOGIN=http://localhost:9090/login
NEXT_PUBLIC_API_BASE_URL=http://localhost:7071
NEXT_PUBLIC_WALLET_API_BASE_URL=http://localhost:7071
NEXT_PUBLIC_DEV_MODE=true
```

#### ➤ Start Mockoon

1. Install [Mockoon](https://mockoon.com/download/)
2. Open the app and load `mock/mockoon_api.json`
3. Click the ▶ icon to start the mock server

---

### 2. 🔗 Real Backend — Using `hub-spid-login` + Production APIs

This setup allows you to test the real login flow and real backend services, while still using the local login proxy.

#### ➤ Setup `hub-spid-login`

Same as above:

```env
ENDPOINT_ERROR=http://localhost:3000/accedi/errore
ENDPOINT_SUCCESS=http://localhost:3000/it/accedi/
ENABLE_JWT=true
```

#### ➤ Setup `io-web-profile` `.env.local`

```env
NEXT_PUBLIC_URL_SPID_LOGIN=http://localhost:9090/login
NEXT_PUBLIC_API_BASE_URL=https://api-web.io.pagopa.it/ioweb/backend
NEXT_PUBLIC_WALLET_API_BASE_URL=https://api-web.io.pagopa.it/ioweb/wallet
NEXT_PUBLIC_DEV_MODE=true
```

---

### 3. 💻 Fully Local — Mockoon Only (No `hub-spid-login`)

If you're working purely on the UI and don't need a real login flow, you can run everything locally with just Mockoon:

#### ➤ Setup `io-web-profile` `.env.local`

```env
NEXT_PUBLIC_URL_SPID_LOGIN=http://localhost:7071/login
NEXT_PUBLIC_API_BASE_URL=http://localhost:7071
NEXT_PUBLIC_WALLET_API_BASE_URL=http://localhost:7071
NEXT_PUBLIC_DEV_MODE=true
```

No need to run `hub-spid-login` in this case.

---

## 📦 Technologies

This project uses:

- TypeScript
- React
- Next.js 14 (App Router)

---

## 📋 Prerequisites

Before you start, ensure your machine has:

- **Node.js** v20.12.0
- **Yarn** v1.22

You can use `nodenv` to manage Node versions and `corepack` (included with Node) to manage Yarn.

---

## 📁 Project Structure

```
io-web-profile/
├── mock/             → Mockoon environments and local mocks
├── openApi/          → OpenAPI specs for API clients
├── public/           → Static assets (SPID/CIE metadata, OneTrust, etc.)
├── src/
│   ├── api/          → Auto-generated API clients
│   ├── dictionaries/ → Localization dictionaries
│   ├── app/[locale]/
│   │   ├── (pages)/      → Application routes
│   │   ├── _component/   → Shared UI components
│   │   ├── _enums/       → Enums and constants
│   │   ├── _hooks/       → Custom React hooks
│   │   ├── _icons/       → Project icons
│   │   ├── _model/       → Data models and types
│   │   ├── _redux/       → Redux state and logic
│   │   └── _utils/       → Utility functions
```

---

## 🛠️ Installation

From the project root:

```bash
# Install dependencies
yarn install

# Generate API clients and types
yarn generate
```

---

## ▶️ Running the App

After setting up `.env.local`, you can run the app in different modes.

> [!Note]
> Remember not to push these configurations in .env.local file

### Development Mode

```bash
yarn dev
```

Then open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
yarn build
yarn start-static
```

The static version will be served at [http://localhost:3000](http://localhost:3000)

---

## ✉️ Email Validation Flow (Optional)

> [!Note]
> This feature is only in local environment (not yet in production)

To enable the email confirmation flow, add this to your `.env.local`:

```env
NEXT_PUBLIC_VALIDATION_EMAIL=true
```

This activates the `/conferma-email` routes used to validate user email addresses.

---
