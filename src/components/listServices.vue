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
          this.$emit("popup", "info", "Services Loaded");
          console.log(this.services)
        })
        .catch(error => {
          console.log("Failed to load Pods:");
          this.$emit("popup", "error", "Failed to Load Services");
          console.log(error);
        });
    }
  },
  created() {
    this.loadServices();
  }
};
</script>