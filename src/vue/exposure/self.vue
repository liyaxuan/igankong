<template>
	<div>
		<div class="line">暴露时间</div>
		<div class="line flex">
			<div class="tag date">日期</div>
			<input class="text-input grow-1" type="date" v-model="date" v-bind:disabled="readOnly">
			<div class="tag time">时间</div>
			<input class="text-input grow-1" type="time" v-model="time" v-bind:disabled="readOnly">
		</div> 
		<div class="line">暴露者传染史</div>
		<virus-list :read-only="readOnly" :list="virus" color="green"></virus-list>
		<div class="line flex" style="margin-top: 8px;">
			<div class="tag">曾经是否注射乙肝疫苗</div>
			<div class="rect-option not-equal green" v-on:click="select(1)" v-bind:class="{ 'selected': isHB }">是</div>
			<div class="rect-option not-equal green" v-on:click="select(0)" v-bind:class="{ 'selected': !isHB }">否</div>
		</div>
		<div class="line flex last">
			<div class="tag">注册次数</div>
			<input class="text-input grow-1" v-model="HBtimes" v-bind:disabled="readOnly || !isHB">
		</div>

		<div class="submit-button" v-show="!readOnly" v-on:click="submit">保存并继续填写</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../../less/common.less';
	
	.line {
		margin-bottom: 8px;

		&.last {
			margin-top: 8px;
			margin-bottom: 0;
		}
		
		&.flex {
			dipslay: flex;
			display: -webkit-flex;
			align-items: center;
		}
	}

	.tag {
		margin-right: 8px;
		&.time {
			margin-left: 8px;
		}
	}

	.grow-1 {
		width: 0;
		flex-grow: 1;
	}

	.hb-times-input {
		width: 32px;
		height: 16px;
		line-height: 16px;
		padding: 7px;
	}
</style>
<script>
	import VirusList from '../virus-list.vue';

	import { getDate, getTime } from '../../js/util.js';
	import { host, getToken, exposure, errorFilter } from '../../js/ajax.js';

	export default {
		props: {
			readOnly: {
				default: true
			},
			id: {}
		},
		data: function () {
			return {
				date: getDate(),
				time: getTime(),
				virus: [{
			        short: 'HbsAg',
			        full: '乙肝表面抗原',
			        value: 0
			    }, {
			        short: 'HbsAb',
			        full: '乙肝表面抗体',
			        value: 0
			    }, {
			        short: 'HbeAg',
			        full: '乙肝e抗原',
			        value: 0
			    }, {
			        short: 'HbeAb',
			        full: '乙肝e抗体',
			        value: 0
			    }, {
			        short: 'HBcAb',
			        full: '核心抗体',
			        value: 0
			    }, {
			        short: 'Anti-HCV',
			        full: '丙肝抗体',
			        value: 0
			    }, {
			        short: 'TPPA',
			        full: '梅毒螺旋体抗体',
			        value: 0
			    }, {
			        short: 'Anti_HIV',
			        full: '艾滋病毒抗体',
			        value: 0
			    }],
				isHB: false,
				HBtimes: 0,
			};
		},
		methods: {
			select: function (value) {
				if(this.readOnly)
					return;
				this.isHB = value ? true : false;
				if(!this.isHB)
					this.HBtimes = 0;
			},
			submit: function () {
				if(!this.id) {
					alert('请先填写并保存基本信息');
					return;
				}

				errorFilter(this.$http.post(`${host}/weixin/expose_self`, JSON.stringify({
					exposeId: this.id,
					history: JSON.stringify(this.virus.map(function (item) {
						return {
							name: item.short,
							info: item.full,
							value: item.value
						};
					})),
					isInject: this.isHB ? 1 : 0,
					injectTotal: this.HBTimes,
					exposeTime: this.date + ' ' + this.time
				}), {
					headers: {
						Token: getToken(),
						contentType: 'application/json;charset=UTF-8',
					}
				})).then(function (res) {

				});
			}
		},
		components: {
			'virus-list': VirusList
		},
		mounted: function () {
			if(!this.readOnly)
				return;

			var self = this;

			exposure.getInfo(this.id).then(function (res) {
				var data = res.data.exposeSelf;

				self.isHB = data.isInject == 1;
				self.HBtimes = data.injectTotal;

				self.virus = data.history.map(function (item) {
					return {
						short: item.name,
						full: item.info,
						value: item.value
					};
				});

				self.date = data.exposeTime.split(' ')[0];
				self.time = data.exposeTime.split(' ')[1];
			})
		}
	}
</script>