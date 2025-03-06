# Role-Based Ticketing System

A web-based support ticketing system built with a **Node.js** backend and a **React.js** frontend, featuring role-based access control (RBAC) for users and admins. Users can create support tickets, while admins can manage all tickets. The project uses modern technologies like TypeScript, Tailwind CSS, Redux, and MongoDB.

## Features

- **User Authentication**: JWT-based signup and login with password hashing (bcrypt).
- **Role-Based Access**:
  - **Users**: Create tickets and view their own tickets.
  - **Admins**: View and manage all tickets (update status: Open, In Progress, Closed).
- **Frontend**:
  - Built with React.js (TypeScript) using Vite.
  - State management with Redux.
  - Styled with Tailwind CSS for a modern, responsive UI.
  - Atomic Design principles (atoms, molecules, organisms) for component structure.
- **Backend**:
  - Node.js with Express and TypeScript.
  - MongoDB for data storage.
  - API endpoints for authentication and ticket management.
- **Error Handling & Validation**: Client-side validation for empty inputs, server-side error messages displayed with red-bordered inputs.
- **Loading States**: Spinners for API calls to enhance UX.
- **Protected Routes**: Prevents unauthorized access to dashboards.

## Tech Stack

- **Frontend**: React.js, TypeScript, Vite, Redux, Tailwind CSS, Axios
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt
- **Tools**: npm, nvm (Node Version Manager)

## Prerequisites

- **Node.js**: v20.18.1 or compatible (use `nvm` to manage versions).
- **MongoDB**: Installed locally on macOS (via Homebrew).
- **npm**: v11.1.0 or compatible.

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server (port `9000`):
   ```bash
   npx ts-node-dev src/server.ts
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the base URL in `src/api/axiosInstance.ts` to match the new port:
   ```bash
   const BASE_URL = 'http://localhost:9000';
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   - Access the app at `http://localhost:5173` (or the port Vite assigns).

## Usage

1. **Signup**: Create an account as a user or admin at `/signup`.
2. **Login**: Log in at `/login` to access your dashboard.
3. **User Dashboard**: Create tickets and view your own tickets at `/user`.
4. **Admin Dashboard**: Manage all tickets at `/admin`.
5. **Logout**: Use the navigation bar’s logout button.

## Future Features

- **Ticket Categories**: Allow users to categorize tickets (e.g., Bug, Feature Request).
- **Ticket Priority**: Add priority levels (Low, Medium, High) with color coding.
- **Notifications**: Email or in-app notifications for ticket updates.
- **User Profile**: Enable users to view and edit their profiles.
- **Environment Variables**: Use `.env` files for configurable settings (e.g., port, JWT secret).

