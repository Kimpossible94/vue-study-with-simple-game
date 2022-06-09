import {createApp} from "vue";
import Router from "./Router";
// vuex 연결할 때처럼 router도 연결해준다.
import router from "./routers"
createApp(Router).use(router).mount('#root');