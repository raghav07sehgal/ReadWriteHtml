var searchApi = require('./app.js');
const readline = require('readline');
const fs = require('fs');
var content = [];
var htmlCont = [];
var outputContent = [];
const testFolder = './input';
var rl;
var fileNames = [];

exports.readData = function (data) {
	fileNames = data;
	// create instance of readline
	// each instance is associated with single input stream
	for (let i = 0; i < fileNames.length; i++) {
		rl = readline.createInterface({
			input: fs.createReadStream(testFolder + "/" + fileNames[i])
			// input: fs.createReadStream('2re_lr_j_bmxbikes_15.html')
		});

		let line_no = 0;
		// event is emitted after each line
		rl.on('line', function (line) {
			line_no++;
			debugger
			console.log(line);
			content.push(line);
			// console.log(content);

		});

		// end
		rl.on('close', function (line) {
			console.log('Total lines : ' + line_no);
			if (content.length > 0) {
				debugger
				outputContent = [];
				filterContent(content);
			
			}
		});
	}
}

function filterContent(content) {
	htmlCont.push(content.join(''));
	let contentLen = htmlCont.length;
	// content.splice(0, contentLen - 1);
	outputContent = [];
	for (let i = 0; i < contentLen; i++) {
		let searchEvenString = "(<html.*)(>.*<head>.*)(<footer.*>.*<p.*>.*[02468]</p>)";
		let replaceEven = '$1 data-align="right"$2$3';
		var chckEvenContent = htmlCont[i].match(searchEvenString);
		if (chckEvenContent != null) {
			debugger
			let rl = readline.createInterface({
				input: fs.createReadStream('2re_lr_j_bmxbikes_15.html')
			});
			let line_no = 0;
			// event is emitted after each line
			rl.on('line', function (line) {
				line_no++;
				// console.log(line);
				outputContent.push(line);
				// console.log(content);

			});
			// end
			rl.on('close', function (line) {
				console.log('Total lines : ' + line_no);
				WriteContent(outputContent);
			});
		}
		let searchOddString = "(<html.*)(>.*<head>.*)(<footer.*>.*<p.*>.*[13579]</p>)";
		let replaceOdd = '$1 data-align="right"$2$3';
		var chckOddContent = htmlCont[i].match(searchOddString);
		if (chckOddContent != null) {

		}
	}
}

function WriteContent(outputContent) {
	debugger
	for (let i = 0; i < outputContent.length; i++) {
		var getIndex = outputContent[i].lastIndexOf('lang="en-US">');
		if (getIndex > 0) {
			break;
		}
	}
	let htmlTag = outputContent[1].toString();

	insert = function insert(main_string, ins_string, pos) {
		if (typeof (pos) == "undefined") {
			pos = 0;
		}
		if (typeof (ins_string) == "undefined") {
			ins_string = '';
		}
		return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
	}
	outputContent[1] = insert(htmlTag, 'data-align="right" ', getIndex);

	var data = outputContent;
	fs.writeFile("temp.html", data, (err) => {
		if (err) console.log(err);
		console.log("Successfully Written to File.");
	});
}