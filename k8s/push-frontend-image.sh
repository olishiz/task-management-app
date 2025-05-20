#!/bin/bash

# Script to build and push the frontend image to a container registry
# This assumes you already have the frontend Docker image built locally

# Exit on error
set -e

# Registry info (change as needed)
REGISTRY="oliver.azurecr.io"
IMAGE_NAME="task-app-frontend"
TAG="latest"

echo "Building frontend Docker image..."
cd ../frontend
docker build -t ${IMAGE_NAME}:${TAG} .

echo "Tagging image for ${REGISTRY}..."
docker tag ${IMAGE_NAME}:${TAG} ${REGISTRY}/${IMAGE_NAME}:${TAG}

echo "Logging in to ${REGISTRY}..."
# You may need to login first - uncomment and adjust one of these:
# az acr login --name oliver  # For Azure Container Registry
# aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws-account-id>.dkr.ecr.<region>.amazonaws.com  # For AWS ECR
# gcloud auth configure-docker  # For Google Container Registry

echo "Pushing image to ${REGISTRY}..."
docker push ${REGISTRY}/${IMAGE_NAME}:${TAG}

echo "✅ Frontend image successfully pushed to ${REGISTRY}/${IMAGE_NAME}:${TAG}"
echo "Now you can deploy the Kubernetes resources with:"
echo "  cd .."
echo "  ./apply-all.sh"
