<template>
	<div class="checkbox-list">
		<div class="item" v-for="(item, index) in list">
			<div class="checkbox" v-bind:class="{ 'selected': item.isSelected, 'arc': type == 'arc', 'green': color == 'green' }" v-on:click="select(index)">
				<div class="inner"></div>
			</div>
			<div>{{item.content}}</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../less/common.less';

	.checkbox-list {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;

		>.item {
			display: flex;
			display: -webkit-flex;
			flex-wrap: wrap;
			align-items: center;
			
			margin-right: 8px;
			margin-bottom: 8px;

			.checkbox {
				margin-right: 8px;
			}

			.text {
				height: 24px;
				line-height: 24px;
			}			
		}
	}
</style>
<script>
	export default {
		props: {
			readyOnly: {
				default: true,
			},
			list: {
				default: []
			},
			color: {
				default: 'green'
			},
			type: {
				default: 'arc'
			},
			isMultiple: {
				default: false
			}
		},
		data: function () {
			return {};
		},
		methods: {
			select: function (index) {
				if(this.isMultiple)
					this.list[index].isSelected = !this.list[index].isSelected;
				else {
					this.list.forEach(function (item) {
						item.isSelected = false;
					});
					this.list[index].isSelected = true;
				}
			}
		}
	}
</script>