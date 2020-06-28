import Vue from "vue";
import SvgIcon from "./SvgIcon.vue"

Vue.component('svg-icon',SvgIcon)


const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
    console.log(requireContext.keys())
  return requireContext.keys().map(requireContext)
}
requireAll(req)
