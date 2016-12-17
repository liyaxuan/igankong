import '../less/common.less';
import '../less/index.less';

import { host, login, getToken, notice } from './ajax.js';
import { getDate, getTime, diffDate } from './util.js';

import IndexList from '../vue/index-list.vue';

login().then(function (token) {
	new Vue({
		el: '.container',
		data: {
			noticeNumber: 0,
			zk: 0,
			gr: 0,
			gl: 0,
			factors: [],
			review: [],
			remind: []
		},
		components: {
			'index-list': IndexList
		},
		mounted: function () {
			var self = this;

			notice.list().then(function (res) {
				self.noticeNumber = res.data.items.length;
			});

			var today = getDate();

			$.ajax({
				url: `${host}/weixin/gk`,
				type: 'GET',
				headers: {
					Token: getToken()
				}			
			}).then(function (res) {
				res = res.data;

				self.zk = res.zk;
				self.gr = res.gr;
				self.gl = res.gl;

				self.factors = res.factors;

				function transform(item) {
					item.overdate = diffDate(today, item.time.split(' ')[0]);

					if(item.overdate == 0)
						item.timeText = '今天';
					else if(item.overdate == 1)
						item.timeText = '昨天';
					else 
						item.timeText = item.time.split(' ')[0];

					item.show = false;
				}

				res.review.forEach(transform);
				res.remind.forEach(transform);
				self.review = res.review;
				self.remind = res.remind;
			});
		}
	})	
});