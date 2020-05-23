<template>
  <div>
    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">Pod</h1>

      <p class="subheading font-weight-regular">Create a new Pod in a specific namespace</p>
      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="podName" label="Pod Name"></v-text-field>
        <v-select
          :items="namespaces"
          v-model="podNamespace"
          item-text="metadata.name"
          label="Namespace"
        ></v-select>
      </v-col>

      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="podImage" label="Image Name"></v-text-field>
      </v-col>

      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="podMemory" label="Memory Limits (Mi)"></v-text-field>
      </v-col>

      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="podCPU" label="CPU Limits (m)"></v-text-field>
      </v-col>

      <div class="my-2">
        <v-btn depressed v-on:click.prevent="createPod()" color="primary">Create Pod</v-btn>
      </div>
    </v-col>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      podName: "",
      podNamespace: {},
      podImage: "",
      podContainers: "",
      namespaces: [],
      containers: "",
      podCPU:"",
      podMemory: ""
    };
  },
  methods: {
    createPod: function() {
      var axiosCreatePod = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });
      axiosCreatePod
        .post(
          "/api/v1/namespaces/" + this.podNamespace + "/pods/",
          {
            kind: "Pod",
            apiVersion: "v1",
            metadata: {
              name: this.podName,
              namespace: this.podNamespace,
              labels: {
                name: this.podImage
              }
            },
            spec: {
              containers: [
                {
                  name: this.podImage,
                  image: this.podImage,
                  ports: [{ containerPort: 80 }],
                  resources: {
                    limits: {
                      memory: this.podMemory,
                      cpu: this.podCPU
                    }
                  }
                }
              ]
            }
          }
        )
        .then(response => {
          console.log(response);
          this.$store.commit("changeTab", "listPods");
        })
        .catch(error => {
          console.log("Failed to create Namespace");
          console.log(error);
        });
    },
    loadNamespaces: function() {
      var axiosNamespaces = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosNamespaces
        .get("/api/v1/namespaces")
        .then(response => {
          this.namespaces = response.data.items;
          console.log(this.namespaces);
        })
        .catch(error => {
          console.log("Failed to load Namespaces");
          console.log(error);
        });
    }
  },
  created() {
    this.loadNamespaces();
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>