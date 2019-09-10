
<template>

  <div style="min-height: 100vh; !important ">
    <router-view></router-view>
  </div>
</template>

<script>
import SideNavBar from "./components/SideNavBar/SideNavBar";

export default {
  name: "App",
  data() {
    return {
      color: "#b3b3b3"
    };
  },
  components: {
    SideNavBar
  }
};
</script>

<style lang="scss" scoped>

#app {
}
</style>
