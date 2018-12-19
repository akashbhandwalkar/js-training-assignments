const axios = require('axios');
const apis = require('./../utils/config');

const waitForAPI = (msg) => {
	console.log(msg);
}


const login = () => {
	waitForAPI('waiting for login...');
	const url = apis.serverAddress + apis.loginAPI;
	return axios.get(url).then( (res) => res.data);
}

const getOrganizations = () => {
	waitForAPI('waiting for getting organizations...');
	const url = apis.serverAddress + apis.organizations;
	return axios.get(url).then( (res) => res.data)
}

const getOrganizationDetails = (id) => {
	waitForAPI('waiting for getting organization by Id...' + id);
	const url = `${apis.serverAddress}${apis.organizations}/${id}`
	return axios.get(url).then( (res) => res.data);
}

const getUsers = (orgId, name) => {
	waitForAPI(`waiting for getting User by organization details for...${orgId}`);
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	return axios.get(url).then( (res) => { return { name: name, users: res.data} });
}


// Does the further actions when users are received
const handleUsers = (users) => {
	console.log('-------------------------------------------------------------');
	console.log('userMap-->', users);
	console.log('-------------------------------------------------------------');
}

var totalOrgnizations = null;
var receivedDataFrom = 0;

/*
	@Params: organizations: Array<organization>
	@returns: void
	@Does: Saves users of particular organization. 
*/

var mapTheUserS = (organizations) => {
	organizations.map( (organization) => {
		usersMap.set(organization.name, organization.users)
	})
	handleUsers(usersMap);
}


var usersMap = new Map();
var useName = '';
var pass = '';


var getAllUsers = () => {
	login()
		.then( (loginStatus) => {
			if(loginStatus.status === 'success') {
					return getOrganizations();
			}else{ 
				throw('InvalidLoginCredentials');
			}
		})
		.then( (organizationList) => {
			let organizationPromise = [];
			organizationList.map((organization) => {
				organizationPromise.push(getOrganizationDetails(organization.id));
			});
			return Promise.all(organizationPromise);
		})
		.then( (orgnizationDetails) => {
			var userPromises = [];
			orgnizationDetails.map( (organization) => {
				userPromises.push(getUsers(organization[0].id, organization[0].name))
			});
			return Promise.all(userPromises);
		})
		.then( (users) => {
			mapTheUserS(users);
		})
		.catch( (error) => {
			errorHandler(error);
		})

}

getAllUsers();
