import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import viteCompression from 'vite-plugin-compression'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

export default defineConfig({
	plugins: [
		vue(),
		viteCompression(),
		Unocss({
			presets: [presetAttributify({}), presetUno()],
			rules: [
				[/^fs-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ 'font-size': `${d}px` })],
				[/^leh-(\d+\.{0,1}\d{0,2})$/, ([, d]) => ({ 'line-height': `${d}` })],
				[/^h100%-(\d+)$/, ([, d]) => ({ height: `calc(100% - ${d}px)` })],
				[/^w-(\d+)-important$/, ([, d]) => ({ width: `${d}px !important` })]
			]
		}),
		Components({
			dirs: ['src/components/common'],
			resolvers: [
				AntDesignVueResolver({
					importStyle: false, // css in js
					resolveIcons: true
				}),
				componentName => {
					// where `componentName` is always CapitalCase
					if (componentName.startsWith('Common'))
						return { name: componentName.slice(6), from: 'common' }
				}
			]
		}),
		AutoImport({
			imports: ['vue', 'vue-router']
		})
	],
	resolve: {
		// alias: {
		//   '@': fileURLToPath(new URL('./src', import.meta.url))
		// }
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components')
		}
	},

	server: {
		port: 8999,
		proxy: {
			'/api': {
				target: 'http://192.168.124.200:7001',
				changeOrigin: true,
				ws: true
			}
		}
	},
	build: {
		minify: 'terser', // boolean | 'terser' | 'esbuild'
		sourcemap: false, // 输出单独 source文件
		cssCodeSplit: true,
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true
			}
		},
		chunkSizeWarningLimit: 1500
	}
})
