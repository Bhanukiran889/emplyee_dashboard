<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="src/main/resources/static/css/style.css">
</head>
<body>
    <div id="app">
        <!-- Header Section -->
        <header id="header">
            <h1 class="app-title">Employee Directory</h1>
            <div class="search-container">
                <input type="text" id="search-input" placeholder="Search by name or email" class="rounded-input">
                <button id="filter-toggle-btn" class="filter-button rounded-btn">Filter</button>
            </div>
        </header>

        <!-- Controls Bar (Sort, Show, Add Employee) -->
        <div id="controls-bar">
            <div class="sort-show-container">
                <label for="sort-select" class="control-label">Sort:</label>
                <select id="sort-select" class="rounded-select">
                    <option value="">--Select--</option>
                    <option value="firstName">First Name</option>
                    <option value="department">Department</option>
                </select>

                <label for="show-select" class="control-label">Show:</label>
                <select id="show-select" class="rounded-select">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <button id="add-employee-btn" class="add-employee-button rounded-btn">Add Employee</button>
        </div>

        <!-- Employee List Container (Content rendered by app.js) -->
        <div id="employee-list-container">
            <!-- Employee cards will be injected here by JavaScript -->
        </div>

        <!-- Add/Edit Employee Form (Initially hidden) -->
        <div id="employee-form-container" class="hidden">
            <h2 id="form-title">Add Employee</h2>
            <form id="employee-form" class="employee-form-style">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required class="rounded-input">
                    <div class="error-message" id="firstName-error"></div>
                </div>
                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required class="rounded-input">
                    <div class="error-message" id="lastName-error"></div>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required class="rounded-input">
                    <div class="error-message" id="email-error"></div>
                </div>
                <div class="form-group">
                    <label for="department">Department</label>
                    <select id="department" name="department" required class="rounded-select">
                        <option value="">-- Select Department --</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Engineering">Engineering</option>
                    </select>
                    <div class="error-message" id="department-error"></div>
                </div>
                <div class="form-group">
                    <label for="role">Role</label>
                    <input type="text" id="role" name="role" required class="rounded-input">
                    <div class="error-message" id="role-error"></div>
                </div>
                <div class="form-actions">
                    <button type="button" id="cancel-form-btn" class="cancel-button rounded-btn">Cancel</button>
                    <button type="submit" id="save-employee-btn" class="save-button rounded-btn">Add</button>
                </div>
            </form>
        </div>

        <!-- Filter Sidebar (Initially hidden) -->
        <div id="filter-sidebar" class="hidden">
            <h3 class="sidebar-title">Filter Employees</h3>
            <div class="filter-group">
                <label for="filter-firstName">First Name</label>
                <input type="text" id="filter-firstName" class="rounded-input">
            </div>
            <div class="filter-group">
                <label for="filter-department">Department</label>
                <select id="filter-department" class="rounded-select">
                    <option value="">All</option>
                    <option value="HR">HR</option>
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Engineering">Engineering</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="filter-role">Role</label>
                <input type="text" id="filter-role" class="rounded-input">
            </div>
            <div class="filter-actions">
                <button id="apply-filter-btn" class="apply-button rounded-btn">Apply</button>
                <button id="reset-filter-btn" class="reset-button rounded-btn">Reset</button>
            </div>
        </div>

        <!-- Footer -->
        <footer id="footer">
            <p>&copy; 2025 Employee Directory App. All rights reserved.</p>
        </footer>
    </div>

    <script src="src/main/resources/static/js/data.js"></script>
    <script src="src/main/resources/static/js/app.js"></script>
</body>
</html>
