<template>
  <div id="nav-wrap">
      
  </div>
</template>

<script>
export default {
    name:"Nav",
}
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
    #nav-wrap{
        position:fixed;
        width:$navMenu;
        top:0;
        left:0;
        height:100vh;
        background-color: #344a5f;
    }
</style>