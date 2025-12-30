import React from 'react';
import Icon from '../AppIcon';

type Trend = {
  direction: 'up' | 'down';
  value: string;
  label: string;
};

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor: string;
  progress?: number;
  trend?: Trend;
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  progress,
  trend,
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 transition-all duration-250 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-1">
            {title}
          </p>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs md:text-sm text-muted-foreground ">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <Icon
            name={icon}
            size={20}
            color={iconColor}
            className="md:w-6 md:h-6 lg:w-7 lg:h-7"
          />
        </div>
      </div>

      {progress !== undefined && (
        <div className="">
          <div className="flex items-center justify-between mb-1 md:mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">
              {progress}%
            </span>
          </div>
          <div className="w-full h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: iconColor,
              }}
            />
          </div>
        </div>
      )}

      {/* {trend && (
        <div className="flex items-center gap-1.5 mt-3 md:mt-4">
          <Icon
            name={trend.direction === 'up' ? 'TrendingUp' : 'TrendingDown'}
            size={14}
            color={
              trend.direction === 'up'
                ? 'var(--color-success)'
                : 'var(--color-error)'
            }
            className="md:w-4 md:h-4"
          />
          <span
            className="text-xs md:text-sm font-medium"
            style={{
              color:
                trend.direction === 'up'
                  ? 'var(--color-success)'
                  : 'var(--color-error)',
            }}
          >
            {trend.value}
          </span>
          <span className="text-xs text-muted-foreground">
            {trend.label}
          </span>
        </div>
      )} */}
    </div>
  );
};

export default StatCard;
