import 'uno.css'
import './style/index.css'
import 'normalize.css'
import 'animate.css'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './permission'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import 'dayjs/locale/zh-cn'
import { sourceData } from './router/static'
dayjs.extend(updateLocale)
dayjs.updateLocale('zh-cn', {
	weekStart: 0
})
function getName(list) {
	const result = []
	list.forEach(item => {
		result.push(item.name)
		if (item.children) {
			result.push(...getName(item.children))
		}
	})

	return result
}

console.log(JSON.stringify(getName(sourceData)))
const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
