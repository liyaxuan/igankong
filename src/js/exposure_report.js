import '../less/common.less';
import '../less/exposure_report.less';

import Vue from 'vue';
import $ from 'jquery';

import { getParam } from './util.js';
import { host, login, getToken, exposure } from './ajax.js';

import Basic from '../vue/exposure/basic.vue';
import Self from '../vue/exposure/self.vue';
import Source from '../vue/exposure/source.vue';

import Blood from '../vue/exposure/blood.vue';

import Wound from '../vue/exposure/wound.vue';
import Other from '../vue/exposure/other.vue';

import Assess from '../vue/exposure/assess.vue';

new Vue({
	el: '.container',
	data: {
		id: getParam('exposureId'),
		basicReadOnly: true,
		selfReadOnly: true,
		sourceReadOnly: true,

		type: 1,
	},
	components: {
		'exposure-basic': Basic,
		'exposure-self': Self,
		'exposure-source': Source,

		'exposure-blood': Blood,

		'exposure-wound': Wound,
		'exposure-other': Other,

		'exposure-assess': Assess,
	},
	created: function () {
		var self = this;

		exposure.getInfo(this.id).then(function (res) {
			var data = res.data.exposeBasic;
			self.type = data.type;
		});
	}
})