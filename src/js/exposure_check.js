import '../less/common.less';
import '../less/check.less';

import Vue from 'vue';
import $ from 'jquery';

import { host, login, getToken, errorFilter } from './ajax.js';
import { getDate, getTime, getParam } from './util.js';
import VirusList from '../vue/virus-list.vue';

Vue.component('virus-list', VirusList);

login().then(function () {
	new Vue({
		el: '.container',
		data: {
			isInputDisabled: true,

			alarmId: 1,
			exposeId: 1,
			date: getDate(),
			virus: [{
				short: 'HbsAg',
				full: '乙肝表面抗原',
				value: 0
			}, {
				short: 'HbsAg',
				full: '乙肝表面抗原',
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
				short: 'RPR',
				full: '类脂质抗体',
				value: 0
			}, {
				short: 'Anti-HIV',
				full: '艾滋病毒抗体',
				value: 0
			}]
		},
		methods: {
			submit: function () {

				errorFilter($.ajax({
					url: `${host}/weixin/expose_check`,
					type: 'POST',
					data: JSON.stringify({
						alarmId: this.alarmId,
						exposeId: this.exposeId,
						checkTime: `${this.date} 00:00:00`,
						checkResult: JSON.stringify(this.virus.map(function (item) {
							return {
								name: item.short,
								info: item.full,
								value: item.value
							};
						}))
					}),
			        contentType: 'application/json;charset=UTF-8',
					headers: {
						Token: getToken(),
					}	
				}));
			}
		},
		mounted: function () {

			['alarmId', 'exposeId'].forEach(function (item) {
				var result = getParam(item)
				if(result != null)
					this[item] = parseInt(result);
			}, this);
		}
	})	
});