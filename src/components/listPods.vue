<template>
  <div>
    <v-card>
      <v-card-title>
        Pods
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="pods" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" @click="changetab()" v-on="on">Create Pod</v-btn>
              </template>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="deletePod(item)">mdi-delete</v-icon>
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
      pods: [],
      search: "",
      dialog: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "metadata.name"
        },
        { text: "Status", value: "status.phase" },
        { text: "Restarts", value: "status.containerStatuses[0].restartCount" },
        { text: "Age", value: "metadata.creationTimestamp" },
        { text: "Namespace", value: "metadata.namespace" },
        { text: "Containers", value: "spec.containers.length" },
        { text: "Node", value: "spec.nodeName" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    changetab: function() {
      this.$store.commit("changeTab", "createPod");
    },
    loadPods: function() {
      var axiosPods = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/pods")
        .then(response => {
          this.pods = response.data.items;
          this.$emit("popup", "info", "Pods Loaded");
          console.log(this.pods);
        })
        .catch(error => {
          console.log("Failed to load Pods:");
          this.$emit("popup", "error", "Failed to Load Nodes");
          console.log(error);
        });
    },
    deletePod: function(selectedPod) {
      var axiosDeletePod = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosDeletePod
        .delete(
          "/api/v1/namespaces/" +
            selectedPod.metadata.namespace +
            "/pods/" +
            selectedPod.metadata.name
        )
        .then(response => {
          console.log(response.data);
          this.$emit("popup", "warning", "Pod Deleted");

          var index = 0;
          this.pods.forEach(pod => {
            if(pod.metadata.name == selectedPod.metadata.name){
              this.pods.splice(index, 1);
            }
            index++;
          })
        })
        .catch(error => {
          console.log("Failed to delete selected Pod:");
          this.$emit("popup", "error", "Failed to Delete Pod");
          console.log(error);
        });
    }
  },
  created() {
    this.loadPods();
  }
};
</script>