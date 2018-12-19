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



const getOrganizationsDetails = () => {
	waitForAPI('receiving organizations...');
	const url = apis.serverAddress + apis.organizations;
	return axios.get(url)
		.then((organizations) => {
			waitForAPI(`receiving organization details for id=${organizations.data[0].id}...`);
			return getOrganizationDetailsById(organizations.data[0].id).then( (organization) => {

				return organization;
			}, (error) => {

			})
		}, (error) => {

		})
}


const getUserDetails = () => {
	getOrganizationsDetails().then( (res) => {
		console.log(`organizations resposnse ${res}`);
		getUsetDetailsById(res.id).then( (res2) => {
			console.log('User Details-->', res2.data);
		})
	})
}


const login = () => {
	waitForAPI('waiting for login...');
	const url = apis.serverAddress + apis.loginAPI;
	axios.get(url)
		.then(successHandler, errorHandler)
}

const getOrganizations = () => {
	waitForAPI('waiting for getting organizations...');
	const url = apis.serverAddress + apis.organizations;
	axios.get(url)
		.then(successHandler, errorHandler)
}

const getOrganizationDetailsById = (id) => {
	waitForAPI('waiting for getting organization by Id...' + id);
	const url = `${apis.serverAddress}${apis.organizations}/${id}`
	return axios.get(url).then(successHandler, errorHandler);
}

const getUsetDetailsById = (orgId) => {
	waitForAPI('waiting for getting User by organization details...');
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	return axios.get(url).then(successHandler, errorHandler)
}

// These functions call the single API with no dependency
// login();

// getOrganizations();

// getOrganizationDetailsById(1);

// getUsetDetailsById(1);


//These functionns data depends upon response of previous sync calls and they are
// forming callback hell

// getOrganizationsDetails();
// getUserDetails();
