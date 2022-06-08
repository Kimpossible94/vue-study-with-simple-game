import {createApp} from "vue";
import MineSweeper from "./MineSweeper";
import { store } from "./store"
// 만든 store를 vue와 연결
createApp(MineSweeper).use(store).mount('#root');