<template>
	<div>
		<div class="block">
			<div class="line">
				<div class="grow-1">女性员工是否处于妊娠期</div>
				<div class="rect-option equal green" v-bind:class="{ 'selected': isPregnant }">是</div>
				<div class="rect-option equal green" v-bind:class="{ 'selected': !isPregnant }">否</div>
			</div>
			<div class="line">
				<div class="grow-1">医护人员习惯用手</div>
				<div class="rect-option equal green" v-bind:class="{ 'selected': hand == 1 }">左</div>
				<div class="rect-option equal green" v-bind:class="{ 'selected': hand == 2 }">右</div>
			</div>			
		</div>

		<div class="block">
			<div class="title">损伤程度</div>
			<div class="line" v-for="item in degreeList">
				<div class="checkbox green" v-bind:class="{ 'selected': item.isSelected }">
					<div class="inner"></div>
				</div>
				<div>{{item.content}}</div>
			</div>			
		</div>

		<div class="block">
			<div class="title">锐器伤后处理</div>
			<div class="line" v-for="item in dealList">
				<div class="checkbox green" v-bind:class="{ 'selected': item.isSelected }">
					<div class="inner"></div>
				</div>
				<div>{{item.content}}</div>
			</div>			
		</div>

		<div class="block">
			<div class="title">受伤次数</div>
			<input class="text-input" type="text" v-model="hurt" disabled>			
		</div>
		
		<div class="block last">
			<div class="title">现场证明人</div>
			<input class="text-input" type="text" v-model="prover" disabled>
		</div>
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
	import $ from 'jquery';
	import { host, exposure } from '../../js/ajax.js';

	export default {
		props: ['id'],
		data: function () {
			return {
				isPregnant: false,
				hand: 1,

				degree: 1,
				deal: 1,

				hurt: 0,
				prover: '',

				degreeList: [],
				dealList: []
			};
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
						code: item.code
					};
				});

				return exposure.getInfo(self.id);
			}).then(function (res) {
				var data = res.data.exposeInstrOther;

				if(data) {
					self.isPregnant = data.isPreg;
					self.hand = data.useHand;

					self.degree = data.degreeCode;
					self.deal = data.dealCode;

					self.degreeList.forEach(function (item) {
						item.isSelected = item.code == self.degree;
					});

					self.dealList.forEach(function (item) {
						var flag = false;

						self.deal.forEach(function (dealCode) {
							flag = flag || item.code == dealCode;
						});

						item.isSelected = flag;
					});

					self.hurt = data.hurtNumber;
					self.prover = data.provePerson;
				}
			});
		}
	}
</script>