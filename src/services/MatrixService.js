const _ = require('lodash')

export default class MatrixService {
	constructor({canvas, ctx}) {
		this.canvas = canvas
		this.ctx = ctx
		this.drawInterval = 155
		this.fontSize = 40
		this.fontGap = 20
		this.symbols = ['L', 'O', 'N', 'D', 'O', 'N']
	}

	getCanvasSize () {
		this.canvas.height = window.innerHeight
		this.canvas.width = window.innerWidth
	}
	
	drawSymbolsInterval () {
			setInterval (() => this.drawSymbols(), this.drawInterval);
	}
	
	getNumOfColumns () {
		return Math.round(this.canvas.width / this.fontSize)
	}

	setFont() {
		this.ctx.font = `${this.fontSize}px Courier New`
	}
	
	getNextChar (yPos) {
		if (yPos.symbols.length)
			return yPos.symbols.shift()
		else {
			yPos.symbols = _.cloneDeep(this.symbols)
			return yPos.symbols.shift()
		}
	}
	
	randomInt(max) {
		return Math.floor(Math.random() * max)
	}
	
	randomBool() {
		return Math.random() > 0.95 ? true : false
	}
	
	isYPosGreaterThanCanvasHeight(yPos) {
		return yPos * this.fontSize > this.canvas.height
	}
	
	fillText({ symbol, xPos, yPos }) {
		this.ctx.fillText(symbol, xPos, yPos);
	}

	setSymbolStartYPositions() {
		this.yPositions = []
		for (let i = 0; i < this.getNumOfColumns(); i++) {
			this.yPositions[i] = { pos: this.randomInt(this.fontSize), symbols: _.cloneDeep(this.symbols)}
		}
	}

	getRandomHexCode() {
		const chars = ['9', '9', '3', '3', '5', '9']
		return chars.reduce((res, _) => res + chars[this.randomInt(chars.length)], '#')
	}

	drawSymbols() {
		this.ctx.fillStyle = this.getRandomHexCode();
		this.yPositions.forEach((yPos, index, yPositions) => {
			this.fillText({
				symbol: this.getNextChar(yPos),
				xPos: index * (this.fontSize + this.fontGap),
				yPos: yPos.pos * (this.fontSize + this.fontGap)
			});
			this.isYPosGreaterThanCanvasHeight && this.randomBool() ?  yPositions[index].pos = 0 : yPositions[index].pos += 1;
		})
		if (!this.randomBool()) this.fadeOutSymbols()
	}

	fadeOutSymbols() {
		if (this.spacebarPressed) {
			this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
		} else { 
			this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
		}
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
	}

}
