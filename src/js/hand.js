import '../less/common.less';
import '../less/hand.less';

import { host, login, getToken, department, errorFilter } from './ajax.js';

import DepartmentSelect from '../vue/department-select.vue';
import SignatureCanvas from '../vue/signature-canvas.vue';

login().then(function () {
	new Vue({
		el: '.container',
		data: {
			currentDepartmentID: 0,
			currentDepartmentName: '',
			good: 1,
			character: ['卫生员', '护理员', '医生', '护士'],
			behavior: ['接触病人前', '无菌操作前', '接触体液后', '接触病人后', '接触环境后'].map(function (item) {
				return {
					name: item,
					isUnwashed: false,
					glove: 0,
					isSoap: false,
					isSanitizer: false,
					sixStep: 0						
				};
			}),

			currentCharacterIndex: 0,
			currentTimeIndex: 0,

			isCanvasShow: false,
			dataurl: ''
		},
		components: {
			'department-select': DepartmentSelect,
			'signature-canvas': SignatureCanvas
		},
		filters: {
			glove: function (value) {
				if(value == 0)
					return '是否戴手套';
				else if(value == 1)
					return '已戴手套';
				else if(value == 2)
					return '未戴手套';
			},
			sixStep: function (value) {
				if(value == 0)
					return '六步法正确/错误';
				else if(value == 1)
					return '六步法正确';
				else if(value == 2)
					return '六步法错误';				
			}
		},
		methods: {
			toggleUnwashed: function (index) {
				var item = this.behavior[index];

				item.isUnwashed = !item.isUnwashed;
				item.glove = 0;

				if(item.isUnwashed) {
					item.isSoap = false;
					item.isSanitizer = false;
					item.sixStep = 0;
				}
			},
			clearUnwashed: function (index) {
				var item = this.behavior[index];
				item.isUnwashed = false;
				item.glove = 0;
			},
			toggleSoap: function (index) {
				var item = this.behavior[index];

				this.clearUnwashed(index);

				item.isSoap = !item.isSoap;

				if(!item.isSoap && !item.isSanitizer)
					item.sixStep = 0;
			},
			toggleSanitizer: function (index) {
				var item = this.behavior[index];

				this.clearUnwashed(index);

				item.isSanitizer = !item.isSanitizer;

				if(!item.isSoap && !item.isSanitizer)
					item.sixStep = 0;
			},
			toggleSixStep: function (index) {
				var item = this.behavior[index];

				this.clearUnwashed(index);

				item.sixStep = (item.sixStep + 1)%3;
			},
			signatureClosed: function () {
				this.isCanvasShow = false;
			},
			showCanvas: function () {
				this.isCanvasShow = true;
			},
			signatureFinished: function (dataurl) {
				this.dataurl = dataurl;
			},
			departmentChangedHandler: function ({ id, name }) {
				this.currentDepartmentID = id;
				this.currentDepartmentName = name;
			},
			submit: function () {

				var operations = this.behavior.map(function (item) {
					var washhand = 0;
					if(item.isSanitizer && !item.isSoap)
						washhand = 1;
					else if(!item.isSanitizer && item.isSoap)
						washhand = 2;
					else if(item.isSanitizer && item.isSoap)
						washhand = 3;

					function reverse(value) {
						if(value == 1)
							return 2;
						else if(value == 2)
							return 1;
						else 
							return 0;	
					}

					return {
						name: item.name,
						moment: (function () {
							if(!item.isUnwashed && (item.isSanitizer || item.isSoap))
								return 2;
							else
								return 1;
						})(),
						gloves: reverse(item.glove),
						washhand: washhand,
						sixfoot: reverse(item.sixStep)
					}							
				})

				errorFilter($.ajax({
					url: `${host}/weixin/sheet_handhyg`,
					type: 'POST',
					headers: {
						Token: getToken()
					},
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify({
						depart: this.currentDepartmentID,
						depart_name: this.currentDepartmentName,
						person: this.character[this.currentCharacterIndex],
						operations: operations,
						signature: this.dataurl
					})										
				}));
			}
		},
		mounted: function () {
			var self = this;

			department.listMain().then(function (res) {

				self.main = res.data;
				self.forwardDepartment = self.main[0].id;
				return department.listSecondary(self.main[0]);
			}).then(function (res) {
				self.secondary = res.data;
			});
		}
	});				
});