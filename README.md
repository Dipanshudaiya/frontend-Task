# Collaborative Task Board

A modern, high-performance task management board built with **React**, **Tailwind CSS**, and **Zustand**. This project follows **SOLID principles** and is designed with a premium aesthetic.

## 🚀 Features

- **Project Management**: Create and switch between multiple projects.
- **Interactive Board**: Drag and drop tasks between "To Do", "In Progress", and "Done" columns.
- **Aesthetic UI**: Premium dark-mode sidebar and vibrant status columns.
- **Responsive Layout**: Works seamlessly on different screen sizes.

## 🛠️ Architecture & SOLID Principles

This project has been refactored to strictly adhere to SOLID principles:

1.  **S - Single Responsibility Principle**: Each component handles a specific part of the UI. Logic is extracted into custom hooks and utility functions.
2.  **O - Open/Closed Principle**: Status styling and constants are centralized in `styleUtils.js`, allowing for new statuses to be added without modifying core components.
3.  **L - Liskov Substitution Principle**: Components and hooks are designed with clear interfaces for maintainability.
4.  **I - Interface Segregation Principle**: Stores and hooks provide focused selectors to avoid unnecessary re-renders.
5.  **D - Dependency Inversion Principle**: Components depend on abstractions (hooks/stores) rather than concrete implementations.

## 📂 Project Structure

- `src/components`: UI components (Board, Column, TaskCard, Sidebar).
- `src/store`: Zustand state management (Projects, Tasks).
- `src/utils`: Helper functions and style constants.
- `src/hooks`: Custom React hooks for business logic.

## 🚦 Getting Started

1.  Install dependencies: `npm install`
2.  Run the development server: `npm run dev`
3.  Build for production: `npm run build`

---

*Built with ❤️ by Antigravity*
