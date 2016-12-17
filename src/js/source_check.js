import '../less/common.less';
import '../less/check.less';

import { host, login, getToken, errorFilter } from './ajax.js';
import { getDate, getTime, getParam } from './util.js';
import VirusList from '../vue/virus-list.vue';

Vue.component('virus-list', VirusList);

login().then(function () {
	new Vue({
		el: '.container',
		data: {
			alarmId: 1,
			exposureId: 1,

			name: '',
			no: '',
			age: '1',
			gender: 1,
			phone: '',

			isInputDateDisabled: true,
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
					url: `${host}/weixin/expose_source`,
					type: 'POST',
					data: JSON.stringify({
						alarmId: this.alarmId,
						exposeId: this.exposureId,
						patientName: this.name,
						sex: this.gender,
						age: parseInt(this.age),
						patientNo: this.no,
						sourceCondition: JSON.stringify(this.virus.map(function (item) {
							return {
								name: item.short,
								info: item.full,
								value: item.value,
								time: this.date
							};
						}, this))
					}),
			        contentType: 'application/json;charset=UTF-8',
					headers: {
						Token: getToken(),
					}
				}));
			}
		},
		mounted: function () {

			['alarmId', 'exposureId'].forEach(function (item) {
				var result = getParam(item)
				if(result != null)
					this[item] = parseInt(result);
			}, this);
		}
	});
})