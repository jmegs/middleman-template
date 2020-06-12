const path = require("path")

const entry = {
  main: "./source/assets/javascript/main.js"
}
const outputPath = path.resolve(__dirname, ".tmp/assets/javascript")

const legacyConfig = {
  entry,
  output: {
    path: outputPath,
    filename: "[name].legacy.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
								useBuiltIns: "usage",
								corejs: 3, // needed for useBuiltIns to work
                targets: { esmodules: false }
              }
            ]
          ]
        }
      }
    ]
  }
}

const modernConfig = {
  entry,
  output: {
    path: outputPath,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
								useBuiltIns: "usage",
								corejs: 3, // needed for useBuiltIns to work
                targets: { esmodules: true }
              }
            ]
          ]
        }
      }
    ]
  }
}

module.exports = [legacyConfig, modernConfig]
