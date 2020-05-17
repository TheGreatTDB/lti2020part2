<template>
  <div>
    <table class="table table-striped">
      <br />
      <tr>
        <th>Instances:</th>
      </tr>
    </table>
    <b-table v-if="this.pods != null" class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pod in pods" :key="pod.id">
          <td>{{ pod.id }}</td>
          <td>{{ pod.name }}</td>
        </tr>
      </tbody>
    </b-table>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      pods: null
    };
  },
  methods: {
    loadInstances: function() {
      var axiosPods = this.axios.create({
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          //"x-auth-token": 'Bearer ' + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/pods")
        .then(response => {
          this.pods = response.data.items;
        })
        .catch(error => {
          console.log("Failed to load Pods:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadInstances();
  }
};
</script>