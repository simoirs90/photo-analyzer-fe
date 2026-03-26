import './App.css'
import PhotoGallery from './pages/show/PhotoGallery'
import { UploadPage } from './pages/upload/UploadPage'

function App() {

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ height: "20%" }}>
        <UploadPage />
      </div>
      <div style={{ height: "20%" }}>
        <PhotoGallery />
      </div>  
    </div>
  )
}

export default App
