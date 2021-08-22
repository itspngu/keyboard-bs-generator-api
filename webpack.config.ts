import * as path from "path";
import DotenvWebpackPlugin from "dotenv-webpack";

import { Configuration } from "webpack";

const mode =
    process.env.NODE_ENV === "development" ? "development" : "production";

const config: Configuration = {
    mode: mode,
    context: path.join(path.resolve(__dirname), "src"),
    entry: "./index.ts",
    target: "webworker",
    performance: {
        hints: false,
    },
    output: {
        filename: "worker.js",
        path: path.resolve("worker"),
    },
    resolve: {
        extensions: [".ts", ".js", ".yml"],
    },
    plugins: [
        new DotenvWebpackPlugin({
            path: path.join(__dirname, ".env"),
            systemvars: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.yml$/,
                type: "json", // https://www.npmjs.com/package/yaml-loader#usage
                use: "yaml-loader",
            },
        ],
    },
};

export default config;
