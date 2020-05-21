<template>
  <div>
    <table class="table table-striped">
      <tr>
        <th>Services: </th>
      </tr>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>NameSpace</th>
          <th>Age</th>
          <th>Component</th>
          <th>Provider</th>
          <th>Service Name</th>
          <th>Protocol</th>
          <th>Port</th>
          <th>Target Port</th>
          <th>Cluster IP</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="service in services" :key="service.metadata.name">
          <td>{{ service.metadata.name }}</td>
          <td>{{ service.metadata.namespace }}</td>
          <td>{{ service.metadata.creationTimestamp }}</td>
          <td>{{ service.metadata.labels.component }}</td>
          <td>{{ service.metadata.labels.provider }}</td>
          <td>{{ service.spec.ports[0].name }}</td>
          <td>{{ service.spec.ports[0].protocol }}</td>
          <td>{{ service.spec.ports[0].port }}</td>
          <td>{{ service.spec.ports[0].targetPort }}</td>
          <td>{{ service.spec.clusterIP }}</td>
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
      services: null

    };
  },
  methods: {
    loadServices: function() {
      var axiosServices = this.axios.create({
        headers: {
         "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosServices
        .get("/api/v1/services")
        .then(response => {
          this.services = response.data.items;
          console.log(this.services)
        })
        .catch(error => {
          console.log("Failed to load Pods:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadServices();
  }
};
</script>