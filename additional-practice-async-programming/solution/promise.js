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


const login = () => {
	waitForAPI('waiting for login...');
	const url = apis.serverAddress + apis.loginAPI;
	return axios.get(url);
}

const getOrganizations = () => {
	waitForAPI('waiting for getting organizations...');
	const url = apis.serverAddress + apis.organizations;
	return axios.get(url);
}

const getOrganizationDetailsById = (id) => {
	waitForAPI('waiting for getting organization by Id...' + id);
	const url = `${apis.serverAddress}${apis.organizations}/${id}`
	// console.log('url--?', url);
	return axios.get(url);
}

const getUsetDetailsById = (orgId) => {
	waitForAPI('waiting for getting User by organization details...');
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	return axios.get(url);
}


// const loginPromise = login();
// loginPromise.then(successHandler, errorHandler);

// const OrganizationsPromise = getOrganizations();
// OrganizationsPromise.then(successHandler,errorHandler);

// const OrganizationPromise = getOrganizationDetailsById(1);
// const usersPromise = getUsetDetailsById(1);

// // Resolve them on your mood
// usersPromise.then(successHandler, errorHandler);
// OrganizationPromise.then(successHandler,errorHandler);



/**
    Requirement: If user is loggedIn, get all users of first orgnization from the response of organizations apis

*/ 


const getUSersOfFirstORganizations = () => {
	login()
		.then( (loginData) => {
			return getOrganizations();
		})
		.then( (organizations) => {
			return getOrganizationDetailsById(organizations.data[0].id);
		})
		.then( (orgnizationDetails) => {
			return getUsetDetailsById(orgnizationDetails.data[0].id);
		})
		.then( (users) => {
			console.log('user details-->', users.data);
		})
		.catch( (error) => {
			errorHandler(error);
		})


}
getUSersOfFirstORganizations();