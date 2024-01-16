const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'frontend/src/js/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    //name = entry{bundle:}
    //[contenthash] for caching so sit load faster - btw this create the issue of multiple js files in the dist
    filename: '[name][contenthash].js',
    // so solve multiple files issue
    clean: true,
    // so svg and imgs have the same file names after imorting
    assetModuleFilename: '[name][ext]',
  },
  // for debug
  devtool: 'source-map',

  //   settings for npm start
  devServer: {
    static: {
      // the same output folder
      directory: path.resolve(__dirname, 'dist'),
    },
    //to reload on html files
    watchFiles: ['frontend/src/pages/*.html'],
    hot: true,
    port: 3000,
    open: true, //open the browser
    hot: true, //reload
    compress: true,
    historyApiFallback: true,
  },
  //loaders for sass
  module: {
    rules: [
      {
        // babel settings
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },

      ,
    ],
  },
  plugins: [
    // html plugin so its create its own dist folder
    new HtmlWebpackPlugin({
      // tap title - going dynamically to html <%= %>
      title: 'TopEng',
      filename: 'index.html',
      // template html file outside dist folder
      //without this fill our html will be cleared everytime we build
      template: 'frontend/src/pages/home.html',
    }),
    new HtmlWebpackPlugin({
      title: 'TopEng/portfolio',
      filename: 'portfolio.html',
      template: 'frontend/src/pages/portfolio.html',
    }),
    new HtmlWebpackPlugin({
      title: 'TopEng/search',
      filename: 'search.html',
      template: 'frontend/src/pages/search.html',
    }),
    new HtmlWebpackPlugin({
      title: 'TopEng/Edit Portfolio',
      filename: 'Edit Portfolio.html',
      template: 'frontend/src/pages/Edit Portfolio.html',
    }),
    new HtmlWebpackPlugin({
      title: 'TopEng/sign up',
      filename: 'sign up.html',
      template: 'frontend/src/pages/sign up.html',
    }),
    new HtmlWebpackPlugin({
      title: 'TopEng/Log In',
      filename: 'Log In.html',
      template: 'frontend/src/pages/Log In.html',
    }),
    new HtmlWebpackPlugin({
      title: 'TopEng/Forgot Password',
      filename: 'Forgot Password.html',
      template: 'frontend/src/pages/Forgot Password.html',
    }),
  ],
};
