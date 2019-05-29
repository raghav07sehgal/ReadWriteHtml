const readline = require('readline');
const fs = require('fs');
let readFileData = require("./readFiles.js")
var content = [];
var htmlCont = [];
var outputContent = [];
const testFolder = './input/';
var rl;
var fileNames = [];
debugger


fs.readdir(testFolder, (err, files) => {
	
	files.forEach(file => {
		console.log(file);
		fileNames.push(file);
		// readFileData.readData(fileNames);
	});
	debugger
	readFileData.readData(fileNames);
});

