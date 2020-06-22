<template>
  <div id= "layout">
    <layout-nav></layout-nav>
    <layout-header></layout-header>
    <layout-main></layout-main>
  </div>
</template>

<script>
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
  setup(){

  }
};
</script>

<style lang="scss" scoped>

</style>