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
//        .hero-title {
//   margin: 0;
//   font-size: clamp(1.75rem, 8vw, 4rem);
//   font-weight: 900;
  

//   color: white;

//   /* ✅ Blue border */
//  -webkit-text-stroke: 2px #cd801b;

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
//         //    .team-title {
//         //   font-size: 42px;
//         //   margin-bottom: 60px;
//         //   color: #0C2C55;
//         //   font-family: cursive;
//         // }
// @media (max-width: 900px) {
//   .hero-title {
//     color: #0C2C55 !important;
//     background: rgba(255, 255, 255, 0.31);
//     padding: 10px 20px;
//     border-radius: 10px;
//     display: inline-block;
//     text-shadow: none !important;
//     -webkit-text-stroke: 0 !important;
//   }
// }
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
//             Our Gallery
//           </motion.h1>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;


// 'use client';

// import React from "react";
// import { motion } from "framer-motion";
// // import Image from 'next/image';  // ❌ Remove this - not needed
// import contactHero from "./contac.png";

// const Hero = () => {
//   return (
//     <>
//       <section className="contact-hero">
//         {/* ✅ Use img tag instead of Image */}
//         <img 
//           src={contactHero} 
//           alt="Contact Banner" 
//           className="hero-image"
//           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//         <div className="hero-overlay"></div>

//         <div className="hero-content">
//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             Our Gallery
//           </motion.h1>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;




'use client';

import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import contactHero from "./gallery1.png";

const Hero = () => {
    return (
        <>
            <style jsx>{`
                .contact-hero {
                    position: relative;
                    width: 100%;
                    height: 50vh;           /* 📱 Mobile default */
                    min-height: 180px;
                    overflow: hidden;
                }

                /* 📱 Mobile (portrait & landscape) - 40vh */
                @media (max-width: 767px) {
                    .contact-hero {
                        height: 15vh;
                        min-height: 150px;
                    }
                }

                /* 📱 iPad Mini (768px - 1024px) - 60vh */
                @media (min-width: 768px) and (max-width: 1224px) {
                    .contact-hero {
                        height: 20vh;
                        min-height: 250px;
                    }
                }

                /* 📱 iPad Pro (1025px - 1366px) - 60vh */
                @media (min-width: 1025px) and (max-width: 1366px) {
                    .contact-hero {
                        height: 30vh;
                        min-height: 300px;
                    }
                }

               
                }

            `}</style>

            <section className="contact-hero">
                <Image
                    src={contactHero}
                    alt="Contact us banner"
                    className="hero-image"
                    fill
                    priority
                />
                <div className="hero-overlay" />
                {/* <div className="hero-content">
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        About Us
                    </motion.h1>
                </div> */}
            </section>
        </>
    );
};

export default Hero;