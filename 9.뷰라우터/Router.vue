<template>
  <div>
  <!-- router는 사실 눈속임이다.-->
  <!-- 실제로는 하나의 페이지에서 이루어진다.-->
    <div>
      <!-- router-view가 아닌 부분은 공통적인 부분이다. -->
      <!-- router-link는 router 설정에 등록했던 path로 컴포넌트를 연결해준다.
            html a태그로 바뀌지만 실제로 a태그처럼 다른 페이지로 가는게 아니라
            다른 컴포넌트를 불러오는 특수한 기능을 해준다. -->
      <router-link to="/game/index">게임 매쳐</router-link>
      <router-link to="/game/number-baseball">숫자야구</router-link>
      <router-link to="/game/response-check">반응속도체크</router-link>
      <router-link to="/game/rock-scissors-paper">가위바위보</router-link>
      <router-link to="/game/lotto-generator">로또</router-link>
    <!--  주소에따라 화면이 바뀌므로 바뀌는 컴포넌트가 들어갈 부분을 router-view로 지정한다.  -->
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    computed: {

    },
    methods: {

    },
  }
</script>

<style>

</style>