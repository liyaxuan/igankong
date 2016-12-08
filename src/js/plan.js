import '../less/common.less';
import '../less/plan.less';

import Vue from 'vue';
import $ from 'jquery';

import { host, getUsername, getToken, login, sheet, clerk, errorFilter } from './ajax.js';

login().then(function () {
	new Vue({
		el: '.container',
		data: {
			username: getUsername(),
			title: '',
			date: '',
			time: '',
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
			var date = new Date();
			this.date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
			this.time = `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;

			var self = this;

			sheet.list().then(function (res) {
				self.sheet = res.data;
			});

			clerk.list().then(function (res) {
				self.clerk = res.data;
			});
		}
	})				
});