'use client';  // ✅ Add this for useState

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Share2, ArrowUpRight, MessageSquare, User, School } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import Image from 'next/image';  // ✅ Add Next.js Image

// import Header from "../components/Header";
// import Footer from "../components/Footer";

import contactHero from "../assets/con4.png";
// import "./Contact.css";  // ❌ REMOVED - moved to _app.js

const SHEETDB_URL = "https://sheetdb.io/api/v1/i184dnsc7bjbz";

const Contact = () => {
  const formRef = useRef();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", countryCode: "+91" });
  const [showRating, setShowRating] = useState(false);
  const [status, setStatus] = useState("");

  // INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      name: name === "Name" ? value : prev.name,
      email: name === "Email" ? value : prev.email,
      phone: name === "Phone" ? value : prev.phone,
    }));
  };

  // PURPOSE
  const handlePurposeChange = (e) => {
    const purpose = e.target.value;
    setShowRating(purpose === "Feedback");
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const purpose = formRef.current?.purpose?.value;

    const postData = {
      data: [
        {
          name: formData.name || formRef.current?.Name?.value,
          email: formData.email || formRef.current?.Email?.value,
          phone: formRef.current?.Phone?.value,
          institution: formRef.current?.["Institution Name"]?.value || "",
          message: formRef.current?.message?.value,
          timestamp: new Date().toLocaleString(),
        },
      ],
    };

    if (purpose === "Feedback") {
      postData.data[0].rating = rating;
    }

    let sheetName = "";
    if (purpose === "Feedback") sheetName = "Feedback";
    else if (purpose === "Invite New Life Academy") sheetName = "Invite";

    try {
      setStatus("sending");

      await fetch(`${SHEETDB_URL}?sheet=${sheetName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      setStatus("success");
      setTimeout(() => setStatus(""), 3000);

      formRef.current.reset();
      setRating(0);
      setShowRating(false);
      setFormData({ name: "", email: "", phone: "", countryCode: "+91" });

    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <>
      {/* <Header /> */}

      <div className="contact-page"
      >
        
        {/* HERO SECTION */}
      <section
  className="contact-hero"
  style={{
    position: "relative",
    width: "100%",
    overflow: "hidden",
  }}
>
  <Image
    src={contactHero}
    alt="Contact us banner"
    className="hero-image"
    fill
    priority
    style={{ objectFit: "inherit", objectPosition: "center 55%" }}
  />

  <div className="hero-overlay" />

  <div className="hero-content">
    {/* Content */}
  </div>
</section>

<style jsx>{`
  .contact-hero {
    position: relative;
    width: 100%;
    height: 50vh; /* Desktop */
    min-height: 180px;
    overflow: hidden;
  }

  /* Mobile */
  @media (max-width: 767px) {
    .contact-hero {
      height: 15vh;
      min-height: 150px;
    }
  }

  /* iPad Mini & iPad */
  @media (min-width: 768px) and (max-width: 1024px) {
    .contact-hero {
      height: 20vh;
      min-height: 250px;
    }
  }

  /* iPad Pro */
  @media (min-width: 1025px) and (max-width: 1366px) {
    .contact-hero {
      height: 30vh;
      min-height: 300px;
    }
  }
`}</style>

        {/* BODY SECTION */}
        <section className="contact-body">
          <div className="contact-container">

            {/* LEFT SIDE - INFO */}
            <div className="contact-info">
              <h2 className="info-title">Contact Us</h2>
              <div className="info-grid">
                <div>
                  <div className="info-item"><MapPin className="info-icon" /><h4 className="info-label">Location</h4></div>
                  <p className="info-value">New Life Academy,
13/81A, Main Road Nalumavadi,
Tuticorin 628211,
Tamil Nadu, India</p>
                </div>
                <div>
                  <div className="info-item"><Phone className="info-icon" /><h4 className="info-label">Phone</h4></div>
                  <p className="info-value">+919942235305</p>
                </div>
                <div>
                  <div className="info-item"><Mail className="info-icon" /><h4 className="info-label">Email</h4></div>
                  <p className="info-value">mt@newlifesociety.in</p>
                </div>
                <div>
                  <div>
                    <div className="info-item">
                      <FaWhatsapp className="info-icon" />
                      <h4 className="info-label">WhatsApp</h4>
                    </div>
                    <p className="info-value">
                      <a href="https://wa.me/919942235305" target="_blank" rel="noreferrer">
                        +91 99422 35305
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-item">
                <MapPin className="info-iconn" />
                <h4 className="info-labell">Locate Us</h4>
              </div>

              {/* Google Maps */}
              <div style={{ width: "100%", height: "335px", borderRadius: "10px", overflow: "hidden" }}>
                <iframe
                src="https://www.google.com/maps?q=NEW+LIFE+SOCIETY,+13/81A+MAIN+ROAD,+NALUMAVADI,+TUTICORIN+628211,+Tamil+Nadu,+India&output=embed"
                  style={{ width: "100%", height: "100%", border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <motion.div 
              className="contact-form"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="form-title">Kindly Fill The Below Form</h3>
              <p className="form-description">Feel Free To Contact Us !</p>

              <form ref={formRef} className="form-content" onSubmit={handleSubmit}>

                <div className="input-group">
                  <input type="text" name="Name" placeholder="Enter Name" className="input-field" required value={formData.name} onChange={handleInputChange} />
                  <User className="input-icon" />
                </div>

                <div className="input-group">
                  <input type="email" name="Email" placeholder="Enter Email" className="input-field" required value={formData.email} onChange={handleInputChange} />
                  <Mail className="input-icon" />
                </div>

                <div className="input-group">
                  <div className="input-box">
                    <select 
                      className="country-code"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({ ...formData, countryCode: e.target.value })
                      }
                    >
                      <option value="+91">🇮🇳 +91</option>
                    </select>

                    <input 
                      type="tel"
                      name="phone"
                      placeholder="Phone No"
                      className="input-field"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        if (value.length <= 10) {
                          setFormData({ ...formData, phone: value });
                        }
                      }}
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <input type="text" name="Institution Name" placeholder="Institution Name" className="input-field" />
                  <School className="input-icon" />
                </div>

                <div className="">
                  <select name="purpose" className="input-field" required onChange={handlePurposeChange}>
                    <option value="">Select Purpose</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Invite New Life Academy">To Invite New Life Academy</option>
                  </select>
                </div>

                {showRating && (
                  <div className="input-group rating-group">
                    <label>Rate your experience:</label>
                    <div className="stars">
                      {[1,2,3,4,5].map((star) => (
                        <FaStar key={star} size={24}
                          style={{cursor:"pointer", marginRight:5}}
                          color={(hoverRating || rating) >= star ? "#ffc107" : "#e4e5e9"}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="input-group textarea-wrap">
                  <textarea name="message" placeholder="Your Message..." rows={1} className="textarea-field" required />
                  <MessageSquare className="input-icon" />
                </div>

                <button type="submit" className="submit-btn">
                  Submit <ArrowUpRight className="icon-arrow" />
                </button>

                {status === "sending" && <p style={{ color:"blue" }}>Sending...</p>}
                {status === "success" && <p style={{ color:"green" }}>✅ Form submitted successfully!</p>}
                {status === "error" && <p style={{ color:"red" }}>❌ Failed to submit.</p>}
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default Contact;