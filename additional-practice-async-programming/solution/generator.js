const axios = require('axios');
const apis = require('./../utils/config');


const successHandler = (response) => {
	console.log('successHandler-->', response.data);
	return response;
}

const errorHandler = (error) => {
	console.log('error-->', error)
}

const waitForAPI = (msg) => {
	console.log(msg);
}


function *login() {
	waitForAPI('waiting for login...');
	const url = apis.serverAddress + apis.loginAPI;
	yield axios.get(url).then( (res) => res.data);
}


const some = login();
console.log(some.next());