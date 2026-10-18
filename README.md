# PocketDesk – Remote Desktop Dashboard

⚠️ **Status: Under Development**  
*This project is currently a work in progress. Features are being actively developed and refined as part of my professional portfolio.*

## 📖 Project Description
PocketDesk is a mobile-first remote dashboard application designed to seamlessly bridge the gap between smartphones and desktop computers. It provides users with a real-time interface to monitor system hardware metrics and securely trigger quick automation controls directly from their mobile devices.

## 🛠️ Tech Stack
This project is built using a modern full-stack architecture to ensure real-time responsiveness, performance, and type safety:

- **Frontend:** Vue 3 (Composition API) with TypeScript
- **Backend:** Express (Node.js) with TypeScript
- **Database:** MongoDB
- **Communication:** WebSockets / REST API

## 🗺️ Product Roadmap

### 🏁 Phase 1: Core Architecture & Setup (Current)
- [x] Establish Monorepo structure and configure shared TypeScript types between frontend and backend.
- [ ] Build the base Express server with a functional health check endpoint.
- [ ] Connect the Vue 3 mobile application to the backend API layer.

### 📊 Phase 2: Real-Time Resource Monitoring
- [ ] Implement system metrics collection (CPU and RAM utilization) on the desktop host.
- [ ] Set up WebSocket communication to stream performance data in real time.
- [ ] Create basic responsive charts in the Vue 3 dashboard for live viewing.

### 🔐 Phase 3: Authentication & Persistent Settings
- [ ] Integrate MongoDB to store user configurations and persistent system logs.
- [ ] Implement a secure authentication mechanism between the mobile client and the desktop agent.
- [ ] Add basic remote power actions, including system shutdown and sleep controls.
