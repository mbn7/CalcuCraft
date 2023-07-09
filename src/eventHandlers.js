/**
 * Filename: eventHandlers.js
 * Author: mbn7
 * Date: 2023-07-10
 * Description: Contains the functions that handle button clicks and key presses.It includes functions for handling numbers, operators, decimal points, and the equals sign. 
 * Version: 1.0.0
 * License: MIT
 */
'use strict';


import { calculateExpression } from './calculationUtils.js';
import { setCookie } from './historyManager.js';
import { setBorderColorOperator } from './domUtils.js';

let currentResult = '';
let isNewValue = false; // Flag to track if a new value is being entered after displaying a previous result

const currentCalElement = document.getElementById('currentCal');

/**
 * Handles the input of numbers into the calculator.
 * 
 * @param {string} num - The number input to the calculator.
 */
export function handleNumber(num) {

    setBorderColorOperator(num, false);

    if (isNewValue) {
        currentCalElement.innerHTML = '';
        isNewValue = false;
    }

    const currentCalText = currentCalElement.innerHTML.trim();

    // replace the 0 by the new value
    if (currentCalText === '0') {
        currentCalElement.innerHTML = num;
    } else {
        // add the the new value to the current value
        currentCalElement.innerHTML += num;
    }
}

/**
 * Handles the input of decimal points into the calculator.
 * 
 */
export function handleDot() {

    // after results (on "0." requested)
    if (isNewValue) {
        currentCalElement.innerHTML = '0.';
        isNewValue = false;
        return;
    }

    const arrCalElement = currentCalElement.innerHTML.split(' ');

    // avoid adding more than 1 dot on formulation-number 
    if (!arrCalElement[arrCalElement.length - 1].includes('.')) {

        // adding dot during the formulation-number (or at the first value)
        if (!/[+\-*%/]/.test(currentCalElement.innerHTML.trim().slice(-1)) || currentCalElement.innerHTML == '0') {
            currentCalElement.innerHTML += '.';
        }

        // adding dot at the beginning of the formulation-number
        if (/[+\-*%/]/.test(currentCalElement.innerHTML.trim().slice(-1))) {
            currentCalElement.innerHTML += '0.';
        }
    }
}

/**
 * Handles the input of operators into the calculator.
 * 
 * @param {string} operator - The operator input to the calculator.
 */
export function handleOperator(operator) {

    setBorderColorOperator(operator, true);
    const currentCalText = currentCalElement.innerHTML.trim();

    // not finish the operation                                                     // not operates on 0 value
    if ((currentCalText.length > 1 && currentCalText === '=') || (currentCalText == "0" || currentCalText == "0.")) {
        return;
    }


    if (isNewValue) {
        currentCalElement.innerHTML = currentResult;
        isNewValue = false;
    }

    if (operator === '=') {
        handleEqual();
    } else if (/[+\-*%/]/.test(currentCalText.slice(-1))) {
        replaceOperator(operator);
    } else {
        setOperator(operator);
    }
}

export function setOperator(element) {
    currentCalElement.innerHTML += ' ' + element+ ' ';
}

/**
 * Handles the input of operators into the calculator.
 * 
 * @param {string} operator - The operator input to the calculator.
 */
export function replaceOperator(element) {
    currentCalElement.innerHTML = currentCalElement.innerHTML.trim().slice(0, -1);
    currentCalElement.innerHTML += element + ' ';
}

/**
 * Handles the equals button press, evaluates the current expression.
 */
export function handleEqual() {
    const currentCalText = currentCalElement.innerHTML.trim();

    if (currentCalText === currentResult) {
        return;
    }

    let resultElement = document.getElementById('resultCal');

    resultElement.classList.remove('resultCal');
    void resultElement.offsetWidth;
    resultElement.classList.add('resultCal');

    currentResult = calculateExpression(currentCalText);
    resultElement.innerHTML = currentResult;
    resetData();
}

/**
 * Resets the data after calculating the result.
 * Clears the calculator display and sets the isNewValue flag to true.
 */
function resetData() {
    setCookie(1,currentResult)
    currentCalElement.style.cssText = 'color: transparent';
    isNewValue = true;
}