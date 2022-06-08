<template>
  <div>
    <div>{{ turn }}님의 차례입니다.</div>
    <table-component></table-component>
    <div v-if="winner">{{ winner }}님의 승리입니다 !</div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import TableComponent from "./TableComponent";
  export default {
    components: {
      'table-component': TableComponent,
    },
    computed: {
      ...mapState(["tableData", "turn", "winner"]),
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