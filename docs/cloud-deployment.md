# Cloud Deployment Guide

This document provides guidance on deploying the Task Management App to various cloud platforms.

## Table of Contents

1. [General Deployment Considerations](#general-deployment-considerations)
2. [AWS Deployment](#aws-deployment)
3. [Google Cloud Platform Deployment](#google-cloud-platform-deployment)
4. [Azure Deployment](#azure-deployment)
5. [Troubleshooting](#troubleshooting)

## General Deployment Considerations

Before deploying to any cloud platform, make sure you have:

1. Built and tested the Docker images locally
2. Set up appropriate environment variables
3. Planned for database initialization and migrations
4. Considered security aspects (secrets management, network security)
5. Planned for monitoring and logging

## AWS Deployment

### Using AWS Elastic Container Service (ECS)

1. **Prerequisites**:
   - AWS CLI installed and configured
   - ECR repositories for your Docker images
   - An ECS cluster

2. **Database Setup**:
   - Create an Amazon RDS PostgreSQL instance
   - Configure security groups to allow connections from your ECS services
   - Note the connection string for your database

3. **Push Images to ECR**:
   ```bash
   # Login to ECR
   aws ecr get-login-password --region <your-region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<your-region>.amazonaws.com

   # Tag images
   docker-compose build
   docker tag task-management-app_backend:latest <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/task-app-backend:latest
   docker tag task-management-app_frontend:latest <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/task-app-frontend:latest

   # Push images
   docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/task-app-backend:latest
   docker push <your-account-id>.dkr.ecr.<your-region>.amazonaws.com/task-app-frontend:latest
   ```

4. **Create Task Definitions**:
   - Define ECS task definitions for both backend and frontend services
   - Include environment variables for database connection
   - Configure container health checks
   - Set appropriate CPU and memory limits

5. **Create ECS Services**:
   - Create services for both backend and frontend
   - Configure load balancers
   - Set up service discovery if needed

6. **Configure Route 53**:
   - Create DNS records to point to your load balancers

### Using AWS App Runner (Simpler Alternative)

1. Create App Runner services for both backend and frontend
2. Connect to your ECR repositories
3. Configure environment variables
4. Set auto-scaling rules

## Google Cloud Platform Deployment

### Using Google Cloud Run

1. **Prerequisites**:
   - Google Cloud SDK installed and configured
   - Google Container Registry or Artifact Registry access

2. **Database Setup**:
   - Create a Cloud SQL PostgreSQL instance
   - Note the connection string for your database

3. **Push Images to GCR**:
   ```bash
   # Configure Docker for GCR
   gcloud auth configure-docker

   # Tag images
   docker-compose build
   docker tag task-management-app_backend:latest gcr.io/<your-project-id>/task-app-backend:latest
   docker tag task-management-app_frontend:latest gcr.io/<your-project-id>/task-app-frontend:latest

   # Push images
   docker push gcr.io/<your-project-id>/task-app-backend:latest
   docker push gcr.io/<your-project-id>/task-app-frontend:latest
   ```

4. **Deploy to Cloud Run**:
   ```bash
   # Deploy backend
   gcloud run deploy backend --image gcr.io/<your-project-id>/task-app-backend:latest --platform managed --allow-unauthenticated --set-env-vars "DATABASE_URL=<your-database-url>"

   # Deploy frontend
   gcloud run deploy frontend --image gcr.io/<your-project-id>/task-app-frontend:latest --platform managed --allow-unauthenticated --set-env-vars "VITE_API_URL=<backend-service-url>/tasks"
   ```

5. **Configure Cloud DNS**:
   - Create DNS records to point to your Cloud Run services

## Azure Deployment

### Using Azure Container Apps

1. **Prerequisites**:
   - Azure CLI installed and configured
   - Azure Container Registry access

2. **Database Setup**:
   - Create an Azure Database for PostgreSQL
   - Note the connection string for your database

3. **Push Images to ACR**:
   ```bash
   # Login to ACR
   az acr login --name <your-acr-name>

   # Tag images
   docker-compose build
   docker tag task-management-app_backend:latest <your-acr-name>.azurecr.io/task-app-backend:latest
   docker tag task-management-app_frontend:latest <your-acr-name>.azurecr.io/task-app-frontend:latest

   # Push images
   docker push <your-acr-name>.azurecr.io/task-app-backend:latest
   docker push <your-acr-name>.azurecr.io/task-app-frontend:latest
   ```

4. **Create Container Apps**:
   ```bash
   # Create environment
   az containerapp env create --name task-app-env --resource-group <your-resource-group> --location <your-location>

   # Create backend app
   az containerapp create --name task-app-backend --resource-group <your-resource-group> --environment task-app-env --image <your-acr-name>.azurecr.io/task-app-backend:latest --target-port 3000 --ingress external --env-vars "DATABASE_URL=<your-database-url>"

   # Create frontend app
   az containerapp create --name task-app-frontend --resource-group <your-resource-group> --environment task-app-env --image <your-acr-name>.azurecr.io/task-app-frontend:latest --target-port 80 --ingress external --env-vars "VITE_API_URL=<backend-app-url>/tasks"
   ```

5. **Configure Azure DNS**:
   - Create DNS records to point to your Container Apps

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Check connection strings
   - Verify network security settings
   - Ensure database credentials are correct

2. **Container Startup Failures**:
   - Check container logs
   - Verify environment variables
   - Check health check endpoints

3. **Frontend API Connection Issues**:
   - Ensure backend URL is correct in environment variables
   - Check CORS settings in backend
   - Verify network connectivity between services

### Debugging

1. **Check Container Logs**:
   ```bash
   # AWS
   aws logs get-log-events --log-group-name <log-group> --log-stream-name <log-stream>

   # GCP
   gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=backend"

   # Azure
   az containerapp logs show --name task-app-backend --resource-group <your-resource-group>
   ```

2. **Verify Database Migrations**:
   - Connect directly to the database to check if migrations ran successfully
   - Check migration logs in the backend service

3. **Inspect Network Connectivity**:
   - Test connectivity between services using network debugging tools
   - Check security group and firewall settings
