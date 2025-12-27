import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location?.pathname?.split('/')?.filter((x) => x);

    const routeNameMap: Record<string, string> = {
        'employee-dashboard': 'Dashboard',
        'attendance-management': 'Attendance',
        'leave-management': 'Leave Management',
        'work-from-home': 'Work From Home',
        'document-management': 'Documents',
        'employee-profile': 'Profile',
        'admin-dashboard': 'Dashboard',
        'employee-management': 'Employees',
        'approval-workflows': 'Approvals',
        'reports-and-analytics': 'Reports',
        'settings-configuration': 'Settings',
    };

    const getBreadcrumbName = (path: string) => {
        return routeNameMap?.[path] || path?.split('-')?.map(word =>
            word?.charAt(0)?.toUpperCase() + word?.slice(1)
        )?.join(' ');
    };

    if (pathnames?.length === 0) {
        return null;
    }

    return (
        <nav className="breadcrumb-container" aria-label="Breadcrumb">
            <div className="breadcrumb-item">
                <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
                    <Icon name="Home" size={16} />
                    <span className="hidden sm:inline">Home</span>
                </Link>
            </div>
            {pathnames?.map((path, index) => {
                const routeTo = `/${pathnames?.slice(0, index + 1)?.join('/')}`;
                const isLast = index === pathnames?.length - 1;
                const breadcrumbName = getBreadcrumbName(path);

                return (
                    <React.Fragment key={routeTo}>
                        <span className="breadcrumb-separator">
                            <Icon name="ChevronRight" size={16} />
                        </span>
                        <div className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                            {isLast ? (
                                <span>{breadcrumbName}</span>
                            ) : (
                                <Link to={routeTo}>{breadcrumbName}</Link>
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
