# Problem Statement

Trace the output of the code snippet and explain the flow line by line. Make sure you dry run the code and don't trace the output by executing it.
Write your own .forEach() method. It should provide all facilities that core .forEach() does. Explain each and every line. If you are using any JavaScript's inbuilt method, make sure you do explain that also i.e. how it works etc.
Consume the provided API's from here and,
Update below code snippet to make it work using,
callbacks
core promise [Promise], 
async-await
generator.
Make use of classes and try to make the code modular as much as possible.


Note: this is just a pseudo code and I have written this by making the assumption it will work synchronously and I will get the data. You need to modify it for each of above sub-bullets [i, ii, iii, and iv]

`loginStatus = login(useName, pass); [/login]
if(loginStatus.status === 'success') {
    organizationList = getOrganizations(); [/organizations] [name, id]
    const usersMap = new Map();
    organizationList.forEach((organization)=>{
        const organizationDetails = getOrganizationDetails(organization.id); [organization/{id}]
        console.log(`organizationDetails: ${organizationDetails}`);
        const users = getUsers(organization.id); [organization/{id}/users];
        usersMap.set(organization, users)
    })
}`
