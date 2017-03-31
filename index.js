var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');

const outputFile = 'detail2.css';
const inputFile = 'detail1.css';
const unused_cssFile = 'unused_detail.txt';

var contents = file.readFileSync(path.join(__dirname, inputFile),{ encoding: 'utf8' });

// console.log(contents);
contents = removeComments(contents);
// file.fs.writeFileSync(path.join(__dirname, 'isd2.css'), contents, { encoding: 'utf8' });

function removeComments(contents){
  return contents.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,'');
}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(path.join(__dirname, unused_cssFile))
});
///\*[^*\/]*\*/
///\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/
lineReader.on('line', function (line) {
  var originLine = line;
  // console.log('Line from file:', line);
  //^[.\w\- \[\='\]\:>]*,
  var reg1 = new RegExp('^[.\\w\\- \\[\\=\'\\]\\:>]*,','g');
  if(reg1.test(line)){//end ,
    // console.log('RegExp found! RegExp:'+reg1+'  line:'+line);
    line = line.replace(/\./g,'\\.').replace(/\[/g,'\\[').replace(/\]/g,'\\]').replace(/^ /,'').replace(/[ ]*>[ ]*/g,'[ ]*>[ ]*').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
    var regTemp = new RegExp('[\\r\\n][\\s\\b]*'+line,'g');
    if(!regTemp.test(contents)){
      console.log('error! regTemp:'+regTemp);
    }
    contents = contents.replace(regTemp, 'hahahahahaha');
    // file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
    return;
  }
  // if(line == '.lfTipStrip,'){
  //   console.log();
  // }
  line = line.replace(/\./g,'\\.').replace(/\[/g,'\\[').replace(/\]/g,'\\]').replace(/^ /,'').replace(/[ ]*>[ ]*/g,'[ ]*>[ ]*').replace(/\(/g,'\\(').replace(/\)/g,'\\)');

  //,[\r\n]
  
  var reg = new RegExp(',[\\r\\n]' + line);
  // console.log(reg);
  if(reg.test(contents)){//before ,
    // var regTemp = new RegExp('^'+line,'g');
    contents = contents.replace(reg, 'hahahahahaha');
    return;
  }

  var reg2 = new RegExp('[\\r\\n]' + line + '[\\s]*{[\\r\\n\\w\\s\\b:\\-%"\\\\;#\\.\'\\(\\),/*+=\!]*}','g');
  if(!reg2.test(contents)){
    console.log('RegExp not found! :'+reg2 +' originLine:'+originLine);
    // lineReader.close();
    return;
  }else{
    contents = contents.replace(reg2, 'hahahahahaha');
  }
  //,[\r\n]$
  //[\r\n]  [\s]*{[\r\n\w\s\b:\-%"\\;#]*}
});

lineReader.on('close',function(){
  console.log('closed');

  file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
});

