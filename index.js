var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');

var contents = file.readFileSync(path.join(__dirname, 'isd1.css'),{ encoding: 'utf8' });

// console.log(contents);

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, 'unused_css.txt'))
});

lineReader.on('line', function (line) {
  line = line.replace(/\./g,'\\.').replace(/\[/g,'\\[').replace(/\]/g,'\\]');
  console.log('Line from file:', line);
  var reg = new RegExp(line + '[\\s]*{[\\r\\n\\w\\s\\b:\\-%"\\\\;]*}','g');
  contents = contents.replace(reg, 'hahahahahaha');

});

lineReader.on('close',function(){
  console.log(contents);

  file.fs.writeFileSync(path.join(__dirname, 'isd2.css'), contents, { encoding: 'utf8' });
});

