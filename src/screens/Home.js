import React from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      {/* putting the carousel */}
      <div>
        <Carousel/>
      </div>

      {/* putting the card here below */}

      <div className="m-3">
        {[...new Array(5)].map(()=> 
          <Card />
        )}
        
         <Card />
        <Card />
        <Card />
        <Card />
        <Card /> 
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
