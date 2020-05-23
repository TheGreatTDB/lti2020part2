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
          console.log(this.deployments);
        })
        .catch(error => {
          console.log("Failed to load Deployment:");
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
          console.log(response.data);
          this.loadPods();
        })
        .catch(error => {
          console.log("Failed to delete selected Deployment:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadDeployment();
  }
};
</script>