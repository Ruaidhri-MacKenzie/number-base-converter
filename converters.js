const decimalToBinary = (decimalInput, binary = []) => {
	if (decimalInput === 0) return binary.join("") || "";

	binary.unshift(decimalInput % 2);
	return decimalToBinary(Math.floor(decimalInput / 2), binary);
};

const decimalDigitToHex = digit => {
	switch(digit) {
		case 10:
			return "A";
		case 11:
			return "B";
		case 12:
			return "C";
		case 13:
			return "D";
		case 14:
			return "E";
		case 15:
			return "F";
		default:
			return digit;
	}
};

const decimalToHex = (decimalInput, hex = []) => {
	if (decimalInput === 0) return hex.map(digit => decimalDigitToHex(digit)).join("") || "";

	hex.unshift(decimalInput % 16);
	return decimalToHex(Math.floor(decimalInput / 16), hex);
};


const binaryToDecimal = binaryInput => {
	const binary = binaryInput.split("");
	const bits = binary.length;
	if (bits > 0) return "" + binary.map((bit, index) => bit * (2 ** (bits - 1 - index))).reduce((acc, cur) => acc + cur);
	else return "";
	// return parseInt(binaryInput, 2);
};

const nibbleToHex = nibble => {
	// 4 bit chunk of binary
	const decimal = binaryToDecimal(nibble.join(""));
	return decimalDigitToHex(decimal);
};

const binaryToHex = binaryInput => {
	const decimal = binaryToDecimal(binaryInput);
	return decimalToHex(decimal) || "";
};


const hexDigitToDecimal = hexDigit => {
	const hexDigitInt = parseInt(hexDigit);
	if (hexDigitInt >= 0 && hexDigitInt <= 9) return hexDigitInt;
	else if (hexDigit === "A") return 10;
	else if (hexDigit === "B") return 11;
	else if (hexDigit === "D") return 13;
	else if (hexDigit === "C") return 12;
	else if (hexDigit === "E") return 14;
	else if (hexDigit === "F") return 15;
};

const hexToDecimal = hexInput => {
	const hex = hexInput.split("");
	if (hex.length > 0) return "" + hex.map((digit, index) => hexDigitToDecimal(digit) * (16 ** (hex.length - 1 - index))).reduce((acc, cur) => acc + cur);
	else return "";
	// return parseInt(hexInput, 16);
};

const hexToBinary = hexInput => {
	const decimal = hexToDecimal(hexInput);
	return decimalToBinary(decimal) || "";
};
