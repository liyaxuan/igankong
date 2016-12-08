<template>
	<div class="virus-list">
		<div class="item" v-for="(item, index) in list" v-bind:class="{ 'green': color == 'green', 'pink': color == 'pink', 'last': index == list.length - 1 }">
			<div class="name fl">
				<div class="short">{{item.short}}</div>
				<div class="full">{{item.full}}</div>
			</div>
			<div class="option fr" v-on:click="select(index, 2)" v-bind:class="{ 'selected': item.value == 2 }">阴性</div>
			<div class="option fr" v-on:click="select(index, 1)" v-bind:class="{ 'selected': item.value == 1 }">阳性</div>
			<div class="option fr" v-on:click="select(index, 0)" v-bind:class="{ 'selected': item.value == 0 }">未查</div>
			<div class="cf"></div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../less/variable.less';

	.virus-list {

		padding: 8px 0;
		border-top: 1px solid @gray;
		border-bottom: 1px solid @gray;

		>.item {
			margin-bottom: 8px;
			color: @gray;

			&.last {
				margin-bottom: 0px;
			}

			>.name {
				>.short {
					height: 16px;
					line-height: 16px;
					font-size: 16px;
					margin-bottom: 6px;
				}

				>.full {
					height: 12px;
					line-height: 12px;
					font-size: 12px;
				}
			}

			>.option {
				height: 16px;
				line-height: 16px;
				margin-left: 8px;
				padding: 8px;
				font-size: 14px;
				background-color: #ffffff;
				border: 1px solid @gray;
				border-radius: 4px;
				color: @gray;

				&.selected {
					color: #ffffff;
				}
			}

			&.green {
				>.option {
					&.selected {
						background-color: @green;
						border: 1px solid @green;						
					}
				}
			}

			&.pink {
				>.option {
					&.selected {
						background-color: @pink;
						border: 1px solid @pink;						
					}
				}
			}	
		}
	}
</style>

<script>
	export default {
		props: ['list', 'color'],
		methods: {
			select: function (index, value) {
				this.list[index].value = value;
			}
		}
	};
</script>