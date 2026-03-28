SmartWinnr CRM
---------------

This is a full-stack CRM Admin Dashboard built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). 


Key Features Implemented:
-------------------------
* Tech Stack: MongoDB, Express.js, Angular, Node.js (MEAN).
* Analytics and Data Visualization: Added real-time Chart.js integration displaying interactive Line and Doughnut charts for evenue, platform growth, and user distribution
* Admin Controls and User Management: Built a complete CRUD system. Super Admins can add, edit, or delete users instantly
* Role-Based Authorization: Setup secure JWT authentication enforcing role hierarchy (Super Admin, Admin, Viewer)

Roles and Actions Allowed
--------------------------

1.Super Admin: Super Admin as all the access such as add, edit, delete, view all users, view analytics, view recent users, view notifications, view profile, logout and add the new admin and superadmin and can add the sales data and edit , delete the data

2.Admin: Admin has access to add the user(admin,viewer) only not able to add a new Super Admin User and edit the user and the admin not have permision to delete the user and can view all the stats , view profile , logout  and edit the data add the sales data but they can't delete the sales data

3.Viwer: Viewer has access to view all the stats , logout and not have permissions to make the changes in the user and analysis

Setup Instructions:
-------------------


Backend Setup:
--------------------
1. Open a terminal and go to the backend folder by typing: cd backend
2. Install the required dependencies by running: npm install
3. Create a .env file in the backend folder. Add the below environment variables:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/smartwinnr_db replace with your mongodb ur
   JWT_SECRET=your_super_secret_key
4. Start the Node.js server by running: node server.js
   The backend will start running on http://localhost:5000

Frontend Setup:
----------------
1. Open a new terminal and go to the frontend folder by typing: cd frontend/smartwin
2. Install the Angular dependencies by running: npm install
3. After Installing and go to the angular ap by  typing : cd smartwin again
4. Start the Angular development server by running: ng serve
   The frontend will be available at http://localhost:4200


API Endpoints:
-------------

1. Login --> POST --> http://localhost:5000/api/auth/login
2. Get All Users --> GET --> http://localhost:5000/api/users/allusers
3. Get User by ID --> GET --> http://localhost:5000/api/users/:id
4. Create User --> POST --> http://localhost:5000/api/users/addUser
5. Edit User --> PUT --> http://localhost:5000/api/users/edit/:id
6. Delete User --> DELETE --> http://localhost:5000/api/users/delete/:id
7. Get Recent Users --> GET --> http://localhost:5000/api/users/recent
8. Get Analytics Summary --> GET --> http://localhost:5000/api/analytics/summary
9. Get All Sales --> GET --> http://localhost:5000/api/sales/allsales
10. Add Sale --> POST --> http://localhost:5000/api/sales/addsales
11. Edit Sale --> PUT --> http://localhost:5000/api/sales/editsales/:id
12. Delete Sale --> DELETE --> http://localhost:5000/api/sales/deletesales/:id

SCREENSHORTS
------------
1.LOGIN PAGE
 -----------
 <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774632659/Screenshot_2026-03-27_225929_lpvitw.png">

 1.DASHBOARD TAB
 -----------
 <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774632764/Screenshot_2026-03-27_230151_jecprv.png">

 2.ANALYSIS TAB
 ----------------

 <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774633521/analysis_j6ngqe.png">

 3.USERS TAB
 -------------
  <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774632851/users_nlmyeg.png">

  4.SALES TAB
  -----------

 <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774675694/sales_addhea.png">


 5. ADD SALES POP PUP
 ------------------
 <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774675876/addnewsales_zwaoai.png">
 

 6. EDIT SALES POP UP
 --------------------
 <img src="https://res.cloudinary.com/djha4r2ys/image/upload/v1774676046/EDITSALES_botwfk.png">
 

