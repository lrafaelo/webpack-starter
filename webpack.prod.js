const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin           = require("copy-webpack-plugin");
const CssMinimizer         = require('css-minimizer-webpack-plugin');
const Terser               = require('terser-webpack-plugin');
 
module.exports = {
 
    mode: 'production',

    output:{           // sirve para borrar el archivo acumulado en la carpeta dist cuando le cambias el nombre a tu archivo html desde plugins, filename        
        clean:true,
        filename:'main.[contenthash].js'// esto es para pode cambiar el nombre de la carpeta main en dist
        
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false,    // esto se usa para comprimir el codigo de un archivo html en la carpeta dist siempre y cuando este en true
                    sources: false,    // este sirve para poder jalar todo lo que tenga tu achivo html
                }
            },
            {
                test: /\.css$/i,
                exclude:/styles.css$/i,
                use:['style-loader','css-loader']
            },
            {
                test:/styles.css$/i,   // para buscar un archivo en especifico
                 use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }

        ]
    },

    optimization:{
        minimize:true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ] 
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',  // archivo html original y sirve para poder modificar o agregar algo a tu archivo html
            filename: './index.html'    // archivo html  dentro del dist 

        }),

        new MiniCssExtractPlugin({

            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),

        new CopyPlugin({
            patterns:[
                {from: 'src/assets/',to: 'assets/'}
            ]

        })
    ]
}