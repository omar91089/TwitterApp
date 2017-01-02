# TwitterApp
Small application to get Twitter feeds.
Built on node.js web development framework [Express.js](http://expressjs.com/)


### Quick Start

0. ####Prerequisites
Download and Install [Node.js](http://nodejs.org/)

0. ####Clone the repo

0. ####Install npm packages
In the cloned directory,
	```
	$ npm install
	```
If you see EACCES errors from npm, you may have npm files owned by root. Use,
  	```
	$ sudo npm install
	```
Packages will be installed in `node_modules` directory.

0. ####Install bower packages
In the cloned directory,
	```
	$ bower install
	```
Target path is given in `.bowerrc`

0. ####Twitter credentials
Environment variables are used to keep twitter credentials private. File `credentials.sh` is used to export the variables. It is available on gist as well as in the repository (temporarily).
Run the file `credentials.sh`
	```
	$ source credentials.sh
	```
Or, replace the following lines in `config.js` with appropriate values
	```
	config.twitter.consumer_key = process.env.TWITTER_CONSUMER_KEY;
	config.twitter.consumer_secret = process.env.TWITTER_CONSUMER_SECRET;
	config.twitter.access_token = process.env.TWITTER_ACCESS_TOKEN_KEY;
	config.twitter.access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
	```

0. ####Start
Start the app with the following command.
	```
	$ npm start
	```
Open your browser to http://localhost:3000/
