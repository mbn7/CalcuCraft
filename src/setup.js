/**
 * Filename: setup.js
 * Author: mbn7
 * Date: 2023-07-10
 * Description: Sets up the environment for the calculator application - related to calculator button and key presses.
 * Version: 1.0.0
 * License: MIT
 */
'use strict';


import { setCalculator, eraseLastCharacter } from './calculationUtils.js';

document.addEventListener('DOMContentLoaded', () => {

    document.body.addEventListener('keydown', mapKeyToCalculatorButton);
    document.addEventListener('click', handleButtonClick);
    /**
 * Handles the click event on calculator buttons.
 * Determines the button clicked and calls the appropriate function based on the button's ID.
 * 
 * @param {object} event - The event object from the click event.
 */
    function handleButtonClick(event) {
        if (!event.target.matches('button')) return;

        if (event.target.classList[0] === 'erase') return;

        if (event.target.id == 'clear') window.location.reload();

        setCalculator(event.target.id);
    }

    /**
     * Maps keyboard keys to calculator buttons.
     * Handles the keydown event and calls the appropriate function based on the pressed key.
     * 
     * @param {object} event - The event object from the keydown event.
     */
    function mapKeyToCalculatorButton(event) {
        const validNumbers = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
        const validOperators = new Set(['*', '+', '-', '.', '/', '%']);

        const key = event.key;
        const keyCode = event.code;

        if (validNumbers.has(key) || validOperators.has(key)) {
            setCalculator(key);
        }
        else if (keyCode === 'Enter' || keyCode === 'NumpadEnter') {
            setCalculator('=');
        }
        else if (keyCode === 'Backspace') {
            eraseLastCharacter();
        }
        else if (keyCode === 'Equal') {
            if (event.shiftKey) {
                setCalculator('+');
            } else {
                setCalculator('=');
            }
        }
        else if (keyCode.startsWith('Numpad')) {
            const numPadKey = key.slice(-1);
            if (validNumbers.has(numPadKey) || validOperators.has(numPadKey)) {
                setCalculator(numPadKey);
            }
        }
    }

});