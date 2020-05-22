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

    <p>Pod Image:</p>
    <b-form-input class="w-25 mx-auto" v-model="podImage" placeholder="Image (Default: nginx)" />

    <p>Pod Memory (Mi):</p>
    <b-form-input class="w-25 mx-auto" v-model="podMemory" placeholder="Pod Memory (Mi)" />

    <p>Pod CPU (m):</p>
    <b-form-input class="w-25 mx-auto" v-model="podCPU" placeholder="Pod CPU (m)" />
    
    <b-button variant="outline-primary"  v-on:click.prevent="createPod()">Create Pod</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      podName: "",
      podNamespace: null,
      podImage: "",
      podContainers: null,
      namespaces: null,
      containers: null,
    };
  },
  methods: {
    createPod: function() {
      if(this.podImage == ""){
        this.podImage = "nginx"
      }
      var axiosCreatePod = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosCreatePod
        .post("/api/v1/namespaces/" + this.podNamespace.metadata.name + "/pods/", 
          {
            kind: "Pod",
            apiVersion: "v1",
            metadata:{
                name: this.podName,
                namespace: this.podNamespace.metadata.name,
                labels: {
                    "name": this.podImage
                }
            },
            spec: {
                containers: [{
                    name: this.podImage,
                    image: this.podImage,
                    ports: [{"containerPort": 80}],
                    resources: {
                        limits: {
                            memory: this.podMemory,
                            cpu: this.podCPU
                        }
                    }
                }]
            }
          }
        )
        .then(response => {
          console.log(response);
          this.$store.commit("changeTab", "listPods");
        })
        .catch(error => {
          console.log("Failed to create Pod");
          console.log(error);
        });
    },
    loadNamespaces: function() {
      var axiosNamespaces = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
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
  },
  created(){
    this.loadNamespaces();
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>