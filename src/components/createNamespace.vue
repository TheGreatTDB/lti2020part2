<template>
  <div>
    <p>Namespace Name:</p>
    <b-form-input class="w-25 mx-auto" v-model="nameNamespace" placeholder="Namespace Name" />

    <b-button variant="outline-primary"  v-on:click.prevent="createNamespace()">Create Namespace</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      nameNamespace: "",
    };
  },
  methods: {
    createNamespace: function() {
      var axiosCreateNamespace = this.axios.create({
        headers: {
          "Authorization": 'Bearer ' + this.$store.state.token
        }
      });

      axiosCreateNamespace
        .post("/api/v1/namespaces/", 
          {
            "apiVersion": "v1",
            "kind":"Namespace",
            "metadata":{
              "creationTimestamp":null,
              "name": this.nameNamespace
              
            },
            "spec":{
              
            },
            "status":{
              
            }
            
          }
        )
        .then(response => {
          console.log(response);
          this.$store.commit("changeTab", "listNamespaces");
        })
        .catch(error => {
          console.log("Failed to create Namespace");
          console.log(error);
        });
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>