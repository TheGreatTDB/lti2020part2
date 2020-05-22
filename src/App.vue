<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png"
          transition="scale-transition"
          width="40"
        />


      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
        <index/>
    </v-content>
  </v-app>
  
</template>

<script>
import IndexComponent from "./components/index.vue";

export default {
  name: "App",

  components: {
    index: IndexComponent
  },

  data: () => ({
    //
  })
};
</script>

