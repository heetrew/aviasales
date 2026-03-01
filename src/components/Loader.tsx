import React from 'react';

interface LoaderProps {
  text: string;
  hidden: boolean;
}

const Loader: React.FC<LoaderProps> = ({ text, hidden }) => {
  return (
    <div id="loader" className={`loader${hidden ? ' hidden' : ''}`}>
      <div 
        className="btn btn-primary" 
        style={{ 
          width: '60px', 
          height: '60px', 
          padding: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          animation: 'spin 1s linear infinite' 
        }}
      >
        ✈
      </div>
      <p id="loader-text" className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
