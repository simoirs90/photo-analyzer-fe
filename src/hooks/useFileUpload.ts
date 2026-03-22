import { useState } from 'react';

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    // implementa logica di upload
    console.log("Upload:", file.name);
  };

  const resetFile = () => setFile(null);

  return { file, selectFile, uploadFile, resetFile };
};