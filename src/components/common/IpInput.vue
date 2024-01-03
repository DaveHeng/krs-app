<template>
	<div class="space-container">
		<div>
			<a-input-number
				:min="0"
				:max="255"
				:maxLength="3"
				:bordered="false"
				:controls="false"
				class="w60px"
				v-model:value="numberArr[0]"
				ref="input0"
				@change="
					e => {
						onChangeNumber(e, 0)
					}
				"
				@keyup="
					e => {
						triggerKey(e, 0)
					}
				"
			/>
			<span class="dot"></span>
			<a-input-number
				:min="0"
				:max="255"
				:maxLength="3"
				:bordered="false"
				:controls="false"
				class="w60px"
				v-model:value="numberArr[1]"
				ref="input1"
				@change="
					e => {
						onChangeNumber(e, 1)
					}
				"
				@keyup="
					e => {
						triggerKey(e, 1)
					}
				"
			/>
			<span class="dot"></span>
			<a-input-number
				:min="0"
				:max="255"
				:maxLength="3"
				:bordered="false"
				:controls="false"
				class="w60px"
				v-model:value="numberArr[2]"
				ref="input2"
				@change="
					e => {
						onChangeNumber(e, 2)
					}
				"
				@keyup="
					e => {
						triggerKey(e, 2)
					}
				"
			/>
			<span class="dot"></span>
			<a-input-number
				:min="0"
				:max="255"
				:maxLength="3"
				:bordered="false"
				:controls="false"
				class="w60px"
				v-model:value="numberArr[3]"
				ref="input3"
				@change="
					e => {
						onChangeNumber(e, 3)
					}
				"
				@keyup="
					e => {
						triggerKey(e, 3)
					}
				"
			/>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(['changeIp'])
const numberArr = ref([])
const input0 = ref(null)
const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const refs = {
	input0,
	input1,
	input2,
	input3
}
function onChangeNumber(value, index) {
	numberArr.value[index] = value
	const temp = numberArr.value.join('.')
	if (temp === '...') {
		emit('changeIp', '')
	} else {
		emit('changeIp', numberArr.value.join('.'))
	}
}
function triggerKey(e, type) {
	if (e.keyCode === 37) {
		if (type === 0) {
		} else {
			if (!e.target.value.length) {
				const key = `input${type - 1}`
				refs[key].value.focus()
			}
		}
	}
	if (e.keyCode === 8) {
		if (type > 0) {
			if (!e.target.value.length) {
				const key = `input${type - 1}`
				refs[key].value.focus()
			}
		}
	}
	if ([39, 13, 32, 190, 110].includes(e.keyCode)) {
		if (type === 3) {
		} else {
			const key = `input${type + 1}`
			refs[key].value.focus()
		}
	}
}
</script>

<style lang="less" scoped>
.space-container {
	border: 1px solid #d9d9d9;
	background-color: #fff;
	border-radius: 6px;
	width: 250px;
	height: 30px;
	.dot {
		position: relative;
		&::after {
			content: '.';
			position: absolute;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
		}
	}
}
</style>
