import { UploadPage } from '../upload/UploadPage';
import PhotoGallery from '../show/PhotoGallery';

export const Dashboard = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "25%" }}>
        <UploadPage />
      </div>
      <div style={{ height: "75%" }}>
        <PhotoGallery />
      </div>  
    </div>
  );
};