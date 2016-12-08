<template>
	<div v-show="isShow" class="container">
		<canvas v-on:touchstart.prevent="start" v-on:touchmove.prevent="move" v-on:touchend.prevent="end" v-on:mousedown="start" v-on:mousemove="move" v-on:mouseup="end"
		v-bind:width="width" v-bind:height="height"></canvas>
		<div class="button-group">
			<div class="button first" v-on:click.stop="oneshot">一键签名</div>
			<div class="button" v-on:click.stop="finish">确定</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
	.container {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #ffffff;
		line-height: 0;

		canvas {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;

			background-color: #ffffff;
		}

		.button-group {
			position: absolute;
			left: 0;
			bottom: 0;

			transform: rotate(90deg) translate(-20px, 4px);
			-ms-transform: rotate(90deg) translate(-20px, 4px);		/* IE 9 */
			-webkit-transform: rotate(90deg) translate(-20px, 4px);	/* Safari and Chrome */
			-o-transform: rotate(90deg) translate(-20px, 4px);		/* Opera */
			-moz-transform: rotate(90deg) translate(-20px, 4px);

			.button {
				width: 96px;
				height: 32px;
				line-height: 32px;

				background-color: #5dc12d;
				border-radius: 4px;
				text-align: center;
				color: #ffffff;

				&.first {
					margin-bottom: 8px;			
				}
			} 	
		}
	}
</style>
<script>
	function getX(event) {
		return event.clientX || event.touches[0].clientX;
	}

	function getY(event) {
		return event.clientY || event.touches[0].clientY;
	}

	function start(event) {
		this.canMove = true;

		this.lastX = getX(event);
		
		this.lastY = getY(event);

	}

	function move(event) {
		if(!this.canMove)
			return;

		var nextX = getX(event);
		var nextY = getY(event);

		var context = event.target.getContext('2d');
		context.beginPath();
		context.moveTo(this.lastX, this.lastY);
		context.lineTo(nextX, nextY);
		context.stroke();

		this.lastX = nextX;
		this.lastY = nextY;		
	}

	function end() {
		this.canMove = false;
	}

	export default {
		props: ['isShow'],
		data: function () {
			return {
				width: window.innerWidth,
				height: window.innerHeight,

				canMove: false,
				lastX: 0,
				lastY: 0,
			};
		},
		methods: {
			start: start,
			move: move,
			end: end,

			oneshot: function () {
				alert('不支持');
			},
			clear: function () {
				var context = this.$el.querySelector('canvas').getContext('2d');
				context.clearRect(0, 0, this.width, this.height);
				this.$emit('signature-closed', {});
			},
			close: function () {
				this.clear();
			},
			finish: function () {
				var dataurl = this.$el.querySelector('canvas').toDataURL();
				this.$emit('signature-finished', dataurl);
				this.clear();
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				var canvas = this.$el.querySelector('canvas');
				var context = canvas.getContext('2d');

				context.lineWidth = 4;
			});
		}
	}
</script>