import React, { useEffect, useState } from "react";
import styles from "./PhotoGallery.module.css";

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

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
            {mockPhotos.map((name, index) => (
                <div key={index} className={styles.card}>
                    <img
                        src={`/testPhotos/${name}`}
                        alt={name}
                        className={styles.image}
                        onError={() => console.log("Errore su:", name)}
                    />
                </div>
            ))}
     </div>
     
    </div>
  );
};

export default PhotoGallery;