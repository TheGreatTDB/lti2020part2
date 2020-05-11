<template>
  <div>
    <h1 align="center">LOGIN</h1>
    <div class="inputField">
      <label for="token">Token:</label>
      <input
        type="text"
        :token="token"
        v-model="token"
        @input="$emit('input', $event.target.value)"
        @keyup.enter="userLogin()"
      />
      <button type="submit" class="btn btn-primary" @click="loginToken()">Login</button>
    </div>
    <br />

    <div class="inputField">
      <label class="text-reader">
        Or File:
        <input type="file" @change="loadTextFromFile">
      </label>
      <button type="submit" class="btn btn-primary" @click="loginFile()">Login</button>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      token: "",
      file: null,
    };
  },
  methods: {
    loadTextFromFile(ev) {
      const txtFile = ev.target.files[0];
      this.file = new FileReader();

      this.file.onload = e => this.$emit("load", e.target.result);
      this.file.readAsText(txtFile);
    },
    loginToken(){
      console.log(this.token)
      var https = require('https');
      var axiosLogin = this.axios.create({
        headers: {
          'Authorization': 'Bearer ' + this.token
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      axiosLogin.get("/api/v1")
      .then(response => {
        console.log(response.data)
      })
    },
    loginFile(){
      console.log(this.file.result)
      var https = require('https');
      var axiosLogin = this.axios.create({
        headers: {
          'Authorization': 'Bearer ' + this.file.result
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
      });

      axiosLogin.get("/api/v1")
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  created(){

  }
};
</script>
