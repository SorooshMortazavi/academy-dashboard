"use strict";
exports.__esModule = true;
var persianNumbers = {
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
};
function toPersianNumber(input) {
    input.split('').map(function (char) {
        return persianNumbers[char] ? persianNumbers[char] : char;
    });
}
exports["default"] = toPersianNumber;
