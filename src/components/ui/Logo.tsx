import React from 'react';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size: _size = 'md' }) => {
    /*
    const sizes = {
      sm: 'h-8',
      md: 'h-12',
      lg: 'h-16'
    };
    */

    return (
        <div className="flex items-center gap-3">
            <div className="flex flex-col">
                <span className="text-3xl font-bold bg-gradient-to-r from-[#0277BD] to-[#00BCD4] bg-clip-text text-transparent">
                    FOUR
                </span>
                <span className="text-3xl font-bold bg-gradient-to-r from-[#FF9800] to-[#F4511E] bg-clip-text text-transparent">
                    SYMMETRONS
                </span>
            </div>
        </div>
    );
};

export default Logo;
