// 'use client';

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import contactHero from "./contac.png";

// const Hero = () => {
//   return (
//     <>
//       <style>{`
//         /* ===== HERO CONTAINER ===== */
//         .contact-hero {
//           position: relative;
//           height: 90vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           overflow: hidden;
//           min-height: 400px;
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

//         @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&display=swap');

//         /* ===== HERO TITLE - MAIN FOCUS ===== */
//         .hero-title {
//           margin: 0;
//           font-size: clamp(1.75rem, 8vw, 4rem);
//           font-weight: 900;
//           color: white;
//           -webkit-text-stroke: 2px #cd801b;
//           text-shadow: 
//             0 0 5px rgba(49, 94, 152, 0.6),
//             0 0 10px rgba(12, 44, 85, 0.6),
//             0 2px 2px rgba(0, 0, 0, 0.3);
//           line-height: 1.1;
//           letter-spacing: 1px;
//           padding: clamp(8px, 2vw, 16px);
//           width: 100%;
//           font-family: 'Cinzel', serif;
//         }

//         /* ===== BANNER HEIGHT - UPDATED ===== */
//         @media (max-width: 1024px) {
//           .contact-hero {
//             height: 50vh;
//             min-height: 300px;
//           }
//         }

//         @media (max-width: 768px) {
//           .contact-hero {
//             height: 40vh;
//             min-height: 250px;
//           }
//           .hero-title {
//             font-size: clamp(1.5rem, 10vw, 2.5rem);
//             font-weight: 800;
//           }
//         }

//         @media (max-width: 480px) {
//           .contact-hero {
//             height: 30vh;
//             min-height: 200px;
//           }
//           .hero-title {
//             font-size: clamp(1.2rem, 8vw, 2rem);
//             font-weight: 800;
//           }
//         }

//         @media (min-width: 1025px) {
//           .contact-hero {
//             height: 90vh;
//             min-height: 400px;
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
//         {/* CHANGE: <img> → <Image> for Next.js optimization */}
//         <Image 
//           src={contactHero} 
//           alt="Contact Banner" 
//           className="hero-image"
//           fill
//           priority
//           sizes="100vw"
//           style={{ objectFit: 'cover' }}
//         />
//         <div className="hero-overlay"></div>

//         <div className="hero-content">
//           <motion.h1
//             className="hero-title"
//             initial={{ opacity: 0, y: 30, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             About Us
//           </motion.h1>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;





// import React from "react";
// import { motion } from "framer-motion";
// import Image from 'next/image'; 
// import contactHero from "./about.png";

// const Hero = () => {
//   return (
//     <section 
//      className="contact-hero"
//      style={{
//        position: 'relative',
//        width: '100%',
//        height: '50vh',
//        minHeight: '150px',
//        overflow: 'hidden',
//      }}
//    >
//      <Image 
//        src={contactHero} 
//        alt="Contact us banner" 
//        className="hero-image"
//        fill
//        priority
//        style={{ objectFit: "inherit", objectPosition: "center 35%" }}
//      />
//      <div className="hero-overlay" />
//     <div className="hero-content">
//   {/* <motion.h1 
//     className="hero-title"
//     // style={{ 
//     //   fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
//     //   fontFamily: ' "Georgia", serif',  // ✅ Premium font
//     //   color: '#FFFFFF',
//     //   fontWeight: '800',
//     //   letterSpacing: '1px',
//     // }}
//     initial={{ opacity: 0, y: 30, scale: 0.95 }}
//     animate={{ opacity: 1, y: 0, scale: 1 }}
//     transition={{ duration: 0.8, ease: "easeOut" }}
//   >
//     About Us
//   </motion.h1> */}
// </div>
//    </section>
//   );
// };

// export default Hero;








import React from "react";
import { motion } from "framer-motion";
import Image from 'next/image';
import contactHero from "./about.png";

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