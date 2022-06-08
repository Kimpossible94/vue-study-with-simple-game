// 이벤트 버스를 만들기 위해서 일단 비어있는 Vue를 만들어준다.
import {createApp} from "vue";
import TicTacToe from "./TicTacToe";
createApp(TicTacToe).mount('#root');
// *** TicTacToe.vue로 이동