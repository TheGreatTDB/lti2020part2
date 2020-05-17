# lti2020part2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# API ***/api
/v1/bindings -> POST

/v1/componentstatuses -> GET

/v1/configmaps -> POST/GET/PUT/DELETE

/v1/endpoints -> POST/GET/PUT/DELETE

/v1/events -> POST/GET/PUT/DELETE

/v1/limitranges -> POST/GET/PUT/DELETE

/v1/namespaces -> POST/GET/PUT/DELETE
/v1/namespaces/status -> GET
/v1/namespaces/finalize -> PUT

/v1/nodes -> POST/GET/PUT/DELETE
/v1/nodes/proxy -> POST/GET/PUT/DELETE
/v1/nodes/status -> GET

/v1/persistentvolumeclaims -> POST/GET/PUT/DELETE
/v1/persistentvolumeclaims/status -> GET

/v1/persistentvolumes -> POST/GET/PUT/DELETE
/v1/persistentvolumes/status -> GET

/v1/pods -> POST/GET/PUT/DELETE
/v1/pods/attach -> POST/GET
/v1/pods/binding -> POST
/v1/pods/eviction -> POST
/v1/pods/exec -> GET/POST
/v1/pods/log -> GET
/v1/pods/portforward -> POST/GET
/v1/pods/proxy -> POST/GET/PUT/DELETE
/v1/pods/status -> GET

/v1/podtemplates -> POST/GET/PUT/DELETE

/v1/replicationcontrollers -> POST/GET/PUT/DELETE
/v1/replicationcontrollers/scale -> GET/PUT
/v1/replicationcontrollers/status -> GET/PUT

/v1/resourcequotas -> POST/GET/PUT/DELETE
/v1/resourcequotas/status -> GET/PUT

/v1/secrets -> POST/GET/PUT/DELETE

/v1/serviceaccounts -> POST/GET/PUT/DELETE

/v1/services -> POST/GET/PUT/DELETE
/v1/services/proxy -> POST/GET/PUT/DELETE
/v1/services/status -> GET/PUT


# API para LOGS: (*/) (CHECK STATUS OF SERVICES ETC)
"/healthz",
"/healthz/autoregister-completion",
"/healthz/etcd",
"/healthz/log",
"/healthz/ping",
"/healthz/poststarthook/apiservice-openapi-controller",
"/healthz/poststarthook/apiservice-registration-controller",
"/healthz/poststarthook/apiservice-status-available-controller",
"/healthz/poststarthook/bootstrap-controller",
"/healthz/poststarthook/crd-informer-synced",
"/healthz/poststarthook/generic-apiserver-start-informers",
"/healthz/poststarthook/kube-apiserver-autoregistration",
"/healthz/poststarthook/rbac/bootstrap-roles",
"/healthz/poststarthook/scheduling/bootstrap-system-priority-classes",
"/healthz/poststarthook/start-apiextensions-controllers",
"/healthz/poststarthook/start-apiextensions-informers",
"/healthz/poststarthook/start-cluster-authentication-info-controller",
"/healthz/poststarthook/start-kube-aggregator-informers",
"/healthz/poststarthook/start-kube-apiserver-admission-initializer",

"/livez",
"/livez/autoregister-completion",
"/livez/etcd",
"/livez/log",
"/livez/ping",
"/livez/poststarthook/apiservice-openapi-controller",
"/livez/poststarthook/apiservice-registration-controller",
"/livez/poststarthook/apiservice-status-available-controller",
"/livez/poststarthook/bootstrap-controller",
"/livez/poststarthook/crd-informer-synced",
"/livez/poststarthook/generic-apiserver-start-informers",
"/livez/poststarthook/kube-apiserver-autoregistration",
"/livez/poststarthook/rbac/bootstrap-roles",
"/livez/poststarthook/scheduling/bootstrap-system-priority-classes",
"/livez/poststarthook/start-apiextensions-controllers",
"/livez/poststarthook/start-apiextensions-informers",
"/livez/poststarthook/start-cluster-authentication-info-controller",
"/livez/poststarthook/start-kube-aggregator-informers",
"/livez/poststarthook/start-kube-apiserver-admission-initializer",

"/readyz",
"/readyz/autoregister-completion",
"/readyz/etcd",
"/readyz/log",
"/readyz/ping",
"/readyz/poststarthook/apiservice-openapi-controller",
"/readyz/poststarthook/apiservice-registration-controller",
"/readyz/poststarthook/apiservice-status-available-controller",
"/readyz/poststarthook/bootstrap-controller",
"/readyz/poststarthook/crd-informer-synced",
"/readyz/poststarthook/generic-apiserver-start-informers",
"/readyz/poststarthook/kube-apiserver-autoregistration",
"/readyz/poststarthook/rbac/bootstrap-roles",
"/readyz/poststarthook/scheduling/bootstrap-system-priority-classes",
"/readyz/poststarthook/start-apiextensions-controllers",
"/readyz/poststarthook/start-apiextensions-informers",
"/readyz/poststarthook/start-cluster-authentication-info-controller",
"/readyz/poststarthook/start-kube-aggregator-informers",
"/readyz/poststarthook/start-kube-apiserver-admission-initializer",
"/readyz/shutdown"

POST BODY:
Node Post:
{
    "kind": "Pod",
    "apiVersion": "v1",
    "metadata":{
        "name": "nginx",
        "namespace": "default",
        "labels": {
            "name": "nginx"
        }
    },
    "spec": {
        "containers": [{
            "name": "nginx",
            "image": "nginx",
            "ports": [{"containerPort": 80}],
            "resources": {
                "limits": {
                    "memory": "128Mi",
                    "cpu": "500m"
                }
            }
        }]
    }
}
https://thenewstack.io/taking-kubernetes-api-spin/ <- see more info
https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/ <- see more info
https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.18/ <- see more info