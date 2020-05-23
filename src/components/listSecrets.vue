<template>
  <div>
    <v-card>
      <v-card-title>
        Secrets
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="secrets" :search="search" class="elevation-1">
        <template v-slot:item.data="{ item }">
          <div>{{ Object.keys(item.data).length}}</div>
        </template>
      </v-data-table>
    </v-card>
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
          <th>Account Name</th>
          <th>Resource Version</th>
          <th>Age</th>
          <th>Type</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="secret in secrets" :key="secret.metadata.name">
          <td>{{ secret.metadata.name }}</td>
          <td>{{ secret.metadata.namespace }}</td>
          <td v-if="secret.metadata.annotations != undefined">{{ secret.metadata.annotations['kubernetes.io/service-account.name'] }}</td>
          <td v-else> ----- </td>
          <td>{{ secret.metadata.resourceVersion }}</td>
          <td>{{ secret.metadata.creationTimestamp }}</td>
          <td>{{ secret.type }}</td>
          <td><button class="btn btn-primary" v-on:click.prevent="openPopup(secret.data)">See Data</button></td>
        </tr>
      </tbody>
    </table>
    <v-bottom-sheet v-model="showData">
      <v-sheet class="text-center" height="200px">
        <v-btn
          class="mt-6"
          flat
          color="error"
          @click="showData = !showData">
          Close
        </v-btn>
        <div class="py-3">
          {{ selectedData }}
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      secrets: [],
      selectedData: "",
      showData: false,
      search: "",
      dialog: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "metadata.name"
        },
        { text: "Namespace", value: "metadata.namespace" },
        { text: "Type", value: "type" },
        { text: "Data", value: "data" },
        { text: "Age", value: "metadata.creationTimestamp" }
      ]
    };
  },
  methods: {
    loadSecrets: function() {
      var axiosPods = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosPods
        .get("/api/v1/secrets")
        .then(response => {
          this.secrets = response.data.items;
          this.$emit("popup", "info", "Secrets Loaded");
          console.log(this.secrets)
        })
        .catch(error => {
          console.log("Failed to load Secrets:");
          this.$emit("popup", "error", "Failed to Load Secrets");
          console.log(error);
        });
    },
    openPopup: function(data) {
      this.showData = true
      this.selectedData = data;

      const panelHandle = this.$showPanel({
        component: "slideout-panel",
        openOn: "bottom",
        height: 200,
        props: {
          text: this.selectedData
        }
      });

      console.log(panelHandle);

      panelHandle.promise.then(result => {
        console.log(result);
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
