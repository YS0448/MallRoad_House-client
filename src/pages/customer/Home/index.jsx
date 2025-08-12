import React from 'react';
// import main_img from '../../../assets/media/image/main_img2.png';
import '../../../assets/styles/customer/Home/Home.css';
import HeroSection from './HeroSection';
import AboutUsSection from './AboutUsSection';
import CuisinesSection from './CuisinesSection';
import ReserveForm from '../../components/layout/ReservationForm/ReservationForm';
import GallerySection from './GallerySection';
const Home = () => {
  return (
    <>
        <HeroSection />
        <AboutUsSection />
        <GallerySection />
        <CuisinesSection />
        {/* <ReserveForm /> */}
    </>
  );
};

export default Home;
