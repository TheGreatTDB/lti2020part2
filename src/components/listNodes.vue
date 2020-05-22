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

    <table class="table table-striped">
      <tr>
        <th>Nodes:</th>
      </tr>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Age</th>
          <th>Version</th>
          <th>Ip Address</th>
          <th>Roles</th>
          <th>OS image</th>
          <th>Kernel version</th>
          <th>Container Runtime</th>
          <th>Capacity CPUs</th>
          <th>Allocatable CPU</th>
          <th>Capacity Memory</th>
          <th>Allocatable Memory</th>
          <th>Capacity Pods</th>
          <th>Allocatable Pods</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="node in nodes" :key="node.metadata.name">
          <td>{{ node.metadata.name }}</td>
          <td>{{ node.status.conditions[3].type}}</td>
          <td>{{ node.metadata.creationTimestamp }}</td>
          <td>{{ node.status.nodeInfo.kubeletVersion }}</td>
          <td>{{ node.status.addresses[0].address }}</td>
          <td v-if="node.metadata.labels['node-role.kubernetes.io/master'] != undefined">master</td>
          <td v-else>worker</td>
          <td>{{ node.status.nodeInfo.osImage }}</td>
          <td>{{ node.status.nodeInfo.kernelVersion }}</td>
          <td>{{ node.status.nodeInfo.containerRuntimeVersion }}</td>
          <td>{{ node.status.capacity.cpu }}</td>
          <td>{{ node.status.allocatable.cpu }}</td>
          <td>{{ node.status.capacity.memory }}</td>
          <td>{{ node.status.allocatable.memory }}</td>
          <td>{{ node.status.capacity.pods }}</td>
          <td>{{ node.status.allocatable.pods }}</td>
        </tr>
      </tbody>
    </table>
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
      ]
    };
  },
  methods: {
    loadNodes: function() {
      var axiosPods = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/nodes")
        .then(response => {
          this.nodes = response.data.items;
          console.log(this.nodes);
        })
        .catch(error => {
          console.log("Failed to load Nodes");
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