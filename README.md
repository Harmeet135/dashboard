# Customer Activity Dashboard

This is a full-stack web application that visualizes customer activity data across multiple hotel areas. The dashboard displays key metrics such as foot traffic, sales revenue, and customer satisfaction. It integrates both the backend and frontend to provide a seamless experience in monitoring and analyzing hotel performance.

## Features
- Visualizes customer activity in hotel areas using charts.
- Displays key metrics such as foot traffic, sales revenue, customer satisfaction, and items purchased.
- Provides detailed insights for each hotel and its respective areas.
- Uses a heatmap to represent activity levels across different hotel zones.
- Responsive design for an optimal user experience across devices.

## Tech Stack
- **Frontend**: React, Chart.js, Tailwind Css, Axios
- **Backend**: Node.js, Express
- **Database**: JSON (static data for simulation)

## Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/customer-activity-dashboard.git


### 2. Install Backend Dependencies
Navigate to the backend folder:

cd backend
Install the required dependencies:
npm install


### 3. Run the Backend
Start the backend server:
npm start
The backend will be running on http://localhost:3000.


### 4. Install Frontend Dependencies
Navigate to the frontend folder:
cd frontend
Install the required dependencies:
npm install


### 5. Run the Frontend
Start the frontend development server:

npm start
The frontend will be running on http://localhost:3000.

API Endpoints
/api/customer-activity
GET: Returns the total campaign count and a list of hotels with their respective activity data.
/api/customer-activity/:hotelId
GET: Fetches detailed information about a specific hotel based on the hotelId.
