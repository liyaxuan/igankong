<template>
	<div>
		<div class="line">治疗预案或处理措施</div>
		<div class="line">
			<div>1.立即注射乙肝疫苗10 ug qd</div>
			<div class="checkbox green" v-on:click="toggleVaccin" v-bind:class="{ 'selected': method.isInjectVaccin == 1 }"><div class="inner"></div></div>
		</div>
		<div class="line">
			<div>2.立即注射乙肝免疫球蛋白200 IU qd</div>
			<div class="checkbox green" v-on:click="toggleProtein" v-bind:class="{ 'selected': method.isInjectProtein == 1 }"><div class="inner"></div></div>
		</div>
		<div class="line">
			<div>3.口服双汰芝1片 bid</div>		
			<div class="checkbox green" v-on:click="toggleSTZ" v-bind:class="{ 'selected': method.isEatSTZ == 1 }"><div class="inner"></div></div>
		</div>
		<div class="line">
			<input class="text-input grow-1" type="date" v-model="method.stzBeginTime" v-bind:disabled="readOnly || (!readOnly && method.isEatSTZ == 0)">
			<div class="zhi">至</div>
			<input class="text-input grow-1" type="date" v-model="method.stzEndTime" v-bind:disabled="readOnly || (!readOnly && method.isEatSTZ == 0)">
		</div>
		<div class="line">
			<div>4.口服茚地那伟 0.8 q8h</div>
			<div class="checkbox green" v-on:click="toggleYDNW" v-bind:class="{ 'selected': method.isEatYDNW == 1 }"><div class="inner"></div></div>
		</div>
		<div class="line">
			<input class="text-input grow-1" type="date" v-model="method.ydnwBeginTime" v-bind:disabled="readOnly || (!readOnly && method.isEatYDNW == 0)">
			<div class="zhi">至</div>
			<input class="text-input grow-1" type="date" v-model="method.ydnwEndTime" v-bind:disabled="readOnly || (!readOnly && method.isEatYDNW == 0)">
		</div>	
		<div class="line">
			<div>5.立即注射人免疫球蛋白 50ml qd</div>
			<div class="checkbox green" v-on:click="toggleVein" v-bind:class="{ 'selected': method.isInjectVein == 1 }"><div class="inner"></div></div>
		</div>
		<div class="line">
			<div class="right">其他用药</div>
			<input class="text-input grow-1" type="text" v-model="method.other" v-bind:disabled="readOnly">
		</div>
		<div class="line">
			<div class="grow-2">毒副作用</div>
			<div class="rect-option equal green" v-on:click="setSideEffect(1)" v-bind:class="{ 'selected': method.isEffect == 1 }">有</div>
			<div class="rect-option equal green left" v-on:click="setSideEffect(0)" v-bind:class="{ 'selected': method.isEffect == 0 }">无</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
	@import '../../less/common.less';

	.line {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.grow-1 {
		width: 0;
		flex-shrink: 1;
		flex-grow: 1;
	}

	.grow-2 {
		flex-grow: 2;
	}

	.zhi {
		margin: 0 8px;
	}

	.left {
		margin-left: 8px;
	}

	.right {
		margin-right: 8px;
	}
</style>

<script>
	export default {
		props: ['readOnly', 'method'],
		methods: {
			toggleVaccin: function () {
				if(this.readOnly)
					return;

				this.method.isInjectVaccin = 1 - this.method.isInjectVaccin;
			},
			toggleProtein: function () {
				if(this.readOnly)
					return;

				this.method.isInjectProtein = 1 - this.method.isInjectProtein;
			},
			toggleSTZ: function () {
				if(this.readOnly)
					return;

				this.method.isEatSTZ = 1 - this.method.isEatSTZ;
			},
			toggleYDNW: function () {
				if(this.readOnly)
					return;

				this.method.isEatYDNW = 1 - this.method.isEatYDNW;
			},
			toggleVein: function () {
				if(this.readOnly)
					return;

				this.method.isInjectVein = 1 - this.method.isInjectVein;
			},
			setSideEffect: function (value) {
				if(this.readOnly)
					return;

				this.method.isEffect = value;
			}
		}	
	}
</script>