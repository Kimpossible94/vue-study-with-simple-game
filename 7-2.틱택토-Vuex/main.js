import {createApp} from "vue";
import LottoGenerator from "./TicTacToe";
import { store } from "./store"
// 만든 store를 vue와 연결
createApp(LottoGenerator).use(store).mount('#root');