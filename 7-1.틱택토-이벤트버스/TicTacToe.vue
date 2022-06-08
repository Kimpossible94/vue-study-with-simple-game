<template>
  <div>
    <div>{{ turn }}님의 차례입니다.</div>
    <table-component v-bind:table-data="tableData"></table-component>
    <div v-if="winner">{{ winner }}님의 승리입니다 !</div>
  </div>
</template>

<script>
  import TableComponent from "./TableComponent";
  //등록한 eventBus를 import한다.
  import EventBus from "./eventBus";
  export default {
    components: {
      'table-component': TableComponent,
    },
    data() {
      return {
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        turn: 'O',
        winner: '',
      };
    },
    methods: {
      resetTable(){
        this.turn = 'O';
        this.tableData = [
          ['','','',],
          ['','','',],
          ['','','',],
        ]
      },
      checkBingo(rowIndex, cellIndex){
        let bingo = false;

        if(this.tableData[rowIndex][0] === this.turn
            && this.tableData[rowIndex][1] === this.turn
            && this.tableData[rowIndex][2] === this.turn){
          bingo = true;
        } else if (this.tableData[0][cellIndex] === this.turn
            && this.tableData[1][cellIndex] === this.turn
            && this.tableData[2][cellIndex] === this.turn){
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
          this.winner = this.turn;
          this.resetTable();
        } else { // 무승부
          let full = true;
          // 2차원 배열에 반복문을 돌려 칸이 모두 찼는지 확인
          // full이 true면 무승부
          this.tableData.forEach((row) => {
            row.forEach((cell) => {
              if(!cell){
                full = false;
              }
            })
          });
          if(full){
            this.winner = '';
            this.resetTable();
          }
          this.turn = this.turn === 'O'? 'X' : 'O';
        }
      },
      onClickTd(rowIndex, cellIndex){
        this.tableData[this.rowIndex][this.cellIndex] = this.turn;
        this.checkBingo(rowIndex, cellIndex);
      }
    },
    created() {
      // $on을 통해 사용자 정의 이벤트를 등록할 수 있다.
      // onClickTd를 여기에 clickTd라는 이름으로 등록하고 methods에 onClickTd()를 만들어준다.
      // *** TdComponent.vue로 이동
      EventBus.$on('clickTd', this.onClickTd)
    }
  }
</script>

<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>