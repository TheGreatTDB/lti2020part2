<template>
  <div class="hello">
    <menuNav/>
    <br/>
    <br/>

    <h1>{{ msg }}</h1>

    <login v-if="this.$store.state.token == null"/>
    <div v-if="this.$store.state.token != null">
      <statusEndpoints v-if="this.$store.state.currentTab == 'statusEndpoints'"/>

      <listNodes v-if="this.$store.state.currentTab == 'listNodes'"/>
      <createNode v-if="this.$store.state.currentTab == 'createNode'"/>

      <listPodes v-if="this.$store.state.currentTab == 'listPods'"/>
      <createPod v-if="this.$store.state.currentTab == 'createPod'"/>
    </div>
  </div>
</template>

<script>
import LoginComponent from "./login";
import MenuNavComponent from "./menuNav";


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    login: LoginComponent,
    menuNav: MenuNavComponent
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
