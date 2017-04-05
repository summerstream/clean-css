var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');
var css = require('css');

const outputFile = 'isd2.css';
const inputFile = 'isd1.css';
const unused_cssFile = 'unused_css.txt';

const replacement = '';

var rules = getRules(unused_cssFile);

var map = array2Map(rules);

var ast = getAst(inputFile);
var astOther = createEmptyAst();

var newAst = removeSelectorsFromAst(ast,map);

writeAst(newAst,outputFile);
writeAst(astOther,'test1.css');

function minifyCss(contents){
  return contents.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,'');
}

function array2Map(array){
    var map = {};
    array.forEach(function(key){
        map[key] = key;
    });
    return map;
}

function getRules(filename){
    var content = file.readFileSync(path.join(__dirname, filename),{ encoding: 'utf8' });
    content = removeBeginSpace(content);
    content = fixAttrCSS(content);
    file.fs.writeFileSync(path.join(__dirname, 'fixedAttrCSS.txt'), content, { encoding: 'utf8' });
    var rules = content.split(/[\s\r\n]*[\r\n\,]+[\s\r\n]*/);
    return rules;
}

function removeBeginSpace(s){
    return s.replace(/^ +/gm,'');
}

function fixAttrCSS(s){
    return s.replace(/^([\w\~\=\-\'\"\|\^\$\*]*])/gm,'[$1');
}

function getAst(filename){
    var content = file.readFileSync(path.join(__dirname, filename),{ encoding: 'utf8' });
    content = minifyCss(content);
    var ast = css.parse(content,{silent:true});
    return ast;
}

function removeSelectorsFromAst(ast, map) {
    var rules = ast.stylesheet.rules;
    var count1 = 0;
    var newI = 0;
    // rules.forEach(function(v,i,array){
    for (var i = 0; newI < rules.length;( i++,newI = i-count1)) {
        // newI = i-count1;
        var v = rules[i-count1];
        if (v.type == 'rule') {
            if (v.selectors.length > 0) {
                var count2 = 0;
                var newJ =0;
                // v.selectors.forEach(function(sv,si,sarray){
                for (var j = 0; newJ < v.selectors.length; (j++,newJ = j -count2)) {
                    if (map[v.selectors[newJ]]) {
                        v.selectors.splice(newJ , 1);
                        count2++;
                    }
                }
            }
            if (v.selectors.length < 1) {
                rules.splice(i - count1, 1);
                count1++;
            }
        } else {
            astOther.stylesheet.rules.push(v);
            rules.splice(i - count1, 1);
            count1++;
        }
    }
    return ast;
}

function writeAst(ast,filename){
        var code = css.stringify(ast);
        file.fs.writeFileSync(path.join(__dirname, filename), code, { encoding: 'utf8' });
}

function createEmptyAst() {
    return {
        "type": "stylesheet",
        "stylesheet": {
            "rules": []
        }
    }
}