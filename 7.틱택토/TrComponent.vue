<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :key="index" :cell-data="cellData"
                  :cell-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent";
  export default {
    name: "TrComponents",
    data(){
      return{
        parentData: '부모 컴포넌트의 데이터',
      }
    },
    props: {
      rowData: Array,
      rowIndex: Number,
    },
    components: {
      TdComponent,

    },
  }
</script>

<style scoped>

</style>