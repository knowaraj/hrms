import type {
  ActivityItem,
  EventItem,
} from "../../components/dashboard/ActivityCard";
import ActivityCard from "../../components/dashboard/ActivityCard";
import AttendanceCalendar from "../../components/dashboard/AttendanceCalender";
import Greeting from "../../components/dashboard/Greeting";
import NotificationCenter from "../../components/dashboard/NotificationCenter";
import QuickActions from "../../components/dashboard/QuickAction";
import StatCard from "../../components/dashboard/Statcard";
import Sidebar from "../../components/header/Sidebar";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Calendar } from "antd";

type Trend = {
  direction: "up" | "down";
  value: string;
  label: string;
};

type StatData = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  iconColor: string;
  progress: number;
  trend: Trend;
};

const Dashboard: React.FC = () => {
  const statsData: StatData[] = [
    {
      title: "Present Days",
      value: "22",
      subtitle: "This month",
      icon: "CheckCircle",
      iconColor: "var(--color-success)",
      progress: 88,
      trend: { direction: "up", value: "+2", label: "from last month" },
    },
    {
      title: "Remaining Leaves",
      value: "12",
      subtitle: "Out of 18 total",
      icon: "Calendar",
      iconColor: "var(--color-primary)",
      progress: 67,
      trend: { direction: "down", value: "-3", label: "used this quarter" },
    },
    {
      title: "WFH Requests",
      value: "4",
      subtitle: "Approved",
      icon: "Home",
      iconColor: "var(--color-secondary)",
      progress: 80,
      trend: { direction: "up", value: "+1", label: "this month" },
    },
    {
      title: "Average Hours",
      value: "8.5",
      subtitle: "Per day",
      icon: "Clock",
      iconColor: "var(--color-accent)",
      progress: 94,
      trend: { direction: "up", value: "+0.5", label: "from target" },
    },
  ];

  const activityData: ActivityItem[] = [
    {
      id: 1,
      type: "leave",
      title: "Leave Approved",
      description: "Your leave request for Dec 25-27 has been approved.",
      date: "2024-06-10",
      status: "approved",
    },
    {
      id: 2,
      type: "attendance",
      title: "Attendance Logged",
      description: "You have successfully logged your attendance for today.",
      date: "2024-06-10",
      status: "completed",
    },
  ];
  const eventData: EventItem[] = [
    {
      id: 1,
      title: "Aayat Ahmed's Birthday",
      description:
        "It's Aayat Ahmed's birthday today. Don't forget to send your wishes!",
      type: "birthday",
      date: "2024-06-10",
      location: "N/A",
    },
    {
      id: 2,
      title: "Aayat Ahmed's Birthday",
      description:
        "It's Aayat Ahmed's birthday today. Don't forget to send your wishes!",
      type: "birthday",
      date: "2024-06-11",
      location: "Office",
    },
  ];
  return (
    <div className="min-h-screen flex">
      <Sidebar userRole="employee" />
      <main className="flex-1 md:ml-64 px-8 py-6">
        <Breadcrumb />
        <div className="flex gap-4">
          <Greeting />
          <NotificationCenter />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 lg:mt-8">
          <ActivityCard events={[]} activities={activityData} />
          <QuickActions />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 lg:mt-8">
          {/* <Calendar fullscreen={false} />*/}
          <AttendanceCalendar />
          <ActivityCard events={eventData} activities={[]} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
