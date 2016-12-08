<template>
	<div>
		<div class="item" v-for="(item, index) in list" v-bind:class="{ 'open': item.open }">
			<div class="header" v-on:click="item.open = !item.open">

				<div class="toggle-button fr">
					<span class="iconfont" v-bind:class="{ 'icon-unfold': !item.open, 'icon-fold': item.open }"></span>
				</div>
				<div class="info">
					<div class="text">{{item.createTime | time}}</div>
					<div class="text source">{{item.source}}</div>
					<div class="text type">{{item.type == 1 ? '血液体液暴露' : '锐器伤'}}</div>					
				</div>
			</div>
			<div class="body" v-show="item.open">
				<exposure-method :read-only="methodReadOnly" :method="item.detail"></exposure-method>
				<exposure-review :check-list="item.checkList"></exposure-review>				
			</div>

		</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../../less/variable.less';

	.item {
		margin-bottom: 8px;
		padding: 8px;
		border: 1px solid @gray;
		border-radius: 4px;

		&.open {
			border: 1px solid @green;
		}
	}

	.body {
		margin-top: 8px;
		padding-top: 8px;
		border-top: 1px solid @gray;
	}

	.info {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
			
		height: 16px;
		line-height: 16px;

		margin-right: 24px;
		
		>.text {
			width: 100%;
		}

		>.source {
			text-align: center;
		}

		>.type {
			text-align: right;
		}
	}

	.toggle {
		width: 8px;
		height: 8px;
		padding: 4px;
		background-color: @green;
		border-radius: 50%;
		
		>.inner {
			&.down {
			    width: 0;
			    height: 0;
			    border-left: 4px solid transparent;
			    border-right: 4px solid transparent;
			    border-top: 8px solid #ffffff;
			}

			&.up {
			    width: 0;
			    height: 0;
			    border-left: 4px solid transparent;
			    border-right: 4px solid transparent;
			    border-bottom: 8px solid #ffffff;
			}			
		}
	}
</style>
<script>
	import '../../less/common.less';
	import '../../less/exposure_index.less';

	import Vue from 'vue';
	import $ from 'jquery';

	import { host, login, getToken } from '../../js/ajax.js';
	import { getDate, getTime } from '../../js/util.js';

	import Method from './method.vue';
	import Review from './review.vue';

	export default {
		data: function () {
			return {
				methodReadOnly: true,
				list: []
			}
		},
		components: {
			'exposure-method': Method,
			'exposure-review': Review
		},
		filters: {
			time: function (time) {
				return time.split(' ')[0];
			}
		},
		beforeCreate: function () {
			var self = this;

			$.ajax({
				url: `${host}/weixin/self_expose_list`,
				type: 'GET',
                headers: {
                    Token: getToken()
                }
			}).then(function (res) {
				if(res.error == 'succ') {
					self.list = res.data.map(function (item) {
						item.detail = {};
						item.open = false;
						return item;
					});
					self.list.forEach(function (item, index) {
						$.ajax({
							url: `${host}/weixin/self_expose_detail`,
							type: 'GET',
							data: {
								exposeId: item.id
							},
							headers: {
								Token: getToken()
							}
						}).then(function (res) {
							for(var attr in res.data) {
								if(!/id|exposeId|checkList/.test(attr))
									self.$set(self.list[index].detail, attr, res.data[attr]);

								self.$set(self.list[index], 'checkList', res.data.checkList);
							}								
						});
					});
				}
			});
		}
	}
</script>