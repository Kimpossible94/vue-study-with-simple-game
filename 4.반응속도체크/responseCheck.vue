<!--12. main.js에서 vue 인스턴스를 생성했다면 여기서는 컴포넌트를 생성해주면 된다.-->

<!--13. template안에는 이 전에 template에서 생성했던 것처럼 html 태그를 넣어주면된다.
  ********* number-baseball.html로 이동 *********-->
<template>
  <div>
    <div id="screen" v-bind:class="state">{{message}}</div>
    <div>
      <div>평균 시간 : {{}}</div>
      <button v-on:click="onReset">리셋</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.',
    }
  },
  methods: {
    onReset(){

    }
  }
}
</script>

<!--style은 vue-loader만으로는 읽지 못하므로 다른 loader를 추가해줘야한다.-->
<style>
  #screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  /* 클래스로 색을 변경한다. waiting일 때 aqua, ready일 때 red, now일 때 greenyellow 이도록 */
  #screen.waiting {
    background-color: aqua;;
  }
  #screen.ready {
    background-color: red;
    color: white;
  }
  #screen.now {
    background-color: greenyellow;
  }
</style>