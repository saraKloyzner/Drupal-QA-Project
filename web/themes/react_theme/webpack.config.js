// const path = require('path');
// const isDevMode = process.env.NODE_ENV !== 'production';

// module.exports = {
//   entry: {
//     main: ["./js/src/index.jsx"]
//   },
//   devtool: isDevMode ? 'source-map' : false,
//   mode: isDevMode ? 'development' : 'production',
//   output: {
//     path: isDevMode ? path.resolve(__dirname, "js/dist_dev") : path.resolve(__dirname, "js/dist"),
//     filename: '[name].min.js'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         include: path.join(__dirname, 'js/src'),
//       }
//     ],
//   },
// };


// const path = require('path');
// const isDevMode = process.env.NODE_ENV !== 'production';

// module.exports = {
//   entry: {
//     main: ["./js/src/index.jsx"]
//   },
//   devtool: isDevMode ? 'source-map' : false,
//   mode: isDevMode ? 'development' : 'production',
//   output: {
//     path: isDevMode ? path.resolve(__dirname, "js/dist_dev") : path.resolve(__dirname, "js/dist"),
//     filename: '[name].min.js'
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         loader: 'babel-loader',
//         exclude: /node_modules/,
//         include: path.join(__dirname, 'js/src'),
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name].[ext]',
//               context: '',
//               outputPath: 'images/'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader']
//       }
//     ],
//   },
// };




const path = require('path');
const isDevMode = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    main: ["./js/src/index.jsx"]
  },
  devtool: isDevMode ? 'source-map' : 'source-map',
  mode: isDevMode ? 'development' : 'production',
  output: {
    path: isDevMode ? path.resolve(__dirname, "js/dist_dev") : path.resolve(__dirname, "js/dist"),
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'js/src'),
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = config;

