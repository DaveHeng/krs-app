<template>
	<div class="side-box">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.side-box {
	width: 19.27%;
	height: calc(100% - 6.0185%);
	position: absolute;
	bottom: 0;
	left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
  box-sizing: border-box;
}
</style>
