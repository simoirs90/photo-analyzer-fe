import { useState } from 'react';

export const useFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const selectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files);

    if (selected.length > 10) {
      alert("Massimo 10 file");
      return;
    }

    setFiles(selected);
  };

  const uploadFiles = async (userId: string, onSuccess?: () => void) => {
    if (files.length === 0) return;

    if (files.length > 10) {
      alert("Puoi caricare massimo 10 foto alla volta");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file); 
    });

    formData.append("userId", userId);

    try {
      setLoading(true);
      setStatus("idle");

      const res = await fetch("http://localhost:8080/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload fallito");
      }

      console.log("Upload completato");
      setFiles([]);
      setStatus("success")
      onSuccess?.();

    } catch (err) {
      console.error(err);
      setStatus("error");
      
    } finally {
      setLoading(false);
    }
  };

  const resetFiles = () => setFiles([]);

  return { files, loading, status, selectFiles, uploadFiles, resetFiles };
};