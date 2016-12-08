<template>
	<div>
		<div class="line">
			<input class="text-input" placeholder="发生地点" v-model="place" disabled>
		</div>
		
		<div class="tag-header green">体液类型</div>
		<checkbox-list :list="fluid" color="green" type="rect"></checkbox-list>

		<div class="line">
			<div class="grow-1">体液是否含有血液</div>
			<div class="option" v-bind:class="{ 'selected': isBlood == 1 }">是</div>
			<div class="option" v-bind:class="{ 'selected': isBlood == 0 }">否</div>
			<div class="option" v-bind:class="{ 'selected': isBlood == 2 }">未知</div>
		</div>

		<div class="tag-header green">暴露部位</div>
		<checkbox-list :list="part" color="green" type="rect"></checkbox-list>

		<div class="tag-header green">血液或体液是否(可多选)</div>
		<checkbox-list :list="fluidCondition" color="green" type="rect"></checkbox-list>

		<div class="tag-header green">发生时是否穿戴防护用具(可多选)</div>
		<checkbox-list :list="armor" color="green" type="rect"></checkbox-list>
		
		<div class="tag-header green">暴露原因</div>
		<checkbox-list :list="reason" color="green" type="rect"></checkbox-list>

		<div class="tag-header green">与体液血液接触的时间</div>
		<checkbox-list :list="exposureTime" color="green" type="rect"></checkbox-list>

		<div class="tag-header green">与体液血液接触的量</div>
		<checkbox-list :list="exposureQuantity" color="green" type="rect"></checkbox-list>

		<div class="tag-header green">暴露部位</div>
		<div class="line">
			<div class="tag">最大暴露部位</div>
			<input class="text-input grow-1" placeholder="最大暴露部位" v-model="maxPart" disabled>
		</div>
		
		<div class="line">
			<div class="tag">中级暴露部位</div>
			<input class="text-input grow-1" placeholder="中级暴露部位" v-model="midPart" disabled>
		</div>
		
		<div class="line">
			<div class="tag">最小暴露部位</div>
			<input class="text-input grow-1" placeholder="最小暴露部位" v-model="minPart" disabled>
		</div>
		
		<div class="line">
			<div class="tag">暴露过程描述</div>
			<textarea class="textarea grow-1" v-model="note" placeholder="暴露过程描述(不少于20字)" disabled></textarea>
		</div>
		
		<div class="line last">
			<div class="tag">现场证明人</div>
			<input class="text-input grow-1" placeholder="现场证明人" v-model="prover" disabled>	
		</div>

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

		&.last {
			margin-bottom: 0;
		}
	}

	.tag {
		margin-right: 8px;
	}

	.option {
		margin-left: 8px;
		height: 16px;
		line-height: 16px;
		padding: 8px;
		border: 1px solid @gray;
		border-radius: 4px;
		color: @gray;

		&.selected {
			border: 1px solid @green;
			background-color: @green;
			color: #ffffff;		
		}
	}

	.grow-1 {
		width: 0;
		flex-grow: 1;
	}

	.textarea {
		padding: 8px;
		border: 1px solid @green;
		border-radius: 4px;
	}
</style>
<script>
	import { transform, mutipleSelect } from '../../js/util.js';
	import { exposure, basic } from '../../js/ajax.js';

	import CheckboxList from '../checkbox-list.vue';

	export default {
		props: ['id'],
		data: function () {
			return {
				fluid: [],
				part: [],
				fluidCondition: [],
				armor: [],
				reason: [],

				exposureTime: ['<5分钟', '5~14分钟', '15分钟~1小时', '>1小时'].map(function (item) {
					return {
						content: item,
						isSelected: false
					}
				}),
				exposureQuantity: ['<5mL', '不超过50mL', '>50mL'].map(function (item) {
					return {
						content: item,
						isSelected: false
					}
				}),

				note: '',
				prover: '',

				maxPart: '',
				midPart: '',
				minPart: ''
			}
		},
		components: {
			'checkbox-list': CheckboxList
		},
		mounted: function () {
			var self = this;

			Promise.all([8, 9, 10, 11, 12].map(function (type) {
				return basic.listConst(type);
			})).then(function ([fluid, part, fluidCondition, armor, reason]) {
				self.fluid = transform(fluid.data);
				self.part = transform(part.data);
				self.fluidCondition = transform(fluidCondition.data);

				self.armor = transform(armor.data);
				self.reason = transform(reason.data);

				return exposure.getInfo(self.id);
			}).then(function (res) {
				var data = res.data.exposeLiquidDesc;

				if(data) {
					self.place = data.place;
					self.isBlood = data.hasBlood;


					mutipleSelect(self.fluid, data.liquidTypeCode);
					mutipleSelect(self.part, data.exposePartCode);
					mutipleSelect(self.fluidCondition, data.touchInfoCode);
					mutipleSelect(self.armor, data.protectToolCode);
					mutipleSelect(self.reason, data.reasonCode);

					self.exposureTime.forEach(function (item) {
						item.isSelected = item.content == data.touchTime;
					});

					self.exposureQuantity.forEach(function (item) {
						item.isSelected = item.content == data.capacity;
					});

					self.note = data.note;
					data.prover = data.provePerson;

					self.maxPart = data.maxPart;
					self.midPart = data.midPart;
					self.minPart = data.minPart;
				}
			});
		}
	}
</script>