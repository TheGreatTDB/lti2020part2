<template>
  <div class="hello">
    <login v-if="this.$store.state.token == null"/>
    <div v-if="this.$store.state.token != null">
      <menuNav/>
      <br/>
      <br/>

      <listNamespaces v-if="this.$store.state.currentTab == 'listNamespaces' && this.$store.state.token != null"/>
      <createNamespace v-if="this.$store.state.currentTab == 'createNamespace' && this.$store.state.token != null"/>

      <listNodes v-if="this.$store.state.currentTab == 'listNodes' && this.$store.state.token != null"/>

      <listPods v-if="this.$store.state.currentTab == 'listPods' && this.$store.state.token != null"/>
      <listPodProxies v-if="this.$store.state.currentTab == 'listPodProxies' && this.$store.state.token != null"/>
      <createPod v-if="this.$store.state.currentTab == 'createPod' && this.$store.state.token != null"/>

      <listSecrets v-if="this.$store.state.currentTab == 'listSecrets' && this.$store.state.token != null"/>

      <listServices v-if="this.$store.state.currentTab == 'listServices' && this.$store.state.token != null"/>

      <statusEndpoints v-if="this.$store.state.currentTab == 'statusEndpoints' && this.$store.state.token != null"/>
    </div>
  </div>
</template>

<script>
import LoginComponent from "./login";
import MenuNavComponent from "./menuNav";

import ListNamespacesComponent from "./listNamespaces"; //Not Done
import CreateNamespaceComponent from "./createNamespace"; //Not Done

import ListNodesComponent from "./listNodes"; //Done +/- (David)

import ListPodsComponent from "./listPods"; //Done +/-  (David)
import ListPodProxiesComponent from "./listPodProxies"; //Not Done (David)
import CreatePodComponent from "./createPod"; //Done -/+ (David) (CORS PROBLEMS -> POST)

import ListSecretsComponent from "./listSecrets"; //Not Done

import ListServicesComponent from "./listServices"; //Not Done

import StatusEndpointsComponent from "./statusEndpoints"; //Not Done






export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    login: LoginComponent,
    menuNav: MenuNavComponent,

    listNamespaces: ListNamespacesComponent,
    createNamespace: CreateNamespaceComponent,

    listNodes: ListNodesComponent,

    listPods: ListPodsComponent,
    listPodProxies: ListPodProxiesComponent,
    createPod: CreatePodComponent,

    listSecrets: ListSecretsComponent,

    listServices: ListServicesComponent,

    statusEndpoints: StatusEndpointsComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
