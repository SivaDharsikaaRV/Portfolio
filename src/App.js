import { useState } from "react";

// ── Image imports from src/images folder ──────────────────────────────────
import nptelImg from "./images/nptel.jpg";
import oracleImg from "./images/oracle.jpg";
import nasscomImg from "./images/nasscom.jpg";
import udemyImg from "./images/udemy.jpg";
import courseraImg from "./images/coursera.jpg";
import codsoftCertImg from "./images/codsoft_cert.jpg";
import codsoftOfferImg from "./images/codsoft_offer.jpg";
import infomatOfferImg from "./images/infomat_offer.jpg";
import infomatCertImg from "./images/infomat_cert.jpg";

const IMAGES = {
  nptel: nptelImg,
  oracle: oracleImg,
  nasscom: nasscomImg,
  udemy: udemyImg,
  coursera: courseraImg,
  codsoft_cert: codsoftCertImg,
  codsoft_offer: codsoftOfferImg,
  infomat_offer: infomatOfferImg,
  infomat_cert: infomatCertImg,
};

const CERTS = [
  { id:"nptel",    issuer:"NPTEL",           name:"Programming in Java – Elite + Gold",  badge:"Elite + Gold", badgeType:"gold", icon:"🏅", bg:"linear-gradient(135deg,#1a1a2e,#16213e)" },
  { id:"oracle",   issuer:"Oracle",          name:"Cloud Infrastructure – Generative AI", badge:"Oracle",      badgeType:"cert", icon:"☁️", bg:"linear-gradient(135deg,#0d1117,#1a1a2e)" },
  { id:"nasscom",  issuer:"NASSCOM",         name:"Data Science for Beginners – Gold",    badge:"NASSCOM",     badgeType:"cert", icon:"📊", bg:"linear-gradient(135deg,#0f1923,#1a2332)" },
  { id:"udemy",    issuer:"Udemy",           name:"100 Days Python Pro Bootcamp",          badge:"Udemy",       badgeType:"cert", icon:"🐍", bg:"linear-gradient(135deg,#1a0a2e,#2d1b69)" },
  { id:"coursera", issuer:"Coursera/Google", name:"Crash Course on Python",                badge:"Coursera",   badgeType:"cert", icon:"📚", bg:"linear-gradient(135deg,#001d3d,#003566)" },
];

const INTERNS = [
  { id:"codsoft",  type:"Virtual Internship",  company:"CodSoft",                        role:"🐍 Python Programming Intern", duration:"05 June 2025 – 05 July 2025 · 4 Weeks" },
  { id:"infomat",  type:"On-site Internship",  company:"Infomatronics Project Services", role:"🎨 UI/UX Design Intern",        duration:"01 October 2024 – 15 October 2024 · 15 Days" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  :root{--bg:#0a0a0f;--bg2:#111118;--surface:#16161f;--surface2:#1e1e2a;--border:rgba(255,255,255,0.08);--accent:#c8a97e;--accent2:#8b6faa;--accent3:#6fa8aa;--text:#e8e4dc;--muted:#888898;--white:#ffffff;--grad:linear-gradient(135deg,#c8a97e,#8b6faa);}
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'DM Sans',sans-serif;background:#0a0a0f;color:#e8e4dc;overflow-x:hidden;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.1);}}
  .page{animation:fadeUp .45s ease;}
`;

function injectCSS(c){if(!document.getElementById("sd-css")){const s=document.createElement("style");s.id="sd-css";s.textContent=c;document.head.appendChild(s);}}

const G = {
  grad:{background:"linear-gradient(135deg,#c8a97e,#8b6faa)"},
  surface:{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"16px"},
};

/* ── Modal ── */
function Modal({item,onClose}){
  if(!item)return null;
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:3000,background:"rgba(0,0,0,.88)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"32px"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"20px",maxWidth:"780px",width:"100%",padding:"36px",position:"relative",maxHeight:"88vh",overflowY:"auto"}}>
        <button onClick={onClose} style={{position:"absolute",top:"14px",right:"14px",width:"34px",height:"34px",borderRadius:"50%",background:"var(--surface2)",border:"1px solid var(--border)",cursor:"pointer",color:"var(--text)",fontSize:"1.1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        <div style={{fontSize:".82rem",color:"var(--accent)",marginBottom:"4px"}}>{item.sub}</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.35rem",fontWeight:700,color:"#fff",marginBottom:"20px"}}>{item.title}</div>
        {item.imgKey && IMAGES[item.imgKey]
          ? <img src={IMAGES[item.imgKey]} alt={item.title} style={{width:"100%",borderRadius:"12px",display:"block"}}/>
          : <div style={{width:"100%",minHeight:"280px",borderRadius:"12px",background:"var(--surface2)",border:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"4rem"}}>{item.icon||"📄"}</div>
        }
      </div>
    </div>
  );
}

/* ── Nav ── */
function Nav({page,setPage}){
  const [,setOpen]=useState(false);
  const pages=["home","about","projects","certifications","skills","contact"];
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 40px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(10,10,15,.88)",backdropFilter:"blur(20px)",borderBottom:"1px solid var(--border)"}}>
      <div onClick={()=>setPage("home")} style={{fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",color:"var(--accent)",cursor:"pointer",letterSpacing:".05em"}}>SD</div>
      <div style={{display:"flex",gap:"4px",flexWrap:"wrap"}}>
        {pages.map(p=>(
          <button key={p} onClick={()=>{setPage(p);setOpen(false);}} style={{color:page===p?"var(--accent)":"var(--muted)",background:page===p?"rgba(200,169,126,.12)":"transparent",border:"none",fontSize:".82rem",fontWeight:500,letterSpacing:".04em",textTransform:"uppercase",padding:"6px 12px",borderRadius:"4px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>{p}</button>
        ))}
      </div>
    </nav>
  );
}

/* ── Shared ── */
function PH({label,title,accent}){
  return(
    <div style={{padding:"56px 80px 0",textAlign:"center"}}>
      <div style={{fontSize:".75rem",letterSpacing:".15em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"12px"}}>{label}</div>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(2.4rem,5vw,3.8rem)",fontWeight:900,color:"#fff",lineHeight:1.1}}>
        {title} <span style={{background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{accent}</span>
      </h1>
    </div>
  );
}
function SH({children}){
  return(
    <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.7rem",fontWeight:700,color:"#fff",marginBottom:"28px",display:"flex",alignItems:"center",gap:"14px"}}>
      <span style={{color:"var(--accent)"}}>◆</span>{children}
      <span style={{flex:1,height:"1px",background:"var(--border)",display:"block"}}/>
    </div>
  );
}

/* ── Home ── */
function Home({setPage}){
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 70% 40%,rgba(139,111,170,.13) 0%,transparent 60%),radial-gradient(ellipse 60% 40% at 20% 70%,rgba(200,169,126,.09) 0%,transparent 50%),#0a0a0f"}}/>
      <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)",backgroundSize:"60px 60px"}}/>
      <div style={{position:"relative",zIndex:2,flex:1,display:"flex",alignItems:"center",padding:"60px 80px",gap:"80px",flexWrap:"wrap"}}>
        <div style={{flex:1,minWidth:"280px"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"6px 16px",background:"rgba(200,169,126,.1)",border:"1px solid rgba(200,169,126,.25)",borderRadius:"100px",fontSize:".74rem",letterSpacing:".1em",textTransform:"uppercase",color:"var(--accent)",marginBottom:"32px"}}>
            <span style={{width:"6px",height:"6px",background:"var(--accent)",borderRadius:"50%",display:"inline-block"}}/>
            Available for opportunities
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(3rem,6vw,5.5rem)",fontWeight:900,lineHeight:1.0,letterSpacing:"-.02em",marginBottom:"16px"}}>
            <span style={{display:"block",color:"#fff"}}>SIVA</span>
            <span style={{display:"block",background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>DHARSIKAA R V</span>
          </h1>
          <p style={{fontSize:"1.05rem",color:"var(--muted)",fontWeight:300,letterSpacing:".15em",textTransform:"uppercase",marginBottom:"36px"}}>Software Engineer &amp; IT Graduate</p>
          <p style={{fontSize:".98rem",color:"var(--muted)",lineHeight:1.85,maxWidth:"460px",marginBottom:"44px"}}>Information Technology graduate with practical exposure to web development, programming, and UI/UX design — crafting efficient and reliable digital solutions.</p>
          <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
            <button onClick={()=>setPage("projects")} style={{padding:"13px 30px",...G.grad,color:"#0a0a0f",fontWeight:600,fontSize:".9rem",border:"none",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>View Projects →</button>
            <button onClick={()=>setPage("contact")} style={{padding:"13px 30px",background:"transparent",color:"var(--text)",fontSize:".9rem",border:"1px solid var(--border)",borderRadius:"6px",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Get In Touch</button>
          </div>
        </div>
        <div style={{flexShrink:0}}>
          <div style={{width:"300px",height:"380px",borderRadius:"24px",border:"1px solid rgba(200,169,126,.2)",background:"var(--surface2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px"}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:"5rem",fontWeight:900,background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SD</span>
            <p style={{color:"var(--muted)",fontSize:".8rem"}}>Profile Photo</p>
          </div>
        </div>
      </div>
      <div style={{position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"repeat(3,1fr)",borderTop:"1px solid var(--border)",margin:"0 80px"}}>
        {[["200+","LeetCode Problems Solved"],["5+","Certifications Earned"],["3rd","Year B.Tech IT Student"]].map(([n,l],i)=>(
          <div key={l} style={{padding:"28px 36px",borderRight:i<2?"1px solid var(--border)":"none"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"2.4rem",fontWeight:700,background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>{n}</div>
            <div style={{fontSize:".78rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".08em",marginTop:"6px"}}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── About ── */
function About(){
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px"}}>
      <PH label="Get to know me" title="About" accent="Me"/>
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"36px",padding:"56px 80px",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{...G.surface,padding:"40px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",...G.grad}}/>
          <p style={{fontSize:".98rem",lineHeight:1.9,color:"var(--muted)"}}>Hello, I am a <strong style={{color:"var(--text)"}}>software developer</strong>.<br/><br/>Dedicated and focused Information Technology graduate with practical exposure to web development, programming, and UI/UX design. Possesses a strong interest in applying <strong style={{color:"var(--text)"}}>Java, Python, HTML, Power BI, and DBMS</strong> to develop efficient and reliable solutions while contributing positively to a progressive organization.</p>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.25rem",fontWeight:700,color:"#fff",margin:"28px 0 12px",display:"flex",alignItems:"center",gap:"10px"}}>My Journey<span style={{flex:1,height:"1px",background:"var(--border)",display:"block"}}/></div>
          <p style={{fontSize:".93rem",lineHeight:1.85,color:"var(--muted)"}}>My passion for technology began at an early age, and it has only grown stronger over the years. I believe in continuous learning and staying updated with the latest industry trends. When I'm not coding, I enjoy participating in hackathons, international conferences, and exploring new technologies.</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
          {[
            {title:"🎓 Education",content:<><div style={{fontSize:"1rem",fontWeight:600,color:"#fff"}}>Bachelor of Technology (B.Tech)</div><div style={{fontSize:".88rem",color:"var(--muted)",margin:"4px 0"}}>Information Technology · 3rd Year</div><span style={{display:"inline-block",padding:"3px 10px",background:"rgba(200,169,126,.1)",border:"1px solid rgba(200,169,126,.2)",borderRadius:"4px",fontSize:".73rem",color:"var(--accent)",marginTop:"8px"}}>Expected Graduation: 2027</span></>},
            {title:"✨ Interests",content:<div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>{["Web Development","Software Programming","UI/UX Designs","Hackathons"].map(t=><span key={t} style={{padding:"5px 12px",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"6px",fontSize:".8rem",color:"var(--text)"}}>{t}</span>)}</div>},
            {title:"📍 Location",content:<div style={{fontSize:".9rem",color:"var(--text)"}}>Chennai, Tamil Nadu</div>},
          ].map(({title,content})=>(
            <div key={title} style={{...G.surface,padding:"26px"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:".95rem",fontWeight:700,color:"var(--accent)",marginBottom:"14px",textTransform:"uppercase",letterSpacing:".05em"}}>{title}</h3>
              {content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Projects ── */
function Projects(){
  const projects=[
    {num:"01",icon:"🩸",label:"Blood Management\nWeb App",title:"Blood Donation & Availability Management Web Application",desc:"Successfully developed a real-time web application for blood availability and emergency requests. Implemented filtering by blood group, hospital-wise availability, and PWA support with SMS integration.",tags:["HTML/CSS","JavaScript","PWA","SMS API"]},
    {num:"02",icon:"🌾",label:"Crop Management\nSecurity",title:"Security in Crop Management System",desc:"Group project focused on enhancing security in crop management systems. My role involved programming core functionalities and database structuring to ensure safe and efficient data handling.",tags:["Java","DBMS","Security Logic"]},
  ];
  const events=[
    {icon:"🏥",title:"Smart India Hackathon – MedTech EHR",desc:"Contributed to a MedTech EHR solution during the Smart India Hackathon, focusing on innovative healthcare data management."},
    {icon:"🚂",title:"Train Scheduling System Design",desc:"Designed a comprehensive train scheduling system, optimizing train timings and platform allocation by reducing scheduling conflicts."},
    {icon:"🐛",title:"BugBusters – Debugging Event (Organizer)",desc:`Organized and led "BugBusters" — a Java debugging challenge where participants solved logic-based errors within a time limit.`},
  ];
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px"}}>
      <PH label="My work" title="Projects &" accent="Events"/>
      <div style={{padding:"48px 80px",maxWidth:"1300px",margin:"0 auto"}}>
        <SH>Projects</SH>
        {projects.map(p=>(
          <div key={p.num} style={{display:"grid",gridTemplateColumns:"280px 1fr",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"16px",overflow:"hidden",marginBottom:"20px"}}>
            <div style={{background:"var(--surface2)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px",gap:"12px",borderRight:"1px solid var(--border)"}}>
              <div style={{width:"72px",height:"72px",background:"linear-gradient(135deg,rgba(200,169,126,.15),rgba(139,111,170,.15))",borderRadius:"14px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.2rem"}}>{p.icon}</div>
              <p style={{fontSize:".73rem",color:"var(--muted)",textAlign:"center",whiteSpace:"pre-line"}}>{p.label}</p>
            </div>
            <div style={{padding:"28px"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:".73rem",color:"var(--accent)",marginBottom:"8px"}}>Project {p.num}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.15rem",fontWeight:700,color:"#fff",marginBottom:"10px"}}>{p.title}</div>
              <p style={{fontSize:".9rem",color:"var(--muted)",lineHeight:1.8}}>{p.desc}</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginTop:"14px"}}>{p.tags.map(t=><span key={t} style={{padding:"3px 9px",fontSize:".73rem",fontFamily:"'DM Mono',monospace",background:"rgba(111,168,170,.1)",border:"1px solid rgba(111,168,170,.2)",borderRadius:"4px",color:"var(--accent3)"}}>{t}</span>)}</div>
            </div>
          </div>
        ))}
        <SH>Events &amp; Contributions</SH>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"18px"}}>
          {events.map(e=>(
            <div key={e.title} style={{background:"var(--surface)",border:"1px solid var(--border)",borderLeft:"3px solid var(--accent)",borderRadius:"0 16px 16px 0",padding:"26px"}}>
              <div style={{fontSize:"1.8rem",marginBottom:"10px"}}>{e.icon}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:".98rem",fontWeight:700,color:"#fff",marginBottom:"8px"}}>{e.title}</div>
              <p style={{fontSize:".86rem",color:"var(--muted)",lineHeight:1.7}}>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Certifications ── */
function Certifications({openModal}){
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px"}}>
      <PH label="Credentials" title="Certifications &" accent="Internships"/>
      <div style={{padding:"48px 80px",maxWidth:"1300px",margin:"0 auto"}}>
        <SH>Certifications</SH>
        <p style={{color:"var(--muted)",marginBottom:"24px",fontSize:".88rem"}}>Click any card to view the certificate.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"18px"}}>
          {CERTS.map(c=>(
            <div key={c.id}
              onClick={()=>openModal({title:c.name,sub:c.issuer,icon:c.icon,imgKey:c.id})}
              style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"16px",overflow:"hidden",cursor:"pointer",transition:"all .35s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-7px) rotateX(4deg)";e.currentTarget.style.borderColor="rgba(200,169,126,.45)";e.currentTarget.style.boxShadow="0 20px 50px rgba(0,0,0,.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.boxShadow="none";}}>
              <div style={{height:"140px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.8rem",position:"relative",background:c.bg}}>
                {c.icon}
                <span style={{position:"absolute",top:"10px",right:"10px",padding:"2px 7px",borderRadius:"4px",fontSize:".62rem",fontWeight:600,textTransform:"uppercase",background:c.badgeType==="gold"?"rgba(255,215,0,.15)":"rgba(111,168,170,.15)",color:c.badgeType==="gold"?"#ffd700":"var(--accent3)",border:c.badgeType==="gold"?"1px solid rgba(255,215,0,.3)":"1px solid rgba(111,168,170,.3)"}}>{c.badge}</span>
              </div>
              <div style={{padding:"16px"}}>
                <div style={{fontSize:".68rem",textTransform:"uppercase",letterSpacing:".1em",color:"var(--accent)",marginBottom:"5px"}}>{c.issuer}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:".92rem",fontWeight:700,color:"#fff",lineHeight:1.3}}>{c.name}</div>
                <div style={{fontSize:".74rem",color:"var(--muted)",marginTop:"10px"}}>View Certificate →</div>
              </div>
            </div>
          ))}
        </div>

        {/* Internships */}
        <div style={{marginTop:"52px"}}>
          <SH>Internships</SH>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
            {INTERNS.map(i=>(
              <div key={i.id}
                style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"16px",overflow:"hidden",transition:"all .35s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.borderColor="rgba(200,169,126,.35)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="var(--border)";}}>
                <div style={{padding:"22px 22px 0"}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 10px",background:"rgba(200,169,126,.1)",border:"1px solid rgba(200,169,126,.2)",borderRadius:"100px",fontSize:".68rem",color:"var(--accent)",textTransform:"uppercase",letterSpacing:".07em",marginBottom:"10px"}}>
                    <span style={{width:"4px",height:"4px",background:"var(--accent)",borderRadius:"50%",display:"inline-block"}}/>{i.type}
                  </div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,color:"#fff"}}>{i.company}</div>
                  <div style={{fontSize:".86rem",color:"var(--accent3)",margin:"4px 0 5px"}}>{i.role}</div>
                  <div style={{fontSize:".78rem",color:"var(--muted)",fontFamily:"'DM Mono',monospace"}}>{i.duration}</div>
                </div>
                <div style={{height:"1px",background:"var(--border)",margin:"14px 22px"}}/>
                <div style={{display:"flex",gap:"10px",padding:"0 22px 22px"}}>
                  <button onClick={()=>openModal({title:`${i.company} – Offer Letter`,sub:i.role,icon:"📄",imgKey:`${i.id}_offer`})} style={{flex:1,padding:"9px 12px",borderRadius:"7px",border:"1px solid rgba(139,111,170,.3)",background:"var(--surface2)",color:"var(--accent2)",fontSize:".78rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>📄 Offer Letter</button>
                  <button onClick={()=>openModal({title:`${i.company} – Certificate`,sub:i.role,icon:"🏅",imgKey:`${i.id}_cert`})} style={{flex:1,padding:"9px 12px",borderRadius:"7px",border:"1px solid rgba(200,169,126,.3)",background:"var(--surface2)",color:"var(--accent)",fontSize:".78rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>🏅 Certificate</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ── */
function Skills(){
  const tech=[
    {icon:"💻",title:"Programming Languages",pills:["C","Java","Python"]},
    {icon:"🌐",title:"Web Technologies",pills:["HTML","CSS","JavaScript"]},
    {icon:"🗄️",title:"Databases",pills:["SQL"]},
    {icon:"🛠️",title:"Tools & Platforms",pills:["Git","Figma","VS Code","MS Excel","Power BI","Eclipse","Jupyter"]},
  ];
  const soft=[{icon:"🤝",name:"Interaction"},{icon:"🔗",name:"Coordination"},{icon:"🧠",name:"Reasoning Ability"},{icon:"⏱️",name:"Time Management"},{icon:"🎨",name:"Creativity"},{icon:"🔍",name:"Critical Thinking"}];
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px"}}>
      <PH label="Capabilities" title="My" accent="Skills"/>
      <div style={{padding:"48px 80px",maxWidth:"1300px",margin:"0 auto"}}>
        <SH>Technical Skills</SH>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"18px",marginBottom:"24px"}}>
          {tech.map(g=>(
            <div key={g.title} style={{...G.surface,padding:"26px",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px) rotateX(2deg)";e.currentTarget.style.borderColor="rgba(200,169,126,.3)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="var(--border)";}}>
              <div style={{fontSize:"1.7rem",marginBottom:"10px"}}>{g.icon}</div>
              <div style={{fontSize:".72rem",textTransform:"uppercase",letterSpacing:".1em",color:"var(--accent)",marginBottom:"10px"}}>{g.title}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>{g.pills.map(p=><span key={p} style={{padding:"4px 10px",fontSize:".8rem",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"5px",color:"var(--text)",fontFamily:"'DM Mono',monospace"}}>{p}</span>)}</div>
            </div>
          ))}
        </div>
        <a href="https://leetcode.com/u/SivaDharsikaa/" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:"20px",padding:"24px 28px",background:"linear-gradient(135deg,var(--surface),#1a1a2e)",border:"1px solid rgba(255,161,22,.2)",borderRadius:"14px",textDecoration:"none",marginBottom:"40px"}}>
          <span style={{fontSize:"2.2rem"}}>🟡</span>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",color:"#fff"}}>LeetCode Profile</div>
            <div style={{fontSize:".86rem",color:"var(--muted)",margin:"3px 0"}}>Solved <strong style={{color:"var(--accent)"}}>200+ programs</strong> using Python and Java, including DBMS problems</div>
            <div style={{fontSize:".78rem",color:"#ffa116",marginTop:"4px"}}>leetcode.com/u/SivaDharsikaa/ ↗</div>
          </div>
        </a>
        <SH>Soft Skills</SH>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"14px"}}>
          {soft.map(s=>(
            <div key={s.name} style={{...G.surface,padding:"22px",textAlign:"center",transition:"all .4s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px) rotateX(4deg) scale(1.02)";e.currentTarget.style.borderColor="rgba(139,111,170,.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor="var(--border)";}}>
              <div style={{fontSize:"1.9rem",marginBottom:"8px"}}>{s.icon}</div>
              <div style={{fontSize:".88rem",fontWeight:600,color:"#fff"}}>{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ── */
function Contact({setPage}){
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const submit=e=>{
    e.preventDefault();
    const {name,email,subject,message}=form;
    window.location.href=`mailto:rvdm104@gmail.com?subject=${encodeURIComponent((subject||"Portfolio Contact")+" - from "+name)}&body=${encodeURIComponent("From: "+name+"\nEmail: "+email+"\n\n"+message)}`;
    setForm({name:"",email:"",subject:"",message:""});
    setPage("thankyou");
  };
  const contacts=[
    {icon:"📧",label:"Email",value:"rvdm104@gmail.com",href:"mailto:rvdm104@gmail.com"},
    {icon:"💼",label:"LinkedIn",value:"linkedin.com/in/sivadharsikaa",href:"https://www.linkedin.com/in/sivadharsikaa"},
    {icon:"📞",label:"Phone",value:"9385610091",href:"tel:9385610091"},
    {icon:"📍",label:"Location",value:"Chennai, Tamil Nadu",href:null},
    {icon:"🐙",label:"GitHub",value:"github.com/SivaDharsikaa",href:"https://github.com/SivaDharsikaa"},
  ];
  const inp={width:"100%",padding:"11px 14px",background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"7px",color:"var(--text)",fontSize:".88rem",fontFamily:"'DM Sans',sans-serif",outline:"none"};
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px"}}>
      <PH label="Let's connect" title="Get In" accent="Touch"/>
      <div style={{padding:"48px 80px",maxWidth:"1100px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:"36px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          {contacts.map(c=>(
            <a key={c.label} href={c.href||undefined} target={c.href&&!c.href.startsWith("mailto")&&!c.href.startsWith("tel")?"_blank":undefined} rel="noreferrer" style={{...G.surface,padding:"17px 20px",display:"flex",alignItems:"center",gap:"14px",textDecoration:"none",transition:"all .2s",cursor:c.href?"pointer":"default"}}>
              <div style={{width:"40px",height:"40px",borderRadius:"9px",background:"linear-gradient(135deg,rgba(200,169,126,.1),rgba(139,111,170,.1))",border:"1px solid rgba(200,169,126,.15)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",flexShrink:0}}>{c.icon}</div>
              <div>
                <div style={{fontSize:".7rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".07em"}}>{c.label}</div>
                <div style={{fontSize:".88rem",color:"var(--text)",marginTop:"2px"}}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{...G.surface,padding:"32px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",...G.grad}}/>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1.25rem",fontWeight:700,color:"#fff",marginBottom:"22px"}}>Send a Message ✉️</div>
          <form onSubmit={submit}>
            {[["name","Your Name","text","Enter your name",true],["email","Your Email","email","your@email.com",true],["subject","Subject","text","What's this about?",false]].map(([k,label,type,ph,req])=>(
              <div key={k} style={{marginBottom:"15px"}}>
                <label style={{display:"block",fontSize:".74rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"5px"}}>{label}</label>
                <input type={type} placeholder={ph} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} required={req} style={inp}/>
              </div>
            ))}
            <div style={{marginBottom:"15px"}}>
              <label style={{display:"block",fontSize:".74rem",color:"var(--muted)",textTransform:"uppercase",letterSpacing:".06em",marginBottom:"5px"}}>Message</label>
              <textarea placeholder="Type your message here..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required rows={4} style={{...inp,resize:"vertical"}}/>
            </div>
            <button type="submit" style={{width:"100%",padding:"13px",...G.grad,border:"none",borderRadius:"7px",color:"#0a0a0f",fontWeight:700,fontSize:".92rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>Send Message →</button>
            <p style={{fontSize:".73rem",color:"var(--muted)",marginTop:"9px",textAlign:"center"}}>Your message will be sent to rvdm104@gmail.com</p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ── Thank You ── */
function ThankYou({setPage}){
  return(
    <section className="page" style={{minHeight:"100vh",paddingTop:"64px",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 70% at 50% 50%,rgba(200,169,126,.07),transparent 70%)"}}/>
      <div style={{position:"relative",zIndex:2,padding:"40px",maxWidth:"560px"}}>
        <div style={{fontSize:"4.5rem",marginBottom:"20px",animation:"pulse 2s ease-in-out infinite"}}>💌</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"3.2rem",fontWeight:900,color:"#fff",marginBottom:"14px"}}>Thank You!</h1>
        <p style={{fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.7,marginBottom:"36px"}}>Your message has been sent successfully. I appreciate you reaching out and will get back to you soon.</p>
        <button onClick={()=>setPage("home")} style={{padding:"13px 30px",...G.grad,color:"#0a0a0f",border:"none",borderRadius:"8px",fontWeight:700,fontSize:".92rem",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}}>← Back to Home</button>
      </div>
    </section>
  );
}

/* ── App ── */
export default function App(){
  injectCSS(css);
  const [page,setPage]=useState("home");
  const [modal,setModal]=useState(null);
  const pages={
    home:<Home setPage={setPage}/>,
    about:<About/>,
    projects:<Projects/>,
    certifications:<Certifications openModal={setModal}/>,
    skills:<Skills/>,
    contact:<Contact setPage={setPage}/>,
    thankyou:<ThankYou setPage={setPage}/>
  };
  return(
    <div style={{minHeight:"100vh",background:"#0a0a0f"}}>
      <Nav page={page} setPage={setPage}/>
      <main>{pages[page]||pages.home}</main>
      <Modal item={modal} onClose={()=>setModal(null)}/>
    </div>
  );
}