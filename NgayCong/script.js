const employees = []; // Mảng lưu trữ thông tin của mỗi nhân viên

const workForm = document.getElementById("workForm");
const employeeNameInput = document.getElementById("employeeName");
const workDateInput = document.getElementById("workDate");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");
const employeeList = document.getElementById("employeeList");
const weeklyTotal = document.getElementById("weeklyTotal");
const monthlyTotal = document.getElementById("monthlyTotal");
const yearlyTotal = document.getElementById("yearlyTotal");

// Hàm tính tổng số giờ làm việc trong tuần, tháng và năm
function calculateTotals() {
    const now = new Date();
    const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    let weeklyHours = 0;
    let monthlyHours = 0;
    let yearlyHours = 0;

    employees.forEach(function(employee) {
        employee.work.forEach(function(workItem) {
            const workDate = new Date(workItem.date);
            const startTime = workItem.start;
            const endTime = workItem.end;

            const start = new Date(`${workItem.date}T${startTime}`);
            const end = new Date(`${workItem.date}T${endTime}`);

            const hoursWorked = (end - start) / (1000 * 60 * 60); // Tính số giờ làm việc

            // Tính tổng số giờ cho tuần hiện tại.
            if (workDate >= oneWeekAgo) {
                weeklyHours += hoursWorked;
            }

            // Tính tổng số giờ cho tháng hiện tại.
            if (workDate >= oneMonthAgo) {
                monthlyHours += hoursWorked;
            }

            // Tính tổng số giờ cho năm hiện tại.
            if (workDate >= oneYearAgo) {
                yearlyHours += hoursWorked;
            }
        });
    });

    weeklyTotal.textContent = weeklyHours.toFixed(2);
    monthlyTotal.textContent = monthlyHours.toFixed(2);
    yearlyTotal.textContent = yearlyHours.toFixed(2);
}

// Hàm xử lý sự kiện ghi nhận công việc
workForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const employeeName = employeeNameInput.value;
    const workDate = workDateInput.value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    // Tạo một đối tượng đại diện cho công việc
    const workItem = {
        date: workDate,
        start: startTime,
        end: endTime,
    };

    // Tìm hoặc tạo một đối tượng nhân viên
    let employee = employees.find(e => e.name === employeeName);
    if (!employee) {
        employee = {
            name: employeeName,
            work: []
        };
        employees.push(employee);
    }

    // Thêm công việc vào danh sách công việc của nhân viên
    employee.work.push(workItem);

    const listItem = document.createElement("li");
    listItem.textContent = `Tên: ${employeeName}, Ngày công: ${workDate}, Giờ từ ${startTime} đến ${endTime}`;
    employeeList.appendChild(listItem);

    employeeNameInput.value = "";
    workDateInput.value = "";
    startTimeInput.value = "";
    endTimeInput.value = "";

    // Gọi lại hàm tính tổng số giờ sau khi ghi nhận công việc mới.
    calculateTotals();
});
