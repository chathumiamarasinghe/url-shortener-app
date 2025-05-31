# URL Shortener — Full Stack Application

A full-stack URL shortener web application built with:

- **Frontend:** React, Redux Toolkit, Material UI  
- **Backend:** Java with Spring Boot  
- **Database:** MySQL

---

## Features

- Shorten long URLs with optional custom alias  
- Set expiration for shortened URLs (1, 7, 30 days)  
- View, delete, and manage previously created URLs  
- Fully responsive and styled UI using Material UI  
- Redux-based state management  
- Backend REST API with CRUD support  

---

## Code & Approach

### Frontend (React + Redux Toolkit)

- **State Management:** `urlSlice` in Redux manages the loading state, URL list, and errors.  
- **ShortenUrlModal:** A dialog to submit a long URL, select expiration, and optionally enter an alias.  
- **UrlTable:** Displays a sortable list of shortened URLs with delete options.  
- **Integration:** Components interact with a central `urlService` which handles all API calls.  

**Folder Structure:**


### Backend (Spring Boot)

- **Model:** `UrlMapping.java` defines the schema for URL records.  
- **Controller:** `UrlController.java` handles API requests like GET, POST, DELETE.  
- **Service:** `UrlService.java` contains the business logic for shortening, expiration calculation, and storage.  

**Folder Structure:**


---

## Setup Instructions

### Prerequisites

- Java 17+  
- Node.js 16+ and npm  
- MySql  
- Git  

## Backend Setup

Configure your database connection in `src/main/resources/application.properties`:

```ini
spring.datasource.url=jdbc:mysql://localhost:3306/urlshortener
spring.datasource.username=your_username
spring.datasource.password=your_password
# URL Shortener - Setup Instruction


./mvnw spring-boot:run
Frontend Setup
Navigate to the frontend directory:


cd frontend
Install dependencies:


npm install
Start the development server:

npm run dev
