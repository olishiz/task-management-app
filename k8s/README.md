# Kubernetes Deployment Guide for Task Management App

This guide explains how to deploy the Task Management App to a Kubernetes cluster.

## Prerequisites

- A Kubernetes cluster (e.g., AKS, GKE, EKS, or Minikube for local testing)
- `kubectl` command-line tool configured to communicate with your cluster
- Docker images pushed to a container registry (e.g., Docker Hub, ACR, GCR)
- Ingress controller installed in your cluster (e.g., NGINX Ingress Controller)

## Kubernetes Resources

This deployment consists of the following Kubernetes resources:

1. **Namespace**: Isolates the application resources
2. **ConfigMaps**: Stores non-sensitive configuration
3. **Secrets**: Stores sensitive configuration (database credentials)
4. **Deployments**: Manages the application pods
5. **Services**: Provides network access to the pods
6. **PersistentVolumeClaim**: Provides persistent storage for PostgreSQL
7. **Ingress**: Manages external access to the services

## Files Structure

- `namespace.yaml`: Creates the `task-management` namespace
- `postgres.yaml`: PostgreSQL database deployment, service, and storage
- `backend.yaml`: Backend API deployment and service
- `frontend.yaml`: Frontend web app deployment and service
- `ingress.yaml`: Ingress rules for external access
- `apply-all.sh`: Script to apply all resources in the correct order

## Deployment Steps

### 1. Push Docker Images to Registry

Ensure your Docker images are built and pushed to a container registry:

```bash
# Build images (if not already built)
docker-compose build

# Tag images for your registry
docker tag task-management-app_backend:latest your-registry/task-app-backend:latest
docker tag task-management-app_frontend:latest your-registry/task-app-frontend:latest

# Push images
docker push your-registry/task-app-backend:latest
docker push your-registry/task-app-frontend:latest
```

### 2. Update Image References

Update the image references in `backend.yaml` and `frontend.yaml` to point to your pushed images:

```yaml
# In backend.yaml
spec:
  template:
    spec:
      containers:
      - name: backend
        image: your-registry/task-app-backend:latest
        
# In frontend.yaml
spec:
  template:
    spec:
      containers:
      - name: frontend
        image: your-registry/task-app-frontend:latest
```

### 3. Configure Ingress Host

Update the host in `ingress.yaml` to match your domain:

```yaml
# In ingress.yaml
spec:
  rules:
  - host: your-domain.com
    http:
      paths:
      # ...
```

### 4. Deploy Resources

Use the provided script to deploy all resources:

```bash
cd k8s
./apply-all.sh
```

Or apply them manually in the correct order:

```bash
kubectl apply -f namespace.yaml
kubectl apply -f postgres.yaml
kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress.yaml
```

### 5. Verify Deployment

Check the status of the deployed resources:

```bash
# Check pods
kubectl get pods -n task-management

# Check services
kubectl get svc -n task-management

# Check ingress
kubectl get ingress -n task-management
```

## Accessing the Application

Once deployed, the application will be accessible at the domain configured in the Ingress resource:

- Web UI: `http://your-domain.com/`
- API: `http://your-domain.com/api/`

For local testing with Minikube, you may need to map the Ingress IP to your domain in `/etc/hosts`:

```
192.168.49.2  your-domain.com
```

## Scaling the Application

You can scale the deployments using:

```bash
kubectl scale deployment/backend -n task-management --replicas=3
kubectl scale deployment/frontend -n task-management --replicas=3
```

## Troubleshooting

### Check Pods Status

```bash
kubectl get pods -n task-management
kubectl describe pod <pod-name> -n task-management
```

### View Pod Logs

```bash
kubectl logs <pod-name> -n task-management
```

### Debug Database Connection

```bash
# Find a backend pod
kubectl get pods -n task-management -l app=backend

# Start a shell session
kubectl exec -it <backend-pod-name> -n task-management -- /bin/sh

# Check database connection
npx prisma studio
```

## Environment Variables

The following environment variables are used:

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Production environment
- `PORT`: Port for the API server

### Frontend
- `VITE_API_URL`: URL to the backend API

## Cleanup

To remove all deployed resources:

```bash
kubectl delete namespace task-management
```

This will delete all resources within the namespace.
