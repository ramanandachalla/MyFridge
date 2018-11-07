# MyFridge
MyFridge Web application with CURD Operations
======================
Name: Ramananda Challa
ID: Rchalla9600

MyFridge is a simple web application that will implemented by using Express JS and Node JS interact with Mongo database. This is implemented with MVC design pattern. But in this i combined controllers code in routes. Because i tried to implemented seperately but i got some issues so that's why i combined controllers into routes. 

In routes controller file like foods.js file have implementation of api's with curd operations of food items. Using rest API funtions like GET, POST, PUT and DELETE implemented api functions that will return HTML format and json format of response.

Models folder have db.js file for getting og mongo database connection and food.js file with food schema interact with mongo database.

View components are placed in app_server/views path. In this i implemented new.jade for new food item view, show.jade for view food list and edit.jade for update food list and index.jade for view index page.

## Installation Details
- Clone this repository called MyFridge
- Install Mongo database
- Create Mongo database called 'MyFridge'
- Install all packages included in package.json using 'npm install' and run on application using 'npm start'
- Navigate to `http://localhost:3000` see the home page of MyFridge

## Usage Instructions Details
All folders are build with MVC pattern. But the schema mentioned food.js in models inside app_api.  

If want to add new food item go to Add New Food menu item it will redirect to `http://localhost:3000/foods/new`. 

After add it will redirect to index page where you can now `Show` or `Edit` URL's and Delete Button of particular food item record in index page.

All of the REST api's are implemented. Check that api's in app_api/routes/foods.js file

github Respository 'MyFridge' URL: https://github.com/ramanandachalla/MyFridge.git