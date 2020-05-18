<template>
  <div>
    <p>Pod Name:</p>
    <b-form-input class="w-25 mx-auto" v-model="podName" placeholder="Pod Name" />

    <p>Select Namespace:</p>
    <multiselect v-if="namespaces != null"
      v-model="podNamespace"
      :options="namespaces"
      :multiple="false"
      label='metadata'
      track-by='metadata'
      placeholder="Pick 1 Namespace"
      class="table table-striped"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span
          class="multiselect__single"
          v-if="values.length &amp;&amp; !isOpen"
        >{{ values.length }} options selected</span>
      </template>
    </multiselect>

    <!--<p>Select Containers:</p>
    <multiselect v-if="containers != null"
      v-model="podContainers"
      :options="containers"
      :multiple="true"
      label='metadata'
      track-by='metadata'
      placeholder="Pick 1 or More Containers"
      class="table table-striped"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
        <span
          class="multiselect__single"
          v-if="values.length &amp;&amp; !isOpen"
        >{{ values.length }} options selected</span>
      </template>
    </multiselect>-->
    
    <b-button variant="outline-primary"  v-on:click.prevent="createPod()">Create Pod</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      podName: "",
      podNamespace: null,
      podContainers: null,
      namespaces: null,
      containers: null,
    };
  },
  methods: {
    createPod: function() {
      var axiosCreatePod = this.axios.create({
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          //"x-auth-token": 'Bearer ' + this.$store.state.token
        }
      });

      // this.teste();

      axiosCreatePod
        .post("/api/v1/namespaces/" + this.podNamespace.metadata.name + "/pods/", 
          {
            kind: "Pod",
            apiVersion: "v1",
            metadata:{
                name: this.podName,
                namespace: this.podNamespace.metadata.name,
                labels: {
                    "name": "nginx"
                }
            },
            spec: {
                containers: [{
                    name: "nginx",
                    image: "nginx",
                    ports: [{"containerPort": 80}],
                    resources: {
                        limits: {
                            memory: "128Mi",
                            cpu: "500m"
                        }
                    }
                }]
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log("Failed to create Volume");
          console.log(error);
        });
    },
    loadNamespaces: function() {
      var axiosNamespaces = this.axios.create({
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          //"x-auth-token": 'Bearer ' + this.$store.state.token
        }
      });

      axiosNamespaces
        .get("/api/v1/namespaces")
        .then(response => {
          this.namespaces = response.data.items;
          console.log(this.namespaces)
        })
        .catch(error => {
          console.log("Failed to load Namespaces:");
          console.log(error);
        });
    },
    loadContainers: function() {
      var axiosContainers = this.axios.create({
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          //"x-auth-token": 'Bearer ' + this.$store.state.token
        }
      });

      axiosContainers
        .get("/api/v1/containers")
        .then(response => {
          this.containers = response.data.items;
          console.log(this.containers)
        })
        .catch(error => {
          console.log("Failed to load Namespaces:");
          console.log(error);
        });
    }
    // teste: function() {
    //     console.log(this.instanceNetworks)

    //     this.instanceNetworks.forEach(network => {
    //         let aux = {uuid : network.id}
    //         this.instanceNetworksUuid.push(aux)
    //     })

    //     console.log(this.instanceNetworksUuid)
    // }
  },
  created(){
    this.loadNamespaces();
    //this.loadContainers();
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>