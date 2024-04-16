export const KEY = 'cw_web1'
export function useLocalStorage() {
	const getItem = key => {
		const temp = localStorage.getItem(KEY)
		return temp ? JSON.parse(temp)[key] : null
	}
	const setItem = (key, value) => {
		const temp = localStorage.getItem(KEY)
		if (temp) {
			const obj = JSON.parse(temp)
			obj[key] = value
			localStorage.setItem(KEY, JSON.stringify(obj))
		}
	}

	const removeAll = () => {
		localStorage.removeItem(KEY)
	}
	return [getItem, setItem, removeAll]
}
