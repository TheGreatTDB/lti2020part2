<template>
  <div>
    <table class="table table-striped">
      <tr>
        <th>Deployments:</th>
      </tr>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>NameSpace</th>
          <th>Age</th>
          <th>Generation</th>
          <th>Replicas</th>
          <th>Template Volume Name</th>
          <th>Template Containers</th>
          <th>Template Restart Policy</th>
          <th>TemplateDNS Policy</th>
          <th>Template Service Account Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deployment in deployments" :key="deployment.metadata.name">
          <td>{{ deployment.metadata.name }}</td>
          <td>{{ deployment.metadata.namespace }}</td>
          <td>{{ deployment.metadata.creationTimestamp }}</td>
          <td>{{ deployment.metadata.generation }}</td>
          <td>{{ deployment.spec.replicas }}</td>
          <td v-if="deployment.spec.template.spec.volumes != undefined">{{ deployment.spec.template.spec.volumes[0].name }}</td>
          <td v-if="deployment.spec.template.spec.volumes == undefined"> --- </td>
          <td>{{ deployment.spec.template.spec.containers.length }}</td>
          <td>{{ deployment.spec.template.spec.restartPolicy }}</td>
          <td>{{ deployment.spec.template.spec.dnsPolicy }}</td>
          <td>{{ deployment.spec.template.spec.serviceAccountName }}</td>
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
      deployments: null

    };
  },
  methods: {
    loadDeployment: function() {
      var axiosServices = this.axios.create({
        headers: {
         "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosServices
        .get("/apis/apps/v1/deployments")
        .then(response => {
          this.deployments = response.data.items;
          console.log(this.deployments)
        })
        .catch(error => {
          console.log("Failed to load Deployment:");
          console.log(error);
        });
    }
  },
  created() {
    this.loadDeployment();
  }
};
</script>