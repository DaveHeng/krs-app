<template>
	<div class="wrap">
		<div class="bgc"></div>
		<div class="box">
			<headerBox />
			<div class="content">
				<!-- left -->
				<MainLeft :title="leftTitle">
          <slot name="left"></slot>
        </MainLeft>
				<!-- mid -->
				<div class="map-box">
					<slot name="mid"></slot>
				</div>
				<!-- right -->
				<MainRigth>
					<areaBox :height="`30% - 40px`" :title="rightToptitle">
						<slot name="right01"></slot>
					</areaBox>
					<areaBox :height="`45%`" :title="rightMidtitle">
						<slot name="right02"></slot>
					</areaBox>
					<areaBox :height="`30% - 25px`" :title="rightBottitle">
						<slot name="right03"></slot>
					</areaBox>
				</MainRigth>
			</div>
		</div>
	</div>
</template>

<script setup>
import autofit from 'autofit.js'
import headerBox from './components/headerBox.vue'
import MainLeft from './components/mainLeft.vue'
import MainRigth from './components/mainRight.vue'
import areaBox from './components/areaBox.vue'
const props = defineProps({
	leftTitle: {
		type: String,
		default: ''
	},
	rightToptitle: {
		type: String,
		default: ''
	},
	rightMidtitle: {
		type: String,
		default: ''
	},
	rightBottitle: {
		type: String,
		default: ''
	}
})
</script>

<style lang="less" scoped>
.wrap {
	width: 100%;
	height: 100%;
	background-color: #000;
	.bgc {
		background-image: url('../material/template-03-bg.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
		filter: blur(10px);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.box {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;

		.content {
			width: 100%;
			height: calc(100% - 7.77%);
			// background-color: #fff;
			padding: 0 18px 18px 18px;
			box-sizing: border-box;
			display: flex;
			position: relative;

			.map-box {
				width: calc(100% - 30.93% - 31.04%);
				height: 100%;
				position: relative;
			}
		}
	}
}
</style>
