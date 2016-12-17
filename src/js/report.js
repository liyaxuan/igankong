import '../less/common.less';
import '../less/report.less';

import { getParam } from './util.js';
import { host, getToken, login, errorFilter } from './ajax.js';

var alarmId = 1;
var exposureId = 1;

login().then(function () {
	new Vue({
		el: '.vue-container',
		data: {
			isSymptom: 0,
			description: ''
		},
		methods: {
			submit: function () {
				if(this.description == '') {
					alert('暴露过程描述不能为空');
					return;
				}

				errorFilter($.ajax({
					url: `${host}/weixin/expose_symptom`,
					type: 'POST',
					data: JSON.stringify({
						alarmId: alarmId,
						exposeId: exposureId,
						isSymptom: this.isSymptom,
						note: this.description
					}),
			        contentType: 'application/json;charset=UTF-8',
					headers: {
						Token: getToken(),
					}
				})).then(function (res) {
					window.location.href = 'exposure_index.html';
				});
			}
		},
		mounted: function () {
			alarmId = parseInt(getParam('alarmId')) || alarmId;
			exposureId = parseInt(getParam('exposureId')) || exposureId;
		}
	})	
});