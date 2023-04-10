const path = require('path')
// 导入html-webpack-plugin插件，得到构造函数
const HtmlPlugin = require('html-webpack-plugin')
const { resourceLimits } = require('worker_threads')
// new构造函数，创建插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定要复制的文件
    filename: './index.html' // 指定要复制到的位置和名字
})

// 左侧的{}是结构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { parseHTML } = require('jquery')
const cleanWebpack = new CleanWebpackPlugin()

// 使用node.js中的导出语法，向外导出一个webpack的配置对象
module.exports = {
    // 保证运行时报错的行数与源代码的行数一致-建议在开发调试阶段都加上devtool
    devtool: 'eval-source-map',
    // devtool: 'source-map',
    // devtool: 'nosources-source-map',
    // 开发用 development 上线用 production
    mode: 'development', // mode是用来指定构建模式，可选值有development和production
    // entry: '指定要处理的哪个文件'
    entry: path.join(__dirname, './src/index1.js'),
    // output: '指定将打包文件存储位置'
    output: {
        // 指定存放的目录
        path: path.join(__dirname, './dist'),
        // 文件名
        filename: 'js/bundle.js'
    },
    // 挂载实例对象--插件的数组，将来webpack在运行时，会调用plugin插件
    plugins: [htmlPlugin, cleanWebpack],
    devServer: {
        open: true,
        port: 80, // 在http协议中，如果端口号是80，则可以被省略
        host: '127.0.0.1', // 指定运行的主机地址
        // openPage: 'http://localhost:8080/webpack-dev-server',
        // proxy: proxyTable.evn
    },
    // module 是所有第三方文件模块的匹配规则
    module: {
        // 文件后缀名匹配规则
        rules: [
            // 处理css文件的loader
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            // 处理less文件的loader
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 处理图片文件的loader
            // 如果需要调用loader只有一个，则只传递一个字符串；多个则传数组
            {test: /.\.jpg|png|gif$/, use: 'url-loader?limit-22229&outputPath=images' },
            // 处理js文件的loader
            // 注意：必须使用exclude指定排除项，因为node_modules目录下的第三方包不需要呗打包
            {test: /.\.js$/, use: 'babel-loader', exclude: '/node_modules/' }
        ]
    },
    resolve: {
        alias: {
            // 告诉webpack，程序员写的代码中，@符号标识src这一层目录
            '@': path.join(__dirname, './src/')
        }
    }
}