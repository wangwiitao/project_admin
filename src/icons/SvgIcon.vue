<template>
  <div>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"/>
    </svg>
  </div>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    console.log(props.className);
    console.log(props.iconClass);
    const msg = ref("ggggggg");
    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });
    return {
      msg,
      svgClass,
      iconName
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height:1em;
    fill:currentColor;
    color:#fff;
    &.font12{
        font-size:12px;
    }
    &.font50{
        font-size:50px;
    }
}
</style>