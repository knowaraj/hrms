import Icon from "../../components/AppIcon";

type EventType = "holiday" | "birthday" | "anniversary" | "meeting" | string;
type ActivityType = "leave" | "attendance" | "document" | "approval" | "wfh" | string;
type StatusType = "approved" | "pending" | "rejected" | "completed" | string;

export interface EventItem {
  id: string | number;
  title: string;
  description?: string;
  type: EventType;
  date: string | Date;
  location?: string;
}

export interface ActivityItem {
  id: string | number;
  title: string;
  description?: string;
  type: ActivityType;
  status: StatusType;
  date: string | Date;
  actionBy?: string;
}

interface DashboardFeedProps {
  events?: EventItem[];
  activities?: ActivityItem[];
}

const ActivityCard: React.FC<DashboardFeedProps> = ({ events = [], activities = [] }) => {
  const getEventIcon = (type: EventType) => {
    const icons: Record<string, string> = {
      holiday: "Calendar",
      birthday: "Cake",
      anniversary: "Award",
      meeting: "Users",
    };
    return icons[type?.toLowerCase()] || "Bell";
  };

  const getEventColor = (type: EventType) => {
    const colors: Record<string, string> = {
      holiday: "var(--color-accent)",
      birthday: "var(--color-secondary)",
      anniversary: "var(--color-primary)",
      meeting: "var(--color-warning)",
    };
    return colors[type?.toLowerCase()] || "var(--color-muted-foreground)";
  };

  const formatEventDate = (date: string | Date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (eventDate.toDateString() === today.toDateString()) return "Today";
    if (eventDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: eventDate.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    });
  };

  // --- Activity Helpers ---
  const getStatusColor = (status: StatusType) => {
    const colors: Record<string, string> = {
      approved: "var(--color-success)",
      pending: "var(--color-warning)",
      rejected: "var(--color-error)",
      completed: "var(--color-accent)",
    };
    return colors[status?.toLowerCase()] || "var(--color-muted-foreground)";
  };

  const getActivityIcon = (type: ActivityType) => {
    const icons: Record<string, string> = {
      leave: "Calendar",
      attendance: "Clock",
      document: "FileText",
      approval: "CheckCircle",
      wfh: "Home",
    };
    return icons[type?.toLowerCase()] || "Bell";
  };

  const formatActivityDate = (date: string | Date) => {
    const now = new Date();
    const activityDate = new Date(date);
    const diffMs = now.getTime() - activityDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;

    return activityDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Upcoming Events */}
      {events.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Icon name="CalendarDays" size={20} color="var(--color-accent)" className="md:w-6 md:h-6" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Upcoming Events</h2>
            </div>
            <span className="text-xs md:text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer">
              View Calendar
            </span>
          </div>

          <div className="space-y-3 md:space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${getEventColor(event.type)}15` }}
                >
                  <Icon
                    name={getEventIcon(event.type)}
                    size={20}
                    color={getEventColor(event.type)}
                    className="md:w-6 md:h-6"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-1">{event.title}</h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
                      style={{
                        backgroundColor: `${getEventColor(event.type)}15`,
                        color: getEventColor(event.type),
                      }}
                    >
                      {formatEventDate(event.date)}
                    </span>
                  </div>
                  {event.description && (
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-1.5 md:mb-2">
                      {event.description}
                    </p>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Icon name="MapPin" size={12} className="md:w-3.5 md:h-3.5" />
                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Feed */}
      {activities.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon name="Activity" size={20} color="var(--color-secondary)" className="md:w-6 md:h-6" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-foreground">Recent Activity</h2>
            </div>
            <button className="text-xs md:text-sm text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-3 md:space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center hrink-0"
                  style={{ backgroundColor: `${getStatusColor(activity.status)}15` }}
                >
                  <Icon
                    name={getActivityIcon(activity.type)}
                    size={20}
                    color={getStatusColor(activity.status)}
                    className="md:w-6 md:h-6"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm md:text-base font-medium text-foreground line-clamp-1">
                      {activity.title}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
                      style={{
                        backgroundColor: `${getStatusColor(activity.status)}15`,
                        color: getStatusColor(activity.status),
                      }}
                    >
                      {activity.status}
                    </span>
                  </div>
                  {activity.description && (
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-1.5 md:mb-2">
                      {activity.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} className="md:w-3.5 md:h-3.5" />
                      {formatActivityDate(activity.date)}
                    </span>
                    {activity.actionBy && (
                      <span className="flex items-center gap-1">
                        <Icon name="User" size={12} className="md:w-3.5 md:h-3.5" />
                        {activity.actionBy}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
