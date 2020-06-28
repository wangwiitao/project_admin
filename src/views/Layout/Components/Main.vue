<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content"><router-view></router-view></div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style lang = "scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: 0;
  -webkit-box-sizing: border;
  @include webkit(transition,all .3s ease 0s);
}
.open{
  #main-wrap{left:$navMenu;}
}
.close{
  #main-wrap{left:$navMenuMin;}
}
.main-content{
  width:100%;
  height:100%;
  /* padding-top:$layoutHeader +30;
  padding-left:$navMenu +30; */
  -webkit-box-sizing: border-box;
  box-sizing:border-box;
}
.content{
  width:100%;
  height:100%;
  padding:30px 30px 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing:border-box;
  background-color:#fff;
}
</style>