import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import { clearAuthData } from "../../utils/auth";
import { useTheme } from "../../context/ThemeContext";

type UserRole = "admin" | "employee";

type NavItem = {
  label: string;
  path: string;
  icon: string;
};

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

type SidebarProps = {
  userRole?: UserRole;
};

const Sidebar: React.FC<SidebarProps> = ({ userRole = "admin" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const employeeNavItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { label: "Attendance", path: "/attendance-management", icon: "Clock" },
    { label: "Leave", path: "/leave-management", icon: "Calendar" },
    { label: "WFH", path: "/work-from-home", icon: "Home" },
    { label: "Documents", path: "/document-management", icon: "FileText" },
    {
      label: "Info Center",
      path: "/information-center-dashboard",
      icon: "Megaphone",
    },
    { label: "Assets", path: "/asset-request-management", icon: "Package" },
  ];

  const adminNavItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { label: "Employees", path: "/employee-management", icon: "Users" },
    {
      label: "Onboarding",
      path: "/employee-onboarding-workflow",
      icon: "UserCheck",
    },
    { label: "Approvals", path: "/approval-workflows", icon: "CheckCircle" },
    { label: "Reports", path: "/reports-and-analytics", icon: "BarChart3" },
    {
      label: "Advanced Reports",
      path: "/advanced-reporting-dashboard",
      icon: "LineChart",
    },
    {
      label: "Announcements",
      path: "/announcement-management",
      icon: "Megaphone",
    },
    { label: "Assets", path: "/asset-request-management", icon: "Package" },
    {
      label: "Configuration",
      path: "/configuration-management",
      icon: "Settings",
    },
    { label: "Settings", path: "/settings-configuration", icon: "Sliders" },
  ];

  const navItems = userRole === "admin" ? adminNavItems : employeeNavItems;

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Leave Request Approved",
      message: "Your leave request for Dec 25-27 has been approved",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Attendance Reminder",
      message: "Please mark your attendance for today",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Document Uploaded",
      message: "Your ID proof has been successfully uploaded",
      time: "1 day ago",
      unread: false,
    },
  ];

  const user = {
    name: "Aayat Ahmed",
    email: "aayat.ahmed@foursymmetrons.com",
    avatar: "AA",
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      )
        setIsNotificationOpen(false);
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      )
        setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "unset";
  }, [isMobileOpen]);

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const logout = () => {
    clearAuthData();
    setIsMobileOpen(false);
    setIsUserMenuOpen(false);
    navigate("/login", { replace: true });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <aside
        className={`
    fixed md:fixed
    left-0 top-0 z-50
    h-screen overflow-visible
    w-64
    bg-background border-r border-border
    flex flex-col
    transition-transform duration-300
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
          <Icon name="Briefcase" size={24} color="var(--color-primary)" />
          <span className="font-semibold text-lg">InnovationNxt</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors hover:cursor-pointer ${
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-foreground"
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-border space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-muted"
          >
            <Icon name={theme === "dark" ? "Sun" : "Moon"} size={18} />
            Theme
          </button>

          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm hover:bg-muted"
            >
              <Icon name="Bell" size={18} />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {isNotificationOpen && (
              <div className="absolute left-full bottom-0 ml-2 w-72 bg-background border border-border rounded-xl shadow-lg overflow-hidden z-50 pointer-events-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 text-sm ${
                      n.unread ? "bg-muted" : ""
                    }`}
                  >
                    <div className="font-medium">{n.title}</div>
                    <div className="text-muted-foreground">{n.message}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {n.time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted"
            >
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">
                {user.avatar}
              </div>
              <span className="flex-1 text-sm">{user.name}</span>
              <Icon name="ChevronRight" size={14} />
            </button>

            {isUserMenuOpen && (
              <div className="absolute left-full bottom-0 ml-2 w-56 bg-background border border-border rounded-xl shadow-lg z-50 pointer-events-auto">
                <button
                  onClick={() => navigateTo("/employee-profile")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Icon name="User" size={16} />
                  Profile
                </button>
                <button
                  onClick={() => navigateTo("/settings-configuration")}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Icon name="Settings" size={16} />
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted"
                >
                  <Icon name="LogOut" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary text-white md:hidden"
      >
        <Icon name={isMobileOpen ? "X" : "Menu"} size={24} />
      </button>
    </>
  );
};

export default Sidebar;
