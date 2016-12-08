<template>
	<div>
		<div class="item" v-for="(item, index) in list" v-bind:class="{ 'today': item.overdate == 0, 'yesterday': item.overdate == 1, 'past': item.overdate >= 2 }">
			<div class="number">{{index + 1}}</div>
			<div class="content">
				<div class="text fl">{{item.timeText}}</div>
				<div class="text fr">{{item.title}}</div>
				<div class="cf"></div>
				<div class="detail" v-show="item.show">
					<div>涉及人员: 张三, 李四</div>
					<div>{{item.note}}</div>
				</div>
			</div>
			<div class="button" v-on:click="toggle(index)">查看</div>
		</div>
	</div>
</template>
<style lang="less" scoped> 
	@import '../less/variable.less';

	.item {
		display: flex;
		display: -webkit-flex;

		margin-bottom: 8px;
		
		&.today {
			color: @red;
			>.number, >.content, >.button {
				border: 1px solid @red;
			}
			.detail {
				border-top: 1px solid @red;
			}
		}

		&.yesterday {
			>.number, >.content, >.button {
				border: 1px solid @green;
			}
			.detail {
				border-top: 1px solid @green;
			}
		}

		&.past {
			color: @gray;
			>.number, >.content, >.button {
				border: 1px solid @gray;
			}
			.detail {
				border-top: 1px solid @gray;
			}
		}

		>.number {
			width: 32px;
			height: 32px;
			line-height: 32px;
			
			border-radius: 50%;

			text-align: center;
		}

		>.content {
			margin: 0 8px;
			padding: 8px 16px;
			border-radius: 4px;
			overflow: hidden;

			flex-grow: 1;

			>.text {
				height: 16px;
				line-height: 16px;
			}

			>.detail {
				margin-top: 8px;
				padding-top: 8px;
			}
		}

		>.button {
			height: 16px;
			line-height: 16px;
			padding: 8px;
			border: 1px solid #ec4e4d;
			border-radius: 4px;
		}
	}	
</style>
<script>
	export default {
		props: ['list'],
		methods: {
			toggle: function (index) {
				this.list[index].show = !this.list[index].show;
			}
		}
	}
</script>