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

      var axiosLogin = this.axios.create({
        headers: {
          'Authorization': 'Bearer ' + this.token
        }
      });

      axiosLogin.get("/api/v1")
      .then(response => {
        console.log(response.data)
      })
    },
    loginFile(){
      const https = require('https');
      console.log(this.file.result)
      var axiosLogin = this.axios.create({
        mode: 'no-cors',
        httpsAgent: new https.Agent({rejectUnauthorized: false, }),
        headers: {
          'Authorization': 'Bearer ' + this.file.result,
        }
      });

      axiosLogin.get("/api/v1",{httpsAgent: new https.Agent({rejectUnauthorized: false, })})
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })

      /*
      const testURL = 'https://192.168.147.10:6443/api/v1/pods';
      const myInit = {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Authorization': 'Bearer ' + this.file.result,
        }
      };

      const agent = new https.Agent({
        rejectUnauthorized: false
      })

      const myRequest = new Request(testURL, myInit);

      fetch(myRequest, {agent}).then(function(response) {
        return response;
      }).then(function(response) {
        console.log(response);
      }).catch(function(e){
        console.log(e);
      });*/
    }
  },
  created(){

  }
};
</script>
