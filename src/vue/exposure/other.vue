<template>
	<div>
		<div class="block">
			<div class="line">
				<div class="grow-1">女性员工是否处于妊娠期</div>
				<div class="rect-option equal green" v-on:click="selectPregnant(1)" v-bind:class="{ 'selected': isPregnant }">是</div>
				<div class="rect-option equal green" v-on:click="selectPregnant(0)" v-bind:class="{ 'selected': !isPregnant }">否</div>
			</div>
			<div class="line">
				<div class="grow-1">医护人员习惯用手</div>
				<div class="rect-option equal green" v-on:click="selectHand(1)" v-bind:class="{ 'selected': hand == 1 }">左</div>
				<div class="rect-option equal green" v-on:click="selectHand(2)" v-bind:class="{ 'selected': hand == 2 }">右</div>
			</div>			
		</div>

		<div class="block">
			<div class="title">损伤程度</div>
			<checkbox-list :read-only="readOnly" :list="degreeList" type="rect" :is-multiple="isMultiple"></checkbox-list>		
		</div>

		<div class="block">
			<div class="title">锐器伤后处理</div>
			<checkbox-list :read-only="readOnly" :list="dealList" type="rect" :is-multiple="isMultiple"></checkbox-list>	
		</div>

		<div class="block">
			<div class="title">受伤次数</div>
			<input class="text-input" type="text" v-model="hurt" v-bind:disabled="readOnly">	
		</div>
		
		<div class="block last">
			<div class="title">现场证明人</div>
			<input class="text-input" type="text" v-model="prover" v-bind:disabled="readOnly">
		</div>

		<div class="submit-button" v-if="!readOnly" v-on:click="submit">结束, 请提交</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../../less/common.less';
	@import '../../less/variable.less';

	.block {
		margin-bottom: 8px;
		border-bottom: 1px solid @gray;		

		&.last {
			margin-bottom: 0;
			border-bottom: none;
		}

		>.title {
			height: 16px;
			line-height: 16px;
			margin-bottom: 8px;
		}

		>.text-input {
			width: 100%;
			margin-bottom: 8px;
		}

		>.line {
			display: flex;
			display: -webkit-flex;
			align-items: center;

			margin-bottom: 8px;
			>.checkbox {
				margin-right: 8px;
			}
			>.grow-1 {
				flex-grow: 1;
			}
		}
	}
</style>
<script>
	import { transform, mutipleSelect, getMutipleSelect } from '../../js/util.js';
	import CheckboxList from '../checkbox-list.vue';
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
				isMultiple: true,

				isPregnant: false,
				hand: 1,

				degreeList: [],
				dealList: [],

				hurt: 0,
				prover: ''
			};
		},
		methods: {
			selectPregnant: function (value) {
				if(this.readOnly)
					return;
				this.isPregnant = value ? true : false;
			},
			selectHand: function (value) {
				if(this.readOnly)
					return;
				this.hand = value;
			},
			submit: function () {
				if(!this.id) {
					alert('请先填写并保存基本信息');
					return;
				}

				errorFilter(this.$http.post(`${host}/weixin/expose_instr_other`, JSON.stringify({
					exposeId: this.id,
					isPreg: this.isPregnant ? 1 : 0,
					useHand: this.hand,
					degreeCode: getMutipleSelect(this.degreeList),
					dealCode: getMutipleSelect(this.dealList),
					hurtNumber: this.hurt,
					provePerson: this.prover
				}), {
					headers: {
						Token: getToken(),
						contentType: 'application/json;charset=UTF-8',
					}
				}))
			}
		},
		components: {
			'checkbox-list': CheckboxList
		},
		mounted: function () {
			var self = this;

			$.ajax({
				url: `${host}/dictionary`,
				type: 'GET',
				data: {
					type: 13
				}				
			}).then(function (res) {
				self.degreeList = res.data.map(function (item) {
					return {
						content: item.name,
						code: item.code,
						isSelected: false
					};
				});

				return $.ajax({
					url: `${host}/dictionary`,
					type: 'GET',
					data: {
						type: 7
					}
				});
			}).then(function (res) {
				self.dealList = res.data.map(function (item) {
					return {
						content: item.name,
						code: item.code,
						isSelected: false
					};
				});

				if(self.readOnly)
					exposure.getInfo(self.id).then(function (res) {
						var data = res.data.exposeInstrOther;

						if(data) {
							self.isPregnant = data.isPreg;
							self.hand = data.useHand;

							mutipleSelect(self.dealCode, data.dealCode);
							mutipleSelect(self.degreeList, data.degreeCode);

							self.hurt = data.hurtNumber;
							self.prover = data.provePerson;
						}
					});
			});
		}
	}
</script>