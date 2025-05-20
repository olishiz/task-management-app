# ECRI - Task Management Frontend

A modern React-based frontend application for the Task Management system. Built with React, Vite, and Tailwind CSS, it provides a responsive interface for managing tasks through REST API communication with the NestJS backend.

## Features

- **Task List Dashboard**
    - Table/card layout displaying task details (title, description, assignedTo, status, createdAt)
    - Status displayed as styled badges
    - Edit and delete actions for each task
- **Task Management**
    - Creation form with fields for title, description, assignedTo, and status
    - Update functionality with pre-populated forms
- **User Experience**
    - Toast notifications for error handling via react-toastify
    - Responsive design using Tailwind CSS
    - Client-side routing with React Router

## Technologies Used

- **React**: Library for building interactive user interfaces
- **Vite**: Modern build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router**: Client-side routing management
- **Axios**: HTTP request handling
- **React-Toastify**: Toast notification system

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd task-management-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables (Optional)**
   Create a `.env` file in the project root:
   ```env
   VITE_API_URL=http://localhost:3000/tasks
   ```
   Note: If not configured, the default API URL in `src/api.js` will be used.

## Running the Frontend

Start the Vite development server:
```bash
npm run dev
```
Access the application at the URL provided by Vite (typically `http://localhost:3000`).

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Route-based page components
└── App.jsx           # Main application component
```

## Development Guidelines

- Components should be organized by feature or functionality
- Use Tailwind CSS utilities for styling
- Implement error handling using react-toastify
- Follow React best practices for state management
- Ensure responsive design across devices

## Assumptions and Limitations

- Designed for demonstration purposes
- Requires running backend service
- Core CRUD operations focus
- Potential future enhancements:
    - User authentication
    - Advanced error handling
    - Task filtering/searching
    - Production optimizations
    - Extended device testing

## License

- This project is licensed under the MIT License.
- Developed by Oliver Sim