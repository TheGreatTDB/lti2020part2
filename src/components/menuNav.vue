<template>
  <div>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
      <a class="navbar-brand mr-1">
        <h2 style="color:white;">
          <img
            v-on:click.prevent="profile()"
            height="60"
            width="60"
            src="./../assets/logo.png"
          />
          Welcome, USERNINO!
        </h2>
      </a>

      <!-- Navbar Search -->
      <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">

      </form>

      <!-- Navbar -->
      <ul class="navbar-nav ml-auto ml-md-0">
        <b-navbar-nav>
          
          <b-nav-item-dropdown
            v-if="true"
            text="Create"
            right
          >
            <b-dropdown-item v-on:click.prevent="changeTab('createNamespace')">Create Namespace</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('createPod')">Create Pod</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('createDeployment')">Create Deployment</b-dropdown-item>
          </b-nav-item-dropdown>
          
          <b-nav-item-dropdown
            v-if="true"
            text="List"
            right
          >
            <b-dropdown-item v-on:click.prevent="changeTab('listNamespaces')">List Namespaces</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('listNodes')">List Nodes</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('listPods')">List Pods</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('listServices')">List Services</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('listSecrets')">List Secrets</b-dropdown-item>
            <b-dropdown-item v-on:click.prevent="changeTab('listDeployments')">List Deployments</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown
            v-if="true"
            text="Status"
            right
          >
          <b-dropdown-item v-on:click.prevent="changeTab('statusEndpoints')">Endpoints</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-button variant="outline-danger" v-on:click.prevent="logout()">Logout</b-button>
        </b-navbar-nav>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: [],
  data: function() {
    return {

    };
  },
  methods: {
    changeTab: function(tab) {
      this.$store.commit("changeTab", tab);
    },
    logout: function() {
      this.$store.commit("clearTab");
      this.$store.commit("clearToken");
    }
  },
  created() {

  }
};
</script>