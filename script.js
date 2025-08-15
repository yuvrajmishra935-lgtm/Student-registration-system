document.getElementById('addStudent').addEventListener('click', function () {
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    //  Alert feild if anything is missimg it will show alert
    if (!name || !id || !email || !contact) {
        alert('All fields are required!');
        return;
    }
        
    // Regex pattern for email 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Invalid email format!');
        return;
    }
     
  
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    studentData.push({ name, id, email, contact });
    localStorage.setItem('students', JSON.stringify(studentData));

    renderTable();

    document.getElementById('studentForm').reset();
});

// Function calling

function renderTable() {
    const tableBody = document.querySelector('#studentTable tbody');
    tableBody.innerHTML = '';

    const studentData = JSON.parse(localStorage.getItem('students')) || [];

    studentData.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editStudent(index) {
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    const student = studentData[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    deleteStudent(index);
}

function deleteStudent(index) {
    const studentData = JSON.parse(localStorage.getItem('students')) || [];
    studentData.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(studentData));
    renderTable();
}

document.addEventListener('DOMContentLoaded', renderTable);

