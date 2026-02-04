let currentInput = '';

function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').innerText = currentInput;
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('display').innerText = '0';
}

function calculate() {
    try {
        const result = eval(currentInput);
        document.getElementById('display').innerText = result;
        currentInput = result.toString();
    } catch (error) {
        document.getElementById('display').innerText = 'Error';
        currentInput = '';
    }
}
