<template>
  <div id="layout" :class="[menuStatus ? 'close' :'open']">
    <layout-nav></layout-nav>
    <layout-header></layout-header>
    <layout-main></layout-main>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import LayoutNav from "../Layout/Components/Nav";
import LayoutHeader from "../Layout/Components/Header";
import LayoutMain from "../Layout/Components/Main";
export default {
  name: "Layout",
  components: {
    LayoutNav,
    LayoutHeader,
    LayoutMain
  },
  setup(props,{root}) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);

    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped>
</style>