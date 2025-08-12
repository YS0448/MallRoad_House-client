import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import "../../../assets/styles/customer/Gallery/Gallery.css";
import CustomHeroSection from "../../components/layout/CustomHeroSection";
import apiCall from "../../../api/apiCall";
import no_data_img from "../../../assets/media/image/no_data.jpg";

const Gallery = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await apiCall("GET", "/api/getGalleryItems");
        setData(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        setData([]); // fallback to empty
      }
    };

    fetchImages();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <>
      <CustomHeroSection
        title="GALLERY"
        slogan="Explore our gallery to see the vibrant atmosphere and delicious offerings of our restaurant. From mouthwatering dishes to cozy interiors, our gallery captures the essence of dining with us."
      />

      <div className="gallery-container">
        {data.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img
              src={no_data_img}
              alt="No data"
              style={{ maxWidth: "300px", width: "100%", opacity: 0.7 }}
            />
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data.map((img, index) => (
              <div key={index} className="gallery-item">
                <img
                  src={`${baseUrl}/${img.image_path.replace(/^\//, "")}`}
                  alt={img.image_name || `img-${index}`}
                />
                <div className="overlay">
                  <div className="image_name">{img.image_name}</div>
                  <div className="image_description">{img.description}</div>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </>
  );
};

export default Gallery;
