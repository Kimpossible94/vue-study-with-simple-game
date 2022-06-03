<template>
  <div>
<!-- v-bind:class를 사용하면 class의 이름을 컴포넌트의 data에 정의한 state의 value값으로 설정할 수 있다.  -->
    <div id="screen" v-bind:class="state" v-on:click="onClickStyle">{{message}}</div>
    <!--  v-show와 v-if의 차이
          v-show와 v-if 사용해서 result.length가 있을 때만 보여지도록 했는데,
          눈으로 보이는 것은 v-if나 v-show나 똑같이 보인다.
          하지만, 크롬의 개발자도구를 이용해 태그를 살펴보면
          v-show를 사용한 div는 style:none이고 v-if를 사용한 태그는 div없이 주석처리만 있다.
          태그가 있냐 없냐는 전체적인 레이아웃에 영향을 주기때문에 차이점이 있다.-->
    <div v-show="result.length">
      <div>평균 시간 : {{average}}ms</div>
      <div>시도 횟수 : {{result.length}}</div>
      <button v-on:click="onReset">리셋</button>
    </div>
    <div v-if="result.length">
      <div>평균 시간 : {{average}}ms</div>
      <div>시도 횟수 : {{result.length}}</div>
      <button v-on:click="onReset">리셋</button>
    </div>
    <!--  위쪽은 div들은 평균시간과 시도 횟수를 감싸주기위한 div 였는데,
          이렇게 v-if를 쓰기위해 감싸주는 용도의 div가 싫다면 template을 사용하면 된다.-->
    <template v-if="result.length">
      <div>평균 시간 : {{average}}ms</div>
      <div>시도 횟수 : {{result.length}}</div>
      <button v-on:click="onReset">리셋</button>
    </template>
    <!--  하지만 vue는 template안에서 template은 바로 못쓰고 최상위의 div로 감싸주어야한다.
          div말고 다른 방법이 있지만 7강에서 배워보자. -->
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  data() {
    return {
      result: [],
      state: 'waiting',
      message: '클릭해서 시작하세요.',
    }
  },
  //computed속성을 통해서 계산이 필요한 부분을 return 받아사용해 template안에서는 짧게 쓸 수 있다.
  //일반데이터를 가공해서 사용할 때 computed를 사용한다.
  // *** computed는 왜 사용할까. ***
  //만약 내가 template의 div안에서 계산을 했다면 result를 제외한 다른 부분을 바꾸고 저장을 했을 떄,
  //그 계산식을 다시 돌려야한다. 하지만 computed를 사용하면
  //기존의 캐싱된 데이터를 가져가기 때문에 다시 계산을 하지 않아도 된다.
  //이렇게 성능상의 이점을 가져갈 수 있다. *******
  computed: {
    average() {
      // reduce함수로 배열에 모든 값 더하기
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0
    }
  },
  methods: {
    onReset() {
      this.result = [];
    },
    onClickStyle() {
      if(this.state === 'waiting') {
        this.state = 'ready';
        this.message = '초록색이 되면 클릭하세요.';
        timeout = setTimeout(() => {
          this.state = 'now';
          this.message = '지금클릭';
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 1000); // 1~2초
      } else if (this.state === 'ready') {
        clearTimeout(timeout);
        this.message = '너무 성급하시군요. 초록색이 된 이후에 클릭해주세요 !';
        this.state = 'waiting';
      } else if (this.state === 'now') {
        endTime = new Date();
        this.state = 'waiting';
        this.message = '클릭해서 시작하세요.';
        this.result.push(endTime - startTime);
      }
    }
  }
}
</script>

<!--style은 vue-loader만으로는 읽지 못하므로 다른 loader를 추가해줘야한다.-->
<style scoped>
/* 하나의 컴포넌트안에서만 사용하기 위해 scoped 옵션을 붙여줄 수 있다.
    scoped를 붙여주고 렌더링된 화면을 크롬의 개발자도구로 보면 style 태그의
    속성들에 data-**** 이런식으로 임의의 값이 들어가 있는 것을 확인할 수 있다.
    css 선택자들이 어떻게 태그를 찾는지 원리를 알면 된다.
    css 선택자들은 저렇게 붙여진 data-**이런 것을 먼저 찾고 그다음 #screen을 찾는다.
    이러한 방식으로 다른 컴포넌트의 css에 영향을 주지 않는 것이다. */
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