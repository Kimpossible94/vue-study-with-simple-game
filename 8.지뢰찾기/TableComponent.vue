<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex"
          :style="cellDataStyle(rowIndex, cellIndex)"
          @click="onClickTd(rowIndex, cellIndex)"
          @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        {{cellDataText(rowIndex, cellIndex)}}
      </td>
    </tr>
  </table>
</template>

<script>
  import { mapState } from "vuex";
  import {CODE, FLAG_CELL, NOAMLIZE_CELL, OPEN_CELL, QUESTION_CELL, CLICK_MINE} from "./store";

  export default {
    computed: {
      ...mapState(['tableData', 'halted']),

      // *** cellDataStyle, cellDataText를 computed에 넣는이유
      // 가져온 데이터(여기서는 cellData)를 계산해서 style이나 화면에 표시할 글자를 만든다.
      // 그렇게 가져온 데이터를 계산할 때는 computed에 넣어야 vue 내부적으로 최적화가된다.
      cellDataStyle(state) {
        return (row, cell) => {
          switch (state.tableData[row][cell]) {
            case CODE.NORMAL:
            case CODE.MINE:
              return {
                background: '#444',
              };
            case CODE.CLICKED_MINE:
            case CODE.OPENED:
              return {
                background: 'white',
              }
            case CODE.FLAG:
            case CODE.FLAG_MINE:
              return {
                background: 'red',
              }
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
              return {
                background: 'yellow',
              }
            default:
              return {};
          }
    }
      },
      cellDataText(state) {
        return (row, cell) => {
          switch (state.tableData[row][cell]) {
            case CODE.MINE:
              return 'X';
            case CODE.NORMAL:
              return '';
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              return '!';
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
              return '?';
            case CODE.CLICKED_MINE:
              return '펑!';
            default:
              return state.tableData[row][cell] || '';
          }
        }
      }
    },
    methods: {
      onClickTd(row, cell) {
        if(this.halted) return;
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
            this.$store.commit(OPEN_CELL, {row, cell});
            return;
          case CODE.MINE:
            this.$store.commit(CLICK_MINE, {row, cell});
            return;
          default: return;
        }
        this.$store.commit(OPEN_CELL, {row, cell});
      },

      // 마우스 우클릭은 contextmenu라고한다.
      // v-on:contextmenu로 우클릭에 대한 행동을 제어할 수 있다.
      // prevent는 우클릭했을 때 contextmenu가 뜨는 것을 막아준다.
      onRightClickTd(row, cell) {
        console.log(row);
        if(this.halted) return;
        switch (this.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            this.$store.commit(FLAG_CELL, {row, cell});
            return;
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            this.$store.commit(QUESTION_CELL, {row, cell});
            return;
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            this.$store.commit(NOAMLIZE_CELL, {row, cell});
            return;
        }
      }
    }
  }
</script>

<style scoped>

</style>