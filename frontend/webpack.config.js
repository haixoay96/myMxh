var config = {
   entry: './Component/main.jsx',

   output: {
      path:'./public/javascripts',
      filename: 'index.js',
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;
