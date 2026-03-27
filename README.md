SmartWinnr Admin Dashboard

This is a full-stack CRM Admin Dashboard built using the MEAN stack (MongoDB, Express.js, Angular, Node.js). 

I built this dashboard to manage users, view analytics, and control role-based access securely.

Key Features Implemented:
* Tech Stack: MongoDB, Express.js, Angular (v17+), Node.js (MEAN).
* Analytics and Data Visualization: Added real-time Chart.js integration displaying interactive Line and Doughnut charts for evenue, platform growth, and user distribution.
* Admin Controls and User Management: Built a complete CRUD system. Super Admins can add, edit, or delete users instantly.
* Role-Based Authorization: Setup secure JWT authentication enforcing role hierarchy (Super Admin, Admin, Viewer).
* Modern CRM UI: Built a responsive, clean UI from scratch using flex and grid layouts with a light slate and burnt orange theme.
* System Health: Added active and inactive user counters along with server load widgets to simulate a real-world admin panel.

Roles and Actions Allowed
--------------------------

1.Super Admin: Super Admin as all the access such as add, edit, delete, view all users, view analytics, view recent users, view notifications, view profile, logout and add the new admin and superadmin

2.Admin: Admin has access to add the user(admin,viewer) only not able to add a new Super Admin User and edit the user and the admin not have permision to delete the user and can view all the stats , view profile , logout 

3. Viwer: Viewer has access to view all the stats , logout and not have permissions to make the changes in the user and analysis

Setup Instructions:

Prerequisites:
Make sure you have Node.js, Angular CLI (v17+), and MongoDB installed locally.

Backend Setup:
1. Open a terminal and navigate to the backend folder by typing: cd backend
2. Install the required dependencies by running: npm install
3. Create a .env file in the backend folder. Add the following environment variables:
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/smartwinnr_db
   JWT_SECRET=your_super_secret_key
4. Start the Node.js server by running: node server.js
   The backend will start running on http://localhost:5000

Frontend Setup:
1. Open a new terminal and navigate to the frontend folder by typing: cd frontend/smartwin
2. Install the Angular dependencies by running: npm install
3. Start the Angular development server by running: ng serve
   The frontend will be available at http://localhost:4200

Testing Setup:
If you need a master user to login initially to see the dashboard, there is a seeder script included. 
While MongoDB is running, navigate to the backend folder and run: node createsuperadminuser.js/create.js
This will create a default super admin user you can use to log in.

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