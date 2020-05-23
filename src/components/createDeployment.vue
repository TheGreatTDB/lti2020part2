<template>
  <div>
    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">Deployment</h1>

      <p
        class="subheading font-weight-regular"
      >Create a new Deployment with a specific number of replicas</p>
      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="deploymentName" label="Deployment Name"></v-text-field>
        <v-select
          :items="namespaces"
          v-model="deploymentNamespace"
          item-text="metadata.name"
          label="Namespace"
        ></v-select>
      </v-col>

      <v-col cols="6" sm="3" md="3">
        <v-subheader class="pl-0">Number of desired replicas</v-subheader>
        <v-slider :max="15" :min="1" v-model="deploymentReplicas" thumb-label>
          <template v-slot:append>
            <v-text-field
              v-model="deploymentReplicas"
              class="mt-0 pt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
              :min="1"
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>

      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="deploymentImage" label="Image"></v-text-field>
      </v-col>

      <div class="my-2">
        <v-btn depressed v-on:click.prevent="createDeployment()" color="primary">Create Deployment</v-btn>
      </div>
    </v-col>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      deploymentName: "",
      deploymentNamespace: "",
      deploymentImage: "",
      deploymentReplicas: 1,
      namespaces: []
    };
  },
  methods: {
    createDeployment: function() {
      if (this.deploymentImage == "") {
        console.log('no image');
      }

      var axiosCreatePod = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosCreatePod
        .post(
          "/apis/apps/v1/namespaces/" +
            this.deploymentNamespace+
            "/deployments",
          {
            apiVersion: "apps/v1",
            kind: "Deployment",
            metadata: {
              name: this.deploymentName,
              labels: {
                app: this.deploymentImage
              }
            },
            spec: {
              replicas: this.deploymentReplicas,
              selector: {
                matchLabels: {
                  app: this.deploymentImage
                }
              },
              template: {
                metadata: {
                  labels: {
                    app: this.deploymentImage
                  }
                },
                spec: {
                  containers: [
                    {
                      name: this.deploymentImage,
                      image: this.deploymentImage,
                      ports: [{ containerPort: 80 }]
                    }
                  ]
                }
              }
            }
          }
        )
        .then(response => {
          console.log(response);
          this.$emit("popup", "success", "Deployment Created");
          this.$store.commit("changeTab", "listDeployments");
        })
        .catch(error => {
          this.$emit("popup", "error", "Deployment Creation Failed");
          console.log("Failed to create Deployment");
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
          console.log("Failed to load Namespaces:");
          this.$emit("popup", "error", "Failed to load Namespace Options");
          console.log(error);
        });
    }
  },
  created() {
    this.loadNamespaces();
  }
};
</script>
