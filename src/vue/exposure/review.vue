<template>
	<div>
		<div class="title">复查历史</div>
		<div class="" v-for="(checkItem, oindex) in checkList"  v-bind:class="{ 'last': oindex == checkList.length - 1 }">
			<div>{{checkItem.checkTimeFormat}}</div>
			<div class="result-item" v-for="(resultItem, iindex) in checkItem.checkResult" v-bind:class="{ 'last': iindex == checkItem.checkResult.length - 1 }">
				<div>第{{iindex + 1}}次</div>
				<div>{{resultItem.name + resultItem.info}}</div>
				<div class="result" v-bind:class="{ 'gray': resultItem.value == 0, 'red': resultItem.value == 1, 'green': resultItem.value == 2 }">{{resultItem.value | value}}</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../../less/variable.less';

	.title {
		height: 16px;
		line-height: 16px;
		margin-bottom: 8px;
	}

	.result-item {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 8px;
	}

	.last {
		margin-bottom: 0;
	}
	
	.color(@color) {
		border: 1px solid @color;
		color: @color;
	}

	.result {
		border-radius: 4px;

		&.red {
			.color(@red);
		}

		&.green {
			.color(@green);
		}

		&.gray {
			.color(@gray);
		}
	}
</style>

<script>
	export default {
		props: ['checkList'],
	    filters: {
	        value: function (value) {
	            if(value == 0)
	                return '未知';
	            else if(value == 1)
	                return '阳性';
	            else if(value == 2)
	                return '阴性';
	            else
	                return '非法值';
	        }
	    }
	}
</script>