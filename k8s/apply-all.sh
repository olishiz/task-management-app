#!/bin/bash

# Script to apply all Kubernetes manifests in order

set -e

echo "Deploying Task Management App to Kubernetes..."

# Create namespace first
kubectl apply -f namespace.yaml
echo "✅ Namespace created"

# Deploy PostgreSQL database
kubectl apply -f postgres.yaml
echo "✅ PostgreSQL resources applied"

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
kubectl wait --namespace task-management \
  --for=condition=ready pod \
  --selector=app=postgres \
  --timeout=120s
echo "✅ PostgreSQL is ready"

# Deploy backend
kubectl apply -f backend.yaml
echo "✅ Backend resources applied"

# Deploy frontend
kubectl apply -f frontend.yaml
echo "✅ Frontend resources applied"

# Deploy ingress
kubectl apply -f ingress.yaml
echo "✅ Ingress resources applied"

echo
echo "🎉 Task Management App deployment completed!"
echo
echo "You can check the status of your pods with:"
echo "  kubectl get pods -n task-management"
echo
echo "Access your application at: http://task-app.example.com"
echo "(Remember to update your DNS or /etc/hosts to point to the Ingress IP)"

# Get the Ingress IP address
echo
echo "Waiting for Ingress to get IP address..."
sleep 10
INGRESS_IP=$(kubectl get ingress -n task-management task-management-ingress -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

if [ -n "$INGRESS_IP" ]; then
  echo "Ingress IP address: $INGRESS_IP"
  echo
  echo "Add this line to your /etc/hosts file for local testing:"
  echo "$INGRESS_IP  task-app.example.com"
else
  echo "Ingress IP address not yet assigned. Check with:"
  echo "  kubectl get ingress -n task-management"
fi
