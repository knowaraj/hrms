import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";

type AttendanceStatus = "present" | "absent" | "leave" | "holiday";

type AttendanceRecord = {
  date: string;
  status: AttendanceStatus;
};

const AttendanceCalendar = () => {
  const today = dayjs().startOf("day");

  // 🔹 Generate attendance for current month
  const startOfMonth = today.startOf("month");
  const endOfMonth = today.endOf("month");

  const attendanceData: AttendanceRecord[] = [];

  for (
    let d = startOfMonth;
    d.isBefore(endOfMonth) || d.isSame(endOfMonth);
    d = d.add(1, "day")
  ) {
    attendanceData.push({
      date: d.format("YYYY-MM-DD"),
      status: d.day() === 0 || d.day() === 6 ? "holiday" : "present",
    });
  }

  const attendanceMap = new Map(
    attendanceData.map((item) => [item.date, item.status])
  );

  const getBg = (status: AttendanceStatus) => {
    switch (status) {
      case "present":
        return "bg-green-500 text-white";
      case "leave":
        return "bg-red-500 text-white";
      case "holiday":
        return "bg-yellow-400 text-black";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const renderFullCell = (value: Dayjs) => {
    const isFuture = value.isAfter(today);
    const isToday = value.isSame(today, "day");
    const isWeekend = value.day() === 0 || value.day() === 6;

    const dateKey = value.format("YYYY-MM-DD");

    const status: AttendanceStatus =
      attendanceMap.get(dateKey) || (isWeekend ? "holiday" : "present");

    return (
      <div className="p-1 h-full w-full flex items-center justify-center">
        <div
          className={`
            w-9 h-9 flex items-center justify-center
            text-sm font-semibold
            rounded-lg shadow-sm
            transition-all duration-200
            hover:scale-105 hover:shadow-md
            ${isFuture ? "bg-gray-100 text-gray-400" : getBg(status)}
            ${isToday ? "ring-2 ring-blue-500 ring-offset-2" : ""}
          `}
        >
          {value.date()}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-sm font-semibold mb-3">Attendance</h3>
      <Calendar fullscreen={false} fullCellRender={renderFullCell} />
    </div>
  );
};

export default AttendanceCalendar;
