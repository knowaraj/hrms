import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { clearAuthData } from '../../utils/auth';
import { useTheme } from '../../context/ThemeContext';


interface HeaderProps {
    userRole?: 'employee' | 'admin';
}

interface NavItem {
    label: string;
    path: string;
    icon: string;
}

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    unread: boolean;
}

interface User {
    name: string;
    email: string;
    role: string;
    avatar: string;
}

const Header: React.FC<HeaderProps> = ({ userRole = 'employee' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const employeeNavItems: NavItem[] = [
        { label: 'Dashboard', path: '/employee-dashboard', icon: 'LayoutDashboard' },
        { label: 'Attendance', path: '/attendance-management', icon: 'Clock' },
        { label: 'Leave', path: '/leave-management', icon: 'Calendar' },
        { label: 'WFH', path: '/work-from-home', icon: 'Home' },
        { label: 'Documents', path: '/document-management', icon: 'FileText' },
        { label: 'Info Center', path: '/information-center-dashboard', icon: 'Megaphone' },
        { label: 'Assets', path: '/asset-request-management', icon: 'Package' },
    ];

    const adminNavItems: NavItem[] = [
        { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
        { label: 'Employees', path: '/employee-management', icon: 'Users' },
        { label: 'Onboarding', path: '/employee-onboarding-workflow', icon: 'UserCheck' },
        { label: 'Approvals', path: '/approval-workflows', icon: 'CheckCircle' },
        { label: 'Reports', path: '/reports-and-analytics', icon: 'BarChart3' },
        { label: 'Advanced Reports', path: '/advanced-reporting-dashboard', icon: 'LineChart' },
        { label: 'Announcements', path: '/announcement-management', icon: 'Megaphone' },
        { label: 'Assets', path: '/asset-request-management', icon: 'Package' },
        { label: 'Configuration', path: '/configuration-management', icon: 'Settings' },
        { label: 'Settings', path: '/settings-configuration', icon: 'Sliders' },
    ];

    const navItems = userRole === 'admin' ? adminNavItems : employeeNavItems;

    const mockNotifications: Notification[] = [
        {
            id: 1,
            title: 'Leave Request Approved',
            message: 'Your leave request for Dec 25-27 has been approved',
            time: '2 hours ago',
            unread: true,
        },
        {
            id: 2,
            title: 'Attendance Reminder',
            message: 'Please mark your attendance for today',
            time: '5 hours ago',
            unread: true,
        },
        {
            id: 3,
            title: 'Document Uploaded',
            message: 'Your ID proof has been successfully uploaded',
            time: '1 day ago',
            unread: false,
        },
    ];

    const mockUser: User = {
        name: 'Aayat Ahmed',
        email: 'aayat.ahmed@foursymmetrons.com',
        role: userRole === 'admin' ? 'Administrator' : 'Employee',
        avatar: 'AA',
    };

    const unreadCount = mockNotifications?.filter(n => n?.unread)?.length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef?.current && !notificationRef?.current?.contains(event?.target as Node)) {
                setIsNotificationOpen(false);
            }
            if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const handleNavigation = (path: string) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        // Clear all authentication data
        clearAuthData();

        // Close menu
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);

        // Navigate to login with replace to prevent back navigation
        navigate('/login', { replace: true });
    };

    const isActive = (path: string) => location?.pathname === path;

    return (
        <>
            <header className="header-nav">
                <div className="header-nav-container">
                    <div className="header-logo">
                        <div className="header-logo-icon">
                            <Icon name="Briefcase" size={24} color="var(--color-primary)" />
                        </div>
                        <span className="header-logo-text">FourSymmetronsHRMS</span>
                    </div>

                    <nav className="header-nav-menu">
                        {navItems?.map((item) => (
                            <button
                                key={item?.path}
                                onClick={() => handleNavigation(item?.path)}
                                className={`header-nav-item ${isActive(item?.path) ? 'active' : ''}`}
                            >
                                {item?.label}
                            </button>
                        ))}
                    </nav>

                    <div className="header-actions">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-button"
                            aria-label="Toggle theme"
                        >
                            <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
                        </button>

                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="notification-button"
                            >
                                <Icon name="Bell" size={20} />
                                {unreadCount > 0 && (
                                    <span className="notification-badge">{unreadCount}</span>
                                )}
                            </button>

                            {isNotificationOpen && (
                                <div className="notification-dropdown custom-scrollbar">
                                    <div className="notification-dropdown-header">
                                        <span className="notification-dropdown-title">Notifications</span>
                                        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
                                            Mark all read
                                        </button>
                                    </div>
                                    <div>
                                        {mockNotifications?.map((notification) => (
                                            <div
                                                key={notification?.id}
                                                className={`notification-item ${notification?.unread ? 'unread' : ''}`}
                                            >
                                                <div className="notification-item-title">
                                                    {notification?.title}
                                                </div>
                                                <div className="notification-item-message">
                                                    {notification?.message}
                                                </div>
                                                <div className="notification-item-time">
                                                    {notification?.time}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="user-profile-button"
                            >
                                <div className="user-avatar">{mockUser?.avatar}</div>
                                <span className="user-name">{mockUser?.name}</span>
                                <Icon name="ChevronDown" size={16} />
                            </button>

                            {isUserMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown-header">
                                        <div className="user-dropdown-name">{mockUser?.name}</div>
                                        <div className="user-dropdown-email">{mockUser?.email}</div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleNavigation('/employee-profile');
                                            setIsUserMenuOpen(false);
                                        }}
                                        className="user-dropdown-item"
                                    >
                                        <Icon name="User" size={16} />
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleNavigation('/settings-configuration');
                                            setIsUserMenuOpen(false);
                                        }}
                                        className="user-dropdown-item"
                                    >
                                        <Icon name="Settings" size={16} />
                                        Settings
                                    </button>
                                    <div className="user-dropdown-divider" />
                                    <button onClick={handleLogout} className="user-dropdown-item">
                                        <Icon name="LogOut" size={16} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="header-mobile-toggle"
                aria-label="Toggle mobile menu"
            >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
            <div className={`header-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="header-mobile-menu-content">
                    <nav className="flex flex-col gap-2">
                        {navItems?.map((item) => (
                            <button
                                key={item?.path}
                                onClick={() => handleNavigation(item?.path)}
                                className={`header-mobile-nav-item ${isActive(item?.path) ? 'active' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon name={item?.icon} size={20} />
                                    {item?.label}
                                </div>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-border">
                        <button
                            onClick={() => {
                                handleNavigation('/employee-profile');
                                setIsMobileMenuOpen(false);
                            }}
                            className="header-mobile-nav-item"
                        >
                            <div className="flex items-center gap-3">
                                <Icon name="User" size={20} />
                                Profile
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                handleNavigation('/settings-configuration');
                                setIsMobileMenuOpen(false);
                            }}
                            className="header-mobile-nav-item"
                        >
                            <div className="flex items-center gap-3">
                                <Icon name="Settings" size={20} />
                                Settings
                            </div>
                        </button>
                        <button onClick={handleLogout} className="header-mobile-nav-item">
                            <div className="flex items-center gap-3">
                                <Icon name="LogOut" size={20} />
                                Logout
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
