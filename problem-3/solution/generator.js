const axios = require('axios');
const apis = require('./../utils/config');


const userMap = new Map();
function handleUsers(organizations) {
	organizations.map( (organization) => {
		const { name, users } = organization;
		userMap.set(name, users);
	});
	console.log('-------------------------------------------------------------');
	console.log('userMap-->', userMap);
	console.log('-------------------------------------------------------------');

}

const waitForAPI = (msg) => {
	console.log(msg);
}


function login() {
	waitForAPI('waiting for login...');
	const url = apis.serverAddress + apis.loginAPI;
	return axios.get(url).then( (res) => res.data);

}


function getOrganizations() {
	waitForAPI('waiting for organizations...');
	const url = apis.serverAddress + apis.organizations;
	return axios.get(url).then( (res) => res.data);
}

function getOrganizationDetails(id) {
	waitForAPI(`waiting for organization details of ${id}...`);
	const url = `${apis.serverAddress}${apis.organizations}/${id}`
	return axios.get(url).then( (res) => res.data);
}

function getUsers(orgId, name) {
	waitForAPI(`waiting for users of organization ${orgId}...`);
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	return axios.get(url).then( (res) => { return { users: res.data, name: name }});
}



function *getAllUsers() {
	var loginStatus = yield login();
	if(loginStatus.status == 'success') {
		var organizations = yield getOrganizations();
		var organizationPromise = [];
		organizations.map( (organization) => {	
			organizationPromise.push(getOrganizationDetails(organization.id))
		});
		var orgnizationList = yield Promise.all(organizationPromise);
		var _organizationPromise = [];
		orgnizationList.map( (_orgnization) => {
			_organizationPromise.push(getUsers(_orgnization[0].id, _orgnization[0].name))
		});

		yield Promise.all(_organizationPromise);
	} else {
		console.log('Invalid Credentials');
	}

}

var gen = getAllUsers();
gen.next().value.then( (loginStatus) => {
	return gen.next(loginStatus).value;
})
.then( (organizations) => {
	return gen.next(organizations).value;
})
.then( (organization) => {
	return gen.next(organization).value
})
.then( (users) => {
	handleUsers(users);
})

