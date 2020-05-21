<template>
  <div>
    <table class="table table-striped">
      <slideout-panel></slideout-panel>
      <tr>
        <th>Pods: </th>
      </tr>
    </table>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>NameSpace</th>
          <th>Account Name</th>
          <th>Resource Version</th>
          <th>Age</th>
          <th>Type</th>
          <th>Token</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="secret in secrets" :key="secret.metadata.name">
          <td>{{ secret.metadata.name }}</td>
          <td>{{ secret.metadata.namespace }}</td>
          <td>{{ secret.metadata.annotations }}</td>
          <td>{{ secret.metadata.resourceVersion }}</td>
          <td>{{ secret.metadata.creationTimestamp }}</td>
          <td>{{ secret.type }}</td>
          <td><button class="btn btn-primary" v-on:click.prevent="openPopup(secret.data.token)">See Token</button></td>
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
      secrets: null,
      selectedToken: "",
    };
  },
  methods: {
    loadSecrets: function() {
      var axiosPods = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/secrets")
        .then(response => {
          this.secrets = response.data.items;
          console.log(this.secrets)
        })
        .catch(error => {
          console.log("Failed to load Secrets:");
          console.log(error);
        });
    },
    openPopup: function(token) {
      this.selectedToken = token;

      const panelHandle = this.$showPanel({
        component : 'slideout-panel',
        openOn: 'bottom',
        height: 200,
        props: {
          text: 12312313
        }
      })

      console.log(panelHandle)

      panelHandle.promise
        .then(result => {
          console.log(result)
        });

    }
  },
  created() {
    this.loadSecrets();
  }
};
</script>
<style>
    @import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
</style>