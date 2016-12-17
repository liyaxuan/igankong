<template>
	<div>
		<div class="item" v-for="(item, index) in list" v-bind:class="{ 'today': item.overdate == 0, 'yesterday': item.overdate == 1, 'past': item.overdate >= 2, 'open': item.open }">
			<div class="header" v-on:click="item.open = !item.open">
				<div class="fl">From: {{item.sender}}</div>
				<div class="toggle fr">
					<span class="iconfont" v-bind:class="{ 'icon-unfold': !item.open, 'icon-fold': item.open }"></span>
				</div>
				<div class="fr">{{item.time}}</div>
				<div class="cf"></div>
			</div>
			<div class="body" v-show="item.open">
				<div>{{item.content}}</div>
				<div class="button fr" v-on:click="read(index)" v-bind:class="{ 'read': item.isRead == 1, 'unread': item.isRead == 0 }">{{item.isRead == 1 ? '已读' : '读完点我'}}</div>
				<div class="button forward fr" v-on:click="showLayer(item.id)">转发</div>	
				<div class="cf"></div>
			</div>
		</div>			
	</div>
</template>
<style lang="less" scoped>
	@import '../less/common.less';
	@import '../less/variable.less';

	.item {
		margin-bottom: 8px;
		border-radius: 4px;

		&.open {
			margin-bottom: 24px;
		}

		&.today {
			border: 1px solid @red;
			>.header {
				background-color: @red;
				color: #ffffff;
				>.toggle {
					background-color: #ffffff;
					>.iconfont {
						color: @red;
					}
				}
			}

			.button {
				&.forward {
					border: 1px solid @red;
					color: @red;				
				}

				&.unread {
					border: 1px solid @red;
					background-color: @red;
					color: #ffffff;			
				}

				&.read {
					border: 1px solid @red;
					color: @gray;					
				}
			}
		}

		&.yesterday {
			border: 1px solid @green;
			>.header {
				background-color: @green;
				color: #ffffff;
				>.toggle {
					background-color: #ffffff;
					>.iconfont {
						color: @green;
					}
				}
			}

			.button {
				&.forward {
					border: 1px solid @green;				
				}

				&.unread {
					border: 1px solid @green;
					background-color: @green;
					color: #ffffff;			
				}

				&.read {
					border: 1px solid @green;
					color: @gray;					
				}
			}
		}

		&.past {
			border: 1px solid @gray;
			>.header {
				
				color: @gray;

				>.toggle {
					background-color: @gray;
					>.iconfont {
						color: #ffffff;
					}
				}
			}

			.button {
				&.forward {
					border: 1px solid @gray;				
				}

				&.unread {
					background-color: @gray;
					border: 1px solid @gray;
					color: #ffffff;			
				}

				&.read {
					border: 1px solid @gray;
					color: @gray;					
				}
			}

			>.body {
				border-top: 1px solid @gray;
			}
		}

		>.header {
			height: 16px;
			line-height: 16px;
			padding: 8px;

			>.toggle {
				width: 16px;
				height: 16px;
				margin-left: 8px;

				>.iconfont {
					width: 100%;
					height: 100%;
					line-height: 16px;
					font-size: 12px;
					text-align: center;
					display: block;
				}
				
				border-radius: 50%;
			}
		}

		>.body {
			margin: 0 8px;
			padding: 8px 0;
		}

		.button {
			position: relative;
			top: 24px;

			height: 16px;
			line-height: 16px;
			margin-left: 8px;
			padding: 8px;
			background-color: #ffffff;
			border-radius: 4px;
		}
	}
</style>
<script>
	import { host, errorFilter, getToken } from '../js/ajax.js';

	export default {
		props: ['list'],
		methods:{
			showLayer: function (id) {
				this.$emit('show-layer', id);
			},
			read: function (index) {
				var self = this;
				var id = this.list[index].id;
				
				$.ajax({
					url: `${host}/weixin/notification_read/${id}`,
					type: 'POST',
					headers: {
						Token: getToken()
					}
				}).then(function (res) {
					if(res.error == 'succ') {
						alert('已读');
						self.$emit('read', index);
					}
					else
						alert('提交失败');
					
				});
			}
		}	
	}
</script>