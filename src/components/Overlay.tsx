import React from 'react';

interface OverlayProps {
  active: boolean;
  title: string;
  description: string;
  adText: string;
  btnText: string;
  onConfirm: () => void;
  titleClassName?: string;
}

const Overlay: React.FC<OverlayProps> = ({ 
  active, 
  title, 
  description, 
  adText, 
  btnText, 
  onConfirm,
  titleClassName = ''
}) => {
  return (
    <div className={`overlay${active ? ' active' : ''}`}>
      {active 
        ? (
          <div className="result-content">
            <h2 className={`result-title${titleClassName ? ' ' + titleClassName : ''}`}>{title}</h2>
            <p className="result-desc">{description}</p>
            <div className="ad-text">{adText}</div>
            <button className="btn-primary" onClick={onConfirm}>{btnText}</button>
          </div> 
        )
        : null
      }
    </div>
  );
};

export default Overlay;
