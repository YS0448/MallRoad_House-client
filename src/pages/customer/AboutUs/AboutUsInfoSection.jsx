import React from "react";
import "../../../assets/styles/customer/AboutUs/AboutUsInfoSection.css";
import dining_space_img2 from "../../../assets/media/image/dining_space_img2.png";

const AboutUsInfoSection = () => {
  return (
    <section className="aboutus-info-section container py-5 my-5">
      <h2 className="aboutus-heading text-center mb-4">Welcome to Mallroad House</h2>
      <p className="aboutus-subtext text-center mb-5">
        Where heritage meets hospitality, and every dish tells a story.
      </p>
    <div className=" text-center mb-5">
<img src={dining_space_img2} alt="Mallroad House Dining Area" className="aboutus-main-img" />
    </div>

      <div className="aboutus-content">
        <p>
          At Mallroad House, our story is built on decades of dedication to hospitality and culinary artistry—crafted by a team whose journey spans five-star hotels, global kitchens, and a shared passion for creating memorable dining experiences.
        </p>

        <p>
          <strong>Mr. Singh</strong>, the heart of our front-of-house team, began his hospitality journey at the prestigious Taj Mahal Hotel in New Delhi. He went on to work with global brands like the Hyatt Regency, gaining invaluable experience across international locations. In East Dunbartonshire, Mr. Singh has worked around Bishopbriggs, Lenzie, and Kilsyth since 2009—managing respected venues with care and excellence. With his calm leadership and warm hospitality, he ensures every guest feels at home from the moment they walk through our doors.
        </p>

        <p>
          <strong>Chef Lalit Rautela</strong> has honed his culinary skills at some of India’s most iconic establishments including The Taj Mahal Hotel, India Habitat Centre, and The Claridges, New Delhi. His journey has taken him across India, Australia, Malta, and now Scotland, bringing a world of flavours and refined techniques to every dish he creates.
        </p>

        <p>
          <strong>Chef Anil</strong>, who previously worked alongside Chef Lalit at The Claridges, brings a wealth of international
          experience from prestigious kitchens such as JW Marriott, Hilton, and The Lalit—across India, Malaysia,
          and Dubai. His creativity and precision elevate traditional Indian dishes with a modern flair.
        </p>

        <p>
          Together, we’ve built a talented and passionate team ready to deliver something truly special to our
          guests and the local community. We’ve dreamed of starting our own restaurant for a long time—but never
          had the chance. Now, by God’s grace, that opportunity is finally here. With dedication, experience,
          and heart, we’re proud to open Mallroad House—and we humbly ask for your support as we begin this
          exciting journey.
        </p>

        <p>
          We welcome you to be part of our story—through flavour, culture, and heartfelt hospitality.
        </p>
      </div>
    </section>
  );
};

export default AboutUsInfoSection;
