<!--12. main.js에서 vue 인스턴스를 생성했다면 여기서는 컴포넌트를 생성해주면 된다.-->

<!--13. template안에는 이 전에 template에서 생성했던 것처럼 html 태그를 넣어주면된다.
  ********* number-baseball.html로 이동 *********-->
<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmit">
      <input minlength="4" maxlength="4" ref="answer" v-model="value"/>
      <button type="submit">입력</button>
    </form>
    <div>시도 : {{tries.length}}</div>
    <ul>
      <!-- v-for을 사용할 때는 v-for의 key도 써줘야한다. key는 여기서 여러개 생길 li태그를 구별하는 key
           key가 있어야 렌더링할 때 효율적으로 할 수 있다. -->
      <li v-for="t in tries" v-bind:key="t.try">
        <div>{{t.try}}</div>
        <div>{{t.result}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  const getNumbers = () => {
    const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array = [];
    for (let i = 0; i < 4; i++) {
      var chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  }

  export default {
    data() {
      return {
        answer: getNumbers(),
        value: '',
        result: '',
        tries: [],
      }
    },
    methods: {
      resetGame(){
        this.answer = getNumbers();
        this.tries = [];
        this.result = '';
      },
      onSubmit() {
        if(this.value === this.answer.join('')){
          alert("정답입니다 ! 게임이 초기화됩니다.");
          this.resetGame();
        } else {
          if(this.tries.length === 10){
            alert(`10번 넘게 틀려서 실패 ! 답은 ${this.answer.join('')}였습니다!`);
            this.resetGame();
          }
          let strike = 0;
          let ball = 0;
          const answerArray = this.value.split('').map(v => parseInt(v));
          for (let i = 0; i < 4; i++) {
            if(answerArray[i] === this.answer[i]){
              strike++;
            } else if (this.answer.includes(answerArray[i])) {
              ball++;
            }
          }
          this.tries.push({
            try: this.value,
            result: `${strike} 스트라이크, ${ball} 볼 입니다.`
          })
        }
        this.$refs.answer.focus();
        this.value = '';
      }
    }
  }
</script>

<style>

</style>