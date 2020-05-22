<template>
  <div>
    <p>Deployment Name:</p>
    <b-form-input class="w-25 mx-auto" v-model="deploymentName" placeholder="Pod Name" />

    <p>Deployment Replicas:</p>
    <b-form-input class="w-25 mx-auto" v-model="deploymentReplicas" placeholder="Deployment Replicas" />

    <p>Select Namespace:</p>
    <multiselect v-if="namespaces != null"
      v-model="deploymentNamespace"
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

    <p>Deployment Image:</p>
    <b-form-input class="w-25 mx-auto" v-model="deploymentImage" placeholder="Image (Default: nginx)" />
    
    <b-button variant="outline-primary"  v-on:click.prevent="cerateDeployment()">Create Deployment</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      deploymentName: "",
      deploymentNamespace: "",
      deploymentImage: "",
      deploymentReplicas: null,
      namespaces: null,
    };
  },
  methods: {
    cerateDeployment: function() {
      if(this.deploymentImage == ""){
        this.deploymentImage = "nginx";
      }

      var axiosCreatePod = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosCreatePod
        .post("/apis/apps/v1/namespaces/" + this.deploymentNamespace.metadata.name + "/deployments", 
          {
            "apiVersion":"apps/v1",
            "kind":"Deployment",
            "metadata":{
              "name": this.deploymentName,
              "labels":{
                "app": this.deploymentImage
              }
            },
            "spec": {
              "replicas" : 3,
              "selector": {
                "matchLabels" : {
                  "app":this.deploymentImage
                }
              },
              "template" : {
                "metadata" : {
                  "labels" : {
                    "app":this.deploymentImage
                  }
                },
                "spec":{
                    "containers":[{
                      "name":this.deploymentImage,
                      "image":this.deploymentImage,
                      "ports":[{"containerPort": 80}]
                    }]
                }
              }
            }
        }
        )
        .then(response => {
          console.log(response);
          this.$store.commit("changeTab", "listDeployments");
        })
        .catch(error => {
          console.log("Failed to create Deployment");
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