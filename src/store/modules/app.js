
import { Login } from "@/api/login";
import { setToken,setUserName ,getUserName,removeToken,removeUserName} from "@/utils/app"
const state = {
    // isCollapse:JSON.parse(Cookie.get('isCollapse')) || false
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token:'',
    username:getUserName('username') || '',
};
const getters = {
    // username:state => state.username
}
const mutations = {
    SET_COOLAPSE(state) {
        // console.log("2222")
        state.isCollapse = !state.isCollapse
        // console.log(state.isCollapse)
        // Cookie.set('isCollapse',JSON.stringify(state.isCollapse));
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state,value){
        state.token = value
    },
    SET_USERNAME(state,value){
        state.name = value
    }
};
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then((response) => {
                // console.log(content);
                // console.log(response);
                let data = response.data.data;
                content.commit("SET_TOKEN",data.token)
                content.commit("SET_USERNAME",data.username)
                setToken(data.token)
                setUserName(data.username)
                resolve(resolve)
            }).catch(err => {
                reject(reject)
            })
        })
    },
    exit(content){
        // console.log('111')
        return new Promise((resolve,reject)=>{
            removeToken();
            removeUserName();
            content.commit("SET_TOKEN",'');
            content.commit("SET_USERNAME",'')
            resolve();
        })
       
    }
};

export default {
    namespaced:true,
    state,
    mutations,
    actions
};