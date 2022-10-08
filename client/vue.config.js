const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = defineConfig({
	transpileDependencies: true,

	pluginOptions: {
		vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		},
	},
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('client/src'))
	},
})
