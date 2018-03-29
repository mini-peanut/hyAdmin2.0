export default {
  "entry": "src/index.js",
  "extraBabelPlugins": [
    "transform-decorators-legacy",
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }],
    ["module-resolver", {
      "alias": {
        "src": `${__dirname}/src`,
        "app": `${__dirname}/src/app`,
        "components": `${__dirname}/src/components`,
        "routes": `${__dirname}/src/routes`,
        "models": `${__dirname}/src/models`,
        "services": `${__dirname}/src/services`,
        "utils": `${__dirname}/src/utils`,
        "assets": `${__dirname}/src/assets`
      }
    }]
  ],
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr"
      ]
    }
  },
  "ignoreMomentLocale": true,
  "theme": "./src/theme.js",
  "html": {
    "template": "./src/index.ejs"
  },
  "publicPath": "/",
  "disableDynamicImport": true,
  "hash": true,
  "proxy": {
    "/dev/api": {
      "target": "http://127.0.0.1:8360",
      "changeOrigin": true,
      "pathRewrite": {
        '^/dev/api': ''
      }

    }
  }
}
