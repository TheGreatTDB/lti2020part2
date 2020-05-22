<template>
  <div id="app">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <index msg="Welcome to Your Vue.js App" />

  </div>
</template>

<script>

import IndexComponent from "./components/index.vue";

export default {
  name: "App",
  components: {
    index: IndexComponent,
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;

}
.app-container {
  text-align: center;
}
body #app .p-button {
  margin-left: .2em;
}
form {
  margin-top: 2em;
}
</style>
