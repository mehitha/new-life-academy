// import React from "react";
// import { motion } from "framer-motion";
// import contactHero from "./contac.png";

// const Hero = () => {
//   return (
//     <>
//       <style>{`
//         /* ===== HERO CONTAINER ===== */
//         .contact-hero {
//           position: relative;
//           height: clamp(220px, 45vw, 400px);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           min-height: 220px;
//         }

//         .hero-image {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }

//         .hero-overlay {
//           position: absolute;
//           inset: 0;
          
//           // background: rgba(0, 0, 0, 0.4);
         
//         }

//         /* ===== HERO CONTENT - CENTERED ===== */
//         .hero-content {
//           position: relative;
//           z-index: 10;
//           text-align: center;
//           padding: clamp(12px, 4vw, 24px);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           gap: clamp(8px, 3vw, 20px);
//           width: 100%;
//           max-width: 100%;
//         }

//         /* ===== HERO TITLE - MAIN FOCUS ===== */
//         .hero-title {
//   margin: 0;
//   font-size: clamp(1.75rem, 8vw, 4rem);
//   font-weight: 900;

//   color: white;

//   /* ✅ Blue border */
//   -webkit-text-stroke: 2px #cd801b;

//   /* ✅ Shadow glow effect */
//   text-shadow: 
//     0 0 5px rgba(49, 94, 152, 0.6),
//     0 0 10px rgba(12, 44, 85, 0.6),
//     0 2px 2px rgba(0, 0, 0, 0.3);

//   line-height: 1.1;
//   letter-spacing: 1px; /* 👈 slight spacing gives premium look */
//   padding: clamp(8px, 2vw, 16px);
//   width: 100%;

//   /* ✅ Updated Font */
//   font-family: 'Cinzel', serif;
// }

//         /* ===== RESPONSIVE HEIGHTS ===== */
//         @media (max-width: 480px) {
//           .contact-hero {
//             height: clamp(200px, 50vw, 260px);
//           }
//           .hero-title {
//             font-size: clamp(1.5rem, 10vw, 2.5rem);
//           }
//         }

//         @media (min-width: 481px) and (max-width: 768px) {
//           .contact-hero {
//             height: clamp(260px, 40vw, 320px);
//           }
//           .hero-title {
//             font-size: clamp(2rem, 7vw, 3rem);
//           }
//         }

//         @media (min-width: 769px) and (max-width: 1024px) {
//           .contact-hero {
//             height: clamp(320px, 35vw, 380px);
//           }
//           .hero-title {
//             font-size: clamp(2.5rem, 6vw, 3.5rem);
//           }
//         }

//         @media (min-width: 1025px) {
//           .contact-hero {
//             height: clamp(380px, 30vw, 450px);
//           }
//           .hero-title {
//             font-size: clamp(3rem, 5vw, 4.5rem);
//           }
//         }

//         /* ===== iPad Mini Specific (768px - 834px) ===== */
//         @media (min-width: 768px) and (max-width: 834px) {
//           .hero-title {
//             font-size: clamp(2.25rem, 6.5vw, 3.25rem);
//           }
//         }

//         /* ===== TOUCH DEVICES ===== */
//         @media (hover: none) and (pointer: coarse) {
//           .hero-title:active {
//             transform: scale(0.98);
//           }
//         }

//         /* ===== PERFECT CENTERING ===== */
//         .hero-content {
//           max-width: clamp(300px, 90vw, 800px);
//         }
//       `}</style>

//       <section className="contact-hero">
//         <img src={contactHero} alt="Contact Banner" className="hero-image" />
//         <div className="hero-overlay"></div>

//         <div className="hero-content">
//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             Resource People
//           </motion.h1>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;


'use client';  // ✅ Add this

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';  // ✅ Add Next.js Image
import contactHero from "./reso.png";

const Hero = () => {
  return (
    <>
      {/* ✅ Remove <style> tag - move CSS to separate file */}

      <section 
       className="contact-hero"
       style={{
         position: 'relative',
         width: '100%',
         height: '50vh',
         minHeight: '150px',
         overflow: 'hidden',
       }}
     >
       <Image 
         src={contactHero} 
         alt="Contact us banner" 
         className="hero-image"
         fill
         priority
         style={{ objectFit: "cover", objectPosition: "center 50%" }}
       />
       <div className="hero-overlay" />
       <div className="hero-content">
         <motion.h1 
           className="hero-title"
          //  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
           initial={{ opacity: 0, y: 30, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
         >
         Resource People
         </motion.h1>
       </div>
     </section>
    </>
  );
};

export default Hero;