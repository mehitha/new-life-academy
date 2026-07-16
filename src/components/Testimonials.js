// import { useState, useEffect, useRef } from "react";

// const SUPABASE_URL   = "https://wgglmdiihymqamplnrpk.supabase.co";
// const SUPABASE_KEY   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZ2xtZGlpaHltcWFtcGxucnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NTkzNzcsImV4cCI6MjA4OTQzNTM3N30.eAnapcOj3fOvNfh80zZbskOHYoCKT3ZaQkCrcx_1IJQ";
// const ADMIN_PASSWORD = "team2024";
// const TABLE          = "testimonials";
// const PER_PAGE       = 10;

// const headers = {
//   "Content-Type": "application/json",
//   apikey: SUPABASE_KEY,
//   Authorization: `Bearer ${SUPABASE_KEY}`,
//   Prefer: "return=representation",
// };

// async function dbFetch(path, options = {}) {
//   const res  = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers, ...options });
//   if (!res.ok) throw new Error(await res.text());
//   const text = await res.text();
//   return text ? JSON.parse(text) : null;
// }

// const getAll = ()        => dbFetch(`${TABLE}?select=*&order=created_at.desc`);
// const insert = (row)     => dbFetch(TABLE, { method: "POST",  body: JSON.stringify(row) });
// const update = (id, row) => dbFetch(`${TABLE}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(row) });
// const remove = (id)      => dbFetch(`${TABLE}?id=eq.${id}`, { method: "DELETE" });

// function exportToCSV(data) {
//   if (!data || data.length === 0) return;
//   const columns = ["No","Name","School or College","Rating","Testimonial","Date Added"];
//   const rows    = data.map((t, i) => [
//     i + 1,
//     `"${(t.name    || "").replace(/"/g, '""')}"`,
//     `"${(t.company || "").replace(/"/g, '""')}"`,
//     t.rating || 5,
//     `"${(t.review  || "").replace(/"/g, '""')}"`,
//     t.created_at
//       ? new Date(t.created_at).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })
//       : "",
//   ]);
//   const csvContent = "\uFEFF" + [columns.join(","), ...rows.map(r => r.join(","))].join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url  = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `Testimonials_${new Date().toLocaleDateString("en-IN").replace(/\//g,"-")}.csv`;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

// const avatarColors = ["#3d8b6e","#c0392b","#1a6b9e","#d4880a","#7d3c98","#2e7d9f","#6b4fa0","#1e8449","#b7410e","#0d7377"];

// // ── DiamondSpark — single elegant yellow diamond, no text ─────────────────────
// function DiamondSpark({ size = 28, interactive = false, rating = 5, onRate }) {
//   // The SVG: a sleek 4-ray sparkle (like a jewel glint) — 1 single symbol
//   const Spark = ({ sz, lit, onClick }) => (
//     <svg
//       width={sz} height={sz} viewBox="0 0 40 40"
//       xmlns="http://www.w3.org/2000/svg"
//       onClick={onClick}
//       style={{
//         cursor: onClick ? "pointer" : "default",
//         display: "block",
//         filter: lit
//           ? "drop-shadow(0 0 5px rgba(245,166,35,0.85)) drop-shadow(0 0 2px rgba(245,166,35,0.5))"
//           : "none",
//         transition: "filter 0.2s, opacity 0.2s",
//         opacity: lit ? 1 : 0.22,
//       }}
//     >
//       <defs>
//         <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%"   stopColor="#ffe066"/>
//           <stop offset="50%"  stopColor="#f5a623"/>
//           <stop offset="100%" stopColor="#e8860a"/>
//         </linearGradient>
//       </defs>
//       {/* Tall vertical diamond lozenge */}
//       <polygon
//         points="20,2 26,20 20,38 14,20"
//         fill="url(#dg)"
//       />
//       {/* Wide horizontal diamond lozenge */}
//       <polygon
//         points="2,20 20,14 38,20 20,26"
//         fill="url(#dg)"
//         opacity="0.88"
//       />
//       {/* Tiny centre highlight */}
//       <circle cx="20" cy="20" r="2.5" fill="#fff9e6" opacity="0.7"/>
//     </svg>
//   );

//   // Interactive: 5 clickable sparks for admin rating picker
//   if (interactive) {
//     return (
//       <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
//         {[1,2,3,4,5].map(i => (
//           <Spark key={i} sz={22} lit={i <= rating} onClick={() => onRate?.(i)} />
//         ))}
//       </div>
//     );
//   }

//   // Display: single large spark on cards
//   return <Spark sz={size} lit={true} />;
// }

// // ── Avatar ─────────────────────────────────────────────────────────────────────
// function Avatar({ initials, idx }) {
//   const bg = avatarColors[idx % avatarColors.length];
//   return (
//     <div style={{
//       width:44, height:44, borderRadius:"50%",
//       background:`linear-gradient(135deg, ${bg}, ${bg}bb)`,
//       display:"flex", alignItems:"center", justifyContent:"center",
//       color:"#fff", fontWeight:800, fontSize:13, flexShrink:0,
//       boxShadow:`0 3px 10px ${bg}44`,
//     }}>{initials}</div>
//   );
// }

// // ── Strip Card (scroll strip only) ────────────────────────────────────────────
// function StripCard({ t, idx, onDoubleClick }) {
//   const [hov, setHov] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const CLAMP_LINES    = 5;
//   const CHARS_PER_LINE = 55;
//   const needsClamp     = (t.review || "").length > CLAMP_LINES * CHARS_PER_LINE;

//   const handleTap = () => {
//     onDoubleClick(t);
//   };

//   return (
//     <div
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       onClick={handleTap}
//       style={{
//         background: "#fff",
//         borderRadius: 20,
//         padding: "26px 22px 20px",
//         position: "relative",
//         overflow: "hidden",
//         fontFamily: "'Nunito', sans-serif",
//         cursor: "pointer",
//         userSelect: "none",
//         transition: "transform 0.3s, box-shadow 0.35s",
//         transform: hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
//         display: "flex",
//         flexDirection: "column",
//         height: "100%",
//         boxShadow: hov
//           ? `0 0 0 2.5px #1db97a, 0 0 10px 4px rgba(29,185,122,0.80),
//              0 0 28px 10px rgba(29,185,122,0.50), 0 18px 40px rgba(0,0,0,0.10)`
//           : `0 0 0 1.8px rgba(29,185,122,0.55), 0 0 10px 2px rgba(29,185,122,0.18),
//              0 2px 8px rgba(0,0,0,0.05)`,
//         animation: `fadeUp 0.45s ease ${(idx % 4) * 0.07}s both`,
//       }}
//     >
//       {/* Quote mark */}
//       <div style={{
//         position:"absolute", top:4, right:14, fontSize:88, fontWeight:900,
//         lineHeight:1, color: hov ? "rgba(29,185,122,0.07)" : "#f5f0e0",
//         userSelect:"none", fontFamily:"Georgia, serif", transition:"color 0.4s", zIndex:1,
//       }}>{"\u201D"}</div>

//       {/* ── REPLACED STARS → Academic Badge ── */}
//       <div style={{ marginBottom:10, position:"relative", zIndex:2 }}>
//         <DiamondSpark rating={t.rating} />
//       </div>

//       {/* Review */}
//       <p style={{
//         fontSize:13.5, color:"#555", lineHeight:1.75,
//         marginBottom: needsClamp ? 6 : 20,
//         position:"relative", zIndex:2, flex:1,
//         ...(needsClamp && !expanded
//           ? { display:"-webkit-box", WebkitLineClamp:CLAMP_LINES, WebkitBoxOrient:"vertical", overflow:"hidden" }
//           : { display:"block", overflow:"visible" }
//         ),
//       }}>{t.review}</p>

//       {needsClamp && (
//         <button
//           onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
//           style={{
//             alignSelf:"flex-start", background:"none", border:"none",
//             padding:"0 0 14px", color:"#2a7a5e", fontWeight:800,
//             fontSize:12, cursor:"pointer", fontFamily:"'Nunito', sans-serif",
//             position:"relative", zIndex:2, textDecoration:"underline",
//             textUnderlineOffset:3,
//           }}
//         >{expanded ? "Read Less ↑" : "Read More ↓"}</button>
//       )}

//       {/* Footer */}
//       <div style={{
//         display:"flex", alignItems:"center", gap:12,
//         borderTop:"1px solid #f0ece0", paddingTop:14,
//         position:"relative", zIndex:2, marginTop:"auto",
//       }}>
//         <Avatar initials={t.initials} idx={idx}/>
//         <div>
//           <p style={{ fontWeight:800, fontSize:14, color:"#1a2e1a", margin:0 }}>{t.name}</p>
//           <p style={{ fontSize:12, color:"#aaa", fontWeight:600, margin:0 }}>{t.company}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Page Card (AllPage — full width rectangle) ─────────────────────────────────
// function PageCard({ t, idx, highlighted, cardRef }) {
//   const [hov, setHov] = useState(false);
//   const [expanded, setExpanded] = useState(false);

//   const needsClamp = (t.review || "").length > 220;

//   return (
//     <div
//       ref={cardRef}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         background: "#fff",
//         borderRadius: 18,
//         overflow: "hidden",
//         position: "relative",
//         fontFamily: "'Nunito', sans-serif",
//         transition: "transform 0.3s, box-shadow 0.35s",
//         transform: hov ? "translateY(-3px)" : "translateY(0)",
//         boxShadow: highlighted
//           ? `0 0 0 3px #f5a623, 0 0 24px 8px rgba(245,166,35,0.50), 0 8px 28px rgba(0,0,0,0.08)`
//           : hov
//           ? `0 0 0 2px #1db97a, 0 0 14px 4px rgba(29,185,122,0.45), 0 8px 20px rgba(0,0,0,0.07)`
//           : `0 0 0 1.5px rgba(29,185,122,0.40), 0 2px 10px rgba(0,0,0,0.05)`,
//         animation: `cardUp 0.5s cubic-bezier(.22,1,.36,1) ${(idx % 10) * 0.05}s both`,
//       }}
//     >
//       {/* Selected badge */}
//       {highlighted && (
//         <div style={{
//           position:"absolute", top:14, right:14,
//           background:"#f5a623", color:"#111",
//           fontSize:10, fontWeight:900,
//           padding:"3px 12px", borderRadius:20, zIndex:5,
//         }}>✦ Selected</div>
//       )}

//       {/* ── Left accent bar — GREEN ── */}
//       <div style={{
//         position:"absolute", left:0, top:0, bottom:0,
//         width:5, background:"linear-gradient(180deg, #1db97a, #0f9960)",
//       }}/>

//       {/* ── Card body ── */}
//       <div style={{ padding:"20px 24px 20px 28px" }}>

//         {/* ROW 1 — Profile left, Badge right */}
//         <div style={{
//           display:"flex",
//           alignItems:"center",
//           justifyContent:"space-between",
//           gap:10,
//           marginBottom:14,
//           flexWrap:"nowrap",
//         }}>
//           {/* Profile — avatar + name + school */}
//           <div style={{
//             display:"flex",
//             alignItems:"center",
//             gap:10,
//             minWidth:0,
//             flex:1,
//             overflow:"hidden",
//           }}>
//             {/* Avatar — GREEN, fixed size */}
//             <div style={{
//               width:42, height:42, borderRadius:"50%", flexShrink:0,
//               background:"linear-gradient(135deg, #1db97a, #0f9960)",
//               display:"flex", alignItems:"center", justifyContent:"center",
//               color:"#fff", fontWeight:800, fontSize:13,
//               boxShadow:"0 3px 10px rgba(29,185,122,0.35)",
//             }}>{t.initials}</div>

//             {/* Name + School */}
//             <div style={{ minWidth:0, flex:1 }}>
//               <p style={{
//                 fontWeight:800, fontSize:14, color:"#1a2e1a",
//                 margin:0, lineHeight:1.3,
//                 whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
//               }}>{t.name}</p>
//               <p style={{
//                 fontSize:11.5, color:"#aaa", fontWeight:600,
//                 margin:"3px 0 0", lineHeight:1.3,
//                 whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
//               }}>{t.company || "—"}</p>
//             </div>
//           </div>

//           {/* ── REPLACED STARS → Academic Badge (display only) ── */}
//           <div style={{ flexShrink: 0 }}>
//             <DiamondSpark rating={t.rating} />
//           </div>
//         </div>

//         {/* Divider */}
//         <div style={{ height:1, background:"#f0ece0", marginBottom:14 }}/>

//         {/* ROW 2 — Review text, full width */}
//         <p style={{
//           fontSize:14, color:"#555", lineHeight:1.85, margin:0,
//           ...(needsClamp && !expanded
//             ? { display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }
//             : { display:"block" }
//           ),
//         }}>{t.review}</p>

//         {needsClamp && (
//           <button
//             onClick={() => setExpanded(v => !v)}
//             style={{
//               marginTop:8, background:"none", border:"none", padding:0,
//               color:"#2a7a5e", fontWeight:800, fontSize:12,
//               cursor:"pointer", fontFamily:"'Nunito', sans-serif",
//               textDecoration:"underline", textUnderlineOffset:3, display:"block",
//             }}
//           >{expanded ? "Read Less ↑" : "Read More ↓"}</button>
//         )}

//       </div>
//     </div>
//   );
// }

// // ── AUTO-SCROLL STRIP ──────────────────────────────────────────────────────────
// function ScrollStrip({ testimonials, onDoubleClick }) {
//   const trackRef  = useRef(null);
//   const rafRef    = useRef(null);
//   const posRef    = useRef(0);
//   const pausedRef = useRef(false);
//   const CARD_W = 300;
//   const GAP    = 22;

//   const items = [...testimonials, ...testimonials, ...testimonials];

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;
//     const cycle = (CARD_W + GAP) * testimonials.length;
//     const step = () => {
//       if (!pausedRef.current) {
//         posRef.current += 0.6;
//         if (posRef.current >= cycle) posRef.current -= cycle;
//         track.style.transform = `translateX(-${posRef.current}px)`;
//       }
//       rafRef.current = requestAnimationFrame(step);
//     };
//     rafRef.current = requestAnimationFrame(step);
//     const pause = () => { pausedRef.current = true; };
//     const play  = () => { pausedRef.current = false; };
//     track.addEventListener("mouseenter", pause);
//     track.addEventListener("mouseleave", play);
//     return () => {
//       cancelAnimationFrame(rafRef.current);
//       track.removeEventListener("mouseenter", pause);
//       track.removeEventListener("mouseleave", play);
//     };
//   }, [testimonials]);

//   return (
//     <div style={{ overflow:"hidden", width:"100%", position:"relative", padding:"10px 0 18px" }}>
//       <div style={{ position:"absolute",left:0,top:0,bottom:0,width:80,zIndex:10,pointerEvents:"none",
//         background:"linear-gradient(to right,#f5f3eb,transparent)" }}/>
//       <div style={{ position:"absolute",right:0,top:0,bottom:0,width:80,zIndex:10,pointerEvents:"none",
//         background:"linear-gradient(to left,#f5f3eb,transparent)" }}/>
//       <div ref={trackRef} style={{ display:"flex", gap:GAP, willChange:"transform", alignItems:"stretch" }}>
//         {items.map((t, i) => (
//           <div key={`s-${i}-${t.id}`} style={{ minWidth: CARD_W, maxWidth: CARD_W, flexShrink:0 }}>
//             <StripCard t={t} idx={i % testimonials.length} onDoubleClick={onDoubleClick} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── ALL PAGE ───────────────────────────────────────────────────────────────────
// function AllPage({ testimonials, onBack, highlightId }) {
//   const [page,    setPage]    = useState(1);
//   const [animKey, setAnimKey] = useState(0);
//   const topRef   = useRef(null);
//   const cardRefs = useRef({});

//   const totalPages = Math.max(1, Math.ceil(testimonials.length / PER_PAGE));

//   useEffect(() => {
//     if (!highlightId) return;
//     const idx = testimonials.findIndex(t => t.id === highlightId);
//     if (idx === -1) return;
//     const targetPage = Math.ceil((idx + 1) / PER_PAGE);
//     setPage(targetPage);
//     setAnimKey(k => k + 1);
//   }, [highlightId]);

//   useEffect(() => {
//     if (!highlightId) return;
//     const t = setTimeout(() => {
//       const el = cardRefs.current[highlightId];
//       if (el) el.scrollIntoView({ behavior:"smooth", block:"center" });
//     }, 400);
//     return () => clearTimeout(t);
//   }, [page, highlightId]);

//   const slice = testimonials.slice((page - 1) * PER_PAGE, page * PER_PAGE);

//   const goTo = p => {
//     setPage(p);
//     setAnimKey(k => k + 1);
//     setTimeout(() => topRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 60);
//   };

//   return (
//     <div style={{ backgroundColor:"#f5f3eb", minHeight:"100vh", fontFamily:"'Nunito', sans-serif" }}>
//       <div ref={topRef} style={{ maxWidth:860, margin:"0 auto", padding:"48px 24px 72px" }}>

//         {/* Header */}
//         <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:14 }}>
//           <div>
//             <h2 style={{ margin:0, fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:900, color:"#1a2e1a" }}>
//               All <span style={{ color:"#f5a623" }}>Feedback</span>
//             </h2>
//             <p style={{ margin:"4px 0 0", fontSize:13, color:"#bbb", fontWeight:600 }}>
//               {testimonials.length} verified reviews &nbsp;·&nbsp; Page {page} of {totalPages}
//             </p>
//           </div>
//           <button
//             onClick={onBack}
//             onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(42,122,94,0.45)"; }}
//             onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(42,122,94,0.30)"; }}
//             style={{
//               padding:"10px 24px",
//               background:"linear-gradient(135deg,#2a7a5e,#3d8b6e)",
//               color:"#fff", border:"none", borderRadius:50,
//               fontWeight:800, fontSize:13, cursor:"pointer",
//               fontFamily:"'Nunito', sans-serif",
//               boxShadow:"0 4px 16px rgba(42,122,94,0.30)",
//               transition:"transform .2s, box-shadow .2s",
//             }}
//           >← Back</button>
//         </div>

//         {/* Cards */}
//         <div
//           key={`${page}-${animKey}`}
//           style={{ display:"flex", flexDirection:"column", gap:16, animation:"pageIn .45s cubic-bezier(.22,1,.36,1) both" }}
//         >
//           {slice.map((t, i) => (
//             <PageCard
//               key={t.id}
//               t={t}
//               idx={i}
//               highlighted={t.id === highlightId}
//               cardRef={el => { cardRefs.current[t.id] = el; }}
//             />
//           ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:44, flexWrap:"wrap" }}>
//             <PagBtn arrow="‹" disabled={page === 1}          onClick={() => goTo(page - 1)}/>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//               <PagBtn key={p} num={p} active={p === page} onClick={() => goTo(p)}/>
//             ))}
//             <PagBtn arrow="›" disabled={page === totalPages} onClick={() => goTo(page + 1)}/>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Pagination Button ──────────────────────────────────────────────────────────
// function PagBtn({ num, arrow, active, disabled, onClick }) {
//   const [hov, setHov] = useState(false);
//   return (
//     <button
//       onClick={!disabled ? onClick : undefined}
//       onMouseEnter={() => setHov(true)}
//       onMouseLeave={() => setHov(false)}
//       style={{
//         width: active ? 42 : 34, height: active ? 42 : 34,
//         borderRadius:"50%",
//         border: active ? "none" : "2px solid #d4c87a",
//         background: active ? "linear-gradient(135deg,#2a7a5e,#3d8b6e)" : hov && !disabled ? "#e8f5f0" : "transparent",
//         color: active ? "#fff" : disabled ? "#ccc" : "#2a7a5e",
//         fontWeight:800, fontSize:14,
//         cursor: disabled ? "not-allowed" : "pointer",
//         opacity: disabled ? 0.35 : 1,
//         transition:"all .25s cubic-bezier(.22,1,.36,1)",
//         boxShadow: active ? "0 0 0 3px rgba(42,122,94,0.18), 0 5px 16px rgba(42,122,94,0.4)" : "none",
//         transform: active ? "scale(1.12)" : hov && !disabled ? "scale(1.06)" : "scale(1)",
//         fontFamily:"'Nunito', sans-serif",
//         display:"flex", alignItems:"center", justifyContent:"center",
//       }}
//     >{arrow ?? num}</button>
//   );
// }

// // ── Admin Modal ────────────────────────────────────────────────────────────────
// function AdminModal({ testimonials, onClose, onRefresh }) {
//   const [list,setList]=useState(testimonials);
//   const [editId,setEditId]=useState(null);
//   const [form,setForm]=useState({});
//   const [addMode,setAddMode]=useState(false);
//   const [saving,setSaving]=useState(false);
//   const [exporting,setExporting]=useState(false);
//   const [msg,setMsg]=useState("");
//   const [msgType,setMsgType]=useState("success");

//   const toast=(m,type="success")=>{setMsg(m);setMsgType(type);setTimeout(()=>setMsg(""),3000);};
//   const startEdit=t=>{setEditId(t.id);setForm({...t});setAddMode(false);};
//   const startAdd=()=>{setAddMode(true);setEditId(null);setForm({name:"",company:"",rating:5,review:""});};
//   const cancelEdit=()=>{setEditId(null);setAddMode(false);setForm({});};

//   const saveEntry=async()=>{
//     if(!form.name?.trim()||!form.review?.trim()){toast("⚠️ Name and review are required","warn");return;}
//     setSaving(true);
//     const initials=form.name.trim().split(" ").map(w=>w[0]?.toUpperCase()).slice(0,2).join("")||"??";
//     const entry={name:form.name,company:form.company||"",initials,rating:form.rating||5,review:form.review};
//     try{
//       if(addMode){const[c]=await insert(entry);setList(p=>[c,...p]);toast("✅ Testimonial added!");}
//       else{await update(editId,entry);setList(p=>p.map(t=>t.id===editId?{...t,...entry}:t));toast("✅ Updated!");}
//       cancelEdit();onRefresh();
//     }catch{toast("❌ Error saving. Try again.","error");}
//     setSaving(false);
//   };

//   const del=async(id,name)=>{
//     if(!window.confirm(`Delete testimonial from "${name}"?`))return;
//     try{await remove(id);setList(p=>p.filter(t=>t.id!==id));toast("🗑 Deleted");onRefresh();}
//     catch{toast("❌ Error deleting.","error");}
//   };

//   const tBg=msgType==="error"?"#fff5f5":msgType==="warn"?"#fffbeb":"#f0faf5";
//   const tBor=msgType==="error"?"#fca5a5":msgType==="warn"?"#fcd34d":"#a8dfc4";
//   const tCol=msgType==="error"?"#ef4444":msgType==="warn"?"#d97706":"#2a7a5e";
//   const iStyle={width:"100%",padding:"9px 12px",marginBottom:12,border:"1.5px solid #e8e8e8",borderRadius:10,fontSize:13,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box",color:"#333"};
//   const lStyle={display:"block",fontSize:11,fontWeight:800,color:"#666",marginBottom:5,textTransform:"uppercase",letterSpacing:.4};

//   return(
//     <div style={{position:"fixed",inset:0,background:"rgba(10,20,15,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:16,backdropFilter:"blur(6px)"}}>
//       <div style={{background:"#fff",borderRadius:24,width:"100%",maxWidth:580,maxHeight:"90vh",overflowY:"auto",fontFamily:"'Nunito',sans-serif",boxShadow:"0 28px 70px rgba(0,0,0,0.18)"}}>
//         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px 14px",borderBottom:"1.5px solid #f0ece0",position:"sticky",top:0,background:"#fff",zIndex:10,borderRadius:"24px 24px 0 0",flexWrap:"wrap",gap:8}}>
//           <div>
//             <h3 style={{margin:0,fontSize:17,fontWeight:900,color:"#1a2e1a"}}>⚙ Admin Panel</h3>
//             <p style={{margin:0,fontSize:11.5,color:"#bbb",fontWeight:600}}>Live database · {list.length} testimonials</p>
//           </div>
//           <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
//             <button onClick={()=>{setExporting(true);exportToCSV(list);setTimeout(()=>{setExporting(false);toast("📥 Excel downloaded!");},800);}} disabled={exporting||!list.length}
//               style={{background:exporting?"#f0f0f0":"linear-gradient(135deg,#16a34a,#15803d)",color:exporting?"#999":"#fff",border:"none",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:12,cursor:exporting||!list.length?"not-allowed":"pointer",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:5}}>
//               {exporting?"⏳ Exporting…":"📥 Export Excel"}
//             </button>
//             <button onClick={startAdd} style={{background:"#e8f5f0",color:"#2a7a5e",border:"none",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>+ Add New</button>
//             <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#bbb"}}>×</button>
//           </div>
//         </div>
//         {msg&&<div style={{margin:"12px 24px 0",background:tBg,border:`1px solid ${tBor}`,borderRadius:10,padding:"10px 14px",fontSize:13,fontWeight:700,color:tCol}}>{msg}</div>}
//         <div style={{padding:"16px 24px 28px"}}>
//           {(editId!==null||addMode)&&(
//             <div style={{background:"#f8fdf9",border:"1.5px solid #a8dfc4",borderRadius:16,padding:"16px 14px",marginBottom:18}}>
//               <p style={{margin:"0 0 12px",fontWeight:800,fontSize:12.5,color:"#2a7a5e"}}>{addMode?"➕ New Testimonial":"✏️ Editing Testimonial"}</p>
//               <label style={lStyle}>Full Name *</label>
//               <input value={form.name||""} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Sarah Johnson" style={iStyle}/>
//               <label style={lStyle}>School or College</label>
//               <input value={form.company||""} onChange={e=>setForm(p=>({...p,company:e.target.value}))} placeholder="e.g. St. Joseph School" style={iStyle}/>
//               <label style={lStyle}>Rating (click to set)</label>
//               {/* ── REPLACED STARS → interactive caps in admin ── */}
//               <div style={{marginBottom:12}}>
//                 <DiamondSpark rating={form.rating||5} interactive onRate={r=>setForm(p=>({...p,rating:r}))}/>
//               </div>
//               <label style={lStyle}>Feedback *</label>
//               <textarea value={form.review||""} onChange={e=>setForm(p=>({...p,review:e.target.value}))} rows={3} placeholder="Write their testimonial…" style={{...iStyle,resize:"vertical",minHeight:78}}/>
//               <div style={{display:"flex",gap:8}}>
//                 <button onClick={saveEntry} disabled={saving} style={{background:saving?"#aaa":"#2a7a5e",color:"#fff",border:"none",borderRadius:9,padding:"8px 18px",fontWeight:800,fontSize:12,cursor:saving?"not-allowed":"pointer",fontFamily:"'Nunito',sans-serif"}}>{saving?"Saving…":"✓ Save to Database"}</button>
//                 <button onClick={cancelEdit} style={{background:"#f0ece0",color:"#888",border:"none",borderRadius:9,padding:"8px 14px",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Cancel</button>
//               </div>
//             </div>
//           )}
//           {!list.length&&<div style={{textAlign:"center",padding:"40px 0",color:"#ccc"}}><p style={{fontSize:32,margin:"0 0 8px"}}>📭</p><p style={{fontWeight:700,fontSize:14}}>No testimonials yet.</p></div>}
//           {list.map((t,i)=>(
//             <div key={t.id} style={{display:"flex",alignItems:"flex-start",gap:11,padding:"12px 0",borderBottom:"1px solid #f5f0e8"}}>
//               <Avatar initials={t.initials} idx={i}/>
//               <div style={{flex:1,minWidth:0}}>
//                 <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
//                   <p style={{margin:0,fontWeight:800,fontSize:13,color:"#1a2e1a"}}>{t.name}</p>
//                   {/* ── REPLACED STARS → badge in admin list ── */}
//                   <DiamondSpark rating={t.rating}/>
//                 </div>
//                 <p style={{margin:"0 0 3px",fontSize:11,color:"#ccc",fontWeight:600}}>{t.company}</p>
//                 <p style={{margin:0,fontSize:12,color:"#888",lineHeight:1.6,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{t.review}</p>
//               </div>
//               <div style={{display:"flex",gap:5,flexShrink:0,paddingTop:2}}>
//                 <button onClick={()=>startEdit(t)} style={{background:"#eff6ff",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:12}}>✏</button>
//                 <button onClick={()=>del(t.id,t.name)} style={{background:"#fff5f5",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:12}}>🗑</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Password Gate ──────────────────────────────────────────────────────────────
// function PasswordGate({ onSuccess, onClose }) {
//   const [val,setVal]=useState("");
//   const [err,setErr]=useState(false);
//   const check=()=>{
//     if(val===ADMIN_PASSWORD){onSuccess();}
//     else{setErr(true);setTimeout(()=>setErr(false),1200);setVal("");}
//   };
//   return(
//     <div style={{position:"fixed",inset:0,background:"rgba(10,20,15,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1500,backdropFilter:"blur(6px)"}}>
//       <div style={{background:"#fff",borderRadius:20,padding:"32px 28px",width:310,boxShadow:"0 24px 60px rgba(0,0,0,0.15)",fontFamily:"'Nunito',sans-serif",animation:err?"shake .35s ease":"none",textAlign:"center"}}>
//         <div style={{fontSize:34,marginBottom:8}}>🔒</div>
//         <h3 style={{margin:"0 0 5px",fontSize:17,fontWeight:900,color:"#1a2e1a"}}>Admin Access</h3>
//         <p style={{margin:"0 0 20px",fontSize:13,color:"#bbb",fontWeight:600}}>Enter your team password</p>
//         <input type="password" value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} placeholder="••••••••" autoFocus
//           style={{width:"100%",padding:"10px 14px",marginBottom:err?8:16,border:`1.5px solid ${err?"#ef4444":"#e8e8e8"}`,borderRadius:11,fontSize:15,textAlign:"center",letterSpacing:3,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box"}}/>
//         {err&&<p style={{color:"#ef4444",fontSize:12,fontWeight:700,margin:"0 0 14px"}}>Incorrect password. Try again.</p>}
//         <div style={{display:"flex",gap:8}}>
//           <button onClick={onClose} style={{flex:1,padding:"10px",background:"#f5f0e8",color:"#888",border:"none",borderRadius:11,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Cancel</button>
//           <button onClick={check} style={{flex:2,padding:"10px",background:"linear-gradient(135deg,#2a7a5e,#3d8b6e)",color:"#fff",border:"none",borderRadius:11,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Unlock</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main ───────────────────────────────────────────────────────────────────────
// export default function Testimonials() {
//   const [testimonials,setTestimonials]=useState([]);
//   const [loading,setLoading]=useState(true);
//   const [error,setError]=useState("");
//   const [showAll,setShowAll]=useState(false);
//   const [highlightId,setHighlightId]=useState(null);
//   const [showPwd,setShowPwd]=useState(false);
//   const [showAdmin,setShowAdmin]=useState(false);
//   const [clickCount,setClickCount]=useState(0);
//   const clickTimer=useRef(null);

//   const fetchAll=async()=>{
//     try{setLoading(true);const d=await getAll();setTestimonials(d||[]);setError("");}
//     catch{setError("Could not load testimonials. Please check your connection.");}
//     setLoading(false);
//   };
//   useEffect(()=>{fetchAll();},[]);

//   const handleHeadingClick=()=>{
//     const n=clickCount+1;setClickCount(n);clearTimeout(clickTimer.current);
//     if(n>=3){setShowPwd(true);setClickCount(0);return;}
//     clickTimer.current=setTimeout(()=>setClickCount(0),700);
//   };

//   const handleDoubleClick=(t)=>{
//     setHighlightId(t.id);
//     setShowAll(true);
//   };

//   if(showAll) return(
//     <>
//       <GlobalCSS/>
//       <AllPage
//         testimonials={testimonials}
//         onBack={()=>{setShowAll(false);setHighlightId(null);}}
//         highlightId={highlightId}
//       />
//       {showPwd&&<PasswordGate onClose={()=>setShowPwd(false)} onSuccess={()=>{setShowPwd(false);setShowAdmin(true);}}/>}
//       {showAdmin&&<AdminModal testimonials={testimonials} onClose={()=>setShowAdmin(false)} onRefresh={fetchAll}/>}
//     </>
//   );

//   return(
//     <>
//       <GlobalCSS/>
//       <div style={{backgroundColor:"#f5f3eb",minHeight:"100vh",fontFamily:"'Nunito', sans-serif"}}>
//         <div className="t-wrap" style={{maxWidth:1260,margin:"0 auto",padding:"64px 32px 72px",textAlign:"center"}}>

//           {/* <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"#e8f5f0",color:"#2a7a5e",fontSize:13,fontWeight:800,fontStyle:"italic",padding:"6px 16px",borderRadius:30,marginBottom:18}}>
//             <svg width="14" height="14" viewBox="0 0 24 24" fill="#ffffff"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
           
//           </div> */}

//           <h2 className="t-h2" onClick={handleHeadingClick}
//             style={{fontSize:"clamp(1.8rem,4vw,2.9rem)",fontWeight:900,color:"#0c2c55",lineHeight:1.2,marginBottom:10,cursor:"default",userSelect:"none"}}>
//             Our Valuable <span style={{color:"#d4861f"}}>Student's</span>
//             <br/>Awesome Feedback
//           </h2>
// {/* 
//           <p style={{color:"#bbb",fontSize:13.5,fontWeight:700,marginBottom:40}}>
//             {loading?"Loading…":`${testimonials.length} verified reviews · Live from database`}
//           </p> */}

//           {loading&&(
//             <div style={{display:"flex",justifyContent:"center",padding:"60px 0"}}>
//               <div style={{width:40,height:40,border:"4px solid #09274e",borderTop:"4px solid #0c2c55",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
//             </div>
//           )}

//           {error&&!loading&&(
//             <div style={{background:"#fff5f5",border:"1.5px solid #fca5a5",borderRadius:14,padding:"16px 20px",marginBottom:32,color:"#ef4444",fontWeight:700,fontSize:14}}>
//               ⚠️ {error}
//               <button onClick={fetchAll} style={{marginLeft:12,background:"#ef4444",color:"#fff",border:"none",borderRadius:8,padding:"4px 12px",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Retry</button>
//             </div>
//           )}

//           {!loading&&!error&&!testimonials.length&&(
//             <div style={{padding:"60px 0",color:"#ccc"}}>
//               <p style={{fontSize:40,margin:"0 0 10px"}}>💬</p>
//               <p style={{fontWeight:700,fontSize:15}}>No testimonials yet.</p>
//             </div>
//           )}

//           {!loading&&testimonials.length>0&&(
//             <ScrollStrip testimonials={testimonials} onDoubleClick={handleDoubleClick}/>
//           )}

//           {!loading&&testimonials.length>4&&(
//             <button
//               onClick={()=>{setHighlightId(null);setShowAll(true);}}
//               onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.03)";e.currentTarget.style.boxShadow="0 12px 32px hsla(279, 49%, 32%, 0.45)";}}
//               onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="0 6px 22px rgba(42,122,94,0.32)";}}
//               style={{
//                 marginTop:38,padding:"13px 36px",
//                 background:"linear-gradient(135deg,#2a7a5e,#3d8b6e)",
//                 color:"#fff",border:"none",borderRadius:50,
//                 fontWeight:900,fontSize:14,cursor:"pointer",
//                 fontFamily:"'Nunito',sans-serif",
//                 boxShadow:"0 6px 22px rgba(72, 17, 102, 0.32)",
//                 letterSpacing:.3,transition:"transform .2s, box-shadow .2s",
//               }}
//             >
//               See More Reviews ↓&nbsp;&nbsp;
//               <span style={{opacity:.65,fontSize:12}}>({testimonials.length - 4} more)</span>
//             </button>
//           )}
//         </div>
//       </div>

//       {showPwd&&<PasswordGate onClose={()=>setShowPwd(false)} onSuccess={()=>{setShowPwd(false);setShowAdmin(true);}}/>}
//       {showAdmin&&<AdminModal testimonials={testimonials} onClose={()=>setShowAdmin(false)} onRefresh={fetchAll}/>}
//     </>
//   );
// }

// // ── Global CSS ─────────────────────────────────────────────────────────────────
// function GlobalCSS() {
//   return(
//     <style>{`
//       @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
//       @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
//       @keyframes cardUp { from{opacity:0;transform:translateY(26px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
//       @keyframes pageIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
//       @keyframes shake  { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
//       @keyframes spin   { to{transform:rotate(360deg)} }
//       * { box-sizing: border-box; }
//       @media(max-width:580px){
//         .t-wrap{ padding:36px 16px 52px !important; }
//         .t-h2  { font-size:1.6rem !important; }
//       }
//     `}</style>
//   );
// }









import { useState, useEffect, useRef } from "react";

const SUPABASE_URL   = "https://qotiejrokypijozgmtft.supabase.co";
const SUPABASE_KEY   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdGllanJva3lwaWpvemdtdGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MTIyNTYsImV4cCI6MjA5NjE4ODI1Nn0.9WJRm644zr0ayb1kQn5AMP_uDCsbnCYcT6TqCDKseMk";
const ADMIN_PASSWORD = "team2024";
const TABLE          = "testimonials";
const PER_PAGE       = 10;

const headers = {
  "Content-Type": "application/json",
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  Prefer: "return=representation",
};

async function dbFetch(path, options = {}) {
  const res  = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers, ...options });
  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const getAll = ()        => dbFetch(`${TABLE}?select=*&order=created_at.desc`);
const insert = (row)     => dbFetch(TABLE, { method: "POST",  body: JSON.stringify(row) });
const update = (id, row) => dbFetch(`${TABLE}?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(row) });
const remove = (id)      => dbFetch(`${TABLE}?id=eq.${id}`, { method: "DELETE" });

function exportToCSV(data) {
  if (!data || data.length === 0) return;
  const columns = ["No","Name","School or College","Rating","Testimonial","Date Added"];
  const rows    = data.map((t, i) => [
    i + 1,
    `"${(t.name    || "").replace(/"/g, '""')}"`,
    `"${(t.company || "").replace(/"/g, '""')}"`,
    t.rating || 5,
    `"${(t.review  || "").replace(/"/g, '""')}"`,
    t.created_at
      ? new Date(t.created_at).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })
      : "",
  ]);
  const csvContent = "\uFEFF" + [columns.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Testimonials_${new Date().toLocaleDateString("en-IN").replace(/\//g,"-")}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const avatarColors = ["#0c2c55", "#1a3f6e", "#2a4f7a", "#3a5f86", "#4a6f92"]; // new blue shades

// ── DiamondSpark — single elegant yellow diamond, no text ─────────────────────
function DiamondSpark({ size = 28, interactive = false, rating = 5, onRate }) {
  const Spark = ({ sz, lit, onClick }) => (
    <svg
      width={sz} height={sz} viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        display: "block",
        filter: lit
          ? "drop-shadow(0 0 5px rgba(245,166,35,0.85)) drop-shadow(0 0 2px rgba(245,166,35,0.5))"
          : "none",
        transition: "filter 0.2s, opacity 0.2s",
        opacity: lit ? 1 : 0.22,
      }}
    >
      <defs>
        <linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffe066"/>
          <stop offset="50%"  stopColor="#f5a623"/>
          <stop offset="100%" stopColor="#e8860a"/>
        </linearGradient>
      </defs>
      <polygon points="20,2 26,20 20,38 14,20" fill="url(#dg)"/>
      <polygon points="2,20 20,14 38,20 20,26" fill="url(#dg)" opacity="0.88"/>
      <circle cx="20" cy="20" r="2.5" fill="#fff9e6" opacity="0.7"/>
    </svg>
  );

  if (interactive) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {[1,2,3,4,5].map(i => (
          <Spark key={i} sz={22} lit={i <= rating} onClick={() => onRate?.(i)} />
        ))}
      </div>
    );
  }
  return <Spark sz={size} lit={true} />;
}

// ── Avatar ─────────────────────────────────────────────────────────────────────
function Avatar({ initials, idx }) {
  const bg = avatarColors[idx % avatarColors.length];
  return (
    <div style={{
      width:44, height:44, borderRadius:"50%",
      background:`linear-gradient(135deg, ${bg}, ${bg}cc)`,
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#fff", fontWeight:800, fontSize:13, flexShrink:0,
      boxShadow:`0 3px 10px ${bg}44`,
    }}>{initials}</div>
  );
}

// ── Strip Card (scroll strip only) ────────────────────────────────────────────
function StripCard({ t, idx, onDoubleClick }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const CLAMP_LINES    = 5;
  const CHARS_PER_LINE = 55;
  const needsClamp     = (t.review || "").length > CLAMP_LINES * CHARS_PER_LINE;

  const handleTap = () => {
    onDoubleClick(t);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleTap}
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "26px 22px 20px",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Nunito', sans-serif",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.3s, box-shadow 0.35s",
        transform: hov ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: hov
          ? `0 0 0 2.5px #0c2c55, 0 0 10px 4px rgba(12,44,85,0.80),
             0 0 28px 10px rgba(12,44,85,0.50), 0 18px 40px rgba(0,0,0,0.10)`
          : `0 0 0 1.8px rgba(12,44,85,0.55), 0 0 10px 2px rgba(12,44,85,0.18),
             0 2px 8px rgba(0,0,0,0.05)`,
        animation: `fadeUp 0.45s ease ${(idx % 4) * 0.07}s both`,
      }}
    >
      <div style={{
        position:"absolute", top:4, right:14, fontSize:88, fontWeight:900,
        lineHeight:1, color: hov ? "rgba(12,44,85,0.07)" : "#f5f0e0",
        userSelect:"none", fontFamily:"Georgia, serif", transition:"color 0.4s", zIndex:1,
      }}>{"\u201D"}</div>

      <div style={{ marginBottom:10, position:"relative", zIndex:2 }}>
        <DiamondSpark rating={t.rating} />
      </div>

      <p style={{
        fontSize:13.5, color:"#555", lineHeight:1.75,
        marginBottom: needsClamp ? 6 : 20,
        position:"relative", zIndex:2, flex:1,
        ...(needsClamp && !expanded
          ? { display:"-webkit-box", WebkitLineClamp:CLAMP_LINES, WebkitBoxOrient:"vertical", overflow:"hidden" }
          : { display:"block", overflow:"visible" }
        ),
      }}>{t.review}</p>

      {needsClamp && (
        <button
          onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
          style={{
            alignSelf:"flex-start", background:"none", border:"none",
            padding:"0 0 14px", color:"#0c2c55", fontWeight:800,
            fontSize:12, cursor:"pointer", fontFamily:"'Nunito', sans-serif",
            position:"relative", zIndex:2, textDecoration:"underline",
            textUnderlineOffset:3,
          }}
        >{expanded ? "Read Less ↑" : "Read More ↓"}</button>
      )}

      <div style={{
        display:"flex", alignItems:"center", gap:12,
        borderTop:"1px solid #f0ece0", paddingTop:14,
        position:"relative", zIndex:2, marginTop:"auto",
      }}>
        <Avatar initials={t.initials} idx={idx}/>
        <div>
          <p style={{ fontWeight:800, fontSize:14, color:"#1a2e1a", margin:0 }}>{t.name}</p>
          <p style={{ fontSize:12, color:"#aaa", fontWeight:600, margin:0 }}>{t.company}</p>
        </div>
      </div>
    </div>
  );
}

// ── Page Card (AllPage — full width rectangle) ─────────────────────────────────
function PageCard({ t, idx, highlighted, cardRef }) {
  const [hov, setHov] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const needsClamp = (t.review || "").length > 220;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        borderRadius: 18,
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Nunito', sans-serif",
        transition: "transform 0.3s, box-shadow 0.35s",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        boxShadow: highlighted
          ? `0 0 0 3px #f5a623, 0 0 24px 8px rgba(245,166,35,0.50), 0 8px 28px rgba(0,0,0,0.08)`
          : hov
          ? `0 0 0 2px #0c2c55, 0 0 14px 4px rgba(12,44,85,0.45), 0 8px 20px rgba(0,0,0,0.07)`
          : `0 0 0 1.5px rgba(12,44,85,0.40), 0 2px 10px rgba(0,0,0,0.05)`,
        animation: `cardUp 0.5s cubic-bezier(.22,1,.36,1) ${(idx % 10) * 0.05}s both`,
      }}
    >
      {highlighted && (
        <div style={{
          position:"absolute", top:14, right:14,
          background:"#f5a623", color:"#111",
          fontSize:10, fontWeight:900,
          padding:"3px 12px", borderRadius:20, zIndex:5,
        }}>✦ Selected</div>
      )}

      <div style={{
        position:"absolute", left:0, top:0, bottom:0,
        width:5, background:"linear-gradient(180deg, #0c2c55, #1a3f6e)",
      }}/>

      <div style={{ padding:"20px 24px 20px 28px" }}>
        <div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"space-between",
          gap:10,
          marginBottom:14,
          flexWrap:"nowrap",
        }}>
          <div style={{
            display:"flex",
            alignItems:"center",
            gap:10,
            minWidth:0,
            flex:1,
            overflow:"hidden",
          }}>
            <div style={{
              width:42, height:42, borderRadius:"50%", flexShrink:0,
              background:"linear-gradient(135deg, #0c2c55, #1a3f6e)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:"#fff", fontWeight:800, fontSize:13,
              boxShadow:"0 3px 10px rgba(12,44,85,0.35)",
            }}>{t.initials}</div>

            <div style={{ minWidth:0, flex:1 }}>
              <p style={{
                fontWeight:800, fontSize:14, color:"#1a2e1a",
                margin:0, lineHeight:1.3,
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              }}>{t.name}</p>
              <p style={{
                fontSize:11.5, color:"#aaa", fontWeight:600,
                margin:"3px 0 0", lineHeight:1.3,
                whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
              }}>{t.company || "—"}</p>
            </div>
          </div>

          <div style={{ flexShrink: 0 }}>
            <DiamondSpark rating={t.rating} />
          </div>
        </div>

        <div style={{ height:1, background:"#f0ece0", marginBottom:14 }}/>

        <p style={{
          fontSize:14, color:"#555", lineHeight:1.85, margin:0,
          ...(needsClamp && !expanded
            ? { display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }
            : { display:"block" }
          ),
        }}>{t.review}</p>

        {needsClamp && (
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              marginTop:8, background:"none", border:"none", padding:0,
              color:"#0c2c55", fontWeight:800, fontSize:12,
              cursor:"pointer", fontFamily:"'Nunito', sans-serif",
              textDecoration:"underline", textUnderlineOffset:3, display:"block",
            }}
          >{expanded ? "Read Less ↑" : "Read More ↓"}</button>
        )}

      </div>
    </div>
  );
}

// ── AUTO-SCROLL STRIP ──────────────────────────────────────────────────────────
function ScrollStrip({ testimonials, onDoubleClick }) {
  const trackRef  = useRef(null);
  const rafRef    = useRef(null);
  const posRef    = useRef(0);
  const pausedRef = useRef(false);
  const CARD_W = 300;
  const GAP    = 22;

  const items = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cycle = (CARD_W + GAP) * testimonials.length;
    const step = () => {
      if (!pausedRef.current) {
        posRef.current += 0.6;
        if (posRef.current >= cycle) posRef.current -= cycle;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    const pause = () => { pausedRef.current = true; };
    const play  = () => { pausedRef.current = false; };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);
    return () => {
      cancelAnimationFrame(rafRef.current);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
    };
  }, [testimonials]);

  return (
    <div style={{ overflow:"hidden", width:"100%", position:"relative", padding:"10px 0 18px" }}>
      <div style={{ position:"absolute",left:0,top:0,bottom:0,width:80,zIndex:10,pointerEvents:"none",
        background:"linear-gradient(to right,#f5f3eb,transparent)" }}/>
      <div style={{ position:"absolute",right:0,top:0,bottom:0,width:80,zIndex:10,pointerEvents:"none",
        background:"linear-gradient(to left,#f5f3eb,transparent)" }}/>
      <div ref={trackRef} style={{ display:"flex", gap:GAP, willChange:"transform", alignItems:"stretch" }}>
        {items.map((t, i) => (
          <div key={`s-${i}-${t.id}`} style={{ minWidth: CARD_W, maxWidth: CARD_W, flexShrink:0 }}>
            <StripCard t={t} idx={i % testimonials.length} onDoubleClick={onDoubleClick} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ALL PAGE ───────────────────────────────────────────────────────────────────
function AllPage({ testimonials, onBack, highlightId }) {
  const [page,    setPage]    = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const topRef   = useRef(null);
  const cardRefs = useRef({});

  const totalPages = Math.max(1, Math.ceil(testimonials.length / PER_PAGE));

  useEffect(() => {
    if (!highlightId) return;
    const idx = testimonials.findIndex(t => t.id === highlightId);
    if (idx === -1) return;
    const targetPage = Math.ceil((idx + 1) / PER_PAGE);
    setPage(targetPage);
    setAnimKey(k => k + 1);
  }, [highlightId]);

  useEffect(() => {
    if (!highlightId) return;
    const t = setTimeout(() => {
      const el = cardRefs.current[highlightId];
      if (el) el.scrollIntoView({ behavior:"smooth", block:"center" });
    }, 400);
    return () => clearTimeout(t);
  }, [page, highlightId]);

  const slice = testimonials.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = p => {
    setPage(p);
    setAnimKey(k => k + 1);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior:"smooth", block:"start" }), 60);
  };

  return (
    <div style={{ backgroundColor:"#f5f3eb", minHeight:"100vh", fontFamily:"'Nunito', sans-serif" }}>
      <div ref={topRef} style={{ maxWidth:860, margin:"0 auto", padding:"48px 24px 72px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:14 }}>
          <div>
            <h2 style={{ margin:0, fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:900, color:"#1a2e1a" }}>
              All <span style={{ color:"#f5a623" }}>Feedback</span>
            </h2>
            <p style={{ margin:"4px 0 0", fontSize:13, color:"#bbb", fontWeight:600 }}>
              {testimonials.length} verified reviews &nbsp;·&nbsp; Page {page} of {totalPages}
            </p>
          </div>
          <button
            onClick={onBack}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 28px rgba(12,44,85,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(12,44,85,0.30)"; }}
            style={{
              padding:"10px 24px",
              background:"linear-gradient(135deg,#0c2c55,#1a3f6e)",
              color:"#fff", border:"none", borderRadius:50,
              fontWeight:800, fontSize:13, cursor:"pointer",
              fontFamily:"'Nunito', sans-serif",
              boxShadow:"0 4px 16px rgba(12,44,85,0.30)",
              transition:"transform .2s, box-shadow .2s",
            }}
          >← Back</button>
        </div>

        <div
          key={`${page}-${animKey}`}
          style={{ display:"flex", flexDirection:"column", gap:16, animation:"pageIn .45s cubic-bezier(.22,1,.36,1) both" }}
        >
          {slice.map((t, i) => (
            <PageCard
              key={t.id}
              t={t}
              idx={i}
              highlighted={t.id === highlightId}
              cardRef={el => { cardRefs.current[t.id] = el; }}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginTop:44, flexWrap:"wrap" }}>
            <PagBtn arrow="‹" disabled={page === 1}          onClick={() => goTo(page - 1)}/>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <PagBtn key={p} num={p} active={p === page} onClick={() => goTo(p)}/>
            ))}
            <PagBtn arrow="›" disabled={page === totalPages} onClick={() => goTo(page + 1)}/>
          </div>
        )}
      </div>
    </div>
  );
}

function PagBtn({ num, arrow, active, disabled, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: active ? 42 : 34, height: active ? 42 : 34,
        borderRadius:"50%",
        border: active ? "none" : "2px solid #d4c87a",
        background: active ? "linear-gradient(135deg,#0c2c55,#1a3f6e)" : hov && !disabled ? "#e8f5f0" : "transparent",
        color: active ? "#fff" : disabled ? "#ccc" : "#0c2c55",
        fontWeight:800, fontSize:14,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.35 : 1,
        transition:"all .25s cubic-bezier(.22,1,.36,1)",
        boxShadow: active ? "0 0 0 3px rgba(12,44,85,0.18), 0 5px 16px rgba(12,44,85,0.4)" : "none",
        transform: active ? "scale(1.12)" : hov && !disabled ? "scale(1.06)" : "scale(1)",
        fontFamily:"'Nunito', sans-serif",
        display:"flex", alignItems:"center", justifyContent:"center",
        
      }}
    >{arrow ?? num}</button>
  );
}

function AdminModal({ testimonials, onClose, onRefresh }) {
  const [list,setList]=useState(testimonials);
  const [editId,setEditId]=useState(null);
  const [form,setForm]=useState({});
  const [addMode,setAddMode]=useState(false);
  const [saving,setSaving]=useState(false);
  const [exporting,setExporting]=useState(false);
  const [msg,setMsg]=useState("");
  const [msgType,setMsgType]=useState("success");

  const toast=(m,type="success")=>{setMsg(m);setMsgType(type);setTimeout(()=>setMsg(""),3000);};
  const startEdit=t=>{setEditId(t.id);setForm({...t});setAddMode(false);};
  const startAdd=()=>{setAddMode(true);setEditId(null);setForm({name:"",company:"",rating:5,review:""});};
  const cancelEdit=()=>{setEditId(null);setAddMode(false);setForm({});};

  const saveEntry=async()=>{
    if(!form.name?.trim()||!form.review?.trim()){toast("⚠️ Name and review are required","warn");return;}
    setSaving(true);
    const initials=form.name.trim().split(" ").map(w=>w[0]?.toUpperCase()).slice(0,2).join("")||"??";
    const entry={name:form.name,company:form.company||"",initials,rating:form.rating||5,review:form.review};
    try{
      if(addMode){const[c]=await insert(entry);setList(p=>[c,...p]);toast("✅ Testimonial added!");}
      else{await update(editId,entry);setList(p=>p.map(t=>t.id===editId?{...t,...entry}:t));toast("✅ Updated!");}
      cancelEdit();onRefresh();
    }catch{toast("❌ Error saving. Try again.","error");}
    setSaving(false);
  };

  const del=async(id,name)=>{
    if(!window.confirm(`Delete testimonial from "${name}"?`))return;
    try{await remove(id);setList(p=>p.filter(t=>t.id!==id));toast("🗑 Deleted");onRefresh();}
    catch{toast("❌ Error deleting.","error");}
  };

  const tBg=msgType==="error"?"#fff5f5":msgType==="warn"?"#fffbeb":"#f0faf5";
  const tBor=msgType==="error"?"#fca5a5":msgType==="warn"?"#fcd34d":"#b3c9e6";
  const tCol=msgType==="error"?"#ef4444":msgType==="warn"?"#d97706":"#0c2c55";
  const iStyle={width:"100%",padding:"9px 12px",marginBottom:12,border:"1.5px solid #e8e8e8",borderRadius:10,fontSize:13,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box",color:"#333"};
  const lStyle={display:"block",fontSize:11,fontWeight:800,color:"#666",marginBottom:5,textTransform:"uppercase",letterSpacing:.4};

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(10,20,15,0.65)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:16,backdropFilter:"blur(6px)"}}>
      <div style={{background:"#fff",borderRadius:24,width:"100%",maxWidth:580,maxHeight:"90vh",overflowY:"auto",fontFamily:"'Nunito',sans-serif",boxShadow:"0 28px 70px rgba(0,0,0,0.18)"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"20px 24px 14px",borderBottom:"1.5px solid #f0ece0",position:"sticky",top:0,background:"#fff",zIndex:10,borderRadius:"24px 24px 0 0",flexWrap:"wrap",gap:8}}>
          <div>
            <h3 style={{margin:0,fontSize:17,fontWeight:900,color:"#1a2e1a"}}>⚙ Admin Panel</h3>
            <p style={{margin:0,fontSize:11.5,color:"#bbb",fontWeight:600}}>Live database · {list.length} testimonials</p>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
            <button onClick={()=>{setExporting(true);exportToCSV(list);setTimeout(()=>{setExporting(false);toast("📥 Excel downloaded!");},800);}} disabled={exporting||!list.length}
              style={{background:exporting?"#f0f0f0":"linear-gradient(135deg,#0c2c55,#1a3f6e)",color:exporting?"#999":"#fff",border:"none",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:12,cursor:exporting||!list.length?"not-allowed":"pointer",fontFamily:"'Nunito',sans-serif",display:"flex",alignItems:"center",gap:5}}>
              {exporting?"⏳ Exporting…":"📥 Export Excel"}
            </button>
            <button onClick={startAdd} style={{background:"#e8f5f0",color:"#0c2c55",border:"none",borderRadius:10,padding:"7px 13px",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>+ Add New</button>
            <button onClick={onClose} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#bbb"}}>×</button>
          </div>
        </div>
        {msg&&<div style={{margin:"12px 24px 0",background:tBg,border:`1px solid ${tBor}`,borderRadius:10,padding:"10px 14px",fontSize:13,fontWeight:700,color:tCol}}>{msg}</div>}
        <div style={{padding:"16px 24px 28px"}}>
          {(editId!==null||addMode)&&(
            <div style={{background:"#f8fdf9",border:"1.5px solid #b3c9e6",borderRadius:16,padding:"16px 14px",marginBottom:18}}>
              <p style={{margin:"0 0 12px",fontWeight:800,fontSize:12.5,color:"#0c2c55"}}>{addMode?"➕ New Testimonial":"✏️ Editing Testimonial"}</p>
              <label style={lStyle}>Full Name *</label>
              <input value={form.name||""} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="e.g. Sarah Johnson" style={iStyle}/>
              <label style={lStyle}>School or College</label>
              <input value={form.company||""} onChange={e=>setForm(p=>({...p,company:e.target.value}))} placeholder="e.g. St. Joseph School" style={iStyle}/>
              <label style={lStyle}>Rating (click to set)</label>
              <div style={{marginBottom:12}}>
                <DiamondSpark rating={form.rating||5} interactive onRate={r=>setForm(p=>({...p,rating:r}))}/>
              </div>
              <label style={lStyle}>Feedback *</label>
              <textarea value={form.review||""} onChange={e=>setForm(p=>({...p,review:e.target.value}))} rows={3} placeholder="Write their testimonial…" style={{...iStyle,resize:"vertical",minHeight:78}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={saveEntry} disabled={saving} style={{background:saving?"#aaa":"#0c2c55",color:"#fff",border:"none",borderRadius:9,padding:"8px 18px",fontWeight:800,fontSize:12,cursor:saving?"not-allowed":"pointer",fontFamily:"'Nunito',sans-serif"}}>{saving?"Saving…":"✓ Save to Database"}</button>
                <button onClick={cancelEdit} style={{background:"#f0ece0",color:"#888",border:"none",borderRadius:9,padding:"8px 14px",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Cancel</button>
              </div>
            </div>
          )}
          {!list.length&&<div style={{textAlign:"center",padding:"40px 0",color:"#ccc"}}><p style={{fontSize:32,margin:"0 0 8px"}}>📭</p><p style={{fontWeight:700,fontSize:14}}>No testimonials yet.</p></div>}
          {list.map((t,i)=>(
            <div key={t.id} style={{display:"flex",alignItems:"flex-start",gap:11,padding:"12px 0",borderBottom:"1px solid #f5f0e8"}}>
              <Avatar initials={t.initials} idx={i}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                  <p style={{margin:0,fontWeight:800,fontSize:13,color:"#1a2e1a"}}>{t.name}</p>
                  <DiamondSpark rating={t.rating}/>
                </div>
                <p style={{margin:"0 0 3px",fontSize:11,color:"#ccc",fontWeight:600}}>{t.company}</p>
                <p style={{margin:0,fontSize:12,color:"#888",lineHeight:1.6,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{t.review}</p>
              </div>
              <div style={{display:"flex",gap:5,flexShrink:0,paddingTop:2}}>
                <button onClick={()=>startEdit(t)} style={{background:"#eff6ff",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:12}}>✏</button>
                <button onClick={()=>del(t.id,t.name)} style={{background:"#fff5f5",border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",fontSize:12}}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PasswordGate({ onSuccess, onClose }) {
  const [val,setVal]=useState("");
  const [err,setErr]=useState(false);
  const check=()=>{
    if(val===ADMIN_PASSWORD){onSuccess();}
    else{setErr(true);setTimeout(()=>setErr(false),1200);setVal("");}
  };
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(10,20,15,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1500,backdropFilter:"blur(6px)"}}>
      <div style={{background:"#fff",borderRadius:20,padding:"32px 28px",width:310,boxShadow:"0 24px 60px rgba(0,0,0,0.15)",fontFamily:"'Nunito',sans-serif",animation:err?"shake .35s ease":"none",textAlign:"center"}}>
        <div style={{fontSize:34,marginBottom:8}}>🔒</div>
        <h3 style={{margin:"0 0 5px",fontSize:17,fontWeight:900,color:"#1a2e1a"}}>Admin Access</h3>
        <p style={{margin:"0 0 20px",fontSize:13,color:"#bbb",fontWeight:600}}>Enter your team password</p>
        <input type="password" value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} placeholder="••••••••" autoFocus
          style={{width:"100%",padding:"10px 14px",marginBottom:err?8:16,border:`1.5px solid ${err?"#ef4444":"#e8e8e8"}`,borderRadius:11,fontSize:15,textAlign:"center",letterSpacing:3,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box"}}/>
        {err&&<p style={{color:"#ef4444",fontSize:12,fontWeight:700,margin:"0 0 14px"}}>Incorrect password. Try again.</p>}
        <div style={{display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,padding:"10px",background:"#f5f0e8",color:"#888",border:"none",borderRadius:11,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Cancel</button>
          <button onClick={check} style={{flex:2,padding:"10px",background:"linear-gradient(135deg,#0c2c55,#1a3f6e)",color:"#fff",border:"none",borderRadius:11,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Unlock</button>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials,setTestimonials]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [showAll,setShowAll]=useState(false);
  const [highlightId,setHighlightId]=useState(null);
  const [showPwd,setShowPwd]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [clickCount,setClickCount]=useState(0);
  const clickTimer=useRef(null);

  const fetchAll=async()=>{
    try{setLoading(true);const d=await getAll();setTestimonials(d||[]);setError("");}
    catch{setError("Could not load testimonials. Please check your connection.");}
    setLoading(false);
  };
  useEffect(()=>{fetchAll();},[]);

  const handleHeadingClick=()=>{
    const n=clickCount+1;setClickCount(n);clearTimeout(clickTimer.current);
    if(n>=3){setShowPwd(true);setClickCount(0);return;}
    clickTimer.current=setTimeout(()=>setClickCount(0),700);
  };

  const handleDoubleClick=(t)=>{
    setHighlightId(t.id);
    setShowAll(true);
  };

  if(showAll) return(
    <>
      <GlobalCSS/>
      <AllPage
        testimonials={testimonials}
        onBack={()=>{setShowAll(false);setHighlightId(null);}}
        highlightId={highlightId}
      />
      {showPwd&&<PasswordGate onClose={()=>setShowPwd(false)} onSuccess={()=>{setShowPwd(false);setShowAdmin(true);}}/>}
      {showAdmin&&<AdminModal testimonials={testimonials} onClose={()=>setShowAdmin(false)} onRefresh={fetchAll}/>}
    </>
  );

  return(
    <>
      <GlobalCSS/>
      <div style={{backgroundColor:"#f5f3eb",minHeight:"100vh",fontFamily:"'Nunito', sans-serif"}}>
        <div className="t-wrap" style={{maxWidth:1260,margin:"0 auto",padding:"64px 32px 72px",textAlign:"center"}}>
          <h2 className="t-h2" onClick={handleHeadingClick}
            style={{fontSize:"clamp(1.8rem,4vw,2.9rem)",fontWeight:900,color:"#0c2c55",lineHeight:1.2,marginBottom:10,cursor:"default",userSelect:"none"}}>
            Our <span style={{color:"#d4861f"}}>Student's</span>
            <br/>Valuable Feedback
          </h2>

          {loading&&(
            <div style={{display:"flex",justifyContent:"center",padding:"60px 0"}}>
              <div style={{width:40,height:40,border:"4px solid #0c2c55",borderTop:"4px solid #d4861f",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
            </div>
          )}

          {error&&!loading&&(
            <div style={{background:"#fff5f5",border:"1.5px solid #fca5a5",borderRadius:14,padding:"16px 20px",marginBottom:32,color:"#ef4444",fontWeight:700,fontSize:14}}>
              ⚠️ {error}
              <button onClick={fetchAll} style={{marginLeft:12,background:"#ef4444",color:"#fff",border:"none",borderRadius:8,padding:"4px 12px",fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Retry</button>
            </div>
          )}

          {!loading&&!error&&!testimonials.length&&(
            <div style={{padding:"60px 0",color:"#ccc"}}>
              <p style={{fontSize:40,margin:"0 0 10px"}}>💬</p>
              <p style={{fontWeight:700,fontSize:15}}>No testimonials yet.</p>
            </div>
          )}

          {!loading&&testimonials.length>0&&(
            <ScrollStrip testimonials={testimonials} onDoubleClick={handleDoubleClick}/>
          )}

          {!loading&&testimonials.length>4&&(
            <button
              onClick={()=>{setHighlightId(null);setShowAll(true);}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px) scale(1.03)";e.currentTarget.style.boxShadow="0 12px 32px rgba(12,44,85,0.45)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="0 6px 22px rgba(12,44,85,0.32)";}}
              style={{
                marginTop:38,padding:"13px 36px",
                background:"linear-gradient(135deg,#0c2c55,#1a3f6e)",
                color:"#fff",border:"none",borderRadius:50,
                fontWeight:900,fontSize:14,cursor:"pointer",
                fontFamily:"'Nunito',sans-serif",
                boxShadow:"0 6px 22px rgba(12,44,85,0.32)",
                letterSpacing:.3,transition:"transform .2s, box-shadow .2s",
              }}
            >
              See More Reviews ↓&nbsp;&nbsp;
              <span style={{opacity:.65,fontSize:12}}>({testimonials.length - 4} more)</span>
            </button>
          )}
        </div>
      </div>

      {/* {showPwd&&<PasswordGate onClose={()=>setShowPwd(false)} onSuccess={()=>{setShowPwd(false);setShowAdmin(true);}}/>}
      {showAdmin&&<AdminModal testimonials={testimonials} onClose={()=>setShowAdmin(false)} onRefresh={fetchAll}/>} */}
    </>
  );
}

function GlobalCSS() {
  return(
    <style
    suppressHydrationWarning >{`
      
       
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
      @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
      @keyframes cardUp { from{opacity:0;transform:translateY(26px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
      @keyframes pageIn { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      @keyframes shake  { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }
      @keyframes spin   { to{transform:rotate(360deg)} }
      * { box-sizing: border-box; }
      @media(max-width:580px){
        .t-wrap{ padding:36px 16px 52px !important; }
        .t-h2  { font-size:1.6rem !important; }
      }
    `}</style>
  );
}