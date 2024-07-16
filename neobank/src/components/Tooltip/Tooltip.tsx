import './Tooltip.scss';
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="tooltip-container" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && <div className="tooltip">{text}</div>}
    </div>
  );
};

export default Tooltip;
