import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../assets/styles/components/common/WhatsAppButton.css";

const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
const textMessage = "Hi%2C%20I%20want%20to%20reserve%20a%20table";    
const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${whatsappNumber}?text=${textMessage}`}
    className="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaWhatsapp size={32} />
  </a>
);

export default WhatsAppButton;
