import React from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { UploadButton } from '../../components/UploadButton';
import styles from './UploadPage.module.css';

export const UploadPage: React.FC = () => {
  const { file, selectFile, uploadFile, resetFile } = useFileUpload();

  return (
    <div className={styles.container}>
      <h1>Carica il tuo file</h1>

      <input type="file" onChange={selectFile} className={styles.inputFile} />

      <UploadButton onClick={uploadFile} />

      {file && (
        <div>
          <p>Selezionato: {file.name}</p>
          <button onClick={resetFile} className={styles.resetButton}>
            Rimuovi
          </button>
        </div>
      )}
    </div>
  );
};