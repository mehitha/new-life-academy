import React, { useState, useEffect } from "react";
// import "../styles/hero.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function Hero() {

  const images = ["/hero2.png", "/hero1.png", "/hero3.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* 🔥 HERO SECTION */}
      <section
        key={index}
        className="hero"
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
           position: 'relative',
          width: '100%',
          height: '90vh',
          minHeight: '150px',
          overflow: 'hidden',
        }}
        
      >
        <div className="hero-overlay">
          {/* <p className="hero-small">Wisdom Foundation</p> */}
        </div>

        <div className="hero-arrows">
          <div className="arrow green" onClick={prevSlide}>
            <FaArrowLeft />
          </div>

          <div className="arrow yellow" onClick={nextSlide}>
            <FaArrowRight />
          </div>
        </div>
      </section>

   
      <h2 className="session-title">“The fear of the Lord is the beginning of wisdom.”</h2>
      <section className="session-section">
        
  <div className="session-container">
        
    <p className="session-text">
      Our sessions focus on practical life guidance that helps students navigate the challenges of adolescence and youth.
    </p>

    <ul className="session-list">
      <li>Developing focus and discipline in studies</li>
      <li>Understanding the importance of education for life success</li>
      <li>Awareness about the dangers of alcohol, drugs, and smoking</li>
      <li>Practical strategies to overcome addictions</li>
      <li>Building confidence, character, and purpose</li>
      <li>Motivating students to become the best version of themselves</li>
    </ul>

    <p className="session-text">
      Our programs are designed to be interactive, practical, and relatable, enabling students to apply what they learn in their daily lives.
    </p>

  </div>
</section>
    </>
  );
}

export default Hero;