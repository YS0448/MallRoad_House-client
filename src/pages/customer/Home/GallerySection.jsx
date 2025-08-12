import React, { useState } from "react";
import Masonry from "react-masonry-css";
import gallery_image from '../../../assets/media/image/gallery_images/index';
import '../../../assets/styles/customer/Home/GallerySection.css';
const GallerySection = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Static data 
  const staticData = [
    {
      id: 1,
      image_path: gallery_image.chicken_tenders,
      image_name: "Chicken Tenders",
      description:
        "Tender strips of white meat, breaded and fried, often served as a snack or main course.",
    },
    {
        id: 2,
        image_path: gallery_image.golden_fried_prawns,
        image_name: "Golden Fried Prawns",
        description:
        "Crispy golden prawns, perfectly fried, juicy and flavorful bites.",
    },
    {
        id: 3,
        image_path: gallery_image.kadhai_paneer,
        image_name: "Kadhai Paneer",
        description:
        "Spicy paneer cooked with bell peppers, onions, and rich spices.",
    },
    {
      id: 4,
      image_path: gallery_image.chicken_tikka,
      image_name: "Chicken Tikka",
      description:
        "Juicy grilled chicken chunks marinated in flavorful Indian spices.",
    },
    {
      id: 5,
      image_path: gallery_image.paneer_tikka,
      image_name: "Paneer Tikka",
      description:
        "Grilled, marinated, spiced Indian paneer appetizer, smoky, served with mint chutney.",
    },
    {
      id: 6,
      image_path: gallery_image.spring_rolls,
      image_name: "Spring Rolls",
      description:
        "Crispy fried rolls, typically filled with vegetables and/or meat, a popular appetizer.",
    },
    {
      id: 7,
      image_path: gallery_image.rich_currie_fluffy_rice_bread,
      image_name: "Rich Currie with Fluffy Rice & Bread",
      description:
        "Two flavorful Indian curries, basmati rice, and fresh naan bread served.",
    },
    // Add more items as needed
  ];

  const [data] = useState(staticData);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <div className="gallery-section">
      <h2 className="my-5 gallery-heading">GALLERY</h2>
      <h4>Explore our collection of beautiful images.</h4>
      <div className="gallery-container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {staticData.map((img, index) => (
            <div key={img.id || index} className="gallery-item">
              <img
                src={img.image_path}
                alt={img.image_name || `img-${index}`}
              />
              <div className="overlay">
                <div className="image_name">{img.image_name}</div>
                <div className="image_description">{img.description}</div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default GallerySection;
