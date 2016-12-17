<template>
	<div>
		<div class="line">
			<div class="tag">发生地点</div>
			<input class="text-input grow-1" placeholder="发生地点" v-model="place">
		</div>
		<div class="line space-between">
			<div class="option right" v-on:click="selectInstrument('针头')" v-bind:class="{ 'selected': instrument == '针头' }">针头</div>
			<div class="option right" v-on:click="selectInstrument('玻璃')" v-bind:class="{ 'selected': instrument == '玻璃' }">玻璃</div>
			<div class="option right" v-on:click="selectInstrument('外科器械')" v-bind:class="{ 'selected': instrument == '外科器械' }">外科器械</div>
			<div class="option right" v-on:click="selectInstrument('其他')" v-bind:class="{ 'selected': !/针头|玻璃|外科器械/.test(instrument) }">其他</div>
		</div>
		<div class="line">
			<input class="text-input grow-1" placeholder="器械类型" v-model="otherInstrument" v-bind:disabled="readyOnly">
		</div>
		<div class="line">
			<div class="grow-1">您是否使用该器械</div>
			<div class="option left" v-on:click="selectUsed(1)" v-bind:class="{ 'selected': isUsed == 1 }">是</div>
			<div class="option left" v-on:click="selectUsed(0)" v-bind:class="{ 'selected': isUsed == 0 }">否</div>
		</div>
		<div class="line">
			<div class="grow-1">器械污染情况</div>
			<div class="option left" v-on:click="selectPollution(1)" v-bind:class="{ 'selected': pollution == 1 }">多</div>
			<div class="option left" v-on:click="selectPollution(2)" v-bind:class="{ 'selected': pollution == 2 }">少</div>
			<div class="option left" v-on:click="selectPollution(3)" v-bind:class="{ 'selected': pollution == 3 }">未见</div>
		</div>
		<div class="line">
			<div class="grow-1">器械是否被血液污染</div>
			<div class="option left" v-on:click="selectBlood(1)" v-bind:class="{ 'selected': isBlood == 1 }">是</div>
			<div class="option left" v-on:click="selectBlood(0)" v-bind:class="{ 'selected': isBlood == 0 }">否</div>
		</div>
		<div class="line">
			<div class="grow-1">是否戴手套</div>
			<div class="option left" v-on:click="selectGlove(1)" v-bind:class="{ 'selected': isGlove == 1 }">单层手套</div>
			<div class="option left" v-on:click="selectGlove(2)" v-bind:class="{ 'selected': isGlove == 2 }">双层手套</div>
			<div class="option left" v-on:click="selectGlove(3)" v-bind:class="{ 'selected': isGlove == 3 }">未戴手套</div>		
		</div>

		<div class="tag-header green">暴露部位</div>

		<div class="line">
			<div class="tag grow-1">左手</div>
			<div class="option left" v-on:click="selectLeftHand(index)" v-for="(item, index) in leftHandList" v-bind:class="{ 'selected': item.isSelected }">{{item.content}}</div>
		</div>
		<div class="line">
			<div class="tag grow-1">左手</div>
			<div class="option left" v-on:click="selectRightHand(index)" v-for="(item, index) in rightHandList" v-bind:class="{ 'selected': item.isSelected }">{{item.content}}</div>
		</div>

		<checkbox-list :read-only="readOnly" :list="partList" color="green" type="rect" :is-multiple="isMultiple"></checkbox-list>
		<div class="line">
			<div class="tag">其他部位</div>
			<input class="text-input grow-1" placeholder="其他部位" v-model="otherPart" v-bind:disabled="readOnly">			
		</div>

		<div class="tag-header green">发生暴露时的操作</div>
		<checkbox-list :read-only="readOnly" :list="operationList" color="green" type="rect" :is-multiple="isMultiple"></checkbox-list>
		<div class="line">
			<div class="tag">其他操作</div>
			<input class="text-input grow-1" placeholder="其他操作" v-model="otherOperation" v-bind:disabled="readOnly">
		</div>
		
		<div class="tag-header green">损伤发生于</div>
		<checkbox-list :read-only="readOnly" :list="reasonList" color="green" type="rect" :is-multiple="isMultiple"></checkbox-list>
		<div class="line">
			<div class="tag">其他情况</div>
			<input class="text-input grow-1" placeholder="其他情况" v-model="otherReason" v-bind:disabled="readOnly">			
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

		&.space-between {
			justify-content: space-between;
		}
	}

	.title {
		margin-bottom: 8px;
	}

	.tag {
		margin-right: 8px;
	}

	.option {
		height: 16px;
		line-height: 16px;
		padding: 8px;
		
		border: 1px solid @gray;
		border-radius: 4px;
		color: @gray;

		&.selected {
			background-color: @green;
			border: 1px solid @green;
			color: #ffffff;
		}

		&.left {
			margin-left: 8px;
		}

		&.right {
			margin-right: 8px;
		}
	}

	.text-input {
		&.grow-1 {
			width: 0;
		}
	}

	.grow-1 {
		flex-grow: 1;
	}
</style>
<script>
	import { transform, getMutipleSelect } from '../../js/util.js';
	import { host, getToken, basic, exposure, errorFilter } from '../../js/ajax.js';
	import CheckboxList from '../checkbox-list.vue';

	export default {
		props: {
			readOnly: {
				default: true
			},
			id: {}
		},
		data: function () {
			return {
				isMultiple: true,

				place: '',
				instrument: '针头',

				isUsed: 0,
				pollution: 3,
				isBlood: 0,
				isGlove: 3,

				leftHandList: [],
				rightHandList: [],
				partList: [],
				operationList: [],
				reasonList: [],

				otherInstrument: '',
				otherPart: '',
				otherOperation: '',
				otherReason: ''
			};
		},
		methods: {
			selectInstrument: function (value) {
				this.instrument = value;

				if(value != '其他')
					this.otherInstrument = '';
				else 
					this.otherInstrument = '其他';
			},
			selectUsed: function (value) {
				if(this.readOnly)
					return;
				this.isUsed = value;			
			},
			selectPollution: function (value) {
				if(this.readOnly)
					return;
				this.pollution = value;
			},
			selectBlood: function (value) {
				if(this.readOnly)
					return;
				this.isBlood = value;
			},
			selectGlove: function (value) {				
				if(this.readOnly)
					return;
				this.isGlove = value;
			},
			selectLeftHand: function (index) {
				if(this.readOnly)
					return;
				this.leftHandList[index].isSelected = !this.leftHandList[index].isSelected;
			},
			selectRightHand: function (index) {
				if(this.readOnly)
					return;
				this.rightHandList[index].isSelected = !this.rightHandList[index].isSelected;
			},
			submit: function () {
				if(!this.id) {
					alert('请先填写并保存基本信息');
					return;
				}

				errorFilter(this.$http.post(`${host}/weixin/expose_instr_desc`, JSON.stringify({
					exposeId: this.id,
					place: this.place,
					type: this.otherInstrument || this.instrument,

					isUse: this.isUsed,
					pollution: this.pollution,
					isBlood: this.isBlood,
					isGlove: this.isGlove,

					leftHandCode: getMutipleSelect(this.leftHandList),
					rightHandCode: getMutipleSelect(this.rightHandList),
					partCode: getMutipleSelect(this.partList),
					operateCode: getMutipleSelect(this.operationList),
					reasonCode: getMutipleSelect(this.reasonList)
				}), {
					headers: {
						Token: getToken(),
						contentType: 'application/json;charset=UTF-8'						
					}
				}))
			}
		},
		components: {
			'checkbox-list': CheckboxList
		},
		mounted: function () {
			var self = this;

			basic.listConst(3).then(function (res) {
				self.leftHandList = transform(res.data);
				self.rightHandList = transform(res.data);

				return basic.listConst(5);
			}).then(function (res) {
				self.partList = transform(res.data);

				return basic.listConst(4);
			}).then(function (res) {
				self.operationList = transform(res.data);

				return basic.listConst(6);
			}).then(function (res) {
				self.reasonList = transform(res.data);

				if(self.readOnly) {
					exposure.getInfo(self.id).then(function (res) {
						var data = res.data.exposeInstrDesc;

						if(data) {
							self.place = data.place;
							self.instrument = data.type;
							self.otherInstrument = /针头|玻璃|外科器械/.test(data.type) ? '' : data.type;

							self.isUsed = data.isUse;
							self.pollution = data.pollution;
							self.isBlood = data.isBlood;
							self.isGlove = data.isGlove;

							self.leftHandList.forEach(function (item) {
								data.leftHandCode.forEach(function (code) {
									item.isSelected = item.isSelected || item.code == code;
								});
							});

							self.rightHandList.forEach(function (item) {
								data.rightHandCode.forEach(function (code) {
									item.isSelected = item.isSelected || item.code == code;
								});
							});

							var flag = false;

							self.partList.forEach(function (item) {
								data.partCode.forEach(function (code) {
									item.isSelected = item.isSelected || item.code == code;
									flag = flag || item.isSelected;
								});
							});

							if(!flag)
								self.otherPart = data.part;

							flag = false;

							self.operationList.forEach(function (item) {
								data.operateCode.forEach(function (code) {
									item.isSelected = item.isSelected || item.code == code;
									flag = flag || item.isSelected;
								});
							});

							if(!flag)
								self.otherOperation = data.operate;

							flag = false;

							self.reasonList.forEach(function (item) {
								data.reasonCode.forEach(function (code) {
									item.isSelected = item.isSelected || item.code == code;
									flag = flag || item.isSelected;
								});
							});

							if(!flag)
								self.otherReason = data.reason;	
						}
					});
				}
			})
		}
	};
</script>