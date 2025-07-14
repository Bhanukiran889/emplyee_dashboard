# Employee Directory Web Interface
This project implements a responsive and interactive Employee Directory Web Interface as part of the AJACKUS Company Assignment. It showcases front-end development principles using HTML, CSS, and vanilla JavaScript, with a simulated Freemarker template integration for data rendering.

## Table of Contents
* Features
* Technologies Used
* Project Structure
* Setup and Run Instructions
* Screenshots
* Reflection
* Future Improvements

## Features
This application provides the following core functionalities for managing employee data:

* Dashboard View: Displays employees in a responsive card layout, showing ID, Name, Email, Department, and Role.
* Add/Edit Employee: A dedicated form to add new employees or modify existing ones.
* Client-side validation for required fields and email format.
* Delete Employee: Ability to remove employees from the directory with a confirmation prompt.
* Search: Filter employees by first name, last name, or email using a dynamic search bar.
* Filter: A slide-in sidebar allows filtering employees by First Name, Department, and Role.
* Sort: Sort employees by First Name or Department.
* Pagination: Navigate through employee lists with configurable items per page (10, 25, 50, 100).
* Responsive Design: Optimized for seamless viewing and interaction across desktop, tablet, and mobile devices.
* In-Memory Data: All employee data is managed in a local JavaScript array, simulating a client-side database.

# Technologies Used
* HTML5: For structuring the web content.
* CSS3: For styling and responsive design (including Flexbox and Media Queries).
* Vanilla JavaScript: For all dynamic functionalities, DOM manipulation, form handling, validation, search, filter, sort, and pagination logic.
* Freemarker (Simulated): The project structure includes Freemarker template files (.ftlh) as per assignment requirements. For local development and demonstration, the data injection and initial rendering typically handled by a Freemarker engine are simulated client-side using JavaScript.

# Project Structure
```bash
employee-directory/
├── src/
│   └── main/
│       └── resources/
│           ├── templates/
│           │   └── index.ftlh         // Freemarker template (conceptual rendering)
│           └── static/
│               ├── css/
│               │   └── style.css      // All application styles
│               └── js/
│                   ├── app.js         // Main application logic (CRUD, UI, search, filter, sort, pagination)
│                   └── data.js        // Mock employee data
├── index.html                       // Main entry point for local browser testing (simulates Freemarker output)
└── README.md                        // This document
```
## Setup and Run Instructions
This application is designed to run entirely client-side, simulating the Freemarker integration for development purposes.

1. Clone the Repository:
```bash
git clone https://github.com/Bhanukiran889/emplyee_dashboard.git
cd employee-directory
```
2. Open in Browser:

* Simply open the index.html file located in the root of the cloned directory in your preferred web browser.

* Example: Drag and drop index.html into a new browser tab, or navigate to file:///path/to/your/employee-directory/index.html.

(Note: The index.ftlh file is included to demonstrate the intended Freemarker template structure as per the assignment, but it requires a Freemarker server to be processed. For this front-end focused assignment, client-side rendering with index.html is used.)
