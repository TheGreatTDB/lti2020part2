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
          <th>Containers</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pod in pods" :key="pod.metadata.name">
          <td>{{ pod.metadata.name }}</td>
          <td>{{ pod.metadata.uid }}</td>
          <td>{{ pod.spec.containers.length }}</td>
          <td>{{ pod.status.phase }}</td>
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
      pods: null

    };
  },
  methods: {
    loadPods: function() {
      var axiosPods = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/pods")
        .then(response => {
          this.pods = response.data.items;
          console.log(this.pods)
        })
        .catch(error => {
          console.log("Failed to load Pods:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadPods();
  }
};
</script>