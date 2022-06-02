//10. 여기서의 import는 npm i vue를 통해 설치한 vue를 가져오는 것이다.
//packge.json의 dependencise에 있는 vue에서 가져오므로 from "vue"이다.
import {createApp} from 'vue';

//main.js를 numberBaseball.vue와 연결함
import numberBaseball from "./numberBaseball";

//11. vue 인스턴스 만듬
//********* numberBaseball.vue로 이동 *********
createApp(numberBaseball).mount('#root');


//15. npm run build를 하면 에러가 발생할탠데, webpack의 입장에서 실행순서를 보며 고쳐보자.
//우선 webpack은 config.js에 entry를 본다 그럼 entry에 main.js가 있으니
//main.js부터 시작하네?라고 생각하고 main.js로 접근해서 읽는다.
//그럼 처음에 Vue를 import하고 그 다음 numberBaseball.vue를 불러온다.
//여기서 webpack은 javascript만 읽는데, numberBaseball.vue는 javascript가 아니다.
//그래서 나오는 것이 config.js의 rules이다.
// ********* config.js로 이동 *********
