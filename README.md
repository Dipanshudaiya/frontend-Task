# Collaborative Task Board

A modern, high-performance task management board built with **React 19**, **Vite**, **Tailwind CSS 4**, and **Zustand**. This project follows **SOLID principles** and is designed with a premium, responsive aesthetic.

## 🚀 Features

- **Authentication / User Access**: Secure entry point for members managing their workspace.
- **Project Management**: Create, delete, and switch between multiple projects dynamically.
- **Interactive Kanban Board**: Fully functional drag-and-drop interface powered by `@dnd-kit/core` to move tasks fluidly between "To Do", "In Progress", and "Done" columns.
- **API Integration**: Connected to a robust backend using `axios` with JWT authentication and comprehensive REST endpoints.
- **Seamless State Management**: Utilizes `zustand` to manage complex client-side state across projects, tasks, and UI interactions efficiently.
- **Modern Routing**: Utilizes `react-router-dom` v7 for client-side routing, providing smooth transitions between different application views.
- **Aesthetic UI**: Premium UI design with optimized typography, a sleek dark-mode sidebar, vibrant status columns, and micro-animations.
- **Fully Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + Vite for optimal build speeds and HMR.
- **Styling**: Tailwind CSS v4 + Autoprefixer for rapid, scalable styling.
- **State Management**: Zustand for global, hook-based state stores.
- **Drag & Drop**: @dnd-kit (Core, Sortable, Utilities) for accessible, extensible drag interactions.
- **Networking**: Axios for centralized, interceptor-ready HTTP requests.
- **Routing**: React Router DOM v7.
- **Deployment & Hosting**: Configured for Vercel with dedicated SPA routing rules (`vercel.json`).

## 🧱 Architecture & Design Principles

This project has been refactored to strictly adhere to SOLID principles for scalable application architecture:

1. **S - Single Responsibility Principle**: Each component handles a specific part of the UI. Business logic is meticulously extracted into distinct custom hooks (`hooks/`) and utility functions (`utils/`).
2. **O - Open/Closed Principle**: Status styling and core constants are centralized (e.g., `styleUtils.js`), allowing for new configuration or task statuses to be added seamlessly without breaking core layout components.
3. **L - Liskov Substitution Principle**: Core components and hooks are designed with clear interfaces & data contracts, allowing components to be replaced or extended predictably.
4. **I - Interface Segregation Principle**: State stores and custom hooks provide granular selectors to prevent unnecessary component re-renders.
5. **D - Dependency Inversion Principle**: The UI component layer depends on service abstractions or hooks rather than tight-coupling to concrete API implementation details.

## 📂 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── api/                # API request configurations and Axios instances
│   ├── components/         # Reusable UI elements (Header, Board, TaskCard, Sidebar)
│   ├── hooks/              # Custom React hooks (logic & side-effects)
│   ├── layouts/            # Page shell layouts
│   ├── pages/              # Main route views (Auth, Dashboard)
│   ├── services/           # Abstraction layer between UI and APIs
│   ├── store/              # Zustand stores (e.g., useProjectStore, useTaskStore)
│   └── utils/              # Helper functions & style constants
├── package.json            # Project dependencies and npm scripts
├── vercel.json             # Vercel configuration for SPA routing rewrites
└── vite.config.js          # Vite bundler configuration
```

## 🚦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or download the source code).
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and define the required backend API connection variables.
4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5173`.

### Building for Production
To create an optimized production build:
```bash
npm run build
```
The bundled files will be generated in the `dist/` directory.

## 🌐 Deployment (Vercel)

This project is optimized for deployment on Vercel. 
It includes a `vercel.json` file in the root directory with generic rewrite rules to ensure client-side routing (react-router) works properly on direct URL visits or page refreshes (avoiding `404 NOT_FOUND` errors).

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Simply connect this repository to your Vercel dashboard and deploy.
