<style scoped>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
<template>
	<div id="app">
		<!-- <transition name="bounce" > -->
		<keep-alive>
			<!--keep-alive 组件将被缓存 -->
			<router-view></router-view>
		</keep-alive>
		<!-- </transition> -->
	</div>
</template>
<script>

	/**
	 * https://github.com/zhubaoda
	 *  .--,       .--,
	 * ( (  \.---./  ) )
	 *  '.__/o   o\__.'
	 *     {=  ^  =}
	 *      >  -  <
	 *     /       \
	 *    //       \\
	 *   //|   .   |\\
	 *   "'\       /'"_.-~^`'-.
	 *      \  _  /--'         `
	 *    ___)( )(___
	 *   (((__) (__)))    高山仰止,景行行止.虽不能至,心向往之。
	 */
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		created() {


		}

	}
</script>