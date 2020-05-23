<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Token"
                    :token="token"
                    v-model="token"
                    name="Token"
                    type="password"
                    prepend-icon="mdi-lock"
                    @keydown.native.enter="loginToken()"
                  ></v-text-field>
                </v-form>
                <v-file-input
                  accept=".txt"
                  label="Click here to select a .txt token file"
                  v-model="file"
                ></v-file-input>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      token: "",
      file: null,
      textFile: null,
      Options: {
        position: "top-right",
        duration: 5000,
        action: {
          text: "Clear",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      }
    };
  },
  methods: {
    login: function() {
      if (this.chosenFile) {
        this.loginFile();
      } else if (this.token != "") {
        this.loginToken();
      }
    },
    loginToken() {
      var axiosLogin = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.token
        }
      });

      axiosLogin
        .get("/api")
        .then(response => {
          console.log(response);
          this.$toasted.success("Logged in", this.Options);
          this.$store.commit("setToken", this.token);
        })
        .catch(error => {
          console.log("Error Login with Text");
          this.$toasted.error("Error" + error, this.Options);
          console.log(error);
        });
    },
    loginFile() {
      var reader = new FileReader();
      reader.readAsText(this.file);
      reader.onload = () => {
        this.textFile = reader.result;

        var axiosLogin = this.axios.create({
          headers: {
            Authorization: "Bearer " + this.textFile
          }
        });

        axiosLogin
          .get("/api")
          .then(response => {
            console.log(response);
            this.$store.commit("setToken", this.textFile);
          })
          .catch(error => {
            console.log("Error Login with File");
            console.log(error);
          });
      };
    }
  },
  created() {}
};
</script>
