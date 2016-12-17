import '../less/common.less';
import '../less/plan.less';

import { getDate, getTime } from './util.js';
import { host, getUsername, getToken, login, sheet, clerk, errorFilter } from './ajax.js';

login().then(function () {
	new Vue({
		el: '.container',
		data: {
			username: getUsername(),
			title: '',
			date: getDate(),
			time: getTime(),
			sheet: [],
			clerk: [],
			note: ''
		},
		methods: {
			submit: function () {
				var sheet = document.querySelectorAll('#sheet > option');
				var clerk = document.querySelectorAll('#clerk > option');

				var currentClerk = [];
				for(var i = 0; i < clerk.length; i++) {
					if(clerk[i].selected) {
						currentClerk.push(this.clerk[i].id);
					}
				}
					
				var currentSheet = 0;
				for(var i = 0; i < sheet.length; i++) {
					if(sheet[i].selected) {
						currentSheet = this.sheet[i].id;
						break;
					}
				}

				errorFilter($.ajax({
					url: `${host}/weixin/plan`,
					type: 'POST',
					data: JSON.stringify({
						time: `${this.date} ${this.time}`,
						relate_person: currentClerk,
						note: this.note,
						title: this.title,
						worksheetId: currentSheet
					}),
			        contentType: 'application/json;charset=UTF-8',
					headers: {
						Token: getToken(),
					}			
				}));
			}
		},
		mounted: function () {
			var self = this;

			sheet.list().then(function (res) {
				self.sheet = res.data;
			});

			clerk.list().then(function (res) {
				self.clerk = res.data.items;
			});
		}
	})				
});