const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.vue', '.js'],
    },
    entry: {
        myapp: path.join(__dirname, 'main.js'),
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }, {
            //style을 javascript로 바꾸기 위한 vue-style-loader와 css-loader를 설치하기 위해
            //npm i vue-style-loader css-loader -D 를 터미널에 입력해주자.
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]
            //loader는 많아질 수 밖에 없다.
            //나중에 css 전처리기인 sass, less 등이 추가되면 더 많아진다.
        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    // webpack-dev-server는 dist 폴더를 생성해서 output을 파일로 만들어서 저장하는 것이 아니라,
    // 컴퓨터의 메모리에 저장해서 실행한다. (원래는 안생기는데 지금 폴더에 있는건 이 전에 npm run을 했어서 기존에 생긴 파일이다.)
    devServer: {
        devMiddleware: {
            publicPath: '/dist',
        },
        static: {
            directory: path.join(__dirname),
        },
    },
}