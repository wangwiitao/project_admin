import router from "./index";
import store from "../store/index";
import {getToken,removeToken,removeUserName} from "@/utils/app";

const whiteRouter = ['/login'];
router.beforeEach((to,from,next)=>{

    if(getToken()){
        if(to.path==='/login'){
            removeToken();
            removeUserName();
            store.commit("app/SET_TOKEN",'')
            store.commit("app/SET_USERNAME",'')
            next()
        }else{
            next()
        }
       
    }else{
        // console.log(to)
        console.log("不存在")
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('/login');
        }
    }
    // console.log(to);
    // console.log(from);
    // next()
})