<template>
  <div>
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
          <!--  POR AQUI UM IF NO STATUS -->
          <td>{{ node.metadata.creationTimestamp }}</td>
          <td>{{ node.status.nodeInfo.kubeletVersion }}</td>
          <td>{{ node.status.addresses[0].address }}</td>
          
          <td v-if="node.metadata.labels['node-role.kubernetes.io/master'].length == 0">master</td>
          <td v-if="node.metadata.labels['node-role.kubernetes.io/master'].length != 0">
            {{ node.metadata.labels["node-role.kubernetes.io/master"] }}
          </td>

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
      nodes: null
    };
  },
  methods: {
    loadNodes: function() {
      var axiosPods = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/nodes")
        .then(response => {
          this.nodes = response.data.items;
          console.log(this.nodes);
        })
        .catch(error => {
          console.log("Failed to load Pods:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadNodes();
  }
};
</script>