<template>
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" v-bind:key="ball" v-bind:number="ball"></lotto-ball>
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" v-bind:number="bonus"></lotto-ball>
    <button v-if="redo" v-on:click="onCLickRedo">한 번 더!</button>
  </div>
</template>

<script>
  import LottoBall from "./LottoBall";

  function getWinNumbers () {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0){
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.splice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }

  const timeouts = [];
  export default {
    // script태그 안에서 사용할 자식 컴포넌트를 임포트하고
    // components 객체로 불러온 컴포넌트를 등록한다.
    // '사용할 컴포넌트의 이름 지정' : import한 컴포넌트
    components: {
      'lotto-ball': LottoBall,
    },
    data() {
      return {
        winNumbers: getWinNumbers(),
        redo: false,
        winBalls: [],
        bonus: null,
      };
    },
    computed: {

    },
    methods: {
      onCLickRedo(){
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
      },

      showBalls(){
        for (let i = 0; i < this.winNumbers.length - 1; i++) {
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, (i + 1) * 1000);
        }

        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000);
      }
    },
    mounted() {
      this.showBalls();
    },
    beforeDestroy() {
      timeouts.forEach((t) => {
        clearTimeout(t);
      })
    },
    // watch는 data의 상태를 감시하여 원하는 동작을 할 수 있게 해준다.
    // 데이터의 이름으로 함수를 만들면 되는데,
    // 첫번째 인자는 변경된 값을, 두번째 인자는 변경전의 값을 말한다.
    watch: {
      // 한 번더 버튼을 누르면 winBalls의 배열이 비어 값에 변경이 생긴다.
      // 그 때 watch의 winBalls가 실행되어 length가 0 이라면 showBalls 실행
      winBalls(val, oldVal) {
        if (val.length === 0) {
          this.showBalls(); //watch를 공부하기위해 showBalls 메서드를 여기에 넣어줬다. 안넣는게 좋음
        }
      },
      // 하지만 watch는 최대한 자제하는 것이 좋다.
      // 아래와 같은 코드가 있다면 이 redo의 watch는 무한히 반복된다.
      // redo(val, oldval){
      //   if(!val){
      //     this.redo = true;
      //     this.showBalls();
      //   } else if (val){
      //     this.redo = false;
      //     this.showBalls();
      //   }
      // }
      // 이렇게 watch를 너무 남용하면 예상하지 못한 곳에서 문제가 발생할 수 있다.
      // 그리고 watch는 비동기로 작동하기 때문에 watch가 쌓이면 하나가 바뀌었을 때,
      // 여러개가 동시다발적으로 바뀌는 상황이 발생할 수 있다.
    }
  }
</script>

<style scoped>

</style>