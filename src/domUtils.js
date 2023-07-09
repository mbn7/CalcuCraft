/**
 * Filename: domUtils.js
 * Author: mbn7
 * Date: 2023-07-10
 * Description: Contains helper functions to manipulate DOM elements.
 * Version: 1.0.0
 * License: MIT
 */
'use strict';



/**
 * Updates the border color of operator buttons.
 * 
 * @param {string} element - The operator button to change border color of.
 * @param {boolean} operatorUse - Whether to change the border color.
 */
export function setBorderColorOperator(element, operatorUse) {
  if (!document.getElementById(element)) {
    console.error(`Element with id "${element}" not found`);
    return;
  }

  let operatorBtn = document.querySelectorAll('.operatorBtn');

  if (operatorUse) {
    operatorBtn.forEach(btn => btn.style.cssText = 'border-color: transparent');
    if (element !== '=') document.getElementById(element).style.cssText = 'border: solid 2px rgb(0, 4, 255);';
  } else {
    operatorBtn.forEach(btn => btn.style.cssText = 'border-color: transparent');
  }
}