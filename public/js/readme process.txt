start command prompt in WebServerChorme folder
npm -g install express-generator
express neuroGymServer //creates the folder structure
npm install //parses the dependencies from package.json files and and installs them locally in npm_modules folders 
//this ensures stability of a version of all files reqiuired.
//also Node's require function first looks at npm_modules folder

app.js contains boilerplate of the webapp
express neuroGymServer created 4 folders viz.. public,view,bin and route

npm start //we start express neuroGymServer app...use package.json file

public folder --> default that app.js passess to express.static method
				all static web files goes here.

routes folder --> holds the users.js and index.js files and both are required by app.js. 
				To define our routes, we push them onto Node's exports object 
				Compartmentalizing route logic into separate files in the routes directory helps 
				to avoid clutter in app.js, dividing the server code from the route code. This way, 
				we can focus purely on our server or on our routes. 
				Finally, views hold template files that can really help with development acceleration. 

app.js -->		this is the server code
				The app.js file can be divided into five sections: dependencies, app configuration, route
				setting, error handling, and export.

Environment Setup
				To use an environment, we set the special NODE_ENV variable on the command line as we are
				executing node:
				NODE_ENV=production node app.js
				
				On Windows, we use the following command:
				set NODE_ENV=production
				node app.js

				The development environment is default, so there's no need to use NODE_ENV to set it.

views			contains output generating logic 

jade			Express framework default view engine which process and presents data
