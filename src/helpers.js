export default {
	getRandomNumber(min, max) {
		let rand = min + Math.random() * (max + 1 - min);
		return Math.floor(rand);
	},
	setActive(blocks, id, time, sound) {
		return new Promise((res, rej) => {
			this.playSound(sound)
			blocks[id].classNames.push('active')
			setTimeout(() => {
				blocks[id].classNames = blocks[id].classNames.filter(className => className !== 'active')
				res()
			}, time)
		})
	},
	playSound(sound) {
		let audio = new Audio(sound).play()
	}
}