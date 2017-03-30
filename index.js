var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');

var contents = file.readFileSync(path.join(__dirname, 'isd1.css'),{ encoding: 'utf8' });

console.log(contents);

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, 'unused_css.txt'))
});

lineReader.on('line', function (line) {
  line = line.replace(/\./g,'\\.');
  console.log('Line from file:', line);
  var reg = new RegExp(line + '[\s]*{[\r\n\w\s\b:\-%"\\;]*}');
  contents = contents.replace(reg, 'hahahahahaha');

});

console.log(contents);

// file.fs.writeFileSync(filepath, contents, { encoding: 'utf8' });