// src/pages/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header/Header";
import Footer from "../common/Footer";
import WhatsAppButton from "../common/WhatsAppButton";
import MenuButton from "../common/MenuButton";
const PublicLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    <MenuButton />
    <WhatsAppButton />
  </>
);

export default PublicLayout;
