<template>
  <div>
    <table class="table table-striped">
        <th>Namespaces:</th>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Resource Version</th>
          <th>Manager</th>
          <th>API Version</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="namespace in namespaces" :key="namespace.metadata.name">
          <td>{{ namespace.metadata.name }}</td>
          <td>{{ namespace.metadata.creationTimestamp}}</td>
          <td>{{ namespace.metadata.resourceVersion }}</td>
          <td>{{ namespace.metadata.managedFields[0].manager }}</td>
          <td>{{ namespace.metadata.managedFields[0].apiVersion }}</td>
          <td>{{ namespace.status.phase }}</td>
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