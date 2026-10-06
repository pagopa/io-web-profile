# io-web-profile

**`io-web-profile`** is the web application that allows citizens to log out of their session on the IO App.  
This repository contains the full source code of the front-end project.

---

## 📦 Technologies

This project uses:

- TypeScript
- React 19
- Next.js 16
- MUI 5 and `@pagopa/mui-italia`

---

## 📋 Prerequisites

Before you start, ensure your machine has:

- **Node.js** v22.16.0 (see `.node-version`)
- **Yarn** v4.1.1 (see `packageManager` in `package.json`)

You can use `nodenv` to manage Node versions and `corepack` (included with Node) to manage Yarn.

---

## 💻 Configurations

There are **three different ways** to run the app, depending on your needs and environment.


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

## 🪄 Magic Link

In order to test magic link flow you can use [this link](http://localhost:3000/it/blocco-accesso/magic-link/#token=jwetoken)

---

## ✉️ Email Validation Flow (Optional)

> [!Note]
> This feature is only in local environment (not yet in production)

To enable the email confirmation flow, add this to your `.env.local`:

```env
NEXT_PUBLIC_VALIDATION_EMAIL=true
```

This activates the `/conferma-email` routes used to validate user email addresses.

In order to test email validation flow you can use these test cases with Mockoon:

#### Test Cases for Email Validation

> [!Important]
> Make sure Mockoon is running on port 7071 with the `mock/mockoon_api.json` configuration

| **Scenario** | **URL** | **Expected Behavior** | **Response** |
|--------------|---------|----------------------|---------------|
| ✅ **Success Case** | [Valid Token Test](http://localhost:3000/it/conferma-email/?token=valid-token-123) or [this link](http://localhost:3000/it/conferma-email/?token=05QSY3JXN8XF47LTKRW9EMHZBX:179aeae8dcc01abdab31e5ba) | Shows email confirmation page, then allows validation |` HTTP 200: {"status": "SUCCESS", "profile_email": "example@example.com"} ` |
| ❌ **Token Expired** | [Expired Token Test](http://localhost:3000/it/conferma-email/?token=expired-token-456) | Redirects to `/conferma-email/link-scaduto/` (Link Expired page) |` HTTP 200: {"status": "FAILURE", "reason": "TOKEN_EXPIRED"} ` |
| ❌ **Email Already Taken** | [Email Taken Test](http://localhost:3000/it/conferma-email/?token=email-taken-789) | Redirects to `/conferma-email/email-gia-confermata/` (Email Already Confirmed page) |` HTTP 200: {"status": "FAILURE", "reason": "EMAIL_ALREADY_TAKEN"} ` |

#### Mockoon API Response Details

The mock server returns **HTTP 200** responses with different content based on token:

**GET `/public/api/v2/validate-profile-email`** (Token Info):
```bash
# Success Response (token: valid-token-123)
HTTP 200: {"profile_email": "example@example.com", "status": "SUCCESS"}

# Token Expired Response (token: expired-token-456) 
HTTP 200: {"status": "FAILURE", "reason": "TOKEN_EXPIRED"}

# Email Taken Response (token: email-taken-789)
HTTP 200: {"status": "FAILURE", "reason": "EMAIL_ALREADY_TAKEN"}
```

**POST `/public/api/v2/validate-profile-email`** (Email Validation):
```bash
# Success Response (body contains: "valid-token-123")
HTTP 200: {"status": "SUCCESS"}

# Token Expired Response (body contains: "expired-token-456")
HTTP 200: {"status": "FAILURE", "reason": "TOKEN_EXPIRED"}

# Email Taken Response (body contains: "email-taken-789") 
HTTP 200: {"status": "FAILURE", "reason": "EMAIL_ALREADY_TAKEN"}
```

#### Bug Testing

This setup allows you to test the **fixed behavior** where HTTP 200 responses with `status: "FAILURE"` are correctly handled as errors by the frontend, instead of being treated as successful responses.

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
yarn build:prod
yarn start-static
```

The static version will be served at [http://localhost:3000](http://localhost:3000)

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