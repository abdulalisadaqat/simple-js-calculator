const clearButton = document.querySelector("input#clear");
const backspaceButton = document.querySelector("input#backspace");
const numberButtons = document.querySelectorAll(
	".calc-body input:not(#clear, #backspace, #negate, #calculate)"
);
const operationButtons = document.querySelectorAll(
	".calc-body .operations input:not(#calculate), .calc-body .clear-and-moldevision input[value='%']"
);
const calculateButton = document.querySelector("input#calculate");
const result = document.querySelector("#result");

const operators = ["+", "-", "*", "/", "%"];
let operator = "";

function isOperator(value) {
	return operators.includes(value);
}

function appendValue(value) {
	if (!result) return;

	if (isOperator(value)) {
		const lastChar = result.value.slice(-1);
		const hasNumberBefore = result.value && !isOperator(lastChar);
		const hasOperatorAlready = /[+\-*/%]/.test(result.value.slice(-1));
		if (!result.value || !hasNumberBefore || hasOperatorAlready) {
			return;
		}
		operator = value;
		result.value += value;
		return;
	}

	if (value === ".") {
		const lastChar = result.value.slice(-1);
		const currentPart = result.value.split(/[+\-*/%]/).pop();
		if (currentPart && currentPart.includes(".")) {
			return;
		}
		if (!result.value || isOperator(lastChar)) {
			result.value += "0.";
			return;
		}
	}

	if (result.value === "0" && !isOperator(value) && value !== ".") {
		result.value = value;
		return;
	}

	result.value += value;
}

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendValue(button.value);
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		appendValue(button.value);
	});
});

if (clearButton) {
	clearButton.addEventListener("click", () => {
		result.value = "";
		operator = "";
	});
}

if (backspaceButton && result) {
	backspaceButton.addEventListener("click", () => {
		if (result.value) {
			result.value = result.value.slice(0, -1);
		}
	});
}

if (calculateButton && result) {
	calculateButton.addEventListener("click", () => {
		if (!operator || !result.value.includes(operator)) {
			return;
		}

		const [leftValue, rightValue] = result.value.split(operator);
		if (!leftValue || !rightValue || rightValue === "") {
			return;
		}

		const firstNumber = Number(leftValue);
		const secondNumber = Number(rightValue);

		if (Number.isNaN(firstNumber) || Number.isNaN(secondNumber)) {
			return;
		}

		switch (operator) {
			case "+":
				result.value = firstNumber + secondNumber;
				break;
			case "-":
				result.value = firstNumber - secondNumber;
				break;
			case "*":
				result.value = firstNumber * secondNumber;
				break;
			case "/":
				if (secondNumber === 0) {
					alert("can not divide by zero!");
					return;
				}
				result.value = firstNumber / secondNumber;
				break;
			case "%":
				if (secondNumber === 0) {
					alert("can not divide by zero!");
					return;
				}
				result.value = firstNumber % secondNumber;
				break;
			default:
				return;
		}

		operator = "";
	});
}

const themeButton = document.querySelector("#change-theme");
const heading = document.querySelector("h4");
const resultInput = document.querySelector(".display input");

let theme = localStorage.getItem("saved_theme") || "dark";
localStorage.setItem("saved_theme", theme);

setTheme(theme);

if (themeButton) {
	themeButton.addEventListener("click", function () {
		theme = theme === "light" ? "dark" : "light";
		setTheme(theme);
		localStorage.setItem("saved_theme", theme);
	});
}

function setTheme(themeValue) {
	document.body.setAttribute("data-theme", themeValue);

	if (themeButton) {
		themeButton.style.color = themeValue === "light" ? "#111" : "#fff";
		themeButton.style.backgroundColor =
			themeValue === "light" ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.06)";
	}

	if (heading) {
		heading.style.color = themeValue === "light" ? "#111" : "#fff";
	}

	if (resultInput) {
		resultInput.style.color = themeValue === "light" ? "#111" : "#fff";
	}
}
