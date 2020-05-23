<template>
  <div>
    <v-card>
      <v-card-title>
        Nodes
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="nodes" :search="search" class="elevation-1">
        <template v-slot:item.roles="{ item }">
          <div>{{ getRole(item) }}</div>
        </template>
        <template v-slot:item.status="{ item }">
          <div>{{ getStatus(item) }}</div>
        </template>
      </v-data-table>
    </v-card>
    <v-card>
      <v-card-title>
        Nodes Resources
        <v-spacer></v-spacer>
      </v-card-title>
      <v-data-table :headers="headers2" :items="nodes" :search="search" class="elevation-1"></v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      nodes: [],
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "metadata.name"
        },
        { text: "Status", value: "status" },
        { text: "Roles", value: "roles" },
        { text: "Age", value: "metadata.creationTimestamp" },
        { text: "Version", value: "status.nodeInfo.kubeletVersion" },
        { text: "Ip Address", value: "status.addresses[0].address" },
        { text: "OS image", value: "status.nodeInfo.osImage" },
        { text: "Kernel version", value: "status.nodeInfo.kernelVersion" },
        {
          text: "Container Runtime",
          value: "status.nodeInfo.containerRuntimeVersion"
        }
      ],
      headers2: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "metadata.name"
        },
        { text: "CPU Capacity", value: "status.capacity.cpu" },
        { text: "Allocatable CPU", value: "status.allocatable.cpu" },
        { text: "Memory Capacity", value: "status.capacity.memory" },
        { text: "Allocatable Memory", value: "status.allocatable.memory" },
        { text: "Pods Capacity", value: "status.capacity.pods" },
        { text: "Allocatable Pods", value: "status.allocatable.pods" }
      ]
    };
  },

  methods: {
    loadNodes: function() {
      var axiosNodes = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosNodes
        .get("/api/v1/nodes")
        .then(response => {
          this.nodes = response.data.items;
          this.$emit("popup", "info", "Nodes Loaded");
          console.log(this.nodes);
        })
        .catch(error => {
          console.log("Failed to load Nodes");
          this.$emit("popup", "error", "Failed to Load Nodes");
          console.log(error);
        });
    },
    getRole: function(node) {
      if (node.metadata.labels["node-role.kubernetes.io/master"] != undefined)
        return "Master";
      else return "Worker";
    },
    getStatus: function(node) {
      if (node.status.conditions[4].status != "True") return "NotReady";
      else return "Ready";
    }
  },
  created() {
    this.loadNodes();
  }
};
</script>