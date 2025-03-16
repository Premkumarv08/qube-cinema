# Qube Cinema Music Management Application

A full-stack application for managing and browsing music collections including albums, EPs, and singles.

## Overview

This application allows users to view and filter music collections by type (Album, EP, Single) and view detailed information about each collection including track listings, duration, size, and release dates.

## Project Structure

The project consists of two main components:

1. **Frontend**: A React application built with Vite, TypeScript, Material UI, and Redux
2. **Backend**: An Express.js server to handle API requests

## Features

- Browse music collections with filtering capabilities
- View detailed information about each collection including:
  - Track listings
  - Song counts
  - Duration
  - File size
  - Release dates
  - Performers
- Filter collections by type (Album, EP, Single)

## Technologies Used

### Frontend
- React 19
- TypeScript
- Vite
- Material UI (MUI)
- Redux Toolkit
- React Router
- Axios

### Backend
- Node.js
- Express.js
- CORS

## Getting Started

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Premkumarv08/qube-cinema.git
cd qube-cinema
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
npm install

# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Return to root directory
cd ..
```

### Running the Application

#### Development Mode

1. Start the backend server
```bash
cd server
npm start
```

2. In a new terminal, start the frontend development server
```bash
npm run dev
```

#### Production Mode

1. Build the frontend
```bash
npm run build
```

2. Start the backend server which will serve the built frontend
```bash
cd server
npm start
```

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/collections` - Get all music collections
- `GET /api/collections/:id` - Get details for a specific collection
- `GET /api/collections/filter?type=<type>` - Filter collections by type (Album, EP, Single)

## Directory Structure

```
qube-cinema/
├── public/
├── server/
│   ├── server.js
│   ├── package.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── App.tsx
│   ├── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

## License

This project is licensed under the ISC License.