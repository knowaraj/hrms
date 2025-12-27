import * as LucideIcons from 'lucide-react';
import { HelpCircle, type LucideProps } from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
    name: string;
}

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}: IconProps) {
    // @ts-ignore - Dynamic access to lucide icons
    const IconComponent = (LucideIcons as any)[name];

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;
