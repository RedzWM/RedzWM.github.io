const employees = []; // Mảng lưu trữ thông tin của mỗi nhân viên

const workForm = document.getElementById("workForm");
const employeeNameInput = document.getElementById("employeeName");
const workDateInput = document.getElementById("workDate");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");

let calendar;

document.addEventListener("DOMContentLoaded", function() {
    const calendarEl = document.getElementById("calendar");
    
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "timeGridWeek", // Chế độ xem theo tuần
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay"
        },
        events: function(info, successCallback, failureCallback) {
            // Tạo danh sách các sự kiện từ dữ liệu nhân viên
            const events = [];
            employees.forEach(function(employee) {
                employee.work.forEach(function(workItem) {
                    const start = `${workItem.date}T${workItem.start}`;
                    const end = `${workItem.date}T${workItem.end}`;
                    events.push({
                        title: `${employee.name} (${workItem.start} - ${workItem.end})`,
                        start: start,
                        end: end
                    });
                });
            });
            successCallback(events);
        }
    });

    calendar.render();

    // Lắng nghe sự kiện submit để lưu công việc
    if (workForm) {
        workForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = employeeNameInput.value.trim();
            const date = workDateInput.value;
            const start = startTimeInput.value;
            const end = endTimeInput.value;

            if (!name || !date || !start || !end) return;

            // Tìm nhân viên đã tồn tại hoặc tạo mới
            let employee = employees.find(emp => emp.name.toLowerCase() === name.toLowerCase());
            if (!employee) {
                employee = { name: name, work: [] };
                employees.push(employee);
            }

            // Thêm giờ làm vào danh sách
            employee.work.push({ date, start, end });

            // Reset form (trừ tên nhân viên để tiện nhập tiếp)
            workDateInput.value = "";
            startTimeInput.value = "";
            endTimeInput.value = "";

            // Làm mới lịch để hiển thị sự kiện mới
            calendar.refetchEvents();
            
            // Tính tổng giờ làm
            calculateTotals();
        });
    }
});

// Hàm tính tổng số giờ làm việc trong tuần, tháng và năm
function calculateTotals() {
    let totalHours = 0;
    employees.forEach(employee => {
        employee.work.forEach(workItem => {
            const start = new Date(`1970-01-01T${workItem.start}`);
            const end = new Date(`1970-01-01T${workItem.end}`);
            const diffMs = end - start;
            if (diffMs > 0) {
                totalHours += diffMs / (1000 * 60 * 60);
            }
        });
    });
    console.log(`Tổng cộng giờ làm đã ghi nhận: ${totalHours.toFixed(2)} giờ`);
}
