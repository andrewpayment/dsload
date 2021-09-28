const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      bufferutil: false,
      console: false,
    },
  },
  mode: "development",
  entry: {
    soakTest: "./src/tests/soak.test.ts",
    getUsersTest: "./src/tests/get-user.test.ts",
    employeeSearchTest: "./src/tests/employees/employees-search.test.ts",
    getEmployeeTimePolicyConfiguration: "./src/tests/employees/get-employee-time-policy-config.test.ts",
    getCostCenterSelectionRequired: "./src/tests/clock/get-cost-center-required.test.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'commonjs',
    filename: "[name].bundle.js",
    clean: true,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/typescript", "@babel/preset-env"],
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
          ],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  devtool: "source-map",
};
