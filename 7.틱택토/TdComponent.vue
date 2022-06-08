<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  export default {
    name: "TdComponent",
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    methods: {
      resetTable(rootData){
        rootData.turn = 'O';
        rootData.tableData = [
          ['','','',],
          ['','','',],
          ['','','',],
        ]
      },
      checkBingo(rootData){
        let bingo = false;

        if(rootData.tableData[this.rowIndex][0] === rootData.turn
            && rootData.tableData[this.rowIndex][1] === rootData.turn
            && rootData.tableData[this.rowIndex][2] === rootData.turn){
          bingo = true;
        } else if (rootData.tableData[0][this.cellIndex] === rootData.turn
            && rootData.tableData[1][this.cellIndex] === rootData.turn
            && rootData.tableData[2][this.cellIndex] === rootData.turn){
          bingo = true;
        } else if (rootData.tableData[0][0] === rootData.turn
            && rootData.tableData[1][1] === rootData.turn
            && rootData.tableData[2][2] === rootData.turn){
          bingo = true;
        } else if (rootData.tableData[0][2] === rootData.turn
            && rootData.tableData[1][1] === rootData.turn
            && rootData.tableData[2][0] === rootData.turn){
          bingo = true;
        }

        if(bingo){ // O 또는 X가 이긴경우
          rootData.winner = rootData.turn;
          this.resetTable(rootData);
        } else { // 무승부
          let full = true;
          // 2차원 배열에 반복문을 돌려 칸이 모두 찼는지 확인
          // full이 true면 무승부
          rootData.tableData.forEach((row) => {
            row.forEach((cell) => {
              if(!cell){
                full = false;
              }
            })
          });
          if(full){
            rootData.winner = '';
            this.resetTable(rootData);
          }
          rootData.turn = rootData.turn === 'O'? 'X' : 'O';
        }
      },
      onClickTd(){
        if(this.cellData) return;
        const rootData = this.$root.$data;
        // O의 턴인지 X의 턴인지 확인을 위해 부모의 turn 변수를 확인해야하는데, 부모에서부터 물려주면 복잡하다.
        // 그래서 $함수를 통해 부모 컴포넌트로 접근할 수 있도록 되어있다.
        // this.$root.$data는 최상위 부모, $parent는 부모를 가르킨다.
        console.log(this.$root.$data.turn);
        console.log(this.$parent.$data);

        rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn;
        // 그러면 이런식으로 자식컴포넌트에서 부모컴포넌트의 데이터를 조작할 수 있다.
        this.checkBingo(rootData);
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

  // ********** Vuex의 필요성 **********
  // 지금은 컴포넌트가 작아서 this.$parent라면 어떤 컴포넌트를 말하는지 쉽게 알 수 있지만,
  // 컴포넌트가 수백 수천개로 많아지면 this.$parent가 어떤 부모 컴포넌트를 말하는지 알기 어렵다.
  // 그리고 부모의 부모 컴포넌트를 하려면 this.$parent.$parent 이런식으로 코드가 길어진다.
  // 이처럼 코드의 가독성이 떨어지는 문제점이 발생한다.
  // 그래서 중앙통제실의 역할을 하는 Vuex를 사용해 모든 데이터를 한 번에 관리하도록 해보자.
</script>

<style scoped>

</style>