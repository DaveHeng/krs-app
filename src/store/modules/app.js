import { defineStore } from 'pinia'
import { useLocalStorage } from '@/utils/hooks/useLocalStorage'

export const useAppConfig = defineStore('app', () => {
	const [getItem, setItem] = useLocalStorage()
	const state = reactive({
		collapsed: !!getItem('collapsed'),
		menuWidth: getItem('menuWidth') || 300,
    themeColor: '#1890ff'
	})

	function setCollapsed() {
		state.collapsed = !state.collapsed
		state.menuWidth = state.collapsed ? 72 : 300
		setItem('collapsed', state.collapsed)
		setItem('menuWidth', state.menuWidth)
	}

	return {
		appState: state,
		setCollapsed
	}
})
