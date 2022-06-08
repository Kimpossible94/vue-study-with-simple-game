<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
  // TicTacToe 컴포넌트에서 만든 clickTd를 사용하기 위해 이벤트버스를 임포트한다.
  import EventBus from "./eventBus";
  export default {
    name: "TdComponent",
    props: {
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    methods: {
      onClickTd(){
        if(this.cellData) return;
        // $emit('등록된 이벤트이름')을 적어주면 이벤트버스에 등록된 이벤트가 실행된다.
        EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
      }
    }
  }
</script>

<style scoped>

</style>