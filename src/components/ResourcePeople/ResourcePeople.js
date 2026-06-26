// import React, { useState } from "react";

// import Header from "../Header";
// import Footer from "../Footer";
// import Hero from "../Hero/Hero3";

// const teamData = [
//   {
//     name: "Dr. Anbu Rajan,",
//     role: "Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.",
//     img: "/images/eventt.png",
//   },
//   {
//     name: "Bro.Raja Stevenson",
//     role: "Raja Stevenson N is a Qualified Mechanical Engineer. He earned his degree from Anna University in 2005 post his Successful School academics in Tirunelveli securing 93% during 2001.He also holds his MBA in Operations Management and has an experience of 20+ years having worked with Multiple industries across India and in Japan varying from Construction, Consulting , Manufacturing . He Specialises in Operations Management and has grown fast in his career.Currently he works as Industrial Director in Alstom Transport , a Global Pioneer leader in manufacturing of Trains",
//     img: "/images/eventt.png",
//   },
//   {
//     name: "Sis.Jishya",
//     role: "Jishya is a keynote speaker, career coach, and digital marketing expert with a PhD in Digital Marketing. She has inspired 70,000+ students across India and helps individuals grow with clarity, confidence, and purpose. As the founder of Soul Spring Digital, she also supports brands in building strong digital strategies.",
//     img: "/images/event.png",
//   },
//   {
//     name: "Motivational Sessions",
//     role: "Conducting impactful motivational sessions to inspire students towards better life choices and goal setting.",
//     img: "/images/program3.jpg",
//   },
// ];

// const Team = () => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const getShortText = (text, wordLimit = 5) => {
//     const words = text.split(" ");
//     if (words.length <= wordLimit) return text;
//     return words.slice(0, wordLimit).join(" ") + "...";
//   };

//   return (
//     <>
//       <Header />

//       <Hero title="Our Team" subtitle="✿ Meet Our Dedicated Volunteers" />

//       <style>{`
//         .team {
//           padding: 80px 60px;
//           background: #f8f8f8;
//           text-align: center;
//         }

//         .team-title {
//           font-size: 42px;
//           margin-bottom: 60px;
//           color: #0f3d35;
//           font-family: cursive;
//         }

//         .team-title span {
//           color: #da8a22;
//         }

//         .team-container {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 30px;
//         }

//         .team-card {
//           position: relative;
//           border-radius: 20px;
//           overflow: hidden;
//           cursor: pointer;
//           transition: 0.4s;
//           background: black;
//         }

//         /* 🔥 expanded card */
//         .team-card.active {
//           overflow: visible;
//         }

//         .team-card img {
//           width: 100%;
//           height: 320px;
//           object-fit: cover;
//           transition: 0.5s;
//         }

//         /* 🔥 image height increase */
//         .team-card.active img {
//           height: 500px;
//         }

//         .team-card::after {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 100%;
//           height: 60%;
//           background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
//         }

//         /* 🔥 remove overlay when expanded */
//         .team-card.active::after {
//           display: none;
//         }

//         .info {
//           position: absolute;
//           bottom: 20px;
//           left: 20px;
//           right: 20px;
//           color: white;
//           z-index: 2;
//           text-align: left;
//         }

//         .info h3 {
//           margin: 0;
//           font-size: 18px;
//         }

//         .info p {
//           margin: 5px 0 0;
//           font-size: 13px;
//           line-height: 1.5;
//         }

//         .read-more {
//           color: #ffd700;
//           cursor: pointer;
//           margin-left: 5px;
//           font-size: 12px;
//           font-weight: bold;
//         }

//         @media (max-width: 992px) {
//           .team-container {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 768px) {
//           .team-container {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>

//       <section className="team">
//         <h2 className="team-title">
//           Our <span>Resource</span> People
//         </h2>

//         <div className="team-container">
//           {teamData.map((member, index) => (
//             <div
//               className={`team-card ${
//                 expandedIndex === index ? "active" : ""
//               }`}
//               key={index}
//             >
//               <img src={member.img} alt={member.name} />

//               <div className="info">
//                 <h3>{member.name}</h3>

//                 <p>
//                   {expandedIndex === index
//                     ? member.role
//                     : getShortText(member.role, 5)}

//                   {member.role.split(" ").length > 5 && (
//                     <span
//                       className="read-more"
//                       onClick={() =>
//                         setExpandedIndex(
//                           expandedIndex === index ? null : index
//                         )
//                       }
//                     >
//                       {expandedIndex === index ? " Read Less" : " Read More"}
//                     </span>
//                   )}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default Team;







// import React, { useState } from "react";

// import Header from "../Header";
// import Footer from "../Footer";
// import Hero from "../Hero/Hero3";

// const teamData = [
//   {
//     name: "Dr. Anbu Rajan,",
//     role: "Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.Director of Peace Health Centre, Tirunelveli. He actively works in community development and student awareness programs.",
//     img: "/images/eventt.png",
//   },
//   {
//     name: "Bro.Raja Stevenson",
//     role: "Raja Stevenson N is a Qualified Mechanical Engineer. He earned his degree from Anna University in 2005 post his Successful School academics in Tirunelveli securing 93% during 2001.",
//     img: "/images/eventt.png",
//   },
//   {
//     name: "Sis.Jishya",
//     role: "Jishya is a keynote speaker, career coach, and digital marketing expert with a PhD in Digital Marketing. She has inspired 70,000+ students across India.",
//     img: "/images/event.png",
//   },
//   {
//     name: "Bro.Avinash Samraj",
//     role: "Avinash Samraj is a Teen & Youth Counsellor with 15+ years of experience helping young people overcome distractions, addictions, and behavioural challenges.",
//     img: "/images/event.png",
//   },
// ];

// const Team = () => {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const getShortText = (text, wordLimit = 4) => {
//     const words = text.split(" ");
//     if (words.length <= wordLimit) return text;
//     return words.slice(0, wordLimit).join(" ");
//   };

//   return (
//     <>
//       <Header />

//       <Hero title="Our Team" subtitle="✿ Meet Our Dedicated Volunteers" />

//       <style>{`
//         .team {
//           padding: 80px 60px;
//           background: #f8f8f8;
//           text-align: center;
//         }

//         .team-title {
//           font-size: 42px;
//           margin-bottom: 60px;
//           color: #0C2C55;
//           font-family: cursive;
//         }

//         .team-title span {
//           color: #da8a22;
//         }

//         .team-container {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 30px;
//           align-items: start;
//         }

//         .team-card {
//           position: relative;
//           border-radius: 20px;
//           overflow: hidden;
//           cursor: pointer;
//           transition: 0.4s;
//           background: black;
//         }

//         .team-card img {
//           width: 100%;
//           height: 320px;
//           object-fit: cover;
//           object-position: top center;
//           transition: 0.5s;
//           display: block;
//         }

//         /* 🔥 Only active card image height increases */
//         .team-card.active img {
//           height: 500px;
//           object-position: top center;
//         }

//         /* Black overlay */
//         .team-card::after {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 100%;
//           height: 60%;
//           background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent);
//           pointer-events: none;
//         }

//         /* Remove overlay when expanded */
//         .team-card.active::after {
//           display: none;
//         }

//         .info {
//           position: absolute;
//           bottom: 20px;
//           left: 20px;
//           right: 20px;
//           color: white;
//           z-index: 2;
//           text-align: left;
//         }

//         .info h3 {
//           margin: 0 0 5px 0;
//           font-size: 18px;
//           font-weight: bold;
//         }

//         .info p {
//           margin: 5px;
//           font-size: 6px;
//           line-height: 1.4;
//         }

//         /* 🔥 Read More and text on same line (2nd line) */
//         .role-line {
//           display: flex;
//           flex-wrap: wrap;
//           align-items: baseline;
//         }

//         .role-text {
//           display: inline;
//         }

//         .read-more {
//           color: #ffd700;
//           cursor: pointer;
//           font-size: 12px;
//           font-weight: bold;
//           display: inline-block;
//           white-space: nowrap;
//           margin-left: 5px;
//         }

//         .read-more:hover {
//           text-decoration: underline;
//         }

//         .team-card.active .info {
//           background: rgba(0,0,0,0.5);
//           border-radius: 10px;
//           padding: 10px;
//           right: 20px;
//         }

//         /* Full role text when expanded */
//         .full-role {
//           display: block;
//         }

//         @media (max-width: 992px) {
//           .team-container {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         @media (max-width: 768px) {
//           .team-container {
//             grid-template-columns: 1fr;
//           }
          
//           .team-card img {
//             height: 280px;
//           }
          
//           .team-card.active img {
//             height: 420px;
//           }
//         }
//       `}</style>

//       <section className="team">
//         <h2 className="team-title">
//           Our <span>Resource</span> People
//         </h2>

//         <div className="team-container">
//           {teamData.map((member, index) => (
//             <div
//               className={`team-card ${
//                 expandedIndex === index ? "active" : ""
//               }`}
//               key={index}
//             >
//               <img src={member.img} alt={member.name} />

//               <div className="info">
//                 <h3>{member.name}</h3>

//                 <div className="role-line">
//                   {expandedIndex === index ? (
//                     <span className="full-role">{member.role}</span>
//                   ) : (
//                     <>
//                       <span className="role-text">{getShortText(member.role, 4)}</span>
//                       {member.role.split(" ").length > 4 && (
//                         <span className="read-more">...</span>
//                       )}
//                     </>
//                   )}

//                   {member.role.split(" ").length > 4 && (
//                     <span
//                       className="read-more"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setExpandedIndex(
//                           expandedIndex === index ? null : index
//                         );
//                       }}
//                     >
//                       {expandedIndex === index ? " Read Less" : " Read More"}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default Team;






'use client';  // ✅ Add this for useState

import React, { useState } from "react";
import Image from 'next/image';  // ✅ Add Next.js Image

// import Header from "../Header";
// import Footer from "../Footer";
import Hero from "../Hero/Hero3";

const teamData = [
  {
    name: "Dr. Anbu Rajan,",
    role: "Dr. R. Anburajan (B.Sc., MBBS., DMLS., FHM.) is a renowned family physician from Tirunelveli and the Founder Chairman of Peace Health Centre. A graduate of Tirunelveli Medical College, he is widely respected for his compassionate and patient-centered approach to healthcare. Dedicated to making quality medical services accessible and affordable to people from all walks of life, he has earned the trust and admiration of countless patients through his commitment to excellence and humanitarian values. Beyond his clinical practice, Dr. Anburajan is a passionate health educator and student wellness mentor who actively conducts health awareness programs, wellness sessions, and life-skill development initiatives for school and college students. Through these programs, he provides practical guidance on student health, stress management, exam anxiety, mental well-being, healthy lifestyle habits, and preventive healthcare. His efforts help young people build resilience, develop confidence, make informed life choices, and embrace healthier lifestyles. With expertise in General Medicine, Family Healthcare, Health Counselling, Student Wellness, Stress and Anxiety Management, Life Skills Education, and Preventive Healthcare, Dr. Anburajan continues to inspire and empower individuals to achieve better health, confidence, and overall well-being for life.",
    img: "/images/eveent.png",
  },
  {
    name: "Bro.Raja Stevenson",
    role: "Raja Stevenson N is a Qualified Mechanical Engineer. He earned his degree from Anna University in 2005 post his Successful School academics in Tirunelveli securing 93% during 2001.He also holds his MBA in Operations Management and has an experience of 20+ years having worked with Multiple industries across India and in Japan varying from Construction, Consulting , Manufacturing . He Specialises in Operations Management and has grown fast in his career.Currently he works as Industrial  Director in Alstom Transport , a Global Pioneer leader in manufacturing of Trains. He was the Operational Industrial Director in India’s first High Speed Regional Train of “Namo Bharat” running between Delhi and Meerut which is in addition to various Metro Projects manufactured for India and Abroad under his Industrial leadership.Being grown from humble background and stepping up his career step by step , he is Keen on knowledge sharing to students on the way to prepare for the Professional growth and how current academics preparedness have to be in order to meet tomorrow’s industrial requirements.",
    img: "/images/eventt.png",
  },
  {
    name: "Sis.Jishya",
    role: "Jishya is a dynamic keynote speaker, career coach, and digital marketing strategist, known for inspiring students and young professionals to dream bigger, think clearer, and act with purpose. With a PhD in Digital Marketing and a specialization in Consumer Psychology in Online Shopping, she brings a powerful blend of academic depth and real-world expertise to every stage she steps on.As a passionate public speaker and certified Toastmaster, Jishya has empowered over 70,000 students and professionals across India through transformational sessions that build confidence, sharpen career direction, and unlock individual potential. Her speaking style is engaging, practical, and deeply motivating—helping audiences move from confusion to clarity and from hesitation to action.Beyond the stage, she is a digital marketing consultant and the founder of Soul Spring Digital, where she helps brands understand consumer behavior and build strategies that drive engagement, conversions, and long-term loyalty. She has worked with globally recognized organizations such as GOD TV Asia, Toastmasters International, GO Movement, Campus Crusade, and Essar Logistics, contributing to impactful digital campaigns that have reached audiences across 120 nations.A faith-driven content strategist at heart, Jishya is deeply committed to building people, not just brands. Her mission is to empower 1 million individuals to grow in their careers, businesses, and personal lives—equipping them with the mindset, skills, and confidence needed to thrive in today’s digital world.Whether addressing a classroom, an auditorium, or a global platform, Jishya’s message is clear: You are capable of more and your future is worth building intentionally.",
    img: "/images/event.png",
  },
  {
    name: "Bro.Avinash Samraj",
    role: "Avinash Samraj is a dedicated Teen & Youth Counsellor, Youth Worker, Motivational Speaker, and Life Skills Mentor with over 15 years of experience in guiding and mentoring teenagers and young adults. Throughout his career, he has been committed to helping students overcome distractions, addictions, peer pressure, and behavioural challenges while encouraging them to develop focus, discipline, confidence, and a clear sense of purpose in life. His passion for youth development has enabled him to positively impact the lives of countless students by equipping them with practical life skills and empowering them to make responsible decisions.He holds a Bachelor of Arts in Philosophy from Madras Christian College, Chennai, and a Master of Arts in Counselling from Singapore. In addition, he served as a Research Fellow in a WHO-supported Neurology Project focusing on Alzheimer’s Disease and Dementia, where he gained valuable insights into behavioural patterns, cognitive development, and human psychology. This unique blend of academic knowledge and practical experience has strengthened his ability to understand and address the emotional, psychological, and developmental needs of young people.Since 2010, Avinash Samraj has been serving as the Head of the Youth Department, leading impactful initiatives designed to support school and college students through counselling programs, workshops, leadership training, life-skills education, and motivational sessions. Through these platforms, he inspires young people to recognize their potential, overcome challenges, and pursue meaningful goals with determination and integrity.His core mission is to help young individuals become responsible and productive members of society by strengthening family values, promoting educational excellence, building strong character, and nurturing positive attitudes. Through his counselling and mentoring efforts, he encourages students to develop resilience, emotional well-being, leadership qualities, and a sense of social responsibility, preparing them to become confident future leaders and contributors to their communities.Key Areas of Expertise: Youth Counselling, Student Mentoring, Behavioural Guidance, Life Skills Training, Motivational Speaking, Teen Development, Leadership Building, Character Development, and Personal Growth.",
    img: "/images/events.png",
  },
];

const Team = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getShortText = (text, wordLimit = 4) => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ");
  };

  return (
    <>
      {/* <Header /> */}

      <Hero title="Our Team" subtitle="✿ Meet Our Dedicated Volunteers" />

      <section className="team">
        <h2 className="team-title"
        style={{marginTop: '-20px'}}>
          Our <span>Resource</span> People
        </h2>

        <div className="team-container">
          {teamData.map((member, index) => (
            <div
              className={`team-card ${
                expandedIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <Image 
                src={member.img} 
                alt={member.name} 
                width={400}
                height={320}
                style={{ 
                  width: '100%', 
                  height: expandedIndex === index ? '500px' : '320px',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  transition: '0.5s',
                  display: 'block'
                }}
              />

              <div className="info">
                <h3>{member.name}</h3>

                <div className="role-line">
                  {expandedIndex === index ? (
                    <div className="full-role-scroll">
                      <span className="full-role">{member.role}</span>
                    </div>
                  ) : (
                    <>
                      <span className="role-text">{getShortText(member.role, 3)}</span>
                      {member.role.split(" ").length > 4 && (
                        <span className="read-more">...</span>
                      )}
                    </>
                  )}

                  {member.role.split(" ").length > 4 && (
                    <span
                      className="read-more"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedIndex(
                          expandedIndex === index ? null : index
                        );
                      }}
                    >
                      {expandedIndex === index ? " Read Less" : " Read More"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default Team;