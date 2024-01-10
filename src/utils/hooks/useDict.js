import { useLocalStorage } from './useLocalStorage'
import { getDictInfo } from '@/api/dict'

export const useDict = (params, immediate = true) => {
	const [getItem, setItem] = useLocalStorage()
	const dictCount = ref(0)
	const dict = reactive({})
	const dictItemMap = reactive({})
	immediate && getDict()
	// 获取字典信息
	async function getDict() {
		const numberResult = []
		const temp = Array.isArray(params) ? params : [params]
		// 判断是否有缓存storage
		const storage = []
		temp.forEach(item => {
			if (!getItem(item.toString())) {
				numberResult.push(item)
			} else {
				storage[item] = JSON.parse(getItem(item.toString()))
				storage[item].forEach(child => {
					dictItemMap[child.code] = child.nameCn
				})
				console.log('dictItemMap', dictItemMap)
			}
		})

		// 获取字典信息
		if (numberResult.length > 0) {
			const map = {}
			const data = await getDictInfo(numberResult)
			console.log(data)
			data.forEach(item => {
				const { parentCode } = item
				console.log(!map[parentCode])
				if (!map[parentCode]) {
					map[parentCode] = []
					map[parentCode].push(item)
				} else {
					map[parentCode].push(item)
				}
				dictItemMap[item.code] = item.nameCn
			})
			console.log('map', map)
			// 存储到storage
			for (let key in map) {
				setItem(key, JSON.stringify(map[key]))
			}
			const obj = { ...storage, ...map }
			for (let key in obj) {
				dict[key] = obj[key]
			}
		} else {
			for (let key in storage) {
				dict[key] = storage[key]
			}
		}
		dictCount.value++
	}

	return [dict, dictItemMap, dictCount, getDict]
}
