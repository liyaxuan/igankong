<template>
	<div>
		<div class="line">
			<div class="tag">患者姓名</div>
			<input class="text-input" placeholder="患者姓名" v-model="name">
			<div class="option" v-bind:class="{ 'selected': gender == 1 }">男</div>
			<div class="option" v-bind:class="{ 'selected': gender == 2 }">女</div>
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
		<div v-for="item in source" class="virus-item">
			<div class="name">
				<div>{{item.short}}</div>
				<div>{{item.full}}</div>
			</div>
			<div class="option" v-bind:class="{ 'selected': item.value == 1 }">阳性</div>
			<div class="option" v-bind:class="{ 'selected': item.value == 2 }">阴性</div>	
			<div class="option">{{item.time}}</div>
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

		>.tag {
			margin-right: 8px;
		}

		>.text-input {
			width: 0;
			flex-grow: 1;
		}
	}

	.option {
		height: 16px;
		line-height: 16px;
		margin-left: 8px;
		padding: 8px;
		border: 1px solid @gray;
		border-radius: 4px;
		color: @gray;

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
			>.short {
				height: 16px;
				line-height: 16px;
				margin-bottom: 6px;
				font-size: 16px;
			}

			>.short {
				height: 12px;
				line-height: 12px;
				font-size: 12px;
			}
		}
	}
</style>
<script>
	import { exposure } from '../../js/ajax.js';

	export default {
		props: ['id'],
		data: function () {
			return {
				name: '',
				gender: 1,
				age: 1,
				no: '',
				phone: '',				
			};

		},
		mounted: function () {
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