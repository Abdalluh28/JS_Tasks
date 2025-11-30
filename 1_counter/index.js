const counterDisplay = document.getElementsByClassName('counter')[0];
const maximumDisplay = document.getElementsByClassName('maximum-value')[0]
const inputDisplay = document.getElementsByClassName('input-maximum')[0]


let increase = () => {
    let currValue = parseInt(counterDisplay.innerText);
    let maxValue = parseInt(maximumDisplay.innerText);
    if (isNaN(maxValue) || currValue < maxValue) {
        counterDisplay.innerText = currValue + 1
    }
}


let decrease = () => {
    let currValue = parseInt(counterDisplay.innerText)
    if (currValue > 0) {
        counterDisplay.innerText = currValue - 1
    }
}


let reset = () => {
    counterDisplay.innerText = 0;
}



let setMaximum = () => {
    const inputValue = parseInt(inputDisplay.value)
    maximumDisplay.innerText = inputValue
    inputDisplay.value = '';

    const currValue = parseInt(counterDisplay.innerText)
    if (currValue > inputValue) {
        counterDisplay.innerText = inputValue
    }
}


document.getElementsByClassName('btn-increase')[0].addEventListener('click', increase);
document.getElementsByClassName('btn-decrease')[0].addEventListener('click', decrease)
document.getElementsByClassName('btn-reset')[0].addEventListener('click', reset)
document.getElementsByClassName('btn-set-maximum')[0].addEventListener('click', setMaximum)