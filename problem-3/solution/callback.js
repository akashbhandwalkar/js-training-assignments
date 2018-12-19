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

const getUsers = (orgId) => {
	waitForAPI(`waiting for getting User by organization details for...${orgId}`);
	const url = `${apis.serverAddress}${apis.organizations}/${orgId}/users`
	return axios.get(url).then( (res) => res.data);
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
	@Params: Organization: String
	@Params: users: Array<User>
	@returns: void
	@Does: Saves users of particular organization. 
*/

var mapTheUserS = (organization, users) => {

	usersMap.set(organization, users);
	receivedDataFrom++;
	if(totalOrgnizations == receivedDataFrom) { // checks if all organizations have got their users.
		handleUsers(usersMap);
	}
}


var usersMap = new Map();
var useName = '';
var pass = '';



var getAllUsers = () => {
		login(useName, pass).then( (loginStatus) => { // calls login api
			if(loginStatus.status === 'success') {
				 getOrganizations().then( (organizationList) => { // get all organizations 
				 	totalOrgnizations = organizationList.length;
				 	 organizationList.forEach((organization)=>{
				 	 	    getOrganizationDetails(organization.id).then( (organizationDetails) => { // get orgabization details
				 	 	    	 getUsers(organizationDetails[0].id).then( (users) => { // get users of given organization
				 	 	    	 	mapTheUserS(organizationDetails[0].name, users);
				 	 	    	 })
				 	 	    })
				 	 });
				 })
			} else {
				console.log('Invalid Login Credentials');
			}
		})
		

}

getAllUsers();
