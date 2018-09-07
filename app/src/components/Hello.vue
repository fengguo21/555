<template>
	<div class="searchBar" id="searchBar">
		<ul :class="searchBarFixed == true ? 'isFixed' :''">
			<li>区域<i class="iconfont icon-jiantouxia"></i></li>
			<li>价格<i class="iconfont icon-jiantouxia"></i></li>
			<li>房型<i class="iconfont icon-jiantouxia"></i></li>
			<li>更多<i class="iconfont icon-jiantouxia"></i></li>
		</ul>
		<div>1 这是测试数据</div>
		<div>2 这是测试数据</div>
		<div>3 这是测试数据</div>
		<div>4 这是测试数据</div>
		<div>5 这是测试数据</div>
		<div>6 这是测试数据</div>
		<div>7 这是测试数据</div>
		<div>8 这是测试数据</div>
		<div>9 这是测试数据</div>
		<div>10 这是测试数据</div>
		<div>11 这是测试数据</div>
		<div>12 这是测试数据</div>
		<div>13 这是测试数据</div>
		<div>14 这是测试数据</div>
		<div>15 这是测试数据</div>
		<div>16 这是测试数据</div>
		<div>17 这是测试数据</div>
		<div>18 这是测试数据</div>
		<div>19 这是测试数据</div>
		<div>20 这是测试数据</div>
		<div>21 这是测试数据</div>
		<div>22 这是测试数据</div>
		<div>23 这是测试数据</div>
		<div>24 这是测试数据</div>
		<div>25 这是测试数据</div>
		<div>26 这是测试数据</div>
		<div>27 这是测试数据</div>
		<div>28 这是测试数据</div>
		<div>29 这是测试数据</div>
		<div>30 这是测试数据</div>
		<div>31 这是测试数据</div>
		<div>32 这是测试数据</div>
		<div>33 这是测试数据</div>
		<div>34 这是测试数据</div>
		<div>35 这是测试数据</div>
		<div>36 这是测试数据</div>
		<div>37 这是测试数据</div>
		<div>38 这是测试数据</div>
		<div>39 这是测试数据</div>
		<div>40 这是测试数据</div>
		<div>41 这是测试数据</div>
		<div>42 这是测试数据</div>
		<div>43 这是测试数据</div>
		<div>44 这是测试数据</div>
		<div>45 这是测试数据</div>
		<div>46 这是测试数据</div>
		<div>47 这是测试数据</div>
		<div>48 这是测试数据</div>
		<div>49 这是测试数据</div>
		<div>50 这是测试数据</div>
		<div>51 这是测试数据</div>
		<div>52 这是测试数据</div>
		<div>53 这是测试数据</div>
		<div>54 这是测试数据</div>
		<div>55 这是测试数据</div>
		<div>56 这是测试数据</div>
		<div>57 这是测试数据</div>
		<div>58 这是测试数据</div>
		<div>59 这是测试数据</div>
		<div>60 这是测试数据</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				searchBarFixed:false
			}
		},
		destroyed() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			handleScroll() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
				var offsetTop = document.querySelector('#searchBar').offsetTop
				console.log(scrollTop,offsetTop)
				if(scrollTop > offsetTop) {
					this.searchBarFixed = true
				} else {
					this.searchBarFixed = false
				}
			},
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.searchBar {
		.isFixed {
			position: fixed;
			background-color: #Fff;
			top: 0;
			z-index: 999;
		}
		ul {
			WIDTH: 100%;
			height: 40px;
			line-height: 40px;
			display: flex;
			li {
				font-size: 0.8rem;
				text-align: center;
				flex: 1;
				i {
					font-size: 0.9rem;
					padding-left: 5px;
					color: #ccc;
				}
			}
			border-bottom: 1px solid #ddd;
		}
	}
</style>