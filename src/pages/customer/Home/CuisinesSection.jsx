import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../../../assets/styles/customer/Home/CuisinesSection.css';
import matka_biryani from '../../../assets/media/image/matka_biryani_img.png';
import kadhai_paneer from '../../../assets/media/image/kadhai_paneer.jpeg';
import chicken_tikka from '../../../assets/media/image/chicken_tikka.jpeg';
import butter_chicken from '../../../assets/media/image/butter_chicken.jpeg';
import tandoori_roti from '../../../assets/media/image/tandoori_roti.jpeg';

import paneer_tikka from '../../../assets/media/image/paneer_tikka.jpg';
import golden_fried_prawns from '../../../assets/media/image/golden_fried_prawns.jpg';
import spring_rolls from '../../../assets/media/image/spring_rolls.jpg';
import chicken_tenders from '../../../assets/media/image/chicken_tenders.jpg';
import rich_currie_fluffy_rice_bread from '../../../assets/media/image/rich_currie_fluffy_rice_bread.jpg';

const cuisines = [
  {
    title: 'Paneer Tikka',
    image: paneer_tikka,
    desc: 'Grilled, marinated, spiced Indian paneer appetizer, smoky, served with mint chutney.'
  },
  {
    title: 'Golden Fried Prawns',
    image: golden_fried_prawns,
    desc: 'Description: Crispy, golden-fried prawns served with a fresh, vibrant salad.'
  },
  {
    title: 'Spring Rolls',
    image: spring_rolls,
    desc: 'Crispy fried rolls, typically filled with vegetables and/or meat, a popular appetizer'
  },
  {
    title: 'Chicken Tenders',
    image: chicken_tenders,
    desc: 'Crispy, golden-brown chicken strips, often served with dipping sauce and fresh garnish. '
  },
  {
    title: 'Currie Rice with Naan',
    image: rich_currie_fluffy_rice_bread,
    desc: 'Two flavorful Indian curries, basmati rice, and fresh naan bread served.'
  }
];


const CuisinesSection = () => {
  return (
    <div className="cuisines-section ">
      {/* <h2 className="my-5 cuisines-heading">Explore by Our Cuisines</h2> */}
      <h2 className="my-5 cuisines-heading">EXPLORE BY OUR CUISINES</h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {cuisines.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="cuisine-card">
                <img src={item.image} alt={item.title} className="cuisine-img" />
                <h5 className="text-center mt-2">{item.title}</h5>
                <p className="text-center cuisine-desc">{item.desc}</p>
              </div>
            </SwiperSlide>
        ))}
      </Swiper>
        {/* <div className="text-center mt-4">
          <button className="view-cuisines-btn">View All Cuisines</button>
        </div> */}
        <div className="text-center mt-5">
            <Link to="/menu" className="view-cuisines-btn">View All Cuisines</Link>
        </div>
    </div>
  );
};

export default CuisinesSection;
