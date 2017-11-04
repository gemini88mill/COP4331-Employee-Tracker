# COP4331-Employee-Tracker
Create a mobile application that can keep track of a user. When the user logs into to the system the user's image will be captured and GPS location will be send to the admin where admin can view image and GPS location in web application. After login, GPS location of the employee will be tracked automatically by the system and send to the admin every 10 minutes. The admin can add new employee and view the GPS location of the employee by entering employee identity number as well as date. Since GPS location of the employee is tracked, the employees should not be able to add fake their location.


#### Setup & Running Server

##### DEPENDENCIES

1. [Node 9.0.0+](https://nodejs.org/en/)
2. [MongoDB 3.4.9+](https://docs.mongodb.com/master/installation/)

##### Setup

`git clone https://github.com/gemini88mill/COP4331-Employee-Tracker.git && cd COP4331-Employee-Tracker/server`

##### Install via `npm`
- Linux: `sudo npm install`
- Windows: `npm install` (run command prompt as an administrator)

##### Starting server
`npm start`

If this does not work, directly start the server with `node app.js`
