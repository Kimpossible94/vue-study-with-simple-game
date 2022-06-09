<template>
  <div>
    <!--  class와 style은 아래처럼 객체형식을 지원한다.  -->
    <!--  <div id="computer" v-bind:class="{ state: true, hello: false }" v-bind:style="{ backgroundImage: '', fontSize: '14px' }"></div>  -->
    <div id="computer" v-bind:style="computedStyleObject"></div>
    <div>
      <button v-on:click="onClickButton('가위')">가위</button>
      <button v-on:click="onClickButton('바위')">바위</button>
      <button v-on:click="onClickButton('보')">보</button>
    </div>
    <div>{{result}}</div>
    <div>현재 {{score}}점</div>
  </div>
</template>

<script>
  const rspCoords = {
    가위: '-142px',
    바위: '0',
    보: '-284px',
  }

  const scores = {
    가위: 1,
    바위: 0,
    보: -1,
  }

  const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
      return v[1] === imgCoord;
    })[0];
  }

  let interval = null;
  export default {
    data() {
      return {
        imageCode: rspCoords.바위,
        result: '',
        score: 0,
      };
    },
    computed: {
      computedStyleObject() {
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imageCode} 0`,
        };
      }
    },
    methods: {
      changeHand(){
        interval = setInterval(() => {
          if(this.imageCode === rspCoords.가위){
            this.imageCode = rspCoords.바위;
          } else if(this.imageCode === rspCoords.바위){
            this.imageCode = rspCoords.보;
          } else if(this.imageCode === rspCoords.보){
            this.imageCode = rspCoords.가위;
          }
        }, 100);
      },

      onClickButton(choice){
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imageCode)];
        const diff = myScore - cpuScore;
        if(diff === 0){
          this.result = '비겼습니다.';
        } else if ([-1, 2].includes(diff)){
          this.result = '이겼습니다.';
          this.score += 1;
        } else {
          this.result = '졌습니다.';
          this.score -= 1;
        }

        setTimeout(() => {
          this.changeHand();
        }, 1000);
      }
    },
    // 라이프사이클은 created updated destroyed mounted 4가지를 알면된다.
    // life-cycle라는 컴포넌트가 있다고 하고, v-if가 false라 해보자.
    // 이 때 v-if가 true로 바뀌면 life-cycle은 없다가 생기게된다 그 생기게 되는 순간에 created가 작동한다.
    // created가 실행되고, 내부적으로 data()나 methods computed같은 계산을하고 실제로 화면에 그리는데,
    // 그렇게 화면에 그릴 때 mounted가 실행이 된다.
    // updated는 data같은 것들이 바뀌어 화면이 다시 그려질 때 updated가 작동한다.
    // v-if가 다시 false로 바뀌어서 화면에서 사라질 때 destroyed가 작동한다.
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.changeHand();
    },
    beforeUpdate() {
    },
    updated() {
    },
    //위에서 실행한 setInterval은 만약 component가 화면에서 사라진다해도,
    //계속 실행되어 메모리누수를 발생시킬 것이다. 그래서 destroy()에서 정리를 해주어야한다.
    beforeDestroy() {
      clearInterval(interval);
    },
    destroyed() {

    }
  }
</script>

<style>
#computer {
  width: 142px;
  height: 200px;
  background-position: 0 0;
}
</style>