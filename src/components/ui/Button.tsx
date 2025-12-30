import React from 'react';
import { Button as AntButton } from 'antd';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success' | 'warning' | 'danger'
type Size = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon'

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> & {
  htmlType?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconName?: string | null;
  iconPosition?: 'left' | 'right';
  iconSize?: number | null;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className,
  variant = 'default',
  size = 'default',
  children,
  loading = false,
  iconName = null,
  iconPosition = 'left',
  iconSize = null,
  fullWidth = false,
  disabled = false,
  htmlType = 'button',
  ...props
}, ref) => {
  const antType: 'default' | 'primary' | 'link' | 'text' =
    variant === 'link' ? 'link' :
    variant === 'ghost' ? 'text' :
    variant === 'default' ? 'primary' : 'default'

  const danger = variant === 'danger' || variant === 'destructive'

  const sizeMap: Record<Size, 'small' | 'middle' | 'large'> = {
    xs: 'small',
    sm: 'small',
    default: 'middle',
    lg: 'large',
    xl: 'large',
    icon: 'middle',
  }

  const iconSizeMap: Record<Size, number> = {
    xs: 12,
    sm: 14,
    default: 16,
    lg: 18,
    xl: 20,
    icon: 16,
  }
  const calculatedIconSize = iconSize || iconSizeMap[size]

  const variantClass =
    variant === 'success' ? 'bg-success text-success-foreground hover:bg-success/90' :
    variant === 'warning' ? 'bg-warning text-warning-foreground hover:bg-warning/90' :
    variant === 'outline' ? 'border border-border' :
    variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' :
    variant === 'default' ? '' : ''

  return (
    <AntButton
      type={antType}
      htmlType={htmlType}
      danger={danger}
      loading={loading}
      size={sizeMap[size]}
      className={cn(fullWidth && 'w-full', variantClass, className)}
      disabled={disabled}
      ref={ref as any}
      {...props}
    >
      {iconName && iconPosition === 'left' && (
        <Icon name={iconName} size={calculatedIconSize} className={children ? 'mr-2' : ''} />
      )}
      {children}
      {iconName && iconPosition === 'right' && (
        <Icon name={iconName} size={calculatedIconSize} className={children ? 'ml-2' : ''} />
      )}
    </AntButton>
  )
})

Button.displayName = 'Button'
export default Button
