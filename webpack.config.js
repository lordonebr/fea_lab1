const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
 entry: path.join(__dirname, 'src/js/index.js'),
 output: {
	path: path.join(__dirname, 'dist'),
	filename: 'bundle.js'
 },
 resolve: {
	extensions: [".js"]
 },
 plugins: [
	 new HtmlWebpackPlugin({
		 filename: 'index.html',
		 template: path.join(__dirname, 'src/index.html')
	 }),
	 //new ExtractTextPlugin('/css/estilo.css'),
	 new UglifyJSPlugin() 
 ],
 module: {
	rules: [
	{
	 test: /.js$/,
	 exclude: /node_modules/,
	 include: path.join(__dirname, 'src'),
	 use: [
		 {
			 loader: 'babel-loader',
			 options: {
				 presets: ['es2015']
			 }
		 }
		]
	 },
	 {
		test: /\.(jpe?g|ico|png|gif|svg)$/i,
		loader: 'file-loader?name=img/[name].[ext]'
	 },
	 {
		 test: /\.scss$/,
		 /*use: ExtractTextPlugin.extract({
			fallbackLoader: "style-loader",
			loader: "css-loader!sass-loader"
		 }),*/
		 use:['style-loader','css-loader', 'sass-loader']
	 }
	]
 },
 devServer: {
	 publicPath: "/",
	 contentBase: "./dist"
 }

};
