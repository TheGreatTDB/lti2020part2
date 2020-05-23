<template>
  <div>
    <v-card>
      <v-card-title>
        Services
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="services" :search="search" class="elevation-1">
        <template v-slot:item.ports="{ item }">
          <div>{{item.spec.ports[0].port}}/{{item.spec.ports[0].protocol}}</div>
        </template>
      </v-data-table>
    </v-card>

    <!-- <table class="table table-striped">
      <tr>
        <th>Services:</th>
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
    </table> -->
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      services: [],
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
        { text: "Type", value: "spec.type" },
        { text: "Cluster-IP", value: "spec.clusterIP" },
        { text: "Ports", value: "ports" },
        { text: "Age", value: "metadata.creationTimestamp" }
      ]
    };
  },
  methods: {
    loadServices: function() {
      var axiosServices = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosServices
        .get("/api/v1/services")
        .then(response => {
          this.services = response.data.items;
          console.log(this.services);
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