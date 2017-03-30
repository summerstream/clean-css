var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');

var css = file.readFileSync(path.join(__dirname, 'isd1.css'),{ encoding: 'utf8' });

console.log(css);

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, 'unused_css.txt'))
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
  var regexString = 
});

console.log(css);

// file.fs.writeFileSync(filepath, contents, { encoding: 'utf8' });