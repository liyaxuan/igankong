<template>
	<div>
		<div class="line flex center">
			<div class="title">姓名</div>
			<input class="text-input grow-1" type="text" placeholder="请输入姓名" v-bind:disabled="readOnly" v-model="name">
			<div class="rect-option equal green" v-bind:class="{ 'selected': gender == 1 }" v-on:click="selectGender(1)">男</div>
			<div class="rect-option equal green" v-bind:class="{ 'selected': gender == 2 }" v-on:click="selectGender(2)">女</div>
			<div class="cf"></div>
		</div>
		<div class="line flex center">
			<department-select :read-only="departmentSelecTreadOnly" :current-main="currentMain" :current-secondary="currentSecondary"></department-select>
		</div>
		<div class="line flex center">
			<div class="title">年龄</div>
			<input class="text-input grow-1" type="text" placeholder="年龄" v-bind:disabled="readOnly" v-model="age">
		</div>
		<div class="line flex center">
			<div class="title">工龄</div>
			<input class="text-input grow-1" type="text" placeholder="工龄" v-bind:disabled="readOnly" v-model="workingYears">
		</div>
		<div class="line">
			<div class="title fl">职称</div>
			<div class="right">
				<checkbox-list class="checkbox-list" :list="title" color="green" type="arc"></checkbox-list>
				<input class="text-input" type="text" placeholder="其他职称" v-bind:disabled="readOnly">				
			</div>
			<div class="cf"></div>
		</div>
		<div class="line">
			<div class="title fl">岗位</div>
			<div class="right">
				<checkbox-list class="checkbox-list" :list="position" color="green" type="arc"></checkbox-list>
				<input class="text-input" type="text" placeholder="其他岗位" v-bind:disabled="readOnly">				
			</div>
			<div class="cf"></div>
		</div>
		<div class="line flex center">
			<div class="title">联系电话</div>
			<input class="text-input grow-1" type="text" placeholder="联系电话" v-model="phone" v-bind:disabled="readOnly">
		</div>
	</div>
</template>
<style lang="less" scoped>
	@import '../../less/common.less';

	.line {
		margin-bottom: 8px;

		&.last {
			margin-bottom: 8px;
		}

		&.flex {
			display: flex;
			display: -webkit-flex;
			flex-wrap: wrap;			
		}

		&.center {
			align-items: center;
		}
	}

	.grow-1 {
		width: 0;
		flex-grow: 1;
	}

	.title {
		margin-right: 8px;
	}

	.right {
		margin-left: 36px;

		>.text-input {
			width: 100%;
		}
	}
</style>
<script>
	import DepartmentSelect from '../department-select.vue';
	import CheckboxList from '../checkbox-list.vue';

	import { basic, exposure } from '../../js/ajax.js';

	export default {
		props: ['id', 'readOnly'],
		data: function () {
			return {
				departmentSelecTreadOnly: true,

				name: '',
				gender: 1,
				age: 0,
				workingYears: 0,
				phone: '',

				jobCode: 1,
				titleCode: 1,

				currentMain: '',
				currentSecondary: '',

				title: [],
				position: []
			}
		},
		components: {
			'department-select': DepartmentSelect,
			'checkbox-list': CheckboxList
		},
		methods: {
			selectGender: function (gender) {
				if(this.readOnly == 'true')
					return;
				this.gender = gender;
			}
		},
		mounted: function () {
			var self = this;

			exposure.getInfo(this.id).then(function (res) {
				var data = res.data.exposeBasic;

				self.name = data.name;
				self.gender = data.sex;
				self.age = data.age;
				self.workingYears = data.workAge;
				self.phone = data.phone;

				self.currentMain = data.mainDepartment;
				self.currentSecondary = data.subDepartment;

				self.jobCode = data.jobCode;
				self.titleCode = data.titleCode;

				return basic.listTitle();
			}).then(function (res) {
				self.title = res.data.map(function (item) {
					return {
						content: item.name,
						isSelected: item.code == self.titleCode,
						code: item.code,
					}
				});

				return basic.listPosition();
			}).then(function (res) {
				self.position = res.data.map(function (item) {
					return {
						content: item.name,				
						isSelected: item.code == self.jobCode,
						code: item.code,		
					}
				})
			});
		}
	}
</script>