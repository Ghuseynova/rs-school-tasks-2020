class Calculator {
	constructor(currentInput, prevInput) {
		this.currentInput = currentInput;
		this.prevInput = prevInput;

		this.clear();
	}

	clear() {
		this._prevValue = '';
		this._currentValue = '';
		this._operation = undefined;
	}

	delete() {
		this._currentValue = this._currentValue.slice(0, -1);
	}

	appendNumber(number) {
		this._currentValue += number;
	}

	chooseOperation(operation) {
		if (this._currentValue === '') return;
		if (this._prevValue !== '') {
			console.log('kkkkk');
			this.calculate();
		}

		if (operation === 'sqr' || operation === 'sqrt') {
			this._operation = operation;
			this.calculate();
		} else {
			this._prevValue = this._currentValue;
			this._currentValue = '';
			this._operation = operation;
		}
	}

	calculate() {
		let result;
		const prevValue = parseFloat(this._prevValue);
		const currentValue = parseFloat(this._currentValue);
		const operation = this._operation;

		console.log(operation);

		switch (operation) {
			case '/':
				result = prevValue / currentValue;
				break;
			case '*':
				result = prevValue * currentValue;
				break;
			case '+':
				result = prevValue + currentValue;
				break;
			case '-':
				result = prevValue - currentValue;
				break;
			case 'sqr':
				result = currentValue * currentValue; // currentValue**2 --- Math.pow(currentValue, 2);
				break;
			case 'sqrt':
				result = Math.sqrt(currentValue);
				break;
			default:
				return;
		}

		console.log(result);
		this._currentValue = result;
		this._prevValue = '';
		this._operation = undefined;
	}

	updateDisplay() {
		this.currentInput.innerText = this._currentValue;

		if (this._operation !== undefined) {
			this.prevInput.innerText = `${this._prevValue} ${this._operation}`;
		} else {
			this.prevInput.innerText = '';
		}
	}

	addDecimal() {}

	addNegativeSign() {}
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation');
const clearBtn = document.querySelector('[data-all-clear]');
const delBtn = document.querySelector('[data-delete]');
const decimalBtn = document.querySelector('[data-decimal]');
const equalsBtn = document.querySelector('[data-equals]');
const negPosBtn = document.querySelector('[data-neg-pos]');
const prevInput = document.querySelector('.prev-input');
const currentInput = document.querySelector('.current-input');

const calculator = new Calculator(currentInput, prevInput);

console.log(calculator);

numberBtns.forEach((numBtn) => {
	numBtn.addEventListener('click', (e) => {
		const number = e.target.dataset.value;

		calculator.appendNumber(number);
		calculator.updateDisplay();

		console.log('number btn clicked', number);
	});
});

operationBtns.forEach((operationBtn) => {
	operationBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		const operation = e.target.dataset.value;

		calculator.chooseOperation(operation);
		calculator.updateDisplay();
		console.log('operation btn clicked', operation);
	});
});

clearBtn.addEventListener('click', (e) => {
	calculator.clear();
	calculator.updateDisplay();
	console.log('clear btn clicked');
});

delBtn.addEventListener('click', (e) => {
	calculator.delete();
	calculator.updateDisplay();
	console.log('delete btn clicked');
});

decimalBtn.addEventListener('click', (e) => {
	calculator.addDecimal();
	calculator.updateDisplay();
	console.log('decimal btn clicked');
});

negPosBtn.addEventListener('click', (e) => {
	calculator.addNegativeSign();
	calculator.updateDisplay();
	console.log('negative positive btn clicked');
});

equalsBtn.addEventListener('click', (e) => {
	calculator.calculate();
	calculator.updateDisplay();
	console.log('equals btn clicked');
});
