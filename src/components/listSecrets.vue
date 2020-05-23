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
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      secrets: [],
      selectedData: "",
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
          console.log(this.secrets);
        })
        .catch(error => {
          console.log("Failed to load Secrets:");
          console.log(error);
        });
    },
    openPopup: function(data) {
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