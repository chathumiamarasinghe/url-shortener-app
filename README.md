 URL Shortener — Full Stack Application
A full-stack URL shortener web application built with:

Frontend: React, Redux Toolkit, Material UI

Backend: Java with Spring Boot

Database: PostgreSQL (or other relational DB)

 Features
Shorten long URLs with optional custom alias

Set expiration for shortened URLs (1, 7, 30 days)

View, delete, and manage previously created URLs

Fully responsive and styled UI using Material UI

Redux-based state management

Backend REST API with CRUD support

 Code & Approach
Frontend (React + Redux Toolkit)
State Management: urlSlice in Redux manages the loading state, URL list, and errors.

ShortenUrlModal: A dialog to submit a long URL, select expiration, and optionally enter an alias.

UrlTable: Displays a sortable list of shortened URLs with delete options.

Integration: Components interact with a central urlService which handles all API calls.

Folder Structure:


frontend/
├── src/
│   ├── components/       # React components like UrlTable, ShortenUrlModal
│   ├── services/         # Axios-based API interactions
│   ├── store/            # Redux store and slices
│   └── App.jsx           # Main component
Backend (Spring Boot)
Model: UrlMapping.java defines the schema for URL records.

Controller: UrlController.java handles API requests like GET, POST, DELETE.

Service: UrlService.java contains the business logic for shortening, expiration calculation, and storage.

Folder Structure:


backend/
└── src/
    └── main/
        └── java/
            └── com/url_shortener/backend/
                ├── controller/
                ├── model/
                └── service/
 Setup Instructions
 Prerequisites
Java 17+

Node.js 16+ and npm

PostgreSQL or another RDBMS

Git

 Backend Setup
Navigate to backend:


cd backend
Configure your DB in application.properties:


spring.datasource.url=jdbc:postgresql://localhost:3306/urlshortener
spring.datasource.username=your_username
spring.datasource.password=your_password
Run the backend:


./mvnw spring-boot:run
🖼 Frontend Setup
Navigate to frontend:


cd frontend



npm install
Start development server:

npm run dev

 Testing
Use Postman or a browser to test endpoints (e.g., POST /api/shorten, GET /api/urls)

UI allows for full testing without Postman as well.

 Additional Notes
Expiration is calculated in the frontend before submission to backend.

Alias field is included but currently not used unless backend supports it.

Redux is designed to allow scalability (e.g., pagination, filtering).

Error handling is implemented for both network and validation issues.
