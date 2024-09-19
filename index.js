// const fs = require("fs");
const path = require("path");
// const xlsx = require("xlsx");
// const csv = require("csv-parser");

// ** JOIN - Склеивает участки пути ** \\
const joinFn = path.join(__dirname, `first`, `second`);

// ** resolve - получаем абсолютный путь ** \\
console.log(path.resolve(__dirname, `first`, `second`));

// парсинг пути
console.log(path.parse(joinFn));
