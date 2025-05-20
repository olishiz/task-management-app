# ECRI - Task Management Backend

A robust backend service built using NestJS, Prisma, and GraphQL (optional) for managing tasks and users. This service provides RESTful endpoints and optional GraphQL support for CRUD operations on tasks stored in a PostgreSQL database.

## Features

- **REST API Endpoints**
    - Retrieve all tasks (`GET /tasks`)
    - Retrieve a single task by ID (`GET /tasks/:id`)
    - Create a new task (`POST /tasks`)
    - Update an existing task (`PUT /tasks/:id`)
    - Delete a task (`DELETE /tasks/:id`)
- **GraphQL API Support** (optional) - Explore your data via the GraphQL Playground at `/graphql`
- **Database Integration** using Prisma with PostgreSQL
- **Built-in Error Handling** and CORS support for development

## Technologies Used

- **NestJS**: Robust, modular, and testable framework for building scalable server-side applications
- **Prisma**: Type-safe ORM for simplified database interactions and migrations with PostgreSQL
- **GraphQL**: Optional query language allowing clients to request specific data
- **PostgreSQL**: Powerful relational database for task storage
- **TypeScript**: Enhanced type safety and code quality

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn
- PostgreSQL installed and running

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd task-management-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the project root:
   ```env
   DATABASE_URL="postgresql://nest_user:yourpassword@localhost:5432/task_management?schema=public"
   PORT=3000
   ```
   Replace `nest_user`, `yourpassword`, and `task_management` with your PostgreSQL credentials.

4. **Set Up the Database with Prisma**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run Database Migration
   npx prisma migrate dev --name init
   ```

## Running the Backend

Start the NestJS development server:
```bash
npm run start:dev
```
The server will run on port 3000 (or the port specified in your `.env` file).

## API Documentation

### REST API
- `GET /tasks` - Retrieves all tasks
- `GET /tasks/:id` - Retrieves a specific task by ID
- `POST /tasks` - Creates a new task
- `PUT /tasks/:id` - Updates an existing task
- `DELETE /tasks/:id` - Deletes a task

### GraphQL API
If enabled, visit `http://localhost:3000/graphql` to access the GraphQL Playground.
At the meantime, it's not enabled and not yet configured - so this feature is not available.

## Assumptions and Limitations

- This project demonstrates basic task management functionality
- Development configuration only; production setups require:
    - Enhanced security measures
    - Comprehensive error logging
    - Performance optimizations
- Basic error handling included
- CORS enabled globally for development
- GraphQL API is optional and can be disabled if not needed

## License

- This project is licensed under the MIT License.
- Developed by Oliver Sim.