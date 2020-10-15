class Calculator {
	constructor(currentInput, prevInput) {
		this.currentInput = currentInput;
		this.prevInput = prevInput;

		this.clear();
	}

	clear() {
		this._prevValue = '';
		this._currentValue = '0';
		this._operation = '';
	}

	delete() {}

	appendNumber(number) {
		if (this._currentValue === '0') {
			this._currentValue = '';
		}

		this._currentValue += number;
	}

	chooseOperation(operation) {
		this.operation = operation;
		this._prevValue = this._currentValue;
		this._currentValue = '';
	}

	calculate() {}

	updateDisplay() {
		this.currentInput.innerText = this._currentValue;
		this.prevInput.innerText = this._prevValue;
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
