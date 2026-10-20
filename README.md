# PC Remote Dashboard

**PC Remote Dashboard** is a monorepo-based control panel built on the MEVN stack (MongoDB, Express, Vue 3, Node.js) developed entirely in TypeScript. The project utilizes npm workspaces and shared packages to ensure strict type safety and runtime data validation via Zod across both the client and the server.

## 🛠️ Tech Stack & Architecture

- **Monorepo Manager:** npm Workspaces
- **Shared Package (`@pocketdesk/shared`):** TypeScript types and Zod schemas for runtime data validation.
- **Backend (`@pocketdesk/server`):** Node.js + Express with Zod environment variable policing.
- **Frontend (`@pocketdesk/web`):** Vue 3 + Vite + TypeScript with strict API contract parsing.

---

## 🗺️ Roadmap

- [x] **Task 1:** Monorepo setup, GitHub repository, and `@pocketdesk/shared` compilation workspace.
- [x] **Task 2:** Express server setup with a `/api/health` endpoint using shared types.
- [x] **Task 3:** Vue 3 frontend scaffold and consumption of the health endpoint.
- [x] **Task 4:** Runtime validation layer using Zod (API contract checking and server environment safety).
- [ ] **Task 5:** Authentication and Endpoint Security.
- [ ] **Task 6:** PC Remote Actions (Shutdown, Lock, Sleep).
- [ ] **Task 7:** Database Integration (MongoDB).

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 20 LTS or superior

### Installation

From the root of the project, run:

```bash
npm install
```

### Development

To run both the server and the web client simultaneously in development mode, open two terminals and run:

**Terminal 1 (Backend):**

```bash
npm run dev -w @pocketdesk/server
```

**Terminal 2 (Frontend):**

```bash
npm run dev -w @pocketdesk/web
```
