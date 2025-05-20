# Task Management App Helm Chart

This Helm chart deploys the Task Management Application with its components: frontend, backend, and database.

## Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+
- PV provisioner support in the underlying infrastructure (if persistence is enabled)
- Ingress controller installed (if ingress is enabled)

## Installing the Chart

To install the chart with the release name `my-task-app`:

```bash
# Add the repo if it's hosted in a Helm repository
# helm repo add my-repo https://charts.example.com

# Update helm repositories
# helm repo update

# Install the chart
helm install my-task-app ./task-management-app
```

The command deploys the Task Management App on the Kubernetes cluster with default configuration. The [Parameters](#parameters) section lists the parameters that can be configured during installation.

## Uninstalling the Chart

To uninstall/delete the `my-task-app` deployment:

```bash
helm uninstall my-task-app
```

## Parameters

### Global parameters

| Name                | Description                                            | Value               |
|---------------------|--------------------------------------------------------|---------------------|
| `global.environment`| Environment (dev, staging, prod)                       | `prod`              |
| `global.domain`     | Domain name for ingress                                | `task-app.example.com` |

### Namespace parameters

| Name                | Description                                            | Value               |
|---------------------|--------------------------------------------------------|---------------------|
| `namespace.create`  | Create namespace if it doesn't exist                   | `true`              |
| `namespace.name`    | Name of the namespace                                  | `task-management`   |

### Image parameters

| Name                    | Description                                       | Value                |
|-------------------------|---------------------------------------------------|----------------------|
| `image.registry`        | Container image registry                          | `oliver.azurecr.io`  |
| `image.pullPolicy`      | Container image pull policy                       | `IfNotPresent`       |
| `image.pullSecrets`     | Container image pull secrets                      | `[]`                 |

### Frontend parameters

| Name                         | Description                                    | Value                |
|------------------------------|------------------------------------------------|----------------------|
| `frontend.name`              | Frontend component name                        | `frontend`           |
| `frontend.replicaCount`      | Number of frontend replicas                    | `2`                  |
| `frontend.image.repository`  | Frontend image repository                      | `task-app-frontend`  |
| `frontend.image.tag`         | Frontend image tag                             | `latest`             |
| `frontend.service.type`      | Kubernetes Service type                        | `ClusterIP`          |
| `frontend.service.port`      | Service port                                   | `80`                 |
| `frontend.resources.limits`  | Resource limits for frontend containers        | See `values.yaml`    |
| `frontend.resources.requests`| Resource requests for frontend containers      | See `values.yaml`    |
| `frontend.livenessProbe`     | Liveness probe configuration                   | See `values.yaml`    |
| `frontend.readinessProbe`    | Readiness probe configuration                  | See `values.yaml`    |
| `frontend.env`               | Environment variables for frontend             | See `values.yaml`    |

### Backend parameters

| Name                        | Description                                    | Value                |
|-----------------------------|------------------------------------------------|----------------------|
| `backend.name`              | Backend component name                         | `backend`            |
| `backend.replicaCount`      | Number of backend replicas                     | `2`                  |
| `backend.image.repository`  | Backend image repository                       | `task-app-backend`   |
| `backend.image.tag`         | Backend image tag                              | `latest`             |
| `backend.service.type`      | Kubernetes Service type                        | `ClusterIP`          |
| `backend.service.port`      | Service port                                   | `80`                 |
| `backend.service.targetPort`| Target port                                    | `3000`               |
| `backend.resources.limits`  | Resource limits for backend containers         | See `values.yaml`    |
| `backend.resources.requests`| Resource requests for backend containers       | See `values.yaml`    |
| `backend.livenessProbe`     | Liveness probe configuration                   | See `values.yaml`    |
| `backend.readinessProbe`    | Readiness probe configuration                  | See `values.yaml`    |
| `backend.startupProbe`      | Startup probe configuration                    | See `values.yaml`    |
| `backend.env`               | Environment variables for backend              | See `values.yaml`    |
| `backend.command`           | Command to override default container command  | See `values.yaml`    |
| `backend.args`              | Args to override default container args        | See `values.yaml`    |

### Database parameters

| Name                          | Description                                   | Value               |
|-------------------------------|-----------------------------------------------|---------------------|
| `database.enabled`            | Enable PostgreSQL deployment                  | `true`              |
| `database.name`               | Database component name                       | `postgres`          |
| `database.image.repository`   | Database image repository                     | `postgres`          |
| `database.image.tag`          | Database image tag                            | `16-alpine`         |
| `database.image.pullPolicy`   | Database image pull policy                    | `IfNotPresent`      |
| `database.service.port`       | Database service port                         | `5432`              |
| `database.persistence.enabled`| Enable persistence using PVC                  | `true`              |
| `database.persistence.size`   | PVC Storage Request                           | `5Gi`               |
| `database.persistence.storageClass` | PVC Storage Class                       | `""`                |
| `database.resources.limits`   | Resource limits for database containers       | See `values.yaml`   |
| `database.resources.requests` | Resource requests for database containers     | See `values.yaml`   |
| `database.env`                | Environment variables for database            | See `values.yaml`   |
| `database.secret.enabled`     | Enable sensitive data in secrets              | `true`              |
| `database.secret.POSTGRES_USER` | PostgreSQL username                         | `postgres`          |
| `database.secret.POSTGRES_PASSWORD` | PostgreSQL password                     | `postgres`          |
| `database.probes`             | Liveness and readiness probes configuration   | See `values.yaml`   |

### Ingress parameters

| Name                      | Description                                       | Value               |
|---------------------------|---------------------------------------------------|---------------------|
| `ingress.enabled`         | Enable ingress controller resource                | `true`              |
| `ingress.className`       | IngressClass that will be used                    | `nginx`             |
| `ingress.annotations`     | Additional annotations for the Ingress resource   | See `values.yaml`   |
| `ingress.hosts`           | List of hosts and paths for ingress               | See `values.yaml`   |
| `ingress.tls`             | TLS configuration for ingress                     | `[]`                |

### Metrics parameters

| Name                          | Description                                   | Value               |
|-------------------------------|-----------------------------------------------|---------------------|
| `metrics.enabled`             | Enable metrics collection                     | `false`             |
| `metrics.serviceMonitor.enabled` | Enable ServiceMonitor resource for scraping | `false`             |

## Configuration and installation details

### Using external database

To use an external database, set `database.enabled` to `false` and configure the `backend.env.DATABASE_URL` to point to your external database.

### Setting up TLS with ingress

To enable TLS for the ingress, configure the `ingress.tls` section in the `values.yaml` file:

```yaml
ingress:
  tls:
    - secretName: task-app-tls-secret
      hosts:
        - task-app.example.com
```

Then create a Secret containing the TLS certificates.

### Using custom registry

When using a private registry, set the `image.registry` value and provide credentials in `image.pullSecrets`.

## Upgrading

### To 1.0.0

This is the first stable release of the chart, establishing the current API.

## Troubleshooting

### Pods fail to start with image pull errors

If you encounter `ImagePullBackOff` errors, check:
- Image registry accessibility
- Image pull secrets configuration
- Image name and tag correctness

### Database migrations fail

If the backend can't connect to the database or migrations fail:
- Check that the database pod is running and ready
- Verify the DATABASE_URL environment variable
- Check that the PostgreSQL service is reachable from the backend pods
- Examine the backend pod logs for specific error messages

### Ingress issues

If the application is not accessible via ingress:
- Verify the ingress controller is properly installed and running
- Check if the ingress resource is correctly configured
- Ensure DNS records point to the ingress controller's external IP
