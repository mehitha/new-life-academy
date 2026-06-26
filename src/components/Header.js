'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaWhatsapp,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaBars
} from "react-icons/fa";

function Header() {
  const [dropdown, setDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdown(null);
  };

  const isActive = (path) => pathname === path;

  return (
    <header>
      {/* CONTACT BAR */}
      <div className="contact-bar">
        <div className="contact-left">
          <span>✉ mt@newlifesociety.in</span>
          <span>📞 +919942235305</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo">
        <Link href="/" onClick={closeMenu}>
  <Image 
    src="/new1.png" 
    alt="logo" 
    width={50}
    height={55}
    unoptimized  // ✅ Skip Next.js image optimization
    style={{ transform: "scale(1.6)" }}
    priority
  />
</Link>
        </div>

        {/* HAMBURGER BUTTON */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        {menuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}

        {/* MENU */}
        <ul className={`menu ${menuOpen ? "menu-open" : ""}`}>
          <li>
            <Link 
              href="/" 
              onClick={closeMenu}
              className={isActive('/') ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          
          <li>
            <Link 
              href="/about" 
              onClick={closeMenu}
              className={isActive('/about') ? 'active' : ''}
            >
              About us
            </Link>
          </li>

          {/* ✅ GALLERY - Direct Link (No Dropdown) */}
          <li className="nav-item">
            <Link 
              href="/gallery" 
              onClick={closeMenu}
              className={isActive('/gallery') ? 'active' : ''}
            >
              <span className="gallery-text">Gallery</span>
            </Link>
          </li>

          {/* OLD GALLERY WITH DROPDOWN - COMMENTED */}
          {/*
          <li className="dropdown-li" onClick={() => toggleMenu("pages")}>
            <span className="dropdown-trigger">
              <span className="gallery-text">Gallery</span>
              {dropdown === "pages" ? 
                <FaChevronUp className="dropdown-arrow" /> : 
                <FaChevronDown className="dropdown-arrow" />
              }
            </span>
            {dropdown === "pages" && (
              <ul className="dropdown">
                <li>
                  <Link 
                    href="/gallery" 
                    onClick={closeMenu}
                    className={isActive('/gallery') ? 'active' : ''}
                  >
                    Photo Gallery
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/videos" 
                    onClick={closeMenu}
                    className={isActive('/videos') ? 'active' : ''}
                  >
                    Video Gallery
                  </Link>
                </li>
              </ul>
            )}
          </li>
          */}

          <li>
            <Link 
              href="/resourcepeople" 
              onClick={closeMenu}
              className={isActive('/resourcepeople') ? 'active' : ''}
            >
              Resource
            </Link>
          </li>
          
          <li>
            <Link 
              href="/contact" 
              onClick={closeMenu}
              className={isActive('/contact') ? 'active' : ''}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* DESKTOP BUTTON */}
        <div className="nav-right">
          <a href="tel:+919942235305" className="donate-btn">
            Contact Now →
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;