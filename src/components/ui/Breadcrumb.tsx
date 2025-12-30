import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb as AntBreadcrumb } from 'antd'
import Icon from '../AppIcon'

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
}

const Breadcrumb = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(Boolean)

  const getBreadcrumbName = (path: string) => {
    return routeNameMap[path] || path.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  }

  if (!pathnames.length) return null

  return (
    <AntBreadcrumb
      className="mb-4 text-sm"
      separator={<Icon name="" size={14} />}
    >
      <AntBreadcrumb.Item>
        <Link to="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <span className="hidden sm:inline">Home</span>
        </Link>
      </AntBreadcrumb.Item>

      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        const breadcrumbName = getBreadcrumbName(path)

        return (
          <AntBreadcrumb.Item key={routeTo}>
            {isLast ? (
              <span className="font-semibold">{breadcrumbName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-foreground transition-colors">
                {breadcrumbName}
              </Link>
            )}
          </AntBreadcrumb.Item>
        )
      })}
    </AntBreadcrumb>
  )
}

export default Breadcrumb
