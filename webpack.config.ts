import * as path from "path";
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
        extensions: [".ts", ".yml", ".yaml"],
    },
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
                test: /\.ya?ml$/,
                type: "json", // https://www.npmjs.com/package/yaml-loader#usage
                use: "yaml-loader",
            },
        ],
    },
};

export default config;
