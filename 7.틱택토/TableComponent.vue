<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :key="index" :row-data="rowData"
                  :row-index="index"></tr-component>
  </table>
</template>

<script>
  import TrComponents from "./TrComponent";
  export default {
    name: "TableComponent",
    props: {
      tableData: Array,
    },
    components: {
      'tr-component': TrComponents,
    },
    data(){
      return{

      };
    },
    methods: {

    },

  }
</script>

<style scoped>

</style>