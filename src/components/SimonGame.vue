<template>
	<div class="simon__game" @click="onBlockClick">
		<div  
			v-for="block in blocks"
			:key="block.id"
			:data-id="block.id"
			:data-sound="block.sound"
			:class="block.classNames"></div>
  </div>
</template>

<script>

export default {
	emits: ['block-click'],
	props: {
		blocks: {
			type: Array,
			required: true
		},
	},
	methods: {
		onBlockClick(evt) {
			if(evt.target.classList.contains('simon__block')) {
				this.$emit('block-click', +evt.target.dataset.id, evt.target.dataset.sound)
			}
		}
	}
}
</script>