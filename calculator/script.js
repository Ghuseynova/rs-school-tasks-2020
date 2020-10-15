class Calculator {
	constructor(currentInput, prevInput) {
		this.currentInput = currentInput;
		this.prevInput = prevInput;

		this.clear();
	}

	_getDisplayNumber(number) {
		const stringNumber = number.toString();

		if (stringNumber !== '') {
			if (stringNumber.includes('.')) {
				return `${parseFloat(stringNumber.split('.')[0]).toLocaleString(
					'en'
				)}.${stringNumber.split('.')[1]}`;
			} else {
				return parseFloat(stringNumber).toLocaleString('en');
			}
		} else {
			return number;
		}
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
		if (this.hasCalculated) {
			this._currentValue = '';
		}

		this._currentValue += number;
	}

	chooseOperation(operation) {
		if (this._currentValue === '') return;
		if (this._prevValue !== '') {
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

		switch (operation) {
			case '/':
				result = prevValue / currentValue;
				break;
			case '*':
				result = prevValue * currentValue;
				break;
			case '+':
				if (
					prevValue.toString().includes('.') &&
					currentValue.toString().includes('.')
				) {
					result = (prevValue * 10 + currentValue * 10) / 10;
				} else {
					result = prevValue + currentValue;
				}

				break;
			case '-':
				result = prevValue - currentValue;
				break;
			case 'sqr':
				result = currentValue * currentValue; // currentValue**2 --- Math.pow(currentValue, 2);
				break;
			case 'sqrt':
				if (currentValue < 0) {
					result = 'Invalid data entered';
				} else {
					result = Math.sqrt(currentValue);
				}

				break;
			default:
				return;
		}

		this._currentValue = result;
		this._prevValue = '';
		this._operation = undefined;
		this.hasCalculated = true;
	}

	updateDisplay() {
		this.currentInput.innerText = this._getDisplayNumber(this._currentValue);

		if (this._operation !== undefined) {
			this.prevInput.innerText = `${this._getDisplayNumber(this._prevValue)} ${
				this._operation
			}`;
		} else {
			this.prevInput.innerText = '';
		}
	}

	addDecimal() {
		if (this._currentValue.includes('.')) return;

		if (this._currentValue !== '') {
			this._currentValue = `${this._currentValue}.`;
		} else {
			this._currentValue = '0.';
		}
	}

	addNegativeSign() {
		if (this._currentValue === '') return;
		this._currentValue = parseFloat(this._currentValue) * -1;
	}
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

numberBtns.forEach((numBtn) => {
	numBtn.addEventListener('click', (e) => {
		const number = e.target.dataset.value;

		calculator.appendNumber(number);
		calculator.updateDisplay();
	});
});

operationBtns.forEach((operationBtn) => {
	operationBtn.addEventListener('click', (e) => {
		e.stopPropagation();
		const operation = e.target.dataset.value;

		calculator.chooseOperation(operation);
		calculator.updateDisplay();
	});
});

clearBtn.addEventListener('click', (e) => {
	calculator.clear();
	calculator.updateDisplay();
});

delBtn.addEventListener('click', (e) => {
	calculator.delete();
	calculator.updateDisplay();
});

decimalBtn.addEventListener('click', (e) => {
	calculator.addDecimal();
	calculator.updateDisplay();
});

negPosBtn.addEventListener('click', (e) => {
	calculator.addNegativeSign();
	calculator.updateDisplay();
});

equalsBtn.addEventListener('click', (e) => {
	calculator.calculate();
	calculator.updateDisplay();
});
