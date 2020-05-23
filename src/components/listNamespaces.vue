<template>
  <div>
    <v-card>
      <v-card-title>
        Namespaces
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="namespaces" :search="search" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="changetab()"
                  v-on="on"
                >New Namespace</v-btn>
              </template>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="deleteNamespace(item)">mdi-delete</v-icon>
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
      namespaces: [],
      dialog: "",
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "metadata.name"
        },
        { text: "Status", value: "status.phase" },
        { text: "Age", value: "metadata.creationTimestamp" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    loadNamespaces: function() {
      var axiosNamespaces = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosNamespaces
        .get("/api/v1/namespaces")
        .then(response => {
          this.namespaces = response.data.items;
          this.$emit("popup", "info", "Namespaces Loaded");
          console.log(this.namespaces);
        })
        .catch(error => {
          console.log("Failed to load Namespaces:");
          this.$emit("popup", "error", "Failed to Load Namespaces");
          console.log(error);
        });
    },
    changetab: function() {
      this.$store.commit("changeTab", "createNamespace");
    },
    deleteNamespace: function(selectedNamespace) {
      var axiosDeleteNamespace = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosDeleteNamespace
        .delete("/api/v1/namespaces/" + selectedNamespace.metadata.name)
        .then(response => {
          console.log(response.data);
          this.$emit("popup", "warning", "Namespace Deleted");

          var index = 0;
          this.namespaces.forEach(namespace => {
            if(namespace.metadata.name == selectedNamespace.metadata.name){
              this.namespaces.splice(index, 1);
            }
            index++;
          })
        })
        .catch(error => {
          this.$emit("popup", "error", "Failed to Delete Namespace");
          console.log("Failed to delete selected Namespace");
          console.log(error);
        });
    }
  },
  created() {
    this.loadNamespaces();
  }
};
</script>