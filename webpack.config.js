const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

const outputPath = path.resolve(__dirname, "dist");

const config = {
  mode: isEnvProduction ? "production" : "development",
  devtool: "source-map",
  entry: {
    index: "./src/ui/index.jsx",
    code: "./src/sandbox/code.js",
  },
  experiments: {
    outputModule: true,
  },
  output: {
    pathinfo: !isEnvProduction,
    path: outputPath,
    module: true,
    filename: "[name].js",
  },
  externalsType: "module",
  externalsPresets: { web: true },
  externals: {
    "add-on-sdk-document-sandbox": "add-on-sdk-document-sandbox",
    "express-document-sdk": "express-document-sdk",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "module",
      excludeChunks: ["code"],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/*.json", to: "[name][ext]" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".jsx", ".js", ".css"],
  },
};

// Add devServer configuration for development mode
if (!isEnvProduction) {
  config.devServer = {
    // Explicitly set static directory to serve files from dist
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 5241,
    https: true,
    // publicPath must match output.publicPath (default is "/")
    publicPath: "/",
    // Configure devMiddleware to write files to disk and serve them
    devMiddleware: {
      publicPath: "/",
      writeToDisk: true, // Ensure the server finds the physical files
    },
    // Enable history API fallback to serve index.html for all routes
    historyApiFallback: true,
    open: false,
    hot: true,
    compress: true,
    allowedHosts: "all",
  };
}

module.exports = config;
