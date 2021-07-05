<template>
  <div class="container">
    <div class="simon">
      <div class="simon__header">
        <h1 class="simon__title">Simon The Game</h1>
      </div>
      <div class="simon__content">
        <simon-game
          :blocks="blocks"
          @block-click="onBlockClick"
        ></simon-game>


        <simon-options
          :mode="mode"
          :round="round"
          @game-start="gameStart"
          @set-mode="setMode"
          :disabled="isStarted"
        ></simon-options>
      </div>
    </div>
  </div>
</template>

<script>
import SimonGame from '@/components/SimonGame'
import SimonOptions from '@/components/SimonOptions'
import helpers from '@/helpers'


export default {
  data() {
    return {
      mode: 'easy',
      neededSequence: [],
      sequence: [],
      intervalTime: {easy: 1500, normal: 1000, hard: 400},
      isDemonstrating: false,
      round: 1,
      interval: null,
      isStarted: false,
      isEnd: false,
      timeToDemonstrating: 300,
      blocks: [
        {
          id: 0,
          classNames: ['simon__block simon__block--blue'],
          sound: require('./assets/s1.mp3')
        },
        {
          id: 1,
          classNames: ['simon__block simon__block--red'],
          sound: require('./assets/s2.mp3')
        },
        {
          id: 2,
          classNames: ['simon__block simon__block--yellow'],
          sound: require('./assets/s3.mp3')
        },
        {
          id: 3,
          classNames: ['simon__block simon__block--green'],
          sound: require('./assets/s4.mp3')
        },
      ]
    }
  },
  methods: {
    setMode(mode) {
      this.mode = mode
    },
    gameStart() {
      this.isEnd = false
      this.isStarted = true
      this.demonstrate()
    },
    demonstrate() {
      this.isDemonstrating = true
      this.interval = setInterval(() => {
        let randomNumber = helpers.getRandomNumber(0, this.blocks.length - 1)
        this.neededSequence.push(randomNumber)
        helpers.setActive(this.blocks, randomNumber, this.timeToDemonstrating, this.blocks[randomNumber].sound)
        if(this.neededSequence.length >= this.round) {
          clearInterval(this.interval)
          this.isDemonstrating = false
        }
      }, this.intervalTime[this.mode])
    },
    onBlockClick(id, sound) {
      if(this.isStarted && this.isDemonstrating === false) {
        helpers.setActive(this.blocks, id, this.timeToDemonstrating, sound)
          .then(() => {
            if(id === this.neededSequence[this.sequence.length]) {
              this.sequence.push(id)
    
              if(this.sequence.length === this.neededSequence.length) {
                this.nextRound()
              }
            } else {
              this.endGame()
            }
          })
      }
    },
    nextRound() {
      this.round++ 
      this.neededSequence = []
      this.sequence = []
      this.interval = null 
      this.demonstrate()
    },
    endGame() {
      this.isStarted = false
      this.neededSequence = []
      this.sequence = []
      this.interval = null 
      this.isEnd = true
      alert(`Вы проиграли спустя ${this.round} раундов`)
      this.round = 1
    }
  },
  components: {
    SimonGame,
    SimonOptions
  }
}
</script>

<style>
body {
  font-family: sans-serif;
}

.simon__header {
  margin-bottom: 50px;
}

.simon__title {
  text-align: center;
}

.simon__content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 500px;
  min-width: 300px;
  align-items: stretch;
  margin: 0 auto;
  padding: 20px 10px;
}

.simon__game {
  overflow: hidden;
  flex-basis: 50%;
  border-radius: 50%;
  min-height: 230px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #666;
}

@media (max-width: 500px) {
  .simon__game {
    min-height: 130px;
  }
}

.simon__block {
  opacity: .6;
  flex-basis: 50%;
  cursor: pointer;
}

.simon__block:hover {
  box-shadow: 0px 0px 7px -2px #000;
  opacity: .7;
}

.simon__block.active {
  opacity: 1;
  box-shadow: 0px 0px 10px -3px #000;
}

.simon__block--blue {
  background-color: #80c6fc;
}
.simon__block--red {
  background-color: #CD5C5C;
}
.simon__block--yellow {
  background-color: #ffff00;
}
.simon__block--green {
  background-color: #90ee90;
}



.btn {
  padding: 12px 24px;
  outline: none;
  border: none;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 5px;
}

.btn-primary {
  background-color: rgb(160, 191, 248);
}
</style>
