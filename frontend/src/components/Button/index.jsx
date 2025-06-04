import React, { useState } from 'react';
import Icons from '../Icons';

const Button = ({ label, icon, className = 'text-black px-4 py-2', onClick, isLoading = false }) => {
  const [ripples, setRipples] = useState([]);
  const [isHovering, setIsHovering] = useState(false);

  const createRipple = (event) => {
    if (isHovering || isLoading) return; 
    setIsHovering(true);
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples([newRipple]);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRipples([]);
  };

  return (
    <button
      className={`relative flex items-center justify-center gap-2 text-black ${className} overflow-hidden pointer-events-auto group ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
      onMouseEnter={createRipple}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="relative z-20 flex items-center gap-2">
        {isLoading ? (
          <span className="flex items-center gap-2">
            {label}
            <svg
              className="animate-spin h-5 w-5 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="opacity-75"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="15 45"
                strokeDashoffset="15"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 12 12"
                  to="360 12 12"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </span>
        ) : (
          <>
            {label}
            {icon && (
              <span className="inline-block transform transition-transform duration-300 group-hover:rotate-45">
                {React.createElement(Icons[icon], { className: 'h-5 w-auto' })}
              </span>
            )}
          </>
        )}
      </span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-gray-500/20 rounded-full animate-ripple-persist z-10"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </button>
  );
};

export default Button;