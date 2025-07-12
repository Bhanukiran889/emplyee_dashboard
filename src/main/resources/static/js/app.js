// src/main/resources/static/js/app.js

// Make sure mockEmployees from data.js is accessible.
// We create a mutable copy so we can modify it (add, delete, edit).
let employees = [...mockEmployees];

// --- DOM Element References ---
const appContainer = document.getElementById('app');
const header = document.getElementById('header');
const controlsBar = document.getElementById('controls-bar');
const employeeListContainer = document.getElementById('employee-list-container');
const footer = document.getElementById('footer');

// Form elements
const employeeFormContainer = document.getElementById('employee-form-container');
const employeeForm = document.getElementById('employee-form');
const formTitle = document.getElementById('form-title');
const saveEmployeeBtn = document.getElementById('save-employee-btn');

// Filter sidebar elements
const filterSidebar = document.getElementById('filter-sidebar');

// --- State Variables ---
let currentEmployeeId = null; // Stores the ID of the employee being edited, null for new employee

// --- UI Management Functions ---

/**
 * Manages the visibility of different sections of the application.
 * @param {string} view - The view to show ('dashboard', 'addEditForm').
 */
function showView(view) {
    // Hide all main content areas first
    header.classList.add('hidden');
    controlsBar.classList.add('hidden');
    employeeListContainer.classList.add('hidden');
    employeeFormContainer.classList.add('hidden');
    footer.classList.add('hidden');
    filterSidebar.classList.remove('active'); // Ensure sidebar is closed when switching views

    // Show the requested view
    switch (view) {
        case 'dashboard':
            header.classList.remove('hidden');
            controlsBar.classList.remove('hidden');
            employeeListContainer.classList.remove('hidden');
            footer.classList.remove('hidden');
            renderEmployeeList(); // Re-render list when returning to dashboard
            break;
        case 'addEditForm':
            employeeFormContainer.classList.remove('hidden');
            footer.classList.remove('hidden'); // Keep footer visible for form
            break;
        default:
            console.error('Unknown view:', view);
    }
}

/**
 * Toggles the visibility of the filter sidebar.
 */
function toggleFilterSidebar() {
    filterSidebar.classList.toggle('active');
}

/**
 * Clears the employee form fields and error messages.
 */
function clearForm() {
    employeeForm.reset(); // Resets all form fields
    // Clear all error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
}

/**
 * Populates the employee form with data for editing.
 * @param {object} employee - The employee object to populate the form with.
 */
function populateFormForEdit(employee) {
    document.getElementById('firstName').value = employee.firstName;
    document.getElementById('lastName').value = employee.lastName;
    document.getElementById('email').value = employee.email;
    document.getElementById('department').value = employee.department;
    document.getElementById('role').value = employee.role;
    // Assuming phone and hireDate fields exist in the form if we want to edit them
    // document.getElementById('phone').value = employee.phone || '';
    // document.getElementById('hireDate').value = employee.hireDate || '';
}

/**
 * Validates the employee form fields.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
function validateForm() {
    let isValid = true;
    const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const errorDiv = document.getElementById(`${fieldId}-error`);

        if (!input.value.trim()) {
            errorDiv.textContent = 'This field is required.';
            isValid = false;
        } else if (fieldId === 'email' && !emailRegex.test(input.value.trim())) {
            errorDiv.textContent = 'Invalid email format.';
            isValid = false;
        }
    });
    return isValid;
}

// --- Employee List Rendering ---

/**
 * Renders or re-renders the list of employees in the DOM.
 * This function clears the existing list and builds it from the 'employees' array.
 */
function renderEmployeeList() {
    // Clear any existing content in the employee list container before rendering
    employeeListContainer.innerHTML = '';

    // Check if there are any employees to display
    if (employees.length === 0) {
        // Display a message if no employees are found
        employeeListContainer.innerHTML = '<p class="no-employees-message">No employees found. Add some!</p>';
    } else {
        // Iterate over the employees array and create a card for each
        employees.forEach(employee => {
            const employeeCard = document.createElement('div');
            employeeCard.className = 'employee-card';
            // Store the employee ID on the card itself for easy retrieval
            employeeCard.setAttribute('data-employee-id', employee.id);

            // Populate the card with employee data and action buttons
            employeeCard.innerHTML = `
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p><strong>ID:</strong> ${employee.id}</p>
                <p><strong>Email:</strong> ${employee.email}</p>
                <p><strong>Department:</strong> ${employee.department}</p>
                <p><strong>Role:</strong> ${employee.role}</p>
                <p><strong>Phone:</strong> ${employee.phone || 'N/A'}</p>
                <p><strong>Hire Date:</strong> ${employee.hireDate || 'N/A'}</p>
                <div class="employee-actions">
                    <button class="edit-btn" data-id="${employee.id}">Edit</button>
                    <button class="delete-btn" data-id="${employee.id}">Delete</button>
                </div>
            `;
            // Append the created card to the list container
            employeeListContainer.appendChild(employeeCard);
        });
    }

    // After rendering, attach event listeners to the new buttons
    attachEventListeners();
}

// --- Event Handlers ---

/**
 * Handles the deletion of an employee.
 * @param {number} employeeId - The ID of the employee to delete.
 */
function deleteEmployee(employeeId) {
    // IMPORTANT: In a real app, you'd use a custom modal for confirmation, not window.confirm()
    if (window.confirm(`Are you sure you want to delete employee with ID: ${employeeId}?`)) {
        // Filter out the employee with the given ID
        employees = employees.filter(emp => emp.id !== employeeId);
        // Re-render the list to reflect the deletion
        renderEmployeeList();
        console.log(`Employee with ID ${employeeId} deleted.`);
    }
}

/**
 * Event handler for delete button clicks.
 * @param {Event} event - The click event object.
 */
function handleDeleteClick(event) {
    const employeeId = parseInt(event.target.dataset.id);
    deleteEmployee(employeeId);
}

/**
 * Event handler for edit button clicks.
 * This will show the form and pre-fill it with employee data.
 * @param {Event} event - The click event object.
 */
function handleEditClick(event) {
    const employeeId = parseInt(event.target.dataset.id);
    currentEmployeeId = employeeId; // Set the ID of the employee being edited
    formTitle.textContent = 'Edit Employee'; // Change form title
    saveEmployeeBtn.textContent = 'Save Changes'; // Change button text

    const employeeToEdit = employees.find(emp => emp.id === employeeId);
    if (employeeToEdit) {
        populateFormForEdit(employeeToEdit);
        showView('addEditForm'); // Show the form view
    } else {
        console.error('Employee not found for editing:', employeeId);
        // Optionally, show an error message to the user
    }
}

/**
 * Handles the click of the "Add Employee" button.
 * Clears the form and shows it for adding a new employee.
 */
function handleAddEmployeeClick() {
    currentEmployeeId = null; // Reset for new employee
    formTitle.textContent = 'Add Employee'; // Set form title for adding
    saveEmployeeBtn.textContent = 'Add'; // Change button text
    clearForm(); // Clear any previous data
    showView('addEditForm'); // Show the form view
}

/**
 * Handles the click of the "Cancel" button on the form.
 * Clears the form and returns to the dashboard view.
 */
function handleCancelFormClick() {
    clearForm(); // Clear form data
    showView('dashboard'); // Return to dashboard
}

/**
 * Handles the submission of the employee form (Add/Edit).
 * @param {Event} event - The form submit event object.
 */
function handleSaveEmployeeClick(event) {
    event.preventDefault(); // Prevent default form submission (page reload)

    if (!validateForm()) {
        console.log('Form validation failed.');
        return; // Stop if validation fails
    }

    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        department: document.getElementById('department').value,
        role: document.getElementById('role').value.trim(),
        // Add phone and hireDate if you include them in the form
        // phone: document.getElementById('phone').value.trim(),
        // hireDate: document.getElementById('hireDate').value.trim(),
    };

    if (currentEmployeeId === null) {
        // Add new employee
        const newEmployee = {
            id: Date.now(), // Simple unique ID generation
            ...formData
        };
        employees.push(newEmployee);
        console.log('New employee added:', newEmployee);
    } else {
        // Edit existing employee
        const index = employees.findIndex(emp => emp.id === currentEmployeeId);
        if (index !== -1) {
            employees[index] = {
                ...employees[index], // Keep existing properties not in form (e.g., phone, hireDate if not edited)
                ...formData,
                id: currentEmployeeId // Ensure ID remains the same
            };
            console.log('Employee updated:', employees[index]);
        } else {
            console.error('Employee not found for update:', currentEmployeeId);
        }
    }

    clearForm(); // Clear the form after saving
    showView('dashboard'); // Go back to the dashboard to see changes
}

/**
 * Handles the click of the "Filter" toggle button.
 * Toggles the visibility of the filter sidebar.
 */
function handleFilterToggleClick() {
    toggleFilterSidebar();
}

/**
 * Attaches all necessary event listeners to buttons and other interactive elements.
 * This function is called after initial render and after any re-renders that might
 * create new elements (like employee cards).
 */
function attachEventListeners() {
    // Attach listeners for Delete buttons (re-attached on each renderEmployeeList)
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.removeEventListener('click', handleDeleteClick); // Prevent duplicate listeners
        button.addEventListener('click', handleDeleteClick);
    });

    // Attach listeners for Edit buttons (re-attached on each renderEmployeeList)
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.removeEventListener('click', handleEditClick); // Prevent duplicate listeners
        button.addEventListener('click', handleEditClick);
    });

    // Attach listener for "Add Employee" button (only needs to be attached once)
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    if (addEmployeeBtn && !addEmployeeBtn.dataset.listenerAttached) {
        addEmployeeBtn.addEventListener('click', handleAddEmployeeClick);
        addEmployeeBtn.dataset.listenerAttached = 'true'; // Mark as attached
    }

    // Attach listener for "Cancel" button on the form (only needs to be attached once)
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    if (cancelFormBtn && !cancelFormBtn.dataset.listenerAttached) {
        cancelFormBtn.addEventListener('click', handleCancelFormClick);
        cancelFormBtn.dataset.listenerAttached = 'true'; // Mark as attached
    }

    // Attach listener for "Filter" toggle button (only needs to be attached once)
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    if (filterToggleBtn && !filterToggleBtn.dataset.listenerAttached) {
        filterToggleBtn.addEventListener('click', handleFilterToggleClick);
        filterToggleBtn.dataset.listenerAttached = 'true'; // Mark as attached
    }

    // Attach listener for form submission (Save button) - only needs to be attached once
    // Using 'submit' event on the form itself is more robust than click on button
    if (!employeeForm.dataset.listenerAttached) {
        employeeForm.addEventListener('submit', handleSaveEmployeeClick);
        employeeForm.dataset.listenerAttached = 'true'; // Mark as attached
    }

    // TODO: Add listeners for search, sort, filter apply/reset buttons in next steps
}

// --- Initial Setup ---

// Initial render and setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    showView('dashboard'); // Start by showing the dashboard
});
