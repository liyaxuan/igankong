import '../less/common.less';
import '../less/notice.less';

import Vue from 'vue';
import $ from 'jquery';

import { getDate, diffDate } from './util.js';
import { host, login, getToken, getUsername, notice, errorFilter } from './ajax.js';

import DepartmentSelect from '../vue/department-select.vue';
import NoticeList from '../vue/notice-list.vue';

var currentIndex = 0;

login().then(function () {
	new Vue({
		el: '.container',
		data: {
			username: getUsername(),
			list: [],
			isLayer: false,

			forwardNotice: 0,
			forwardDepartment: 0,
			forwardScope: 1
		},
		filters: {
			unread: function (array) {
				var count = 0;
				array.forEach(function (item) {
					if(item.isRead == 0)
						count++;
				});
				return count;
			}
		},
		components: {
			'department-select': DepartmentSelect,
			'notice-list': NoticeList
		},
		methods: {
			showLayerHandler: function (id) {
				this.forwardNotice = id;
				this.isLayer = true;
			},
			readHandler: function (index) {
				this.list[index].isRead = 1;
			},
			hideLayer: function () {
				this.isLayer = false;
			},
			departmentChangedHandler: function (obj) {
				this.forwardDepartment = obj.id;
			},
			forward: function () {
				var self = this;

				errorFilter($.ajax({
					url: `${host}/weixin/notification/${this.forwardNotice}`,
					type: 'POST',
					headers: {
						Token: getToken()
					},
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({
						department: this.forwardDepartment,
						scope: this.forwardScope
					})
				})).then(function (res) {
					self.isLayer = false;
				});
			}
		},
		mounted: function () {
			var self = this;

			var today = getDate();

			notice.list().then(function (res) {
				var list = res.data.items;

				list.forEach(function (item, index) {
					item.time = item.time.split(' ')[0];

					// if(index == 0) {
					// 	item.time = today;
					// 	item.isRead = 0;
					// }
					// else if(index == 1) {
					// 	item.time = today;
					// 	item.isRead = 1;
					// }
					// else if(index == 2) {
					// 	item.time = '2016-11-24';
					// 	item.isRead = 0;
					// }
					// else if(index == 3) {
					// 	item.time = '2016-11-24';
					// 	item.isRead = 1;
					// }
					// else if(index == 4) {
					// 	item.isRead = 0;
					// }
					// else if(index == 5) {
					// 	item.isRead = 1;
					// }

					item.overdate = diffDate(today, item.time);
					item.open = false;
				});

				self.list = list;
			});
		}
	});					
});