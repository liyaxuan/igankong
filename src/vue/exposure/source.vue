<template>
	<div>
		<div class="line">
			<div class="tag">患者姓名</div>
			<input class="text-input" placeholder="患者姓名" v-model="name">
			<div class="option" v-on:click="selectGender(1)" v-bind:class="{ 'selected': gender == 1 }">男</div>
			<div class="option" v-on:click="selectGender(2)" v-bind:class="{ 'selected': gender == 2 }">女</div>
		</div>
	
		<div class="line">
			<div class="tag">年龄</div>
			<input class="text-input" placeholder="年龄" v-model="age">
		</div>

		<div class="line">
			<div class="tag">住院号</div>
			<input class="text-input" placeholder="住院号" v-model="no">	
		</div>

		<div class="line">
			<div class="tag">联系电话</div>
			<input class="text-input" placeholder="联系电话" v-model="phone">
		</div>
		
		<div class="tag-header green">血清检查情况(仅填写已查项目)</div>
		<div v-for="(item, index) in source" class="virus-item">
			<div class="name">
				<div class="short">{{item.short}}</div>
				<div class="full">{{item.full}}</div>
			</div>
			<div class="option" v-on:click="selectVirus(1, index)" v-bind:class="{ 'selected': item.value == 1 }">阳性</div>
			<div class="option" v-on:click="selectVirus(2, index)" v-bind:class="{ 'selected': item.value == 2 }">阴性</div>	
			<input class="option input" v-model="item.time" v-bind:disabled="readOnly">
		</div>
		<div class="submit-button" v-show="!readOnly" v-on:click="submit">保存并继续填写</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../../less/common.less';
	@import '../../less/variable.less';

	.line {
		margin-bottom: 8px;

		display: flex;
		display: -webkit-flex;
		align-items: center;

		>.tag {
			margin-right: 8px;
		}

		>.text-input {
			width: 0;
			flex-grow: 1;
		}
	}

	.option {
		flex-shrink: 0;
		height: 16px;
		line-height: 16px;
		margin-left: 8px;
		padding: 8px;
		border: 1px solid @gray;
		border-radius: 4px;
		color: @gray;

		&.input {
			width: 72px;
		}

		&.selected {
			background-color: @green;
			border: 1px solid @green;
			color: #ffffff;				
		}
	}

	.virus-item {
		margin-bottom: 8px;
		display: flex;
		display: -webkit-flex;
		align-items: center;

		>.name {
			flex-grow: 1;
			flex-shrink: 1;

			>.short {

				line-height: 16px;
				margin-bottom: 6px;
				font-size: 16px;
			}

			>.full {

				line-height: 12px;
				font-size: 12px;
			}
		}
	}
</style>
<script>
	import { host, getToken, exposure, errorFilter } from '../../js/ajax.js';

	export default {
		props: {
			readOnly: {
				default: true
			},
			id: {}
		},
		data: function () {
			return {
				name: '',
				gender: 1,
				age: 1,
				no: '',
				phone: '',
				source: [{
			        short: 'HbsAg',
			        full: '乙肝表面抗原',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'HbsAb',
			        full: '乙肝表面抗体',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'HbeAg',
			        full: '乙肝e抗原',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'HbsAb',
			        full: '乙肝e抗体',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'HBcAb',
			        full: '核心抗体',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'Anti-HCV',
			        full: '丙肝抗体',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'TPPA',
			        full: '梅毒螺旋体抗体',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'Anti_HIV',
			        full: '艾滋病毒抗体',
			        value: 2,
			        time: '2016-11-15'
			    }, {
			        short: 'RPR',
			        full: '类脂质抗体',
			        value: 2,
			        time: '2016-11-15'
			    }]
			};
		},
		methods: {
			selectGender: function (value) {
				if(this.readOnly)
					return;
				this.gender = value;
			},
			selectVirus: function (value, index) {
				if(this.readOnly)
					return;
				this.source[index].value = value;
			},
			submit: function () {
				if(!this.id) {
					alert('请先填写并保存基本信息');
					return;
				}
				
				errorFilter(this.$http.post(`${host}/weixin/expose_source`, JSON.stringify({
					exposeId: this.id,
					patientName: this.name,
					sex: this.gender,
					age: this.age,
					phone: this.phone,
					patientNo: this.no,
					sourceCondition: JSON.stringify(this.source.map(function (item) {
						return {
							name: item.short,
							info: item.full,
							value: item.value,
							time: item.time							
						};
					}))
				}), {
					headers: {
						Token: getToken(),
			        	contentType: 'application/json;charset=UTF-8'	
					}
				}))
			}
		},
		mounted: function () {
			if(!this.readOnly)
				return;

			var self = this;

			exposure.getInfo(this.id).then(function (res) {
				var data = res.data.exposeSource;

				self.name = data.patientName;
				self.age = data.age;
				self.gender = data.sex;
				self.phone = data.phone;
				self.no = data.patientNo;
				self.source = data.sourceCondition.map(function (item){
					return {
						short: item.name,
						full: item.info,
						value: item.value,
						time: item.time.replace(/\./g, '-')
					}
				})
			})
		}
	}
</script>