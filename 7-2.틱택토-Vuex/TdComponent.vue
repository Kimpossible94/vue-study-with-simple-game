<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  import { mapState } from "vuex";
  import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from "./store";

  export default {
    name: "TdComponent",
    props: {
      rowIndex: Number,
      cellIndex: Number,
    },
    computed: {
      // vuex의 state들은 computed를 통해 가져오면 된다.
      // tableData(){
      //   return this.$store.state.tableData;
      // },
      // turn(){
      //   return this.$store.state.turn;
      // },
      // 근데 만약 컴포넌트에서 state에 있는 약 100개의 데이터를 가져다 쓴다면?
      // 100개를 computed에 등록하고 return해줘야한다.
      // 그래서 이 귀찮음을 없애고자 vuex에서는 mapState를 제공한다.
      // mapState를 사용하면 위처럼 길게써아햐는걸 압축할 수 있다.

      ...mapState(["tableData", "turn"]),
      // mapState는 위처럼 간략하게도 아래처럼 자세하게도 사용이 가능하다.
      ...mapState({
        tableData: state => state.tableData,
        turn: state => state.turn,
        cellData(state){
          return state.tableData[this.rowIndex][this.cellIndex];
        },
      }),
    },
    methods: {
      checkBingo(){
        let bingo = false;

        if(this.tableData[this.rowIndex][0] === this.turn
            && this.tableData[this.rowIndex][1] === this.turn
            && this.tableData[this.rowIndex][2] === this.turn){
          bingo = true;
        } else if (this.tableData[0][this.cellIndex] === this.turn
            && this.tableData[1][this.cellIndex] === this.turn
            && this.tableData[2][this.cellIndex] === this.turn){
          bingo = true;
        } else if (this.tableData[0][0] === this.turn
            && this.tableData[1][1] === this.turn
            && this.tableData[2][2] === this.turn){
          bingo = true;
        } else if (this.tableData[0][2] === this.turn
            && this.tableData[1][1] === this.turn
            && this.tableData[2][0] === this.turn){
          bingo = true;
        }

        if(bingo){ // O 또는 X가 이긴경우
          this.$store.commit(SET_WINNER, this.turn);
          this.$store.commit(RESET_GAME);
        } else { // 무승부
          let full = true;
          this.tableData.forEach((row) => {
            row.forEach((cell) => {
              if(!cell){
                full = false;
              }
            })
          });
          if(full){
            this.$store.commit(NO_WINNER);
            this.$store.commit(RESET_GAME);
          }
          this.$store.commit(CHANGE_TURN);
        }
      },
      onClickTd(){
        if(this.cellData) return;
        // 뮤테이션을 불러올 때는 아래 예제코드처럼 $store.commit('뮤테이션이름')으로 사용하면된다.
        // this.$store.commit('CLICK_CELL');
        // 근데 이러면 문자열로 뮤테이션함수를 불러오기때문에 오타가 발생할 수 있다.
        // 이러한 점을 방지하기 위해서 store.js에서 뮤테이션의 함수들을 변수로 등록한 것이다.
        // 변수를 import하고 아래처럼 변수로 사용하면 오타가 발생할 일이 없다.
        this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex});
        this.checkBingo();
      }
    }
  }
  // 컴포넌트 구조를 TicTacToe안에 Table, Table안에 Tr, Tr안에 Td 컴포넌트로 했는데,
  // 그 이유는 TicTacToe는 3*3 오목인데, 만약 테이블 컴포넌트 하나만 있다면,
  // 한 칸 한 칸 클릭 할 때마다 테이블 전체를 다시 그려야한다.(= 다시 계산해야한다.)
  // 3*3 이면 문제가 되지 않지만 만약 더 큰 테이블이라면 성능상에 문제가 생길 여지가 있기 때문에
  // 테이블 전체를 다시 그리지않고 클릭한 한 칸만 다시 렌더링 되도록 하는 것이다.

  // 구조가 이해하기 조금 복잡해서 정리 !!
  // TiaTacToe에서 tableData라는 2차원 배열을 Table에 넘겨주고
  // Table 컴포넌트에서는 2차원 배열을 반복문을 통해 2차원 배열안에 있는 각각의 배열과 row 인덱스를 Tr에 넘겨줌
  // Tr 컴포넌트에서는 받은 1차원 배열을 반복문을 통해 각 cell의 값과 cell의 인덱스, row 인덱스를 Td에 넘겨줌
  // Td 에서는 넘겨준 값을 통해 화면에 표시를 함

  // 이렇게 TicTacToe 컴포넌트에서부터 Td 컴포넌트까지 값을 넘겨준다.
  // 근데 만약 부모에서부터 마지막 자식컴포넌트까지의 관계가 엄청 많다면 어떨까
  // 부모에서 마지막 자식까지의 관계가 많을수록 데이터를 넘겨주기 복잡하기 힘들것이다.

  // ********** 이벤트 버스 **********
  // 이벤트 버스는 이벤트를 통제하는 이벤트의 중앙 매개체이다.
  // 7-1.틱택토 이벤트버스로 이동

  // ********** Vuex의 필요성 **********
  // 지금은 컴포넌트가 작아서 this.$parent라면 어떤 컴포넌트를 말하는지 쉽게 알 수 있지만,
  // 컴포넌트가 수백 수천개로 많아지면 this.$parent가 어떤 부모 컴포넌트를 말하는지 알기 어렵다.
  // 그리고 부모의 부모 컴포넌트를 하려면 this.$parent.$parent 이런식으로 코드가 길어진다.
  // 이처럼 코드의 가독성이 떨어지는 문제점이 발생한다.
  // 그래서 중앙통제실의 역할을 하는 Vuex를 사용해 모든 데이터를 한 번에 관리하도록 해보자.
</script>

<style scoped>

</style>