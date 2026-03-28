import React, { useEffect, useState } from "react";
import styles from "./PhotoGallery.module.css";
import { usePhotos } from "../../hooks/usePhotos";
import { useAuth } from "../../context/AuthContext";

type Photo = {
  id: string;
  url: string;
};

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

  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const { photos, loading, error } = usePhotos(user?.id, page, 12);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
            {mockPhotos.map((name, index) => ( //quando è pronta la chiamata si sostituisce con photos.map
                <div key={index} className={styles.card}>
                    <img
                        src={`/testPhotos/${name}`} // qui la getById
                        alt={name}
                        className={styles.image}
                        onError={(e) => {
                          console.log("Errore su: ", name);
                        }}
                    />
                </div>
            ))}
     </div>
    </div>
  );
};

export default PhotoGallery;