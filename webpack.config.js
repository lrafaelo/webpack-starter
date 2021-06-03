const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

 
 
module.exports = {
 
    mode: 'development',

    output:{           // sirve para borrar el archivo acumulado en la carpeta dist cuando le cambias el nombre a tu archivo html desde plugins, filename        
        clean:true
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
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',  // archivo html original y sirve para poder modificar o agregar algo a tu archivo html
            filename: './index.html'    // archivo html  dentro del dist 

        }),

        new MiniCssExtractPlugin({

            filename:'[name].css',
            ignoreOrder:false
        }),

        new CopyPlugin({
            patterns:[
                {from: 'src/assets/',to: 'assets/'}
            ]

        })
    ]
}