/**
 * Filename: calculationUtils.js
 * Author: mbn7
 * Date: 2023-07-10
 * Description: Contains functions that handle the logic of calculations.This includes erasing characters, calculating expressions, changing the border color of operators, and handling calculator input.
 * Version: 1.0.0
 * License: MIT
 */
'use strict';

import { handleNumber, handleDot, handleOperator } from './eventHandlers.js';
import { setBorderColorOperator } from './domUtils.js';

document.getElementById('erase').addEventListener('click', () => eraseLastCharacter());

/**
 * Erases the last character of the current calculation.
 */
export function eraseLastCharacter() {
  const currentCalElement = document.getElementById('currentCal');
  setBorderColorOperator('erase', false)

  if (/[+\-*%/]/.test(currentCalElement.innerHTML.trim().slice(-1))) {
    currentCalElement.innerHTML = currentCalElement.innerHTML.trim().slice(0, -1).trim();
  } else {
    currentCalElement.innerHTML = currentCalElement.innerHTML.trim().slice(0, -1)
  }
  if (currentCalElement.innerHTML.length === 0 || currentCalElement.innerHTML === "0") {
    currentCalElement.innerHTML = 0;
  }
}

/**
 * Returns the result of a binary operation.
 *
 * @param {string} operator - The operator symbol.
 * @param {number} a - The first operand.
 * @param {number} b - The second operand.
 * @returns {number} - The result of the operation.
 */
function binaryOperation(operator, a, b) {
  const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
  };

  return operators[operator](a, b);
}

/**
* Returns the result of a unary operation.
*
* @param {string} operator - The operator symbol.
* @param {number} a - The operand.
* @returns {number} - The result of the operation.
*/
function unaryOperation(operator, a) {
  const operators = {
      '%': (a) => a / 100,
  };

  return operators[operator](a);
}

/**
* Performs an operation based on the operator and operands.
* 
* @param {string} operator - The operator symbol.
* @param {Array<number>} operands - The operands.
* @returns {number} - The result of the operation.
*/
function performOperation(operator, operands) {
  if (operator === '%') {
      return unaryOperation(operator, operands[0]);
  } else {
      return binaryOperation(operator, operands[1], operands[0]);
  }
}

/**
* Calculates the result of a mathematical expression.
* Uses the Shunting Yard algorithm to convert the expression to Reverse Polish Notation (RPN),
* then evaluates the RPN expression.
*
* @param {string} expression - The mathematical expression to evaluate.
* @returns {number} - The result of the mathematical expression.
*/
export function calculateExpression(expression) {
  expression = expression.replace(/%/g, " % ");

  const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '%': 3,
  };

  const tokens = expression.split(' ');

  const outputQueue = [];
  const operatorStack = [];

  for (const token of tokens) {
      if (!isNaN(parseFloat(token))) {
          outputQueue.push(parseFloat(token));
      } else if (precedence.hasOwnProperty(token)) {
          while (
              operatorStack.length > 0 &&
              precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
          ) {
              const operator = operatorStack.pop();
              let operands;
              if (operator === '%') {
                  operands = [outputQueue.pop()];
              } else {
                  operands = [outputQueue.pop(), outputQueue.pop()].reverse();
              }
              const result = performOperation(operator, operands);
              outputQueue.push(result);
          }
          operatorStack.push(token);
      }
  }

  while (operatorStack.length > 0) {
      const operator = operatorStack.pop();
      let operands;
      if (operator === '%') {
          operands = [outputQueue.pop()];
      } else {
          operands = [outputQueue.pop(), outputQueue.pop()].reverse();
      }
      const result = performOperation(operator, operands);
      outputQueue.push(result);
  }

  return outputQueue[0];
}

/**
 * Handles calculator input.
 * 
 * @param {string} value - The input to the calculator.
 */
export function setCalculator(value) {
  if (typeof value !== 'string') {
    throw new Error('Invalid input. Expected a string.');
  }
  
  document.getElementById('currentCal').style.cssText = 'color: #6cacc5;';

  // restart calculator or show the current-result \\
  if (value == 'C') window.location.reload();

  // reset the color after being 'transparent' \\
  if (!isNaN(value)) {
    handleNumber(value);
  } else if (value === '.') {
    handleDot();
    setBorderColorOperator(element, false);
  } else if (/[+\-*/%=]/.test(value)) {
    handleOperator(value);
  }
}