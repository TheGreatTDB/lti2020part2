<template>
  <div>
    <v-col class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">Namespace</h1>

      <p class="subheading font-weight-regular">Create a new namespace with a unique name</p>
      <v-col cols="6" sm="3" md="3">
        <v-text-field v-model="nameNamespace" label="Namespace Name"></v-text-field>
      </v-col>
              <div class="my-2">
          <v-btn depressed small  v-on:click.prevent="createNamespace()" color="primary">Create</v-btn>
        </div>
    </v-col>

  </div>
</template>
<script>
export default {
  data: function() {
    return {
      nameNamespace: ""
    };
  },
  methods: {
    createNamespace: function() {
      var axiosCreateNamespace = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosCreateNamespace
        .post("/api/v1/namespaces/", {
          apiVersion: "v1",
          kind: "Namespace",
          metadata: {
            creationTimestamp: null,
            name: this.nameNamespace
          },
          spec: {},
          status: {}
        })
        .then(response => {
          console.log(response);
          this.$emit("popup", "success", "Namespace Created");
          this.$store.commit("changeTab", "listNamespaces");
        })
        .catch(error => {
          this.$emit("popup", "error", "Namespace Creation Failed");
          console.log("Failed to create Namespace");
          console.log(error);
        });
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>