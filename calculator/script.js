class Calculator {
	constructor(currentInput, prevInput) {
		this.currentInput = currentInput;
		this.prevInput = prevInput;

		this.clear();
	}

	_getDisplayNumber(number) {
		const stringNumber = number.toString();

		if (stringNumber !== '' && !isNaN(stringNumber)) {
			if (stringNumber.includes('.')) {
				return `${parseFloat(stringNumber.split('.')[0]).toLocaleString(
					'ru'
				)}.${stringNumber.split('.')[1]}`;
			} else {
				return parseFloat(stringNumber).toLocaleString('ru');
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
			this.hasCalculated = false;
		}

		this._currentValue += number;
	}

	chooseOperation(operation) {
		if (this._currentValue === '' || isNaN(this._currentValue)) return;
		if (this._prevValue !== '') {
			this.calculate();
		}

		if (operation === 'sqrt') {
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

		const strPrevValue = prevValue.toString();
		const strCurrentValue = currentValue.toString();
		const dpNum1 = !!(prevValue % 1)
				? strPrevValue.length - strPrevValue.indexOf('.') - 1
				: 0,
			dpNum2 = !!(currentValue % 1)
				? strCurrentValue.length - strCurrentValue.indexOf('.') - 1
				: 0,
			multiplier = Math.pow(10, dpNum1 > dpNum2 ? dpNum1 : dpNum2),
			tempNum1 = Math.round(prevValue * multiplier),
			tempNum2 = Math.round(currentValue * multiplier);

		switch (operation) {
			case '/':
				if (tempNum2 === 0) {
					result = 'Division by zero is not possible';
				} else {
					result = tempNum1 / tempNum2;
				}

				break;
			case '*':
				result = (tempNum1 * tempNum2) / (multiplier * multiplier);

				break;
			case '+':
				result = (tempNum1 + tempNum2) / multiplier;

				break;
			case '-':
				result = (tempNum1 - tempNum2) / multiplier;

				break;
			case '^':
				result = prevValue ** currentValue; // currentValue**2 --- Math.pow(currentValue, 2);
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
		if (
			this._currentValue.toString().includes('.') ||
			isNaN(this._currentValue)
		)
			return;

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
	operationBtn.addEventListener(
		'click',
		(e) => {
			const operation = e.target.dataset.value;

			calculator.chooseOperation(operation);
			calculator.updateDisplay();
		},
		true
	);
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
