// webpack 的 培植文件 启动文件

console.log("配置webpack");

var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin"); //处理html 文件
var openBrowserWebpackPlugin = require("open-browser-webpack-plugin");//自动打开浏览器
var extractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

module.exports = {
    entry:["./src/main.js"], //入口文件
    output:{  //出口
        path:path.resolve(__dirname,"dist"), //打包根路径到dist里面
        filename:"js/[name].[hash:8].js", //  hash 加密
        publicPath:"", //文件的公共路径
    },
    devtool:"source-map", //方便在线调试

    resolve:{
        alias:{ //别名  @ ==>src
            "@":path.resolve("src"),
        }
    },


    module:{
        rules:[
            { //配置es6
                test:/\.(js|jsx)$/,
                exclude:/node_modules/, //排除掉node_modules里面的js文件
                use:["babel-loader"],
            },
            {  // 打包图片
                test:/\.(png|jpg|gif|woff|svg|woff2|eot|ttf)$/,
                use:[{
                    loader:"url-loader",
                    options:{
                        limit:8192,  //限制图片大小
                        name:"imgs/[name].[hash:8].[ext]"
                    }
                }]
            },
            {
                test:/\.(css|scss)/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader", //把 node字符串代码转为style 节点
                    use:[
                        "css-loader", //装换为commonJS 规范模块
                        {
                            loader:"postcss-loader", //css 代码转化
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"), //代码美化
                                        require("autoprefixer"), //自动补全
                                        require("postcss-px2rem-exclude")(
                                            {
                                                remUnit:100, //200px/100 = 2rem
                                                exclude:/antd-mobile/i //排除ui数据库适配
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "sass-loader"
                    ]
                })
            },
            {
                test:/\.(css|less)/,
                use:extractTextPlugin.extract({
                    fallback:"style-loader",   //  把 node字符串代码转为 style 节点 
                    use:[
                        "css-loader" ,   // 转换为 commonJS 规范的模块 
                        {
                            loader:"postcss-loader",  // css 代码转化 
                            options:{
                                plugins:function(){
                                    return [
                                        require("cssgrace"),  // 代码美化 
                                        require("autoprefixer"), // 自动补全 
                                        require("postcss-px2rem-exclude")(
                                            {
                                                remUnit:100,   // 200px / 100  = 2rem
                                                exclude:/antd-mobile/i    // 排除UI库适配 
                                            }
                                        )
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]
                })
            }
        ]
    },

    devServer:{ //配置服务器 webpack-dev-server 开发使用
        contentBase:path.join(__dirname,"dist"), //服务器作用于 dist
        host:"0.0.0.0",
        port:3000,
        compress:true,
        hot:true,
        inline:true,
        publicPath:"",
        proxy:{  // 反向代理 
            "/react": {
                // target:"http://localhost:1901/",
                target:"http://47.102.144.188:1902",
                changeOrigin: true,
            },
        }
    },


    plugins:[  //声明使用的插件

        new extractTextPlugin({
            filename:"css/app.[hash:8].css",
            allChunks:true, // 打包所有样式数据
            disable:false, //才样式抽离
        }),

        new webpack.ProvidePlugin({ // 自动引入 全局导入
            React:"React",
            Component:["react","Component"]
        }),
        new htmlWebpackPlugin({
            template:"./public/index.html",
            inject:true // 自动注入打包的css文件
        }),
        new openBrowserWebpackPlugin({url:"http://localhost:3000"}) // 自动打开浏览器
    ]
}