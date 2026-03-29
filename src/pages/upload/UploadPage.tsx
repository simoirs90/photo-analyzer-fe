import React from 'react';
import { useFileUpload } from '../../hooks/useFileUpload';
import styles from './UploadPage.module.css';
import { useAuth } from '../../context/AuthContext';

export const UploadPage: React.FC = () => {
  const { files, selectFiles, uploadFiles, loading, status } = useFileUpload();
  const { login, register, user, logout } = useAuth();

  const handleUploadSuccess = () => {
    // fetchPhotos();
  };

  return (
    <div className={styles.container}>
  <h1 className={styles.title}>Album di {user?.name}</h1>

 <label className={styles.customFile}>
      Seleziona foto
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={selectFiles}
        className={styles.hiddenInput}
      />
    </label>
    
    <button onClick={() => user?.id && uploadFiles(user.id.toString(), handleUploadSuccess)} disabled={loading || files.length === 0} className={styles.uploadBtn} >
      {loading ? "Uploading..." : "Upload"}
    </button>
    
    {files.length > 0 && status === "idle" && (
      <span>{files.length} file selezionati</span>
    )}

    {status === "success" && (
      <span className={styles.success}>
        Foto caricate correttamente
      </span>
    )}

    {status === "error" && (
      <span className={styles.error}>
        {files.length > 0 && `${files.length} file selezionati `}
        <span className={styles.errorText}>
          Errore di caricamento
        </span>
      </span>
    )}
</div>
  );
};