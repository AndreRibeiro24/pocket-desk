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
- **Communication:** WebSockets / REST API (for real-time metrics data syncing)

## 🗺️ Product Roadmap

### 🏁 Phase 1: Core Foundation & Connection (In Progress)
- [ ] Set up secure authentication between the mobile client and the desktop agent.
- [ ] Establish a live database connection with MongoDB for user configurations.
- [ ] Implement initial TypeScript boilerplate across the Vue 3 and Express apps.

### 📊 Phase 2: Real-Time Monitoring Dashboard
- [ ] Build the desktop service agent to collect CPU, RAM, and GPU health metrics.
- [ ] Stream hardware data to the Vue 3 mobile frontend using WebSockets.
- [ ] Design interactive, responsive charts for effortless mobile viewing.

### ⚡ Phase 3: Remote Action Controls
- [ ] Implement quick-action buttons for remote system shutdown, sleep, and restart.
- [ ] Integrate media control capabilities (play, pause, skip, and volume adjustment).
- [ ] Add custom macro shortcuts triggering execution on the host machine.

---
*Developed by a passionate Full-Stack Engineer. Feel free to explore the repository or reach out if you have any questions!*
