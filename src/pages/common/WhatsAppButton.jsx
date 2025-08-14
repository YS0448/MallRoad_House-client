import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../../assets/styles/components/common/WhatsAppButton.css";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/918448815462?text=Hi%2C%20I%20want%20to%20reserve%20a%20table"
    className="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaWhatsapp size={32} />
  </a>
);

export default WhatsAppButton;
