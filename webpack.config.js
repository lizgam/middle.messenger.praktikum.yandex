const prod = process.env.NODE_ENV === 'production';
const path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DIST_DIR = path.join(__dirname, './dist');
const ROOT_DIR = path.join(__dirname, './src');

module.exports = {
    mode: prod ? 'production' : 'development',
    entry: path.resolve(ROOT_DIR, 'index.ts'),
    output: {
        path: DIST_DIR,
        filename: 'main.js',
    },
    devServer: {
        static: DIST_DIR,
        port: 3333,
        historyApiFallback: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(__dirname, "tsconfig.json"),
                        },
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            api: path.resolve(ROOT_DIR, "api"),
            components: path.resolve(ROOT_DIR, "components"),
            core: path.resolve(ROOT_DIR, "core"),
            model: path.resolve(ROOT_DIR, "model"),
            pages: path.resolve(ROOT_DIR, "pages"),
            services: path.resolve(ROOT_DIR, "services"),
            utilities: path.resolve(ROOT_DIR, "utilities"),
            handlebars: 'handlebars/dist/handlebars.min.js',
        }
    },
    devtool: prod ? undefined : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin(),
        new webpack.EnvironmentPlugin({
            API_ENDPOINT: "https://ya-praktikum.tech/api/v2",
            WS_ENDPOINT: "wss://ya-praktikum.tech/ws/chats",
        })
    ],
};
