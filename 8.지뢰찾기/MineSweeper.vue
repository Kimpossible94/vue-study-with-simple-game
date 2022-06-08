<template>
  <div>
    <mine-form/>
    <div>{{timer}}</div>
    <table-component></table-component>
    <div>{{result}}</div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import TableComponent from "./TableComponent";
  import MineForm from "./MineForm";
  import {INCREMENT_TIMER} from "./store";

  let interval;
  export default {
    components: {
      TableComponent,
      MineForm
    },
    computed: {
      ...mapState(['timer','result','halted'])
    },
    methods: {

    },
    watch: {
      halted(val, oldVal){
        if(!val){ // halted가 false일 때 게임시작
          interval = setInterval(() =>{
            this.$store.commit(INCREMENT_TIMER);
            // ** 여담으로 javascript의 timer는 정확하지 않을 수 있으므로
            // new Date()를 통해 정확한지 비교해야한다.
          }, 1000)
        } else { // 게임 중단
          clearInterval(interval);
        }
      }
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