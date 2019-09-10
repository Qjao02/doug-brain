<template>
  <div class="page-container md-layout-row">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">{{currentTab}}</span>
        </div>

        <div class="md-toolbar-section-end">
          <md-menu>
            <md-button class="md-icon-button md-button-left" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                Perfil
                <md-icon>face</md-icon>
              </md-menu-item>

              <md-menu-item>
                Configurações
                <md-icon>build</md-icon>
              </md-menu-item>
              <md-menu-item @click="logout">
                Sair
                <md-icon>arrow_upward</md-icon>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          <img class="img-circle" src="../../assets/sidebar-icon/intellectual.png" />
          <span>Doug Brain</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-list>
          <router-link to="/analises">
            <md-list-item class="md-option" v-on:click="setCurrentTab('Home')">
              <md-icon>home</md-icon>
              <span class="md-list-item-text">Home</span>
            </md-list-item>
          </router-link>

          <router-link to="/eventos">
            <md-list-item class="md-option" v-on:click="setCurrentTab('Eventos')">
              <md-icon>collections_bookmark</md-icon>
              <span class="md-list-item-text">Eventos</span>
            </md-list-item>
          </router-link>


          <md-list-item class="md-option">
            <md-icon>picture_as_pdf</md-icon>
            <span class="md-list-item-text">Editais</span>
          </md-list-item>

          <md-list-item class="md-option">
            <md-icon>how_to_reg</md-icon>
            <span class="md-list-item-text">Tutores</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content style="min-height: 100vh;">
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
export default {
  name: "SideNavBar",
  data: () => ({
    menuVisible: true,
    currentTab: "home",
    color: "#a6a6a6"
  }),
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    setCurrentTab(active) {
      this.currentTab = active;
    },
    logout() {
      localStorage.removeItem("Token");
      this.$router.push("/login");
      window.location.reload(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.md-primary {
  background: brown !important;
}

.md-option {
  transition: 0.3s linear;
}
.md-option:hover {
  background-color: brown;
  .md-list-item-text {
    color: #ffffff !important;
  }
}

.img-circle {
  width: 30%;
  height: 30%;
  border-radius: 50%;
  right: 2px;
  top: 2px;
  margin-right: 4%;
}
</style>
