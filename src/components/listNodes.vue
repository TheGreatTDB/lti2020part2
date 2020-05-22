<template>
  <div>
    <DataTable
      :filters="filters"
      :paginator="true"
      :rows="10"
      :value="nodes"
      style="margin-bottom: 2rem"
    >
      <template #header>
        <div style="line-height:1.87em" class="p-clearfix">
          <Button icon="pi pi-refresh" style="float: left" />Nodes
        </div>
        <div style="text-align: right">
          <i class="pi pi-search" style="margin: 4px 4px 0 0"></i>
          <InputText v-model="filters['global']" placeholder="Global Search" size="50" />
        </div>
      </template>
      <Column :sortable="true" field="metadata.name" header="Name"></Column>
      <Column :sortable="true" field="status.conditions[3].type" header="Status"></Column>
      <Column :sortable="true" field="metadata.creationTimestamp" header="Age"></Column>
      <Column :sortable="true" field="status.nodeInfo.kubeletVersion " header="Version"></Column>
      <Column :sortable="true" field="status.addresses[0].address" header="Ip Address"></Column>
      <!-- <Column :sortable="true" field="metadata.creationTimestamp" header="Role"></Column> -->
      <Column :sortable="true" field="status.nodeInfo.osImage" header="OS image"></Column>
      <Column :sortable="true" field="status.nodeInfo.kernelVersion" header="Kernel Runtime"></Column>
      <Column :sortable="true" field="status.nodeInfo.containerRuntimeVersion" header="Age"></Column>
          <template #footer>In total there are {{nodes ? nodes.length : 0 }} nodes.</template>
    </DataTable>

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
      nodes: null,
      filters: {}
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
    }
  },
  created() {
    this.loadNodes();
  }
};
</script>