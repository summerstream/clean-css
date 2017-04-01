var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');

const outputFile = 'detail2.css';
const inputFile = 'detail1.css';
const unused_cssFile = 'unused_detail.txt';

const replacement = '';

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

lineReader.on('line', function (line) {
  var originLine = line;
  // if( /\.isdbookingnov \.noticeIcon:before/.test(originLine)){
  //   console.log();
  // }

  var reg1 = new RegExp('^[.\\w\\- \\[\\=\'\\]\\:>]*,','g');
  if(reg1.test(line)){//end ,
    // console.log('RegExp found! RegExp:'+reg1+'  line:'+line);
    line = line.replace(/\./g,'\\.').replace(/\[/g,'\\[').replace(/\]/g,'\\]').replace(/^ /,'').replace(/[ ]*>[ ]*/g,'[ ]*>[ ]*').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
    var regTemp = new RegExp('[\\r\\n][\\s\\b]*'+line,'g');
    if(!regTemp.test(contents)){
      console.log('error! regTemp:'+regTemp);
    }
    contents = contents.replace(regTemp, replacement);
    file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
    return;
  }

  //if end with ',' match , then delete it with ','
  line = line.replace(/\./g,'\\.').replace(/\[/g,'\\[').replace(/\]/g,'\\]').replace(/^ /,'').replace(/[ ]*>[ ]*/g,'[ ]*>[ ]*').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
  var regTemp = new RegExp('[\\r\\n][\\s\\b]*'+line+'[\\s\\b]*,','g');
  if(regTemp.test(contents)){
    console.log('end with \',\'  originLine:'+originLine);
    contents = contents.replace(regTemp, replacement);
    file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
    // return;
  }
  
  // if(originLine == '.car-index .clu li:before'){
  //   console.log();
  //   file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
  // }
  // line = line.replace(/\./g,'\\.').replace(/\[/g,'\\[').replace(/\]/g,'\\]').replace(/^ /,'').replace(/[ ]*>[ ]*/g,'[ ]*>[ ]*').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
  
  //',' lies  before
  var reg = new RegExp(',[\\r\\n]*' + line + '[\\s]*[,{]','g');
  if(reg.test(contents)){
    var regTemp = new RegExp(',[\\r\\n]*' + line + '[\\s]*[,]*','g');
    contents = contents.replace(regTemp, replacement);
    file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
    // return;
  }
  var reg2 = new RegExp('[\\r\\n]' + line + '[\\s]*{[\\r\\n\\w\\s\\b:\\-%"\\\\;#\\.\'\\(\\),/*+=\!]*}','g');
  if(!reg2.test(contents)){
    console.log('RegExp not found! :'+reg2 +' originLine:'+originLine);
    return;
  }else{
    contents = contents.replace(reg2, replacement);
  }
});

lineReader.on('close',function(){
  console.log('closed');

  file.fs.writeFileSync(path.join(__dirname, outputFile), contents, { encoding: 'utf8' });
});

