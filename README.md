1. run npm install inside rest-api folder
2. run npm install inside phonestore folder
3. mongo database server must be running on localhost:27017
4. run npm start inside rest-api folder
 - express rest api server is accepting requests on port 3100 in development mode with address http://localhost:3100/api
5. run ng serve inside phonestore folder
 - angular application is configured on port 4300 and is accessible on http://localhost:4300

* The application has the following public views: Home, Catalog, Phone  Details , About, Login, Register.
* The private views available for registered users are: Profile, Add Phone , Edit Phone , Phone details  with Edit and Delete buttons or Order button if user is
not the owner of the phone.

1. Home: 
    - in the home view are listed the last 5 added phones from every user with details button
    which redirects to phone details and Shop Now button which redirects to Catalog view

2. Catalog:
    - shows all phones added from all users with details button which redirects to phone details

3. About: 
    - general site info

4. Profile:
    - contains edit profile section , section with phones added from the current user
    and section with phones not owned but ordered from the current user

5. Add Phone:
    - contains form with the required fields: model, screen size, price, image link
    and description. 
    - The image file field is not required and can upload image 
    from the local computer ( only jpeg and png files less than 5mb are accepted)

6. Phone Details:
    - is accessible after View Details button click and shows the order button if
    the current user is not the owner of the phone or edit and delete buttons if the
    current user is owner of the phone
    - contains section underneath with user comments for this phone and textarea to post comment from the current user for this phone.
7. Edit Phone
    - edit button click redirects to the edit phone view
    - contains form with the required fields: model, screen size, price, image link
    and description. 
    - The image file field is not required and can upload image 
    from the local computer ( only jpeg and png files less than 5mb are accepted)
    - after submit phone data is updated and the application redirects to the catalog view

* live deployment on https://phone-store-jocg.onrender.com/                   
