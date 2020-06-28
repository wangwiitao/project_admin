<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click = "navMenuClick">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right header-icon">
      <div class="user-info pull-left">
        {{username}}
      </div>
      <div class="pull-left header-icon" @click= "exit"><svg-icon iconClass="logout" className="menu" /></div>
    </div>
  </div>
</template>

<script>
import {computed} from "@vue/composition-api"
export default {

  name: "Header",
  setup(props,{root}){
    const navMenuClick = (()=>{
      root.$store.commit('app/SET_COOLAPSE')
    });
    //退出
    const exit = ()=>{
      root.$store.dispatch('app/exit').then(()=>{
        root.$router.push({
          name:"Login"
        })
      })
    }
      const username = computed(()=>
      root.$store.state.app.username
    )
    return{
      navMenuClick,
      username,
      exit
    }
  }
};
</script>

<style lang = "scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
  @include webkit(transition,all .3s ease 0s);
}
.open{
  #header-wrap{left:$navMenu;}
}
.close{
  #header-wrap{left:$navMenuMin;}
}

</style>