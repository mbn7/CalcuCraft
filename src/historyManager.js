/**
 * Filename: historyManager.js
 * Author: mbn7
 * Date: 2023-07-10
 * Description: Manages the history of calculations. This includes displaying the history, clearing the history, and handling clicks on history items.
 * Version: 1.0.0
 * License: MIT
 */
'use strict';

const popupHistoryBox = document.getElementById('popupHistoryBox');
const currentCalElement = document.getElementById('currentCal');
const resultCalElement = document.getElementById('resultCal');

/**
 * Shows or hides the history popup.
 * 
 * @param {boolean} status - The status to set for the history popup.
 */
export function setPopupHistory(status){
    popupHistoryBox.style.display = status ? 'block' : 'none';
    displayHistory();
}

/**
 * Updates the history display in the popup.
 */
function displayHistory() {

    let popupHistoryContent = document.getElementById('popupHistoryText');

    let historyCookie = getCookie('historyCal');
    historyCookie = historyCookie.substring(0, historyCookie.length - 1);
    if (historyCookie == '') {
        popupHistoryContent.innerHTML = ' -- empty -- ';
    } else {
        // Getting the cookie data and splitting it into an array
        let val = historyCookie.split(':');

        // Creating HTML elements for each data item and defining the event handler
        let item = [];
        for (let i = 0; i < val.length; i++) {
            let div = document.createElement('div');
            div.textContent = val[i];
            div.setAttribute('data-index', i);
            div.classList.add('divReuse');
            div.addEventListener('click', handleDataClick);
            item.push(div);
        }

        // Displaying the HTML elements in the History Text popup element
        popupHistoryContent.innerHTML = '';
        item.forEach(element => {
            popupHistoryContent.appendChild(element);
        });

    }
}

/**
 * Clears the history cookie.
 */
export function clearHistory() {
    document.cookie = 'historyCal=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    popupHistoryText.innerHTML = ' -- empty -- ';
}

/**
 * Sets a cookie with an expiry time and the calculation result.
 * 
 * @param {number} x_days - The number of days until the cookie expires.
 * @param {string} currentResult - The calculation result to store in the cookie.
 */
export function setCookie(x_days, currentResult) {
    // get current value on cookie
    let cdata = getCookie('historyCal');
    // get current operation + result
    let lastR = currentCalElement.innerHTML + ' = ' + currentResult;
    cdata += lastR + ' : ';
    cdata = encodeURIComponent(cdata);
    const d = new Date();
    d.setTime(d.getTime() + (x_days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = "historyCal=" + cdata + ";" + expires + ";path=/";
}

/**
 * Gets a cookie by name.
 * 
 * @param {string} cname - The name of the cookie.
 * @returns {string} - The cookie value.
 */
export function getCookie(cname) {
    let name = cname + "=";
    let ca = decodeURIComponent(document.cookie).split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Handles clicks on items in the history. 
 * Displays the calculation and result in the calculator display.
 * 
 * @param {object} event - The event object from the click event.
 */
function handleDataClick(event) {
    // Retrieving the index or identifier of the data item from the data-* attribute
    let dataIndex = event.target.getAttribute('data-index');

    // Accessing specific data in array using index or identifier
    let historyCookie = getCookie('historyCal');
    let val = historyCookie.split(':');
    let [cal, result] = [val[dataIndex].split('=')[0].trim(), val[dataIndex].split('=')[1].trim()];

    currentCalElement.style.cssText = 'color: #6cacc5;';
    currentCalElement.innerHTML = cal;

    resultCalElement.classList.add("resultCal");
    resultCalElement.innerHTML = result;
}

document.getElementById('exitPopupHistory').addEventListener('click', () => setPopupHistory(false));
document.getElementById('history').addEventListener('click', () => setPopupHistory(true));
document.getElementById('clearHistory').addEventListener('click', () => clearHistory());
document.addEventListener('click', (event) => {
    if (!popupHistoryBox.contains(event.target) && event.target.id !== 'history') {
      popupHistoryBox.style.display = 'none';
    }
  });