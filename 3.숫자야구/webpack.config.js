// 아래에있는 output의 path를 절대경로로 설정라하는 에러가 발생했다.
// 이것을 해결하기 위해 절대경로로 C:/Beom ... 이런식으로 하면 힘드니까
// node에서 제공해주는 path라는 모듈을 사용해서 output의 path를 설정하자.
const path = require('path');

// 19. vue-loader 플러그인
const { VueLoaderPlugin } = require('vue-loader');

//7. module.exports : node의 모듈을 만든 것 나중에 웹팩이 웹팩처리를 할 때 사용한다.
module.exports = {
    mode: 'development',
    //devtool옵션은 개발할 때는 eval(속도빠름), 배포할 때는 hidden 뭐시기 쓴다.
    devtool: 'eval',
    resolve: {
        //확장자 처리해줌.
        //원래는 main.js에서 임포트할 때 numberBaseball.vue까지 붙여야하는데 .vue안붙여도됨
        extensions: ['.js', '.vue']
    },
    //8. 웹팩은 스크립트가 많아져서 사용하는데 그 스크립트중 가장 대표가 되는 파일을 entry라고 한다.
    entry: {
        app: path.join(__dirname, 'main.js'), //app은 나중에 하나로 합쳐질 파일이다. main.js 기타등등의 많은 파일이 합쳐짐
    },
    //16. module가 웹팩의 핵심이다.
    module: {
        //17. rules안에 어떻게 합쳐질 것인지를 명시해준다.
        //rules에 test속성을 입력하고 정규표현식으로  /\.vue$/를 입력해준다.
        //그리고 loader로 'vue-loader'를 입력해준다.
        //그럼 .vue로 끝나는 것들은 vue-loader로 로딩하겠다 라는 뜻인데
        //vue loader가 없으니까 npm i vue-loader -D로 설치해주자


        //18. 이렇게해도 또 에러가 발생할텐데,
        // vue-loader was used without the corresponding plugin.
        // Make sure to include VueLoaderPlugin in your webpack config.
        // 이런식으로 config에 vue-loader plugin을 넣으라고 에러가 발생한다.
        // 넣어주자
        // ********* main.js로 이동 *********
        rules: [{
            //.vue는 자바스크립트 파일이 아니지만 rules에 .vue에 대한 loader를 설정해주었으므로
            //vue loader가 .vue를 내부적으로 자바스크립트로 전환해줘서 js로 합칠 수 있다.
            //이게 css, image가 될 수도 있다.
            //이처럼 어떤 파일이던 자바스크립트 하나로 합치는게 webpack의 가장 큰 장점이다.
            test: /\.vue$/,
            loader: 'vue-loader',
        }]
    },
    plugins: [
        //20. 선언해준 vue-plugin을 적용해주자.
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js', //9. 나중에 합쳐질 파일의 이름을 정하는 것이다 [name]라고하면 나중에 app.js가 된다.
        //__dirname은 현재경로이다. 현재경로는 3.숫자야구 이므로
        //뒤에 'dist'를 붙여 우리가 원하는 경로인 ./dist를 만들어주자.
        //********* main.js로 이동 *********
        path: path.join(__dirname, 'dist'),
    },
};