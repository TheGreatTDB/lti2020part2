<template>
  <div class="hello">
    <v-snackbar
      v-model="showPopup"
      :right="true"
      :top="true"
      :color="popupState"
      :timeout="timeout">
      {{ popupText }}
      <v-btn
        dark
        text
        @click="showPopup = false"> Close </v-btn>
    </v-snackbar>

    <login v-if="this.$store.state.token == null" @popup="popup"/>
    <div v-if="this.$store.state.token != null">
      <menuNav @popup="popup"/>
      <listNamespaces @popup="popup"
        v-if="this.$store.state.currentTab == 'listNamespaces' && this.$store.state.token != null"
      />
      <createNamespace @popup="popup"
        v-if="this.$store.state.currentTab == 'createNamespace' && this.$store.state.token != null"
      />
      <listNodes @popup="popup"
        v-if="this.$store.state.currentTab == 'listNodes' && this.$store.state.token != null"
      />
      <listPods @popup="popup"
        v-if="this.$store.state.currentTab == 'listPods' && this.$store.state.token != null"
      />
      <createPod @popup="popup"
        v-if="this.$store.state.currentTab == 'createPod' && this.$store.state.token != null"
      />
      <listSecrets @popup="popup"
        v-if="this.$store.state.currentTab == 'listSecrets' && this.$store.state.token != null"
      />
      <listServices @popup="popup"
        v-if="this.$store.state.currentTab == 'listServices' && this.$store.state.token != null"
      />
      <statusEndpoints @popup="popup"
        v-if="this.$store.state.currentTab == 'statusEndpoints' && this.$store.state.token != null"
      />
      <createDeployment @popup="popup"
        v-if="this.$store.state.currentTab == 'createDeployment' && this.$store.state.token != null"
      />
      <listDeployments @popup="popup"
        v-if="this.$store.state.currentTab == 'listDeployments' && this.$store.state.token != null"
      />
    </div>
  </div>
</template>

<script>
import LoginComponent from "./login";
import MenuNavComponent from "./menuNav"; //Done
import ListNamespacesComponent from "./listNamespaces"; //Done
import CreateNamespaceComponent from "./createNamespace"; //Done
import ListNodesComponent from "./listNodes"; //Done
import ListPodsComponent from "./listPods"; //Done
import CreatePodComponent from "./createPod"; //Done
import ListSecretsComponent from "./listSecrets";
import ListServicesComponent from "./listServices"; //Done
import StatusEndpointsComponent from "./statusEndpoints";
import CreateDeploymentComponent from "./createDeployment";
import ListDeploymentsComponent from "./listDeployments"; //Done

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data: function(){
    return {
      showPopup: false,
      popupState: "",
      popupText: "",
      timeout: 2000
    };
  },
  methods:{
    popup: function(state, message){
      this.showPopup = false;
      this.popupState = state;
      this.popupText = message;
      this.showPopup = true;
    }
  },
  components: {
    login: LoginComponent,
    menuNav: MenuNavComponent,
    listNamespaces: ListNamespacesComponent,
    createNamespace: CreateNamespaceComponent,
    listNodes: ListNodesComponent,
    listPods: ListPodsComponent,
    createPod: CreatePodComponent,
    listSecrets: ListSecretsComponent,
    listServices: ListServicesComponent,
    statusEndpoints: StatusEndpointsComponent,
    createDeployment: CreateDeploymentComponent,
    listDeployments: ListDeploymentsComponent
  }
};
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
