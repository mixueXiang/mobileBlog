//webpack.config.js
  var webpack = require("webpack");
  var path = require('path');
  var publicPath = 'lx.mobileblog.xmixue.com:8888/';
  var host = 'lx.mobileblog.xmixue.com';
  var port = '8008';
  
  var devConfig = {
      host: host,
      port: port,
      entry: './client/src/main.js',
      output: {
          path: __dirname + '/client/src/build',
          filename: 'bundle.js',
          publicPath: '/'
      },
      resolve: {
          // require时省略的扩展名，如：require('module') 不需要module.js
          extensions: ["", ".js","jsx"],
      },

      plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.HotModuleReplacementPlugin(),
        //new webpack.NoErrorsPlugin(),
      ],

      module: {
        loaders: [
          {
            test: /\.jsx?$/, // .js .jsx
            loader: "react-hot",
          },
          {
            test: /\.jsx?$/, // .js .jsx
            loader: "babel", // 'babel-loader' is also a legal name to reference
            query: {
              presets: ["react", "es2015", "stage-0"]
            }
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader!less-loader!autoprefixer-loader',
          },

          {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader!autoprefixer-loader',
          }, 
          {
            test: /\.(png|jpg|gif|svg)$/,
            //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            loader: "url-loader?limit=2048&name=images/[hash:8].[name].[ext]",
          }
        ]
      }
  };

  module.exports = devConfig;