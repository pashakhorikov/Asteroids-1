const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');


const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

module.exports =
    {
        entry: ['./src/index.tsx'],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less']
        },
        output: {
            path: path.join(__dirname, '/static'),
            filename: isDev ? 'bundle.js' : 'bundle.min.[hash].js'
        },
        mode,
        devtool: isDev ? 'inline-source-map' : false,
        devServer: {
            disableHostCheck: true,
            historyApiFallback: true,
            port: 3000
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: ''
                            }
                        },
                        {loader: 'css-loader', options: {modules: 'global'}},
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        {loader: MiniCssExtractPlugin.loader},
                        {loader: 'css-loader', options: {modules: 'global'}},
                    ],
                },
                {
                    test: /\.(png|svg|jpg|gif|mp3|pdf)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: isDev ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
        ]
    }
