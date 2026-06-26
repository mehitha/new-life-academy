'use client';  // ✅ Add this for client-side features (scrollToTop)

import React from "react";
import Link from 'next/link';          // ✅ Add Next.js Link
import Image from 'next/image';        // ✅ Add Next.js Image
import { 
  FaWhatsapp, FaPhone,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp 
} from "react-icons/fa";

function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">

      <div className="footer-top">
        
        {/* Column 1 - Left */}
        <div className="footer-logo">
         <Link href="/">
 <Image 
  src="/new3.png" 
  alt="new life academy Logo" 
  width={40}
  height={40}
  unoptimized
  priority
  style={{ 
    transform: 'scale(0.8)',  // ✅ Reduce size
    transformOrigin: 'center',
  }}
/>
</Link>
          
          <p>
            New Life Academy is a youth-focused initiative dedicated to shaping a healthier and more purpose
            <Link href="/about" style={{ color: "#d3a50e", marginLeft: "5px", fontWeight: "bold" }}>
              Read More
            </Link>
          </p>

          <div className="footer-social">
            <a href="https://wa.me/9942235305" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
            <a href="tel:9942235305">
              <FaPhone style={{ 
                transform: 'rotate(90deg)',
                WebkitTransform: 'rotate(100deg)'
              }} />
            </a>
          </div>
        </div>

        {/* Column 2 - Center (Quick Links) */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/resourcepeople">Resource People</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3 - Right (Social / Contact) */}
        <div className="footer-contact">
          <h4>Get In Touch</h4>
          <ul>
            <li><FaMapMarkerAlt /> <span>NEW LIFE SOCIETY
13/81A ,MAIN ROAD NALUMAVADI
TUTICORIN 628211 ,
Tamil Nadu, India</span></li>
            <li><FaPhoneAlt /> +919942235305</li>
            <li><FaEnvelope /> mt@newlifesociety.in</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} New Life Academy. All Rights Reserved.</p>
      </div>

      <button className="scroll-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>

    </footer>
  );
}

export default Footer;