<template>
  <div>
    <table class="table table-striped">
      <tr>
        <th>Endpoints:</th>
      </tr>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>NameSpace</th>
          <th>Age</th>
          <th>IP</th>
          <th>Name</th>
          <th>Port</th>
          <th>Protocol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="endpoint in endpoints" :key="endpoint.metadata.name">
          <td>{{ endpoint.metadata.name }}</td>
          <td>{{ endpoint.metadata.namespace }}</td>
          <td>{{ endpoint.metadata.creationTimestamp }}</td>
          <td v-if="endpoint.subsets != undefined">{{ endpoint.subsets[0].addresses }}</td>
          <td v-if="endpoint.subsets != undefined">{{ endpoint.subsets[0].ports }}</td>
          <td v-if="endpoint.subsets != undefined">{{ endpoint.subsets[0].ports }}</td>
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
      endpoints: null

    };
  },
  methods: {
    loadEnpoints: function() {
      var axiosPods = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/endpoints")
        .then(response => {
          this.endpoints = response.data.items;
          console.log(this.endpoints)
        })
        .catch(error => {
          console.log("Failed to load Endpoints:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadEnpoints();
  }
};
</script>