"use client";

import React from "react";
import Envelope from "./components/Envelope";
import ScrollRose from "./components/ScrollRose";
import Header from "./Header";

const page = () => {
  return (
    <div>
      {/* 1. Zarf animasyonu */}
      <Envelope />
      
      {/* 2. Gül animasyonu */}
      <ScrollRose />
      
      {/* 3. Tüm içerik (Header) */}
      <Header />
    </div>
  );
};

export default page;