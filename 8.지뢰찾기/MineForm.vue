<template>
  <div>
    <input type="number" placeholder="세로" v-bind:value="row" v-on:change="onChangeRow">
    <input type="number" placeholder="가로" v-bind:value="cell" v-on:change="onChangeCell">
    <input type="number" placeholder="지뢰" v-bind:value="mine" v-on:change="onChangeMine">
    <button @click="onClickBtn">시작</button>
  </div>
</template>

<script>
  import {GAME_START} from "./store";

  export default {
    name: "MineForm",
    data() {
      return {
        row: 10,
        cell: 10,
        mine: 20,
      };
    },
    methods: {
      onChangeRow(e){
        this.row = e.target.value;
      },
      onChangeCell(e){
        this.cell = e.target.value;
      },
      onChangeMine(e){
        this.mine = e.target.value;
      },
      onClickBtn(){
        this.$store.commit(GAME_START, { row : this.row, cell : this.cell, mine : this.mine});
      }
    }
  }
</script>

<style scoped>

</style>