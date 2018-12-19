
/*
@params: array-> Array of Elements
@Params: callback-> Hanlder to be called on iteration
*/


function validateInputs() {

}

function forEach(callback){

	if(this == null) {
		console.error('forEach of undefined');
	}

	if(!callback) {
		console.error('callback is not defined');
	}

	
	let copyOfArray =  Object(this);
	let lengthOfArray = copyOfArray.length;
	let i = 0;
	while(i < lengthOfArray) {
		
		if(copyOfArray.length > i) {
			callback.call(this, copyOfArray[i], i, copyOfArray); // We need to pass contex, value, index, original Array to callback
		}

		i++;
	}
}

Array.prototype.forEach = forEach;

let warriors = [];

let defineOriginalArray = () => {

	warriors = ['Yudhisthir', 'Bhim', 'Arjun', 'Nakul', 'Sahdev']
}

let printAllElement = () => {
	warriors.forEach(function(warrior, index) {
		console.log('warrior-->', warrior);
	});

}


let shiftArrayIfBhimIsPresent = () => {
	warriors.forEach(function(warrior, index) {
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
