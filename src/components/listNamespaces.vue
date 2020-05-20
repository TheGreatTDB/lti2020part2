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
          <th>Created At</th>
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
        <tr v-for="namespace in namespaces" :key="namespace.metadata.name">
          <td>{{ namespace.metadata.name }}</td>
          <td>{{ namespace.metadata.creationTimestamp}}</td>
          <!--  POR AQUI UM IF NO STATUS -->
          <td>{{ node.metadata.creationTimestamp }}</td>
          <td>{{ node.status.nodeInfo.kubeletVersion }}</td>
          <td>{{ node.status.addresses[0].address }}</td>
          <td>{{ node.metadata.labels["node-role.kubernetes.io/master"] }}</td>  <!-- SE tiver vazio entao é master-->
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
      namespaces: null
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
        .get("/api/v1/namespaces")
        .then(response => {
          this.namespaces = response.data.items;
          console.log(this.namespaces);
        })
        .catch(error => {
          console.log("Failed to load Namespaces:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadNodes();
  }
};
</script>