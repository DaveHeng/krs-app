<template>
	<div class="h100% flex items-center breadcrumb">
		<a-breadcrumb>
			<a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
				<Icon v-if="item.meta?.icon" :icon-name="item.meta?.icon" :style="{ color: '#fff' }" />
				<span v-if="index == levelList.length - 1" class="content"> {{ item.meta.newTitle }}</span>
				<span class="content" v-else @click.prevent="handleLink(item)">
					{{ item.meta.newTitle }}
				</span>
			</a-breadcrumb-item>
		</a-breadcrumb>
	</div>
</template>

<script setup>
import { usePermission } from '@/store/modules/permission'
import { useRoute, useRouter } from 'vue-router'
import { compile } from 'path-to-regexp'
import Icon from '../icons/IconOutput.vue'

const route = useRoute()
const router = useRouter()
const { state } = usePermission()
const levelList = ref([])

watch(
	() => route.path,
	() => {
		if (route.path.startsWith('/redirect/')) {
			return
		}
		// setRouteQuery(route)
		levelList.value = findRoute(state.routesSource, route.name)
		console.log(levelList.value)
	},
	{ immediate: true }
)
function findRoute(list, name) {
	let result = []
	const queue = [...list]
	const hash = {}

	while (queue.length > 0) {
		const item = queue.shift()
		result.push(copyItem(item))
		if (item.name === name) {
			return result.reduceRight((p, n) => {
				!hash[n.level] && n.level <= item.level ? p.unshift(n) && (hash[n.level] = true) : ''
				return p
			}, [])
		}
		if (item.children && item.children.length > 0) {
			queue.unshift(...item.children)
		}
	}
	return []
}
function copyItem(target) {
	const temp = {
		name: target.name,
		meta: target.meta,
		level: target.level
	}

	if (temp.meta && temp.meta.title) {
		temp.meta.newTitle =
			typeof temp.meta.title === 'string' ? temp.meta.title : temp.meta.title(route.query.type)
	}
	return temp
}

function pathCompile(path) {
	const { params } = route
	var toPath = compile(path)
	return toPath(params)
}
function handleLink(item) {
	const target = router.getRoutes().find(e => e.name === item.name)
	const { path } = target
	router.push({
		path: pathCompile(path),
		query: route.query
	})
}
</script>

<style lang="less" scoped>
.breadcrumb {
	li {
		color: #fff !important;
	}
	a {
		color: #fff !important;
		display: flex;
		align-items: center;
	}
	::v-deep(.ant-breadcrumb-separator) {
		color: #fff;
	}
}
</style>
