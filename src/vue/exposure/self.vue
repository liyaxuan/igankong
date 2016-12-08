<template>
	<div>
		<div class="line">暴露时间</div>
		<div class="line flex">
			<div class="tag date">日期</div>
			<input class="text-input grow-1" type="date" v-model="date">
			<div class="tag time">时间</div>
			<input class="text-input grow-1" type="time" v-model="time">
		</div> 
		<div class="line">暴露者传染史</div>
		<virus-list :list="virus" color="green"></virus-list>
		<div class="line flex last">
			<div class="text">曾经是否注射乙肝疫苗</div>
			<div class="rect-option not-equal green" v-bind:class="{ 'selected': isHB }">是</div>
			<div class="rect-option not-equal green" v-bind:class="{ 'selected': !isHB }">否</div>
			<div class="rect-option not-equal green">注射{{HBtimes}}次</div>
		</div>
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
</style>
<script>
	import VirusList from '../virus-list.vue';
	import { exposure } from '../../js/ajax.js';
	export default {
		props: ['id'],
		data: function () {
			return {
				date: '',
				time: '',
				virus: [],
				isHB: false,
				HBtimes: 0,
			};
		},
		components: {
			'virus-list': VirusList
		},
		mounted: function () {
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