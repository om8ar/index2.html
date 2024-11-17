const form = document.getElementById("employeeForm");
const employeeSelect = document.getElementById("employeeName");
const taskInput = document.getElementById("task");
const attendanceInput = document.getElementById("attendance");
const employeeTableBody = document.querySelector("#employeeTable tbody");

const employeeData = JSON.parse(localStorage.getItem("employees")) || [];
const attendanceData = JSON.parse(localStorage.getItem("attendance")) || [];

function saveAttendance() {
    localStorage.setItem("attendance", JSON.stringify(attendanceData));
}

function loadEmployees() {
    employeeSelect.innerHTML = '<option value="">اختر الموظف</option>';
    employeeData.forEach(employee => {
        const option = document.createElement("option");
        option.value = employee.name;
        option.textContent = `${employee.name} - رقم الأداء: ${employee.performance}`;
        employeeSelect.appendChild(option);
    });
}

function addAttendanceRow(attendance) {
    const row = document.createElement("tr");
    const employee = employeeData.find(emp => emp.name === attendance.name);
    const performanceScore = employee ? employee.performance : "غير محدد";

    row.innerHTML = `
        <td>${attendance.name}</td>
        <td>${performanceScore}</td>
        <td>${attendance.attendance}</td>
        <td>${attendance.task}</td>
        <td>${attendance.date}</td>
        <td><button onclick="deleteAttendance(${attendanceData.indexOf(attendance)})">مسح</button></td>
    `;
    employeeTableBody.appendChild(row);
}

function renderTable() {
    employeeTableBody.innerHTML = "";
    attendanceData.forEach(addAttendanceRow);
}

function addAttendance() {
    const newAttendance = {
        name: employeeSelect.value,
        task: taskInput.value,
        attendance: attendanceInput.value,
        date: new Date().toLocaleDateString("ar-EG")
    };
    attendanceData.push(newAttendance);
    saveAttendance();
    renderTable();
}

function deleteAttendance(index) {
    attendanceData.splice(index, 1);
    saveAttendance();
    renderTable();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addAttendance();
});

loadEmployees();
renderTable();
