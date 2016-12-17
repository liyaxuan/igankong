<template>
	<div>
		<select class="main" v-on:change="mainChanged" v-bind:disabled="readOnly">
			<option v-for="item in main">{{item}}</option>
		</select>
		<select class="secondary" v-on:change="secondaryChanged" v-bind:disabled="readOnly">
			<option v-bind:value="item.id" v-for="item in secondary">{{item.name}}</option>
		</select>
	</div>
</template>

<style lang="less">
</style>

<script>
	import { department } from '../js/ajax.js';

	export default {
		props: {
			readOnly: {
				defalut: true
			},
			currentMain: {
				default: function () {
					return {
						name: ''
					};
				}
			},
			currentSecondary: {
				default: function () {
					return {
						id: 1,
						name: ''
					};
				}
			}
		},
		data: function () {
			return {
				main: [],
				secondary: []
			};
		},
		methods: {
			mainChanged: function (event) {
				var self = this;
				var main = event.target.value;

				department.listSecondary(main).then(function (res) {
					self.secondary = res.data;

					self.currentMain.name = main;
				});
			},
			secondaryChanged: function (event) {
				var option = event.target.querySelectorAll('option');

				for(var i = 0; i < option.length; i++) {
					if(option[i].selected) {
						this.currentSecondary.id = this.secondary[i].id;
						this.currentSecondary.name = this.secondary[i].name;
						break;
					}
				}
			}
		},
		mounted: function () {
			var self = this;

			department.listMain().then(function (res) {
				self.main = res.data;

				self.currentMain.name = self.main[0];

				return department.listSecondary(self.main[0]);
			}).then(function (res) {
				self.secondary = res.data;

				self.currentSecondary.id = self.secondary[0].id;
				self.currentSecondary.name = self.secondary[0].name;
			});		
		}		
	}
</script>