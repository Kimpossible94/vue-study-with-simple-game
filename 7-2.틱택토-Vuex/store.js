import {createStore} from "vuex";

//뮤테이션에서 만든 함수들을 변수로도 사용할 수 있다.
//이런것을 object dynamic property라고 한다. vue에서는 보통 이렇게 많이한다.
//그리고 만들어진 변수에 export를 붙여 다른파일에서도 쓸 수 있도록 모듈로 만들어 준다.
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

// *** export default와 export const의 차이 ***
// default는 임의의 이름으로 import 이름 from '경로' 이런식으로 하면된다.
// const는 정한이름으로 {}를 통해 가져온다
//      import { SET_WINNER } from './store'; 이런식으로
// 보통 export default는 이 파일에서 가장 중요한 부분에 한 번만 사용한다.
export const store = createStore({
    // Vuex에서는 state, getters, mutations, actions가 핵심

    // state : vue의 data와 비슷
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn: 'O',
        winner: '',
    },

    // getters: vue의 computed와 비슷
    // state에 추가적인 작업을 할 때 getter를 사용한다.
    // 캐싱이 되기 때문에 data와 computed의 관계와 비슷하다.
    // *** TableComponent로 이동
    getters: {
        turnMessage(state){
            return state.turn + '님이 승리하였습니다.';
        },
    },
    // mutations: state를 '동기적'으로 수정할 때 사용
    // vuex에서는 데이터를 state에 몰아넣는데, 데이터를 변경할 때 바로 바꾸는 것이 아니라.
    // mutations에서 바꾸는 것을 권장한다.
    mutations: {
        // mutations에서 쓰이는 함수의 이름은 대문자로 하는 것이 커뮤니티의 규칙이다.
        // 함수이름을 []로 감싸줘야 변수로 사용가능
        [SET_WINNER](state, winner){
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }){
            state.tableData[row][cell] = state.turn;
            // 배열의 인덱스로 접근해서 수정할 때는 화면에 표시되지않아 아래처럼 하라는데 vue3버전이라 그런지 그냥 됨
            // Vue.$set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state){
            state.winner = '';
        }
    },
    // actions: 비동기를 사용할 때 또는 여러 뮤테이션을 연달아 실행할 때 사용
    actions: {

    },
})