<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :key="index"
                  :row-index="index"></tr-component>
  </table>
</template>

<script>
  import TrComponents from "./TrComponent";
  export default {
    name: "TableComponent",
    components: {
      'tr-component': TrComponents,
    },
    computed: {
      tableData(){
        return this.$store.state.tableData;
      },
      // getters는 $store.getters로 가져온다.
      // getters도 여러개를 가져올 수 있기때문에 mapState를 지원한다.
      turnMessage(){
        return this.$store.getters.turnMessage;
      }
    },
  }
</script>

<style scoped>

</style>