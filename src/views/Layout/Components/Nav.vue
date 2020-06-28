<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title" class="bba">
            <i :class = "item.meta.icon"></i>
            <!-- <svg-icon :iconClass="item.meta.icon" :class="item.meta.icon" /> -->

            <span slot="title">{{item.meta.name}}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <svg-icon iconClass="info" class="user"></svg-icon>
  </div>
</template>

<script>
import { ref, reactive,computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    // *************数据************************************
    // const isCollapse = ref(true);
    const routers = reactive(root.$router.options.routes);
    // console.log(root.$router.options.routes);
    console.log(routers);

    // ***************函数*********************************
    const isCollapse = computed(()=>
      root.$store.state.app.isCollapse
    )
    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      // console.log(key, keyPath);
    };
    return {
      isCollapse,
      handleClose,
      handleOpen,
      routers
    };
  }
};
</script>

<style lang="scss" >
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  // width: $navMenu;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition,all .3s ease 0s);
  // -webkit-transition:all .3s ease 0s;
  // -moz-transition:all .3s ease 0s;
  // -o-transition:all .3s ease 0s;
  // -ms-transition:all .3s ease 0s;
  // transition:all .3s ease 0s;
  //
  .el-menu{
    border-right-width:0;
  }
}
.open{
  #nav-wrap{width:$navMenu;}
}
.close{
  #nav-wrap{width:$navMenuMin;}
}
</style>