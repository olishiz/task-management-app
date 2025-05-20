#!/bin/bash

# Script to verify that the task-management-app is set up correctly

echo "Task Management App - Setup Verification"
echo "========================================"
echo

# Check Docker and Docker Compose
echo "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed or not in PATH"
    echo "   Please install Docker from https://docs.docker.com/get-docker/"
    exit 1
else
    DOCKER_VERSION=$(docker --version)
    echo "✅ $DOCKER_VERSION"
fi

echo "Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed or not in PATH"
    echo "   Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
else
    COMPOSE_VERSION=$(docker-compose --version)
    echo "✅ $COMPOSE_VERSION"
fi

echo

# Check project structure
echo "Checking project structure..."
REQUIRED_FILES=(
    "docker-compose.yml"
    "backend/Dockerfile"
    "frontend/Dockerfile"
    "backend/package.json"
    "frontend/package.json"
    "backend/prisma/schema.prisma"
    "frontend/src/api.js"
)

MISSING_FILES=0
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ Found $file"
    else
        echo "❌ Missing $file"
        MISSING_FILES=$((MISSING_FILES+1))
    fi
done

if [ $MISSING_FILES -gt 0 ]; then
    echo
    echo "Error: $MISSING_FILES required files are missing."
    echo "Please ensure you have the complete project structure."
    exit 1
fi

echo

# Verify environment files
echo "Checking environment files..."
if [ -f "backend/.env" ]; then
    echo "✅ Found backend/.env"
else
    echo "⚠️  Missing backend/.env (Example file available at backend/.env.example)"
    echo "   Please create this file before running the application."
fi

if [ -f "frontend/.env" ]; then
    echo "✅ Found frontend/.env"
else
    echo "⚠️  Missing frontend/.env (Example file available at frontend/.env.example)"
    echo "   Please create this file before running the application."
fi

echo

# Check Docker network isolation
echo "Checking Docker network..."
if docker network inspect task-management-app_app-network &> /dev/null; then
    echo "✅ Docker network exists"
else
    echo "ℹ️  Docker network will be created when you run docker-compose up"
fi

echo

# Check for database volume
if docker volume inspect task-management-app_postgres-data &> /dev/null; then
    echo "✅ PostgreSQL data volume exists"
else
    echo "ℹ️  PostgreSQL data volume will be created when you run docker-compose up"
fi

echo

# Final message
echo "Verification complete!"
echo
echo "To start the application, run:"
echo "  cd task-management-app"
echo "  docker-compose up --build"
echo
echo "Access the application at:"
echo "  Frontend: http://localhost:3001"
echo "  Backend API: http://localhost:3000"
echo
echo "For deployment instructions, see the documentation in the docs/ directory."

chmod +x verify-setup.sh
