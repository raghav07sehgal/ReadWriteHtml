const fs = require('fs');
let dir = "./files";
let dirBuf = Buffer.from(dir);
var filesName = fs.readdirSync(dir);
console.log(filesName);
if (filesName) {
	for (let i = 0; i < filesName.length; i++) {
		let dirPath = dir + "/" + filesName[i];
		console.log("fileName" + filesName[i] + "\n");
		var filesData = fs.readFileSync(dirPath, 'UTF8');
		debugger
		console.log(filesData);
		if (filesData) {
			//even content
			let searchEvenString = "<footer.*>.*\n<p.*>.*[02468]</p>";
			var chckEvenContent = filesData.search(searchEvenString);
			debugger
			if (chckEvenContent != -1) {
				let addString = 'data-align="left" ';
				var updatedContent = insertString(filesData, addString);
				debugger
				if (updatedContent) {
					var data = updatedContent;
					fs.writeFileSync("output/even/" + filesName[i], data);
				}
			}
			//odd content
			let searchOddString = "<footer.*>.*\n<p.*>.*[13579]</p>";
			var chckOddContent = filesData.search(searchOddString);
			if (chckOddContent != -1) {
				let addString = 'data-align="right" ';
				var updatedContent = insertString(filesData, addString);
				debugger
				if (updatedContent) {
					var data = updatedContent;
					fs.writeFileSync("output/odd/" + filesName[i], data);
				}
			}
			//neither even nor odd
			if (chckEvenContent == -1 && chckOddContent == -1) {
				let addString = 'data-align="center" ';
				var updatedContent = insertString(filesData, addString);
				debugger
				if (updatedContent) {
					var data = updatedContent;
					fs.writeFileSync("output/" + filesName[i], data);
				}
			}
		}
	}

}

function insertString(a, b) {
	let substrPos = filesData.indexOf('lang="en-US">');
	let altSubString = filesData.indexOf('enumeration=""');
	if (substrPos !== -1) {
		return a.substr(0, substrPos) + b + a.substr(substrPos);
	} else
		if (altSubString !== -1) {
			return a.substr(0, altSubString) + b + a.substr(altSubString);
		}

	return "substring not found";
}
