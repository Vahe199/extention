const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require('html-webpack-plugin');
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup:path.resolve("./src/popup/popup.tsx"),
        options:path.resolve("./src/options/options.tsx"),
        background:path.resolve("./src/background/background.ts"),
        contentScripts:path.resolve("./src/contentScripts/contentScripts.ts")
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx$/,
                exclude: /node_modules/
            },
            {
                use:["style-loader", "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                              ident:"postcss",
                                plugins: [tailwindcss , autoprefixer]
                            },
                        },
                    }
                    ],
                test: /\.css$/i,
            },
            {
                type: "assets/resource",
                use: "assets/resource",
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist')
                }
            ],
        }),
        ...getHTMLPlugins(["popup","options"])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: "[name].js"
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
}

function getHTMLPlugins(chunks) {
    return chunks.map(chunk => new HtmlPlugin({
        title: "Basic Calculate",
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}