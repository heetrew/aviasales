import React from 'react';

interface ControlsProps {
  onChoice: (choice: boolean) => void;
  disabled?: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onChoice, disabled }) => {
  return (
    <nav className="controls">
      <button 
        id="btn-no" 
        className="btn btn-no" 
        aria-label="Ложь" 
        onClick={() => !disabled && onChoice(false)}
        disabled={disabled}
      >
        ✖
      </button>
      <button 
        id="btn-yes" 
        className="btn btn-yes" 
        aria-label="Правда" 
        onClick={() => !disabled && onChoice(true)}
        disabled={disabled}
      >
        ✔
      </button>
    </nav>
  );
};

export default Controls;
