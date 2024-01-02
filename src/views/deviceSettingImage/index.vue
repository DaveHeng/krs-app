<template>
	<div class="map-wrap w100%">
		<MapEdit :db-name="'BaseMapDataCW'" />
	</div>
</template>

<script setup>
import { MapEdit } from 'mapsetting'
import 'mapsetting/dist/entry.css'
import dayjs from 'dayjs'
import { useAppConfig } from '@/store/modules/app'
const { appState, setCollapsed } = useAppConfig()

if (!appState.collapsed) {
	setCollapsed()
}
</script>
<style lang="less" scoped>
.map-wrap {
	height: calc(100% + 66px);
}
</style>
