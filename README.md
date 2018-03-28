# ReportHub ![Logo](/markdown/download.png "Reporthub")

ReportHub is a minimal and generic web application for survey data. Users can fill data in existing forms, can edit and can preview data. Based on the data entered into the database, the result is displayed in visual form such as charts and map and also tabular form. Based on the requirement, the users can also generate report and export the data in Comma Separated Values (CSV) files. The users can visualize the data in real-time once it is stored in the system. ReportHub supports simple dashboard that help to display information. ReportHub is open source, anyone can customize and build their own dashboard. Deployment requires Linux systems administration experience, but once configured and deployed it can be used by anyone.

**The documentation covers summarized technical overview, user guides and deployment guide of ReportHub.**

## Technical Overview

![Dashboard](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-dashboard-2018-03-25-18_00_24.png "Dashboard Page")

ReportHub provides easy to use interface with basic features to list forms, enter, edit and delete data. It also provides data representation features to provide aggregated data in the form of charts and visual view in the form of maps. Following are the major features of ReportHub:

**Forms Management:** Simple and intuitive forms interface where users can enter, edit, retrieve and delete form data for predefined forms.

**Dashboard and Automatic Charts:** ReportHub supports generation of automatic charts in the form dashboards where charts are updated upon entering the data.

**Maps:** The application provides a general map overview of Afghanistan and pinpoints the set location of entered forms.

**User Authentication and Authorization:** ReportHub provides basic user-login and log-out features with three level of authorization -- viewer, editor and administrator. The users with administrator access has all the privileges of the application. Similarly, editor can view, enter and update data and also has access to dashboard and maps. Users with viewer role can only view data and cannot update and/or delete the data.

**Search and Filtering:** Basic data filtering and searching feature is enabled on the data listing and maps.

**Export as CSV:** Users can export the data to Comma Separated Values (CSV) format.

**Browser Compatibility and Mobile-ready:** The application ensures compatibility on different desktop-based browsers and also provides mobile responsive user-interface.


**ReportHub is developed using modern web development technologies and uses the following famous tools and libraries:**

* [AngularJs V4](https://angularjs.org/)
* [Angular/CLI](https://cli.angular.io/)
* [Mongodb](https://www.mongodb.com/)
* [Bootstrap 4](https://getbootstrap.com/)
* [JQuery](https://jquery.com/)
* [LeafletJs](http://leafletjs.com/)
* [ChartistJs](https://gionkunz.github.io/chartist-js/)
* [Rxjs](http://reactivex.io/rxjs/)
* [Typescript](http://www.typescriptlang.org/)
* [tslint](https://www.npmjs.com/package/ts-lint)
* [Karma-Jasmine](https://www.npmjs.com/package/karma-jasmine)
* [Protractor](https://www.protractortest.org/)
* [Ts/Node](https://www.npmjs.com/package/ts-node)
* [GulpJS](https://gulpjs.com)
* [WebpackJs](https://webpack.js.org)
* [NodeJs](https://nodejs.org)
* [ExpresJs (NodeJs Framework)](https://expressjs.com/)
* [requireJs](http://requirejs.org/)
* [mongooseJs](http://mongoosejs.com)
* [jsonwebtoken](https://jwt.io/)
* [cors](https://github.com/expressjs/cors)
* [morgan](https://github.com/expressjs/morgan)
* [cookieParser](https://github.com/expressjs/cookie-parser)


## User Guide

This section of the documentation provides simple guide for users of the application. It outlines the major pages and its functionality.


#### Login Page:
Upon visiting the URL of ReportHub, the user will be presented the main login page shown as below:

![Login page](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-login-2018-03-25-17_56_53.png "Login Page")

Within the login page, new users can also sign up and register for accessing ReportHub by clicking on the Register link.

![Registration Page](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-register-2018-03-25-17_57_53.png "Registration Page")

#### Homepage/Dashboard::
Upon successful sign-up and/or logging in, the user will land on the dashboard/homepage where charts are displayed. New users signing will be automatically assigned Viewer role and later on the administrator can change the role to either administrator or Editor.

![Dashboard](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-dashboard-2018-03-25-18_00_24.png "Dashboard Page")


#### Homepage/Edit Profile:
Upon clicking on Edit Profie tab, all three(admin,editor and viewer) will be able to update their respective profiles and validations are there whether the username,email or mobile number are taken or not.

![Edit Profile](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-edit-profile-2018-03-25-18_00_36.png "Edit Profile Page")


#### Homepage/Data Entry:
Upon clicking on Data Entry tab, Admin and Editor will be able to enter data from the form added and all data shown on the application are from this data.

![Data Entry](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-data-entry-2018-03-25-18_00_47.png "Data Entry Page")


#### Homepage/Table List:
Upon clicking on Table List tab, Admin and Editor and viewer will be able to view all submitted data whereas only Admin will be capable of viewing,editing and deleting the submitted data and Editor will be able to view and edit the submitted data , unlike Admin and Editor , Viewer will only be able to View the data. A location filter is also there if the user wants to filter the data by location(province).

![Table List](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-table-2018-03-25-18_01_18.png "Table List Page")


#### Homepage/Users(for Admin only):
Upon clicking on Users tab, only Admin will be able to see all created users(except himself) with their basic information and admin will be able to edit any users role as a Viewer,Editor or Admin. He can also delete any user and create any number of users with a specified role. Ad min can also filter through all users by their role.

![Users](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-users-2018-03-25-18_01_54.png "Users Page")


#### Homepage/Map:
Upon clicking on Map tab, All users will be able to see the submitted data’s location through map.

![Map](https://github.com/Ramindaqiq/reporthub/tree/master/markdown/screencapture-localhost-4200-dashboard-maps-2018-03-25-18_09_07.png "Users Page")


## Deployment Guide
The deployment guide and instructions are written for Ubuntu based systems. Deployment of ReportHub requires Linux systems administration experience, but once configured and deployed it can be used by anyone. To being, you should have the following tools and software already installed on your preferred system:

* Node.js v6 or higher
* MongoDB v2.6.10 or higher
* NPM v5.3.0 or higher
* Angular/CLI

**Once you have the aforementioned tools setup and ready, then please go through the following step-by-step guide.**


1. Install all above tools just like mentioned below. First, install nodejs which comes with npm:
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

2. Then, install mongodb & @angular/cli which comes with npm:
```
npm install -g @angular/cli
npm install mongodb --save
```

3. After installing the above mentioned tools, clone the repo or directly download it from the github link :  
[https://github.com/Ramindaqiq/reporthub/](https://github.com/Ramindaqiq/reporthub/)

4. After cloning or downloading the project go to the reporthub-master folder and install all node modules:
```
npm install
```

5. After installing all node modules , start your angular/cli app using the following link and your project will start in your local server in [http://localhost:4200/](http://localhost:4200/) .
```
ng serve
```

6. After your server is started in your localhost you have to start your backend server for which you have to go to backend folder.
```
npm install
```

7. After installing all node modules, start your backend server using the following command, your backend server will be started on your localhost port 3005.
```
nodemon server.js
```

8. Your mongodb has to be started before starting your backend server, after installing your mongodb use the following command to start your mongo.
```
sudo service mongod start
```

