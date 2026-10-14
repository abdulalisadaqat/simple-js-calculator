var clear = document.querySelector("input#clear");
var backspace = document.querySelector("input#backspace");
var inputs = document.querySelectorAll(
	".calc-body input:not(#clear, #backspace, #negate, #calculate)"
);
var operations = document.querySelectorAll(
	".calc-body .operations input:not(#calculate), .calc-body .clear-and-moldevision input[value='%']"
);
// var negate = document.querySelector(".calc-body .numbers input#negate");
var calculate = document.querySelector("input#calculate");
var result = document.querySelector("#result");

// ================ getting inputs ================
for (i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener("click", function () {
		result.value += this.value;
		// console.log(result.value);
	});
}

// ================ clear function ================
clear.addEventListener("click", function () {
	result.value = "";
});

// ================ backspace function ================
backspace.addEventListener("click", function () {
	if (result.value != "") {
		result.value = result.value.slice(0, -1);
	}
	// console.log(result.value);
});

// ================ operator detection ================
var operator;
operations.forEach((element) => {
	element.addEventListener("click", function () {
		operator = element.value;
		// console.log(operator);
	});
});

// ================ result calculation ================
var firstNumber;
var secondNumber;
calculate.addEventListener("click", function () {
	switch (operator) {
		// ================ case + ================
		case "+":
			var addition = result.value.split("+");
			for (i = 0; i < addition.length; i++) {
				firstNumber = Number(addition[0]);
				secondNumber = Number(addition[1]);
			}
			result.value = firstNumber + secondNumber;
			break;

		// ================ case - ================
		case "-":
			var subtraction = result.value.split("-");
			for (i = 0; i < subtraction.length; i++) {
				firstNumber = Number(subtraction[0]);
				secondNumber = Number(subtraction[1]);
			}
			result.value = firstNumber - secondNumber;
			break;

		// ================ case * ================
		case "*":
			var multiplication = result.value.split("*");
			for (i = 0; i < multiplication.length; i++) {
				firstNumber = Number(multiplication[0]);
				secondNumber = Number(multiplication[1]);
			}
			result.value = firstNumber * secondNumber;
			break;

		// ================ case / ================
		case "/":
			var division = result.value.split("/");
			for (i = 0; i < division.length; i++) {
				firstNumber = Number(division[0]);
				secondNumber = Number(division[1]);
			}
			if (secondNumber != 0) {
				result.value = firstNumber / secondNumber;
			} else {
				alert("can not divide by zero!");
			}
			break;

		// ================ case % ================
		case "%":
			var remainder = result.value.split("%");
			for (i = 0; i < remainder.length; i++) {
				firstNumber = Number(remainder[0]);
				secondNumber = Number(remainder[1]);
			}
			if (secondNumber != 0) {
				result.value = firstNumber % secondNumber;
			} else {
				alert("can not divide by zero!");
			}
			break;
	}
});

//
//
//
//
//
//
// ============== change theme ==============
var inputs_theme = document.querySelectorAll(
	".calc-body .numbers input, .display input"
);

var theme = localStorage.getItem("saved_theme");
if (theme == null) {
	theme = "light";
	localStorage.setItem("saved_theme", theme);
}
setTheme(theme);

document.querySelector("#change-theme").addEventListener("click", function () {
	theme = theme == "light" ? "dark" : "light";
	setTheme(theme);
	localStorage.setItem("saved_theme", theme);
});

function setTheme(theme) {
	if (theme == "light") {
		document.querySelector("body").style.backgroundColor = "#ffffff";
		document.querySelector("button#change-theme").style.color = "#000";
		document.querySelector("h4").style.color = "#000";

		inputs_theme.forEach((input) => {
			input.style.color = "#000";
		});
	} else {
		document.querySelector("body").style.backgroundColor = "#222222";
		document.querySelector("button#change-theme").style.color = "#fff";
		document.querySelector("h4").style.color = "#fff";

		inputs_theme.forEach((input) => {
			input.style.color = "#fff";
		});
	}
}
