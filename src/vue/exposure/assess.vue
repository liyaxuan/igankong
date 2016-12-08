<template>
	<div>
		<div class="title">暴露级别</div>
		<div class="line">
			<div class="level-option" v-bind:class="{ 'selected': level == 1 }" v-on:click="level = 1">1级</div>
			<div class="level-option" v-bind:class="{ 'selected': level == 2 }" v-on:click="level = 2">2级</div>
			<div class="level-option" v-bind:class="{ 'selected': level == 3 }" v-on:click="level = 3">3级</div>
		</div>
		<div class="title">暴露源头严重程度</div>
		<div class="line">
			<div class="level-option" v-bind:class="{ 'selected': degreeLevel == 1 }" v-on:click="degreeLevel = 1">1级</div>
			<div class="level-option" v-bind:class="{ 'selected': degreeLevel == 2 }" v-on:click="degreeLevel = 2">2级</div>
			<div class="level-option" v-bind:class="{ 'selected': degreeLevel == 3 }" v-on:click="degreeLevel = 3">3级</div>
		</div>
		<exposure-method :method="method" :read-only="methodReadOnly"></exposure-method>
		<div class="title">肝功 肾功检查结果</div>
		<textarea name="" id="" cols="30" rows="10" v-model="result"></textarea>
		<div class="button" v-on:click="submit">确定</div>
	</div>	
</template>
<style lang="less" scoped>
	@import '../../less/variable.less';
	@import '../../less/common.less';

	.title {
		height: 16px;
		line-height: 16px;
		margin-bottom: 8px;
	}

	.line {
		margin-bottom: 8px;

		display: flex;
		display: -webkit-flex;
		justify-content: space-between;

		>.level-option {
			width: 48px;
			height: 48px;
			line-height: 48px;
			padding: 8px;
			border-radius: 50%;

			text-align: center;

			border: 1px solid @gray;
			color: @gray;	
	
			&.selected {
				background-color: @green;
				border: 1px solid @green;
				color: #ffffff;				
			}
		}
	}

	textarea {
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 8px;
		padding: 8px;
		border: 1px solid @gray;
		border-radius: 4px;
	}

	.button {
		width: 100%;
		height: 32px;
		line-height: 32px;
		background-color: @green;
		border-radius: 4px;
		text-align: center;
		color: #ffffff;
	}
</style>
<script>
	import $ from 'jquery';
	import { host, getToken} from '../../js/ajax.js';
	import { getDate } from '../../js/util.js';

	import Method from './method.vue';

	export default {
		props: ['id'],
		data: function () {
			return {
				level: 1,
				degreeLevel: 1,
				methodReadOnly: false,
				method: {
					isInjectVaccin: 0,  //是否立即注射乙肝疫苗: 1是, 0否
					isInjectProtein: 0, //是否立即注射乙肝免疫球蛋白: 1是, 0否
					isEatSTZ: 0,        //是否口服双肽芝1片: 1是, 0否
					stzBeginTime: getDate(),   //双汰芝服用开始日期
					stzEndTime: getDate(),     //双汰芝服用结束日期
					isEatYDNW: 0,               //是否口服茚地那韦0.8: 1是, 0否
					ydnwBeginTime: getDate(),   //茚地那韦服用开始日期
					ydnwEndTime: getDate(),     //茚地那韦服用结束日期
					isInjectVein: 0,        //是否立即静脉注入免疫球蛋白: 1是, 0否
					other: '',  
					isEffect: 0,
				},
				result: ''
			};
		},
		components: {
			'exposure-method': Method
		},
		methods: {
			submit: function () {
				var data = {
					exposeId: this.id,
					level: this.level,
					degreeLevel: this.degreeLevel,
					gutResult: this.result				
				};

				for(var x in this.method)
					data[x] = this.method.x;

				$.ajax({
					url: `${host}/weixin/expose_evaluate`,
					type: 'POST',
					data: JSON.stringify(data),
			        contentType: 'application/json;charset=UTF-8',
					headers: {
						Token: getToken(),
					}						
				}).then(function (res) {
					if(res.error == 'succ') {
						alert('提交成功');
					}
					else {
						alert(`提交失败: ${res.error}`);
					}
				});
			}
		}
	}
</script>