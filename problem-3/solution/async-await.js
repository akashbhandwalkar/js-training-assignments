const axios = require('axios');
const apis = require('./../utils/config');


const waitForAPI = (msg) => {
	console.log(msg);
}

async function login() {
	waitForAPI(`waiting for login...`);
	const url = apis.serverAddress + apis.loginAPI;
	var promise =  axios.get(url);
	var result = await promise;
	return result;
}


async function getOrganizations() {
	waitForAPI(`waiting for getting organizations...`);
	const url = apis.serverAddress + apis.organizations;
	const promise = axios.get(url);
	const result = await promise;
	return result;
}

async function getOrganizationDetails(id) {
	waitForAPI(`waiting for getting organization details of...${id}`);
	const url = `${apis.serverAddress}${apis.organizations}/${id}`
	const promise = axios.get(url);
	var result = await promise;
	return result.data;
}


async function getUsers(orgId, name) {
	waitForAPI(`waiting for getting User by organization ${orgId}...`);
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	const promise = axios.get(url);
	var result = await promise;
	return { name: name, users: result.data};
}

const userMap = new Map();

mapTheUsers = (organizations) => {
	organizations.map( (organization) => {
		const { name, users } = organization;
		userMap.set(name, users);	
	});
	handleUsers();
}

const handleUsers = () => {
	console.log('-------------------------------------------------------------');
	console.log('userMap-->', userMap);
	console.log('-------------------------------------------------------------');
}


async function getUserList(){

	// Calling Login
	console.log('login...');
	let url = apis.serverAddress + apis.loginAPI;
	let promise =  axios.get(url);
	let result = await promise;
	if(result.status != 200) {
		return 'unauthorized';
	}

	// Calling Orgnizations
	console.log('getting organizations...');
	url = apis.serverAddress + apis.organizations;
	promise = axios.get(url);
	result = await promise;
	organizations = result.data;


	// calling all orgnization details
	console.log('getting organization details...');
	let organizationPromises = [];
	 organizations.map( (organization) => {
		organizationPromises.push(getOrganizationDetails(organization.id));
	 });
	let organizationList = await Promise.all(organizationPromises);

	// Calling all users of of all orgnizations
	organizationPromises = [];
	organizationList.map( (_organization) => {
		organizationPromises.push(getUsers(_organization[0].id, _organization[0].name));
	});
	result = await  Promise.all(organizationPromises);
	mapTheUsers(result);


}

getUserList();