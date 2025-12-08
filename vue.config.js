const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-',
    },
  },
})
