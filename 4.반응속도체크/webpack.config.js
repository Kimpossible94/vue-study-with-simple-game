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
    devServer: {
        devMiddleware: {
            publicPath: '/dist',
        },
        static: {
            directory: path.join(__dirname),
        },
    },
}