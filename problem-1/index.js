
*O/P:*  couple of consoles

line 15:
response {
   name: "Clairvoyant",
   location: "Pune",
   id: "1"
  }


line 15:
response[
	"clairvoyantUser1",
	"clairvoyantUser2",
	"clairvoyantUser3",
	"clairvoyantUser4",
	"clairvoyantUser5"
]

line 31 {
   name: "Clairvoyant",
   location: "Pune",
   id: "1"
  }



*Explaination of Execution:*
   - line 29 - instance of generator is created
   - line 30 - called first next()
       It will execute fetchData block synchronously as we are using async/await,
       now, we have `response = {
           name: "Clairvoyant",
           location: "Pune",
           id: "1"
          }` in fetchData block

         we are passing this response to another next call, which will be stored to variable which is left hand side of previous yield statement
		now, *orgDetails* in the *generator printUserDetails* will hold that response, which is sent by line 16

    - as we have already executed the next at line so, it is the turn of line 25  to execute,
	again *async/await block* so we will get the the response in synchronous manner and it will be returned to line 16.
	done key will be false* as some code is still left to execute. console at line 26 will never get printed as we are not yet done with generator.

