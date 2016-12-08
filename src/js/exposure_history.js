import '../less/common.less';

import Vue from 'vue';
import $ from 'jquery';

import History from '../vue/exposure/history.vue';

new Vue({
	el: '.container',
	components: {
		'exposure-history': History
	}
});