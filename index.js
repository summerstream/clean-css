var path = require('path');
var file = require('file-system');
var util = require('utils-extend');

var fileContent = file.readFileSync(path.join(__dirname, 'unused_css.txt'));

console.log(fileContent);