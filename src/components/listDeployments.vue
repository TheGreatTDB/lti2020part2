<template>
  <div>
    <v-card>
      <v-card-title>
        Deployments
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="deployments" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="changetab()"
                  v-on="on"
                >Create Deployment</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Replicas</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="numberReplicas" label="Desired number of replicas"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.ready="{ item }">
          <div>{{item.status.readyReplicas }}/{{ item.status.replicas }}</div>
        </template>
        <template v-slot:item.selector="{ item }">
          <div>{{item.metadata.labels }}</div>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="openDialog(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteDeployment(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      deployments: [],
      selectedDeployment: {},
      numberReplicas: "",
      search: "",
      dialog: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "metadata.name"
        },
        { text: "Namespace", value: "metadata.namespace" },
        { text: "Ready", value: "ready" },
        { text: "Age", value: "metadata.creationTimestamp" },
        { text: "Up-To-Date", value: "status.updatedReplicas" },
        { text: "Available", value: "status.availableReplicas" },
        { text: "Containers", value: "spec.template.spec.containers[0].name" },
        { text: "Images", value: "spec.template.spec.containers[0].image" },
        { text: "Selector", value: "selector" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    changetab: function() {
      this.$store.commit("changeTab", "createDeployment");
    },
    loadDeployment: function() {
      var axiosServices = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosServices
        .get("/apis/apps/v1/deployments")
        .then(response => {
          this.deployments = response.data.items;
          this.$emit("popup", "info", "Deployments loaded");
          console.log(this.deployments);
        })
        .catch(error => {
          console.log("Failed to load Deployment:");
          this.$emit("popup", "error", "Deployments Failed to Load");
          console.log(error);
        });
    },
    deleteDeployment: function(deployment) {
      var axiosDeleteDeployment = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });
      axiosDeleteDeployment
        .delete(
          "/apis/apps/v1/namespaces/" +
            deployment.metadata.namespace +
            "/deployments/" +
            deployment.metadata.name
        )
        .then(response => {
          this.$emit("popup", "warning", "Deployment Deleted");
          console.log(response.data);
        })
        .catch(error => {
          console.log("Failed to delete selected Deployment:");
          this.$emit("popup", "error", "Deployment Failed to Delete");
          console.log(error);
        });
    },
    editReplicas() {
      console.log(this.numberReplicas);

      var axiosUpdateReplicas = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "application/strategic-merge-patch+json"
        }
      });

      axiosUpdateReplicas
        .patch(
          "/apis/apps/v1/namespaces/" +
            this.selectedDeployment.metadata.namespace +
            "/deployments/" +
            this.selectedDeployment.metadata.name,
          {
            apiVersion: "apps/v1",
            kind: "Deployment",
            "spec": {
              "replicas": Number(this.numberReplicas)
            }
          }
        )
        .then(response => {
          console.log(response);
          this.close();
          this.$emit("popup", "success", "Deployment Edited");
          var index = this.deployments.findIndex(this.selectedDeployment)
          console.log(index)
        })
        .catch(error => {
          this.$emit("popup", "error", "Deployment Failed to Edit");
          console.log("Failed to update Deployment");
          console.log(error);
        });
    },

    openDialog(item) {
      this.dialog = true;
      this.selectedDeployment = item;
    },

    close() {
      this.dialog = false;
    },

    save() {
      this.editReplicas();
      this.close();
    }
  },
  created() {
    this.loadDeployment();
  }
};
</script>