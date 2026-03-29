import React, { useEffect, useState } from "react";
import styles from "./PhotoGallery.module.css";
import { usePhotos } from "../../hooks/usePhotos";
import { useAuth } from "../../context/AuthContext";
import { usePhoto } from "../../hooks/usePhoto";

const mockPhotos = [
  "cats-2.png",
  "cats-3.jpg",
  "cats-4.jpg",
  "cats.jpg",
  "city.jpg",
  "seaship.jpg",
  "vinyl.jpg",
  "vinyl2.jpg",
  "cats-2.png",
  "cats-3.jpg",
  "cats-4.jpg",
  "cats.jpg",
  "city.jpg",
  "seaship.jpg",
  "vinyl.jpg",
  "vinyl2.jpg"
];

const PhotoGallery: React.FC = () => {

  const { user, isAuthLoading } = useAuth();

  console.log("Stato auth: ", { user, isAuthLoading });

  const [page, setPage] = useState(0);
  const { photos, loading, error } = usePhotos(user?.id, page, 12);
  const { getPhotoUrl } = usePhoto();

  if (isAuthLoading) {
    return <p className={styles.message}>Verifica sessione..</p>;
  }

  if (!user) {
    return <p className={styles.message}>Effettua il login per vedere le foto</p>;
  }

  if (loading) {
    return <p className={styles.message}>Foto in caricamento.. </p>;
  }

  if (error) {
    return <p className={styles.message}>Errore caricamento foto</p>;
  }
  
  if (!photos || photos.length === 0) {
    return <p className={styles.message}>Ancora nessuna foto</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
            {photos.map((photo, index) => (
                <div key={photo.id} className={styles.card}>
                    <img
                        src={getPhotoUrl(photo.id, user?.id)}
                        alt={photo.name}
                        className={styles.image}
                        onError={(e) => {
                          console.log("Errore su: ", photo.id);
                        }}
                    />
                </div>
            ))}
     </div>
    </div>
  );
};

export default PhotoGallery;