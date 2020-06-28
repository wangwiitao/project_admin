import Vue from "vue";
import Vuex from "vuex";
import {Login} from "@/api/login"
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // isCollapse:JSON.parse(Cookie.get('isCollapse')) || false
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false
  },
  mutations: {
    SET_COOLAPSE(state){
      // console.log("2222")
      state.isCollapse = !state.isCollapse
      // console.log(state.isCollapse)
      // Cookie.set('isCollapse',JSON.stringify(state.isCollapse));
      sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))
    }
  },
  actions: {
    login(content,requestData){
      return new Promise((resolve,reject)=>{
        Login(requestData).then((response)=>{
          resolve(resolve)
        }).catch(err=>{
          reject(reject)
        })
      })
    }
  },
  modules: {}
});
