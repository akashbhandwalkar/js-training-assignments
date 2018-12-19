let warriors = [];

let defineOriginalArray = () => {

	warriors = ['Yudhisthir', 'Bhim', 'Arjun', 'Nakul', 'Sahdev']
}

let printAllElement = () => {
	warriors.forEach(function(warrior, index) { // Prints all the Element of the array
		console.log('warrior-->', warrior);
		

	});
}


let shiftArrayIfBhimIsPresent = () => {
	warriors.forEach(function(warrior, index, arrayOn) {
			if(warrior == 'Bhim') {
				warriors.shift();
			}
			console.log('warrior-->', warrior);

	});
}

let AddDuryodhanToList = () => {
	warriors.forEach(function(warrior, index) {
			if(warrior == 'Bhim') {
				warriors.push('Duryodhan');
			}
			console.log('warrior-->', warrior);
	});
}


function printProblemtStatement(info) {
	console.log(`----------------------------------------------------\n${info}\n----------------------------------------------------`);
}

printProblemtStatement('print all element, should print 5 elements');
defineOriginalArray();
printAllElement();

printProblemtStatement('Shift an array is Bhima is present in it\n Should print 4 elements');
defineOriginalArray();
shiftArrayIfBhimIsPresent();


printProblemtStatement('Add Duryodhan to the array List if \n Bhim is Present, should print 5 elements only');
defineOriginalArray();
AddDuryodhanToList();

