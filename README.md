# Task Management App

A full-stack application for task management with a NestJS backend, React frontend, and PostgreSQL database.

## Project Structure

- `/backend`: NestJS application with GraphQL API and Prisma ORM
- `/frontend`: React application built with Vite and Tailwind CSS
- `/shared`: Shared utilities and types (if applicable)
- `/docs`: Additional documentation

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Git

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Create environment files:
   ```
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

3. Start the application:
   ```
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

### Environment Variables

#### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Port to run the backend (default: 3000)

#### Frontend (.env)
- `VITE_API_URL`: URL for backend API

## Development

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deployment

### Cloud Deployment Options

#### AWS
- Use ECS for containerized deployment
- RDS for PostgreSQL database
- Load balancer for routing

#### Google Cloud
- Cloud Run for containerized services
- Cloud SQL for PostgreSQL database

#### Azure
- Azure Container Instances
- Azure Database for PostgreSQL

### Deployment Steps

1. Push your Docker images to a container registry:
   ```
   docker-compose build
   docker tag task-management-app_backend:latest your-registry/backend:latest
   docker tag task-management-app_frontend:latest your-registry/frontend:latest
   docker push your-registry/backend:latest
   docker push your-registry/frontend:latest
   ```

2. Deploy using docker-compose or Kubernetes:
   - Ensure environment variables are properly set in your deployment environment
   - Set up a database or use a managed database service
   - Configure networking and security

## License

[MIT License](LICENSE)
# task-management-app
