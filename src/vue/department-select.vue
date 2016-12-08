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
		props: ['readOnly', 'currentMain', 'currentSecondary'],
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

					self.$emit('department-changed', self.secondary[0]);
				});
			},
			secondaryChanged: function (event) {
				var option = event.target.querySelectorAll('option');
				var obj = {};
				for(var i = 0; i < option.length; i++) {
					if(option[i].selected) {
						obj = this.secondary[i];
						break;
					}
				}

				this.$emit('department-changed', obj);
			}
		},
		mounted: function () {
			var self = this;

			department.listMain().then(function (res) {
				self.main = res.data;

				return department.listSecondary(self.main[0]);
			}).then(function (res) {
				self.secondary = res.data;

				self.$emit('department-changed', self.secondary[0]);
			});		
		}		
	}
</script>