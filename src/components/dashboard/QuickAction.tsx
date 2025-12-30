import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

// Define type for individual action
interface Action {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions: Action[] = [
    {
      id: 1,
      title: "Apply Leave",
      description: "Request time off",
      icon: "Calendar",
      color: "var(--color-primary)",
      path: "/leave-management"
    },
    {
      id: 2,
      title: "WFH Request",
      description: "Work from home",
      icon: "Home",
      color: "var(--color-secondary)",
      path: "/work-from-home"
    },
    {
      id: 3,
      title: "Upload Document",
      description: "Submit documents",
      icon: "Upload",
      color: "var(--color-accent)",
      path: "/document-management"
    },
    {
      id: 4,
      title: "View Attendance",
      description: "Check records",
      icon: "Clock",
      color: "var(--color-warning)",
      path: "/attendance-management"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Zap" size={20} color="var(--color-primary)" className="md:w-6 md:h-6" />
        </div>
        <h2 className="text-lg md:text-xl font-semibold text-foreground">Quick Actions</h2>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        {actions.map((action: Action) => (
          <button
            key={action.id}
            onClick={() => navigate(action.path)}
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-250 hover:shadow-lg hover:shadow-primary/5 text-left"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${action.color}15` }}
            >
              <Icon name={action.icon} size={20} color={action.color} className="md:w-6 md:h-6" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm md:text-base font-medium text-foreground mb-0.5">
                {action.title}
              </h3>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>

            {/* Chevron */}
            <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" className="shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
