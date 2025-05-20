# Kubernetes Deployment Options

This directory contains two approaches for deploying the Task Management App to Kubernetes:

1. **Raw Kubernetes Manifests** (in the `../k8s/` directory)
2. **Helm Chart** (in this directory)

## Comparison

### Raw Kubernetes Manifests

**Pros:**
- Simple to understand and apply
- No additional tools required beyond `kubectl`
- Straightforward to customize by editing YAML files

**Cons:**
- Less flexible for configuration changes
- No versioning or release management
- Harder to maintain across different environments
- Manual management of dependencies and deployment order

**When to use:**
- For simple deployments with few customizations
- When Helm is not available or allowed
- For learning/understanding Kubernetes resources

### Helm Chart

**Pros:**
- Template-based for flexible configuration
- Value overrides for different environments
- Built-in release management
- Easier upgrades and rollbacks
- Handles dependencies and deployment order

**Cons:**
- Requires Helm installation
- Additional learning curve for Helm concepts
- Templates can be complex to understand

**When to use:**
- For production deployments
- When managing multiple environments (dev, staging, prod)
- For complex applications with multiple components
- When you need release management capabilities

## Using the Helm Chart

### Prerequisites

- Kubernetes 1.19+
- Helm 3.2.0+

### Installation

```bash
# From the helm directory
helm install task-app ./task-management-app

# With custom values
helm install task-app ./task-management-app --values custom-values.yaml

# For a specific environment
helm install task-app ./task-management-app --set global.environment=staging
```

### Customization

Create a custom values file:

```yaml
# custom-values.yaml
global:
  domain: your-domain.com

backend:
  replicaCount: 3
  resources:
    limits:
      cpu: 1000m
      memory: 1Gi

database:
  persistence:
    size: 10Gi
```

Then apply it:

```bash
helm install task-app ./task-management-app -f custom-values.yaml
```

### Upgrading

```bash
helm upgrade task-app ./task-management-app -f custom-values.yaml
```

### Uninstalling

```bash
helm uninstall task-app
```

## Using Raw Kubernetes Manifests

See the [../k8s/README.md](../k8s/README.md) for instructions on using the raw Kubernetes manifests.
