import '../less/common.less';

import History from '../vue/exposure/history.vue';

new Vue({
	el: '.container',
	components: {
		'exposure-history': History
	}
});