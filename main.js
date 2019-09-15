const displayOutput = document.querySelector(".converter__output");
const displayInput = document.querySelector(".converter__input-text");

const selectInput = document.querySelector(".converter__types-input");
const selectOutput = document.querySelector(".converter__types-output");
const digits = document.querySelectorAll(".converter__digit");

const buttonClear = document.querySelector(".converter__buttons-clear");
const buttonDelete = document.querySelector(".converter__buttons-delete");
const buttonEquals = document.querySelector(".converter__buttons-equals");

let input = "";
let currentInputType = selectInput.options[selectInput.selectedIndex].value;

const clickDigit = digit => {
	input += digit;
	displayInput.innerHTML = input;
};

const clearDigits = () => {
	input = "";
	displayInput.innerHTML = "0";
	displayOutput.innerHTML = "0";
};

const deleteDigit = () => {
	input = input.substring(0, input.length - 1);
	displayInput.innerHTML = input || "0";
};

const updateOutput = () => {
	const inputType = selectInput.options[selectInput.selectedIndex].value;
	const outputType = selectOutput.options[selectOutput.selectedIndex].value;
	let output = "";

	if (inputType === "binary") {
		if (outputType === "binary") {
			output = input;
		}
		else if (outputType === "decimal") {
			output = binaryToDecimal(input);
		}
		else if (outputType === "hexadecimal") {
			output = binaryToHex(input);
		}
	}
	else if (inputType === "decimal") {
		if (outputType === "decimal") {
			output = input;
		}
		else if (outputType === "binary") {
			output = decimalToBinary(input);
		}
		else if (outputType === "hexadecimal") {
			output = decimalToHex(input);
		}
	}
	else if (inputType === "hexadecimal") {
		if (outputType === "hexadecimal") {
			output = input;
		}
		else if (outputType === "binary") {
			output = hexToBinary(input);
		}
		else if (outputType === "decimal") {
			output = hexToDecimal(input);
		}
	}

	if (outputType === "binary") {
		const formattedOutput = [];
		for (let i = output.length; i >= 0; i -= 4) {
			formattedOutput.unshift(output.substring(i - 4, i));
		}
		displayOutput.innerHTML = formattedOutput.join(" ") || "0";
	}
	else {
		displayOutput.innerHTML = output || "0";
	}
};

const updateInput = newInputType => {
	updateDigits(newInputType);

	if (currentInputType === "binary") {
		if (newInputType === "decimal") {
			input = binaryToDecimal(input);
		}
		else if (newInputType === "hexadecimal") {
			input = binaryToHex(input);
		}
	}
	else if (currentInputType === "decimal") {
		if (newInputType === "binary") {
			input = decimalToBinary(input);
		}
		else if (newInputType === "hexadecimal") {
			input = decimalToHex(input);
		}
	}
	else if (currentInputType === "hexadecimal") {
		if (newInputType === "binary") {
			input = hexToBinary(input);
		}
		else if (newInputType === "decimal") {
			input = hexToDecimal(input);
		}
	}

	if (input === "0") input = "";
	displayInput.innerHTML = input || 0;
	currentInputType = newInputType;
};

const updateDigits = type => {
	if (type === "binary") {
		digits.forEach((digit, index) => {
			if (index > 1) digit.classList.add("converter__digit--hidden");
		});
	}
	if (type === "decimal") {
		digits.forEach((digit, index) => {
			if (index > 9) digit.classList.add("converter__digit--hidden");
			else digit.classList.remove("converter__digit--hidden");
		});
	}
	if (type === "hexadecimal") {
		digits.forEach(digit => {
			digit.classList.remove("converter__digit--hidden");
		});
	}
};

digits.forEach(digit => digit.onclick = e => clickDigit(e.target.name));
buttonClear.onclick = clearDigits;
buttonDelete.onclick = deleteDigit;
buttonEquals.onclick = updateOutput;

window.onload = () => updateDigits(currentInputType);

window.addEventListener('keydown', e => {
	if (e.key === "0" || e.key === "1") clickDigit(e.key);
	else if (e.key >= 2 && e.key <= 9 && currentInputType !== "binary") clickDigit(e.key);
	else if (e.key.match(/^[abcdef]$/) && currentInputType === "hexadecimal") clickDigit(e.key.toUpperCase());
	else if (e.key === "Backspace") deleteDigit();
	else if (e.key === "Escape") clearDigits();
	else if (e.key === "Enter") {
		e.preventDefault();	// Stops enter from inputing digits
		updateOutput();
	}
});
