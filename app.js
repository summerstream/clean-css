var path = require('path');
var file = require('file-system');
var util = require('utils-extend');
var fs = require('fs');
var css = require('css');

const outputFile = 'detail2.css';
const inputFile = 'detail1.css';
const unused_cssFile = 'unused_detail.txt';

const replacement = '';

var rules = getRules();

var map = array2Map(rules);

function array2Map(array){
    var map = {};
    array.forEach(function(key){
        map[key] = key;
    });
    return map;
}

function getRules(){
    var content = file.readFileSync(path.join(__dirname, unused_cssFile),{ encoding: 'utf8' });
    var rules = content.split(/[\s\r\n]*[\r\n\,]+[\s\r\n]*/);
    return rules;
}
