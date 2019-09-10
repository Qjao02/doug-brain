<template>
  <div class="background-style">
    <div class="md-layout md-alignment-center form">
      <div
        class="md-layout-item md-xsmall-size-100 md-small-size-55 md-large-size-35 md-xlarge-size-35"
      >
        <md-card class="md-card-black md-elevation-24">
          <md-card-area>
            <div class="md-layout md-alignment-center">
              <md-card-header>
                <div class="container">
                  <md-card-media>
                    <img class="container-image" src="../assets/login/robot-icon-1.png" alt="People" />
                  </md-card-media>
                </div>
                <md-card-header-text>
                  <h1 class="md-title">Doug Brain</h1>
                  <div class="md-subhead">Ferramenta para controle de informações do chatbot</div>
                </md-card-header-text>
              </md-card-header>
            </div>

            <md-card-content>
              <form>
                <div class="md-layout">
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Nome de Usuário</label>
                      <md-input v-model=" login.username"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout-item md-size-100">
                    <md-field>
                      <label>Password</label>
                      <md-input v-model="login.password" type="password"></md-input>
                    </md-field>
                  </div>
                  <div class="md-layout md-alignment-center">
                    <md-menu>
                      <md-button
                        type="submit"
                        class="md-raised md-accent center-align md-button-custom"
                        @click="auth"
                        @keyup.enter="auth"
                      >LOGAR</md-button>
                    </md-menu>
                  </div>
                </div>
              </form>
            </md-card-content>
          </md-card-area>
        </md-card>
      </div>
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    image: "../assets/login/login-image.png",
    login: {
      username: "",
      password: ""
    },
    loading: false
  }),

  mounted() {
    if (localStorage.getItem("Token")) {
      this.$router.push("/home");
    }
  },
  methods: {
    auth() {
      axios
        .post(process.env.AUTH_API, this.login)
        .then(response => {
          console.log(response);
          localStorage.setItem("Token", "Token " + response.data.token);
          this.$router.push("/home");
        })
        .catch(e => {
          console.log(e);
        });

      // your code to login user
      // this is only for example of loading
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    }
  }
};
</script>

<style>
.background-style {
  height: 100vh;
  width: 100vw;
  background: #ed213a; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #93291e,
    #ed213a
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #93291e,
    #ed213a
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.md-card-black {
  margin-top: 50px;
  font-size: 16px;
  width: 429px;
  height: 440px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}

.md-avatar {
  width: 100%;

  position: relative;
}

.md-title {
  align-content: center;
  position: relative;
}

.label {
  color: #ffffff !important;
}

.md-field {
  color: #ffffff !important;
}

.md-button-custom {
  width: 250px !important;
  margin-top: 20px !important;
}

.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100px;
  justify-content: center;
  text-align: center;
  display: inline-block;
  position: relative;
  margin-top: 2%;
}

.container-image {
  width: 300px;
}
</style>
