const employees = []; // Mảng lưu trữ thông tin của mỗi nhân viên

const workForm = document.getElementById("workForm");
const employeeNameInput = document.getElementById("employeeName");
const workDateInput = document.getElementById("workDate");
const startTimeInput = document.getElementById("startTime");
const endTimeInput = document.getElementById("endTime");

document.addEventListener("DOMContentLoaded", function() {
    const calendarEl = document.getElementById("calendar");
    
    const calendar = new FullCalendar.Calendar(calendarEl, {
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
                        title: `${employee.name} - ${workItem.start} to ${workItem.end}`,
                        start: start,
                        end: end
                    });
                });
            });
            successCallback(events);
        }
    });

    calendar.render();
});

// Hàm tính tổng số giờ làm việc trong tuần, tháng và năm
function calculateTotals() {
    const now = new Date();
    const oneWeekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    // ... (Đoạn mã tính tổng giờ giống như trước)

    // Gọi lại hàm tính tổng số giờ sau khi ghi nhận công việc mới.
    calculateTotals();
}
