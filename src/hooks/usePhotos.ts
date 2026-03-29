import { useState, useEffect, useCallback } from 'react';
import type { Photo, PhotoResponse } from '../model/Model';


export const usePhotos = (userId: number | undefined, page: number = 0, size: number = 10) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_BACKEND_URL;

  const fetchPhotos = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams({
        userId: userId.toString()
      });

      const response = await fetch(`${apiUrl}/photos/all?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error('Errore nel recupero delle foto');
      }

      const data: PhotoResponse = await response.json();

      console.log('Photos: ' + data.metadata.size);

      setPhotos(data.metadata.photos);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore sconosciuto');

    } finally {
      setLoading(false);
    }
    
  }, [userId, page, size]);

  // Esegue il fetch automaticamente quando cambiano i parametri
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error, refresh: fetchPhotos };
};