import {createStore} from "vuex";

export const GAME_START = "GAME_START"; // 게임시작
export const OPEN_CELL = "OPEN_CELL"; // 셀 오픈
export const CLICK_MINE = "CLICK_MINE"; // 지뢰클릭
export const FLAG_CELL = "FLAG_CELL"; // 셀에 깃발 표시
export const QUESTION_CELL = "QUESTION_CELL"; // 셀에 물음표 표시
export const NOAMLIZE_CELL = "NOAMLIZE_CELL"; // 깃발 또는 물음표 제거
export const INCREMENT_TIMER = "INCREMENT_TIMER"; // 타이머 증가

export const CODE = {
    // CODE는 cell의 상태를 구분해놓은 객체이다.
    // 예를들어 cell이 열리지않은칸이라면 NORMAL = -1이고,
    // 지뢰가 놓여있다면 -7로 설정하는 것이다.
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
}

const plantMine = (row, cell, mine) => {
    console.log(row, cell ,mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];
    while (candidate.length > row * cell - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    // data에 2차원 배열로 모든 인덱스에 -1을 넣어줌 (=모든 칸을 열리지않은칸으로 섫정)
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
        data.push(rowData);
    }

    // 모든 인덱스가 -1인 2차원배열 data의 임의의 인덱스에 -7을 넣음(= 임의의 칸에 지뢰를 넣음)
    for (let i = 0; i < shuffle.length; i++) {
        const ver = Math.floor(shuffle[i] / cell);
        const hor = shuffle[i] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}

export const store = createStore({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        openedCount: 0,
        halted: true, // 게임 중단
        result: '',
    },
    getters: {

    },
    mutations: {
        [GAME_START](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine
            };
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
        },
        [OPEN_CELL](state, {row,cell}) {
            // 비어있는 칸을 한 번에 열기위해 재귀함수를 사용할 것인데,
            // 이미 검사한 칸을 다시 검사하면 stack overflow가 발생할 수 있다.
            // 재귀를 할 때 작업한 내용을 기록하는 것을 캐싱이라고 한다. 이런 캐싱을 활용하는 알고리즘을 다이나믹 프로그래밍이라 한다.
            const checked = [];
            let openedCount = 0;

            function isNormal(row, cell) {
                // checkAround를 실행시켜야 하는지 적합성 판단
                let checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length
                    || cell < 0 || cell >= state.tableData[0].length; // undefined 검사
                let checkUnNormal = [CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION]
                                        .includes(state.tableData[row][cell]) // CODE.NORMAL인지 검사
                let checkAlready = checked.includes(row + '/' + cell); // 이미 검사된 칸인지 확인

                if(checkRowOrCellIsUndefined || checkUnNormal || checkAlready) return false;
                else return true;
            }

            function checkEndGame(){
                if(state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount){
                    this.halted = true;
                    this.result = `${state.timer}초만에 승리하였습니다.`;
                }
                state.openedCount += openedCount;
            }

            function checkAround(row, cell) { // 주변 8칸의 지뢰 탐색
                if(!isNormal(row, cell)) return;
                else checked.push(row + '/' + cell); // isNormal 통과하면 검사한 칸으로 넣어줌

                let around = [];
                if(state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1],
                        state.tableData[row - 1][cell],
                        state.tableData[row - 1][cell + 1]
                    ]);
                }
                around = around.concat([
                    state.tableData[row][cell-1],
                    state.tableData[row][cell+1]
                ]);
                if(state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1],
                        state.tableData[row + 1][cell],
                        state.tableData[row + 1][cell + 1]
                    ]);
                }

                const counted = around.filter((v) => {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });

                if(counted.length === 0 && row > -1){ // 주변 칸에 지뢰가 하나도 없을 경우
                    const near = [];
                    if(row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell]);
                    near.push([row, cell + 1]);
                    if(row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }

                    near.forEach((e) => {
                        if(state.tableData[e[0]][e[1]] !== CODE.OPENED){
                            checkAround(e[0], e[1]);
                        }
                    })
                    if(state.tableData[row][cell] === CODE.NORMAL) openedCount++;
                    state.tableData[row][cell] = counted.length;
                } else {
                    state.tableData[row][cell] = counted.length;
                }
            }
            checkAround(row, cell);
            checkEndGame();
        },
        [CLICK_MINE](state, {row,cell}) {
            state.halted = true;
            state.tableData[row][cell] = CODE.CLICKED_MINE;
        },
        [FLAG_CELL](state, {row,cell}) {
            if(state.tableData[row][cell] === CODE.MINE){
                state.tableData[row][cell] = CODE.FLAG_MINE;
            } else {
                state.tableData[row][cell] = CODE.FLAG;
            }
        },
        [QUESTION_CELL](state, {row,cell}) {
            if(state.tableData[row][cell] === CODE.FLAG_MINE){
                state.tableData[row][cell] = CODE.QUESTION_MINE;
            } else {
                state.tableData[row][cell] = CODE.QUESTION;
            }
        },
        [NOAMLIZE_CELL](state, {row,cell}) {
            if(state.tableData[row][cell] === CODE.QUESTION_MINE){
                state.tableData[row][cell] = CODE.MINE;
            } else {
                state.tableData[row][cell] = CODE.NORMAL;
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer++;
        },
    },
    actions: {

    },
})