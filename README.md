1. run npm install inside rest-api folder
2. run npm install inside phonestore folder
3. mongo database server must be running on localhost:27017
4. run npm start inside rest-api folder
 - express rest api server is accepting requests on port 3100 in development mode with address http://localhost:3100/api
5. run ng serve inside phonestore folder
 - angular application is configured on port 4300 and is accessible on http://localhost:4300

* The application has the following public views: Home, Catalog, Phone  Details , About, Login, Register.
* The private views available for registered users are: Profile, Add Phone, Phone details with Edit and Delete buttons or Order button if user is
not the owner of the phone.

Home: 
    - in the home view are listed the last 5 added phones from every user