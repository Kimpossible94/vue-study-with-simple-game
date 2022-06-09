<template>
  <div class="ball" v-bind:style="background">{{ number }}</div>
</template>

<script>
  export default {
    name: "LottoBall",
    // LottoGenerator에서 lotto-ball로 LottoBall 컴포넌트를 사용한다.
    // 이렇게 여러개의 컴포넌트를 사용하면 부모-자식 관계가 성립이 되는데,
    // 부모 컴포넌트에서 자식 컴포넌트에게 데이터를 넘겨줄 수가 있다.
    // 그래서 부모 컴포넌트에서 자식 컴포넌트에게 넘겨주는 값을 props로 받아 사용할 수 있다.
    // 주의해야할 점은 props는 바꿀 수 없다. 읽기전용속성으로 이해햐면 편하다.
    // 예제에서는 number를 받아서 사용했다.
    // props이름 : 데이터형식 이런식으로 사용한다.
    props: {
      number: Number,
    },
    data(){

    },
    computed: {
      background() {
        let background;
        if(this.number < 10){
          background = 'red';
        } else if(this.number < 20){
          background = 'orange';
        } else if(this.number < 30){
          background = 'yellow';
        } else if(this.number < 40){
          background = 'blue';
        } else {
          background = 'green';
        }
        return {
          background,
        };
      }
    },
    methods: {

    },

  }
</script>

<style>
  .ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
</style>