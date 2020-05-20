<template>
  <div>
    <table class="table table-striped">
      <tr>
        <th>Pods: </th>
      </tr>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>NameSpace</th>
          <th>Ip Address</th>
          <th>podCIDR</th>
          <th>MaX CPUs</th>
          <th>Usage CPUs</th>
          <th>Max Memory</th>
          <th>Usage Memory</th>
          <th>Max Pods</th>
          <th>Usage Pods</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="node in nodes" :key="node.metadata.name">
          <td>{{ node.metadata.name }}</td>
          <td>{{ node.metadata.uid }}</td>
          <td>{{ node.status.addresses[0].address }}</td>
          <td>{{ node.spec.podCIDR }}</td>
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
          console.log(this.nodes)
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