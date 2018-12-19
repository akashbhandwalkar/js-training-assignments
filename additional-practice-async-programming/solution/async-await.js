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


function handleResponse(response) {
	if(response.status === 200) {
		successHandler(response)
	} else {
		errorHandler(response);
	}
}

async function login() {
	waitForAPI('waiting for login...');
	const url = apis.serverAddress + apis.loginAPI;
	var promise =  axios.get(url);
	var result = await promise;
	handleResponse(result);
	return result;
}




async function getOrganizations() {
	waitForAPI('waiting for getting organizations...');
	const url = apis.serverAddress + apis.organizations;
	const promise = axios.get(url);
	const result = await promise;
	handleResponse(result);
	return result;
}

async function getOrganizationDetailsById(id) {
	waitForAPI('waiting for getting organization by Id...' + id);
	const url = `${apis.serverAddress}${apis.organizations}/${id}`
	const promise = axios.get(url);
	var result = await promise;
	handleResponse(result);
	return result;
}


async function getUsetDetailsById(orgId) {
	waitForAPI('waiting for getting User by organization details...');
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	const promise = axios.get(url);
	var result = await promise;
	handleResponse(result);
	return result;
}






//login();
//getOrganizations();
// getOrganizationDetailsById(1);
// getUsetDetailsById(1);


// chain of async calls


async function getUserList(){
	console.log('login...');
	let url = apis.serverAddress + apis.loginAPI;
	let promise =  axios.get(url);
	let result = await promise;
	console.log('result login==>', result.data);
	
	if(result.status != 200) {
		return 'unauthorized';
	}

	console.log('getting organizations...');
	url = apis.serverAddress + apis.organizations;
	promise = axios.get(url);
	result = await promise;

	console.log('result organizations--->', result.data);

	console.log('getting organization details...');
	url = `${apis.serverAddress}${apis.organizations}/${result.data[0].id}`
	promise = axios.get(url);
	result = await promise;

	console.log('result organization Details--->', result.data);

	console.log('getting user list...');

	url = `${apis.serverAddress}${apis.organizations}/${ result.data[0].id}/users`
	promise = axios.get(url);
	result = await promise;

	console.log('finale output-->',  result.data);


}

getUserList();