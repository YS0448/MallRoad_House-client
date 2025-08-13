import React from 'react';
import { Link } from "react-router-dom";
import '../../../assets/styles/customer/Home/AboutUsSection.css';
import dining_space_img from "../../../assets/media/image/dining_space_img.png";
import juice_img from '../../../assets/media/image/juice_img1.png';

const AboutUsSection = () => {
    return (
        <div className="aboutUsSection ">
            <div className="row m-0 ">
                <div className="col-md-7 pe-md-5 mb-sm-3 ">
                    <h2 className='aboutUsHeading my-5'>About Us</h2>
                    <h4 className='aboutUsSubHeading'>
                        Zesty Gourmet Restaurant
                    </h4>
                    <p className='aboutUsDescription'>
                        Welcome to our restaurant! We are dedicated to providing you with the best dining experience.
                        Our chefs use only the freshest ingredients to create delicious meals that will leave you wanting more.
                        Join us for a meal and experience the warmth of our hospitality.
                    </p>
                    
                      <Link to="/about_us" className="moreAboutUsBtn mb-2 mb-md-0">MORE ABOUT US</Link>
                </div>

                <div className="col-md-5 aboutUs_images">
                    <img src={dining_space_img} alt="" className='aboutUsImg1 '/>    

                    <img src={juice_img} alt="" className='aboutUsImg2'/>    
                </div>
            </div>            
        </div>
    );
}

export default AboutUsSection;