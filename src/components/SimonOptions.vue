<template>
	<div class="simon__options">
		<button :disabled="disabled" class="btn btn-primary" @click="$emit('game-start')">Старт</button>
		<form class="simon__form form">
			<p class="options__title">Раунд по счету: {{round}}</p>
			<p class="options__title">Уровни сложности:</p>
			<div class="form__group">
				<input 
					id="easy" 
					class="simon__option" 
					value="easy" 
					type="radio" 
					name="mode"
				 	@input="$emit('set-mode', 'easy')" 
				 v-model="mode">
				<label for="easy">Легкий</label>
			</div>
			<div class="form__group">
				<input 
					id="normal" 
					class="simon__option" 
					value="normal" 
					type="radio" 
					name="mode" 
					@input="$emit('set-mode', 'normal')"
					v-model="mode">
				<label for="normal">Средний</label>
			</div>
			<div class="form__group">
				<input 
					id="hard" 
					class="simon__option" 
					value="hard" 
					type="radio" 
					name="mode" 
					@input="$emit('set-mode', 'hard')"
					v-model="mode">
				<label for="hard">Сложный</label>
			</div>
		</form>
  </div>
</template>

<script>

export default {
	emits: ['set-mode'],
	props: {
		mode: {
			type: String,
			required: true
		},
		round: {
			type: Number,
			required: true
		},
		disabled: {
			type: Boolean,
			required: true
		}
	},
	emits: ['game-start']
}
</script>