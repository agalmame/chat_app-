const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
require('babel-polyfill')

module.exports = {
	mode: "development",
	entry: ["babel-polyfill","./src/main.js"],
	output: {
     		path: path.resolve(__dirname, "dist"), //Output Directory
     		filename: "bundle.js", //Output file
		chunkFilename: "[name].bundle.js",
	 },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					 options: {
   						presets: ["@babel/preset-env"]  //Preset used for env setup
  					}
				}
			},
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					'vue-style-loader',
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}

		]

	},
	resolve: {
		alias: {
			"vue$": "vue/dist/vue.esm.js",
			"@": path.resolve('src'),
		},
		extensions: ["*", ".js", ".vue", ".json"],
		
	},
	plugins: [
		new HotModuleReplacementPlugin(),
        	new VueLoaderPlugin(),
	      	new HTMLWebpackPlugin({
	      		template: path.join(__dirname, 'index.html'),
			minify: false,
	  })

	]
}
