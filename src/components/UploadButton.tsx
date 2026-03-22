import React from 'react';

interface UploadButtonProps {
  onClick: () => void;
  label?: string;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onClick, label = "Carica" }) => {
  return (
    <button onClick={onClick} className="upload-button">
      {label}
    </button>
  );
};