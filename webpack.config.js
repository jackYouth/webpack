const webpack = require('webpack')
const path = require('path')

const DIR_PATH = path.resolve(__dirname)
const DIST_PATH = path.resolve(DIR_PATH, 'dist')
const ASSETS_PATH = path.resolve(DIR_PATH, 'assets')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const VENDOR = ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'redux-thunk']

const currentEnv = process.env.NODE_ENV

const config = {
  // 入口文件
  // 配置多入口：bundle对应我们自己的文件，vendor对应的数组表示必用依赖库的文件
  entry: {
    bundle: './src',
    vendor: VENDOR
  },
  // 出口设置
  output: {
    // 必须使用绝对地址，作为输出的文件夹
    path: DIST_PATH,
    // 打包后输出文件的文件名
    filename: '[name].[chunkhash:6].js',
    // 表示html中src链入文件时，拼接到前面的名称前的路径
    // publicPath: 'dist/'
    chunkFilename: '[name].[chunkhash:6].child.js',
  },
  module: {
    // 定义解析器使用规则
    rules: [
      {
        // 匹配规则
        test: /\.js$/,
        // 使用解析器
        use: 'babel-loader',
        // 不包括路径
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
        // use后面可以跟字符串或是数组格式，为什么是数组，这是因为可能会使用多个loader进行解析
        use: [
          {
            loader: 'url-loader',
            // 配置url-loader的可选项
            options: {
              // 限制图片的大小10000b，小于限制时，会转化成base64
              limit: 10000,
              // 超出限制，抽出图片文件格式
              // 输出路径：[publicPath]/images/[文件名].[hash].[图片格式]
              // hash:6, 表示生成6位hash值
              name: 'images/[name].[hash:6].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    // 输出文件路径
    new ExtractTextPlugin('css/[name].[hash:6].css'),
    // 压缩分离出的css文件，并解决ExtractTextPlugin分离出的js文件重复的问题
    new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
    // 使用webpack自带的抽取公共代码的插件
    new webpack.optimize.CommonsChunkPlugin({
      // mainfest的作用：将每次打包改变的代码单独提取出来，保证没有更改过的代码无需重新打包，这样加快打包速度，需配合minChunks使用
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    // 删除指定文件
    new CleanWebpackPlugin(
      // 要删除文件的目录
      ['dist/*.js'],
      {
        // 是否显示log（好像没有作用）
        verbose: true,
        // 删除文件, 为true则不删除
        dry:     false,
      }
    ),
    // 自动生成html文件并自动引入打包后的其他文件
    new HtmlWebpackPlugin({
      // 指定需要作为模版的html的文件（注：这里一定要把之前手动引入的打包生成文件给删掉）
      template: path.resolve(ASSETS_PATH, 'index.html'),
      inject  : true,
      cache   : true,
      minify  : {    //压缩HTML文件
        removeComments    : true,    //移除HTML中的注释
        collapseWhitespace: true,   //删除空白符与换行符
        minifyJS          : true
      },
      serviceName: '没有配置标题'
    }),
    // 生成一个全局变量process.env.NODE_ENV, 可以将package.json中scripts下定义的打包指令对应的NODE_ENV值赋给webpack.config.js中的process.env.NODE_ENV
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("process.env.NODE_ENV")
    })
  ],
  devServer: {
    port: '3000',
  }
}

const devPlugins = []

const proPlugins = [
  // 配置js代码压缩工具
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
]

if (currentEnv === 'production') {
  config.plugins = config.plugins.concat(proPlugins)
} else {
  config.devServer = {
    port: '5522'
  }
  config.plugins = config.plugins.concat(devPlugins)
}

module.exports = config
