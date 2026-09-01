import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, AlertTriangle, Ambulance, ArrowUpRight, BatteryLow, Bell,
  Bot, BrainCircuit, CheckCircle2, ChevronRight, Clock3, CloudOff,
  ContactRound, Cpu, Crosshair, FileClock, Gauge, Globe2, Headphones,
  History, Home, LocateFixed, LockKeyhole, MapPin, Menu, MessageSquare,
  Mic, Navigation, Phone, Radio, RefreshCw, Route, Shield, Siren,
  Smartphone, Timer, UserRound, Users, Volume2, Wifi, WifiOff, X
} from "lucide-react";
import "./styles.css";

type Risk = "HIGH" | "MEDIUM" | "LOW";

const incidents = [
  { id: "LFL-1024", type: "Voice SOS", trigger: "“I need help”", risk: "HIGH" as Risk, location: "Main Road, Theni", battery: 18, time: "10:32 AM" },
  { id: "LFL-1023", type: "Fall Detection", trigger: "Impact + no movement", risk: "HIGH" as Risk, location: "College Campus", battery: 42, time: "09:48 AM" },
  { id: "LFL-1022", type: "Safety Check", trigger: "Timer expired", risk: "MEDIUM" as Risk, location: "Bus Stand", battery: 63, time: "09:12 AM" }
];

const timeline = [
  ["10:32:01", "Voice SOS detected", "success"],
  ["10:32:03", "Emergency phrase recognized", "success"],
  ["10:32:04", "AI risk assessment → HIGH", "danger"],
  ["10:32:06", "Location captured", "success"],
  ["10:32:08", "Parent alert sent", "success"],
  ["10:32:20", "No response from parent", "warning"],
  ["10:32:22", "Family escalation initiated", "warning"],
  ["10:32:40", "Emergency service call → Demo", "success"],
  ["10:33:10", "Responder accepted incident", "success"]
];

function App() {
  const [page, setPage] = useState("Overview");
  const [sidebar, setSidebar] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const [risk, setRisk] = useState<Risk>("HIGH");
  const [network, setNetwork] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);

  const nav = [
    ["Overview", Home],
    ["Emergency Monitor", Siren],
    ["AI Risk Engine", BrainCircuit],
    ["Response Center", Radio],
    ["Responder Dashboard", Shield],
    ["Contacts & Escalation", Users],
    ["Location Intelligence", MapPin],
    ["Incident Timeline", History],
    ["Analytics", Gauge],
    ["Settings", Cpu]
  ];

  const startVoiceDemo = () => {
    setDemoActive(true);
    setRisk("HIGH");
    setSelectedIncident(incidents[0]);
  };

  return (
    <div className="app">
      <aside className={`sidebar ${sidebar ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Shield size={24}/></div>
          <div><strong>LifeLink <span>AI</span></strong><small>Emergency Intelligence</small></div>
        </div>

        <div className="status-pill"><span className="pulse"></span> SYSTEM ONLINE</div>

        <nav>
          {nav.map(([label, Icon]) => (
            <button className={page === label ? "nav-item active" : "nav-item"} onClick={() => {setPage(label);setSidebar(false)}} key={label as string}>
              <Icon size={18}/><span>{label as string}</span>{page === label && <ChevronRight size={15}/>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="secure"><LockKeyhole size={15}/> Secure session</div>
          <div className="profile"><div className="avatar">DV</div><div><b>Responder Admin</b><small>Control Center</small></div></div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setSidebar(!sidebar)}><Menu/></button>
          <div><div className="eyebrow">EMERGENCY COMMAND CENTER</div><h1>{page}</h1></div>
          <div className="top-actions">
            <button className="icon-btn" title="Network" onClick={() => setNetwork(!network)}>
              {network ? <Wifi size={18}/> : <WifiOff size={18}/>}
            </button>
            <button className="icon-btn"><Bell size={18}/><i></i></button>
            <div className="live"><span></span> LIVE</div>
          </div>
        </header>

        {page === "Overview" && (
          <>
            <section className="hero">
              <div>
                <div className="hero-tag"><Activity size={15}/> AI EMERGENCY ORCHESTRATION</div>
                <h2>Detect. Understand.<br/><em>Respond.</em></h2>
                <p>LifeLink AI coordinates emergency detection, intelligent risk assessment, fail-forward communication and responder action in one command center.</p>
                <button className="primary" onClick={startVoiceDemo}><Mic size={18}/> Test “I Need Help” <ArrowUpRight size={16}/></button>
              </div>
              <div className="hero-orbit">
                <div className="orbit o1"></div><div className="orbit o2"></div>
                <div className="core"><Siren size={35}/><span>AI<br/>READY</span></div>
                <div className="orbit-node n1"><Mic/></div><div className="orbit-node n2"><MapPin/></div><div className="orbit-node n3"><Phone/></div><div className="orbit-node n4"><Shield/></div>
              </div>
            </section>

            <div className="stat-grid">
              <Stat icon={Siren} label="Active Emergencies" value="02" sub="1 requires attention" danger/>
              <Stat icon={BrainCircuit} label="AI Risk Accuracy" value="94.8%" sub="+2.4% this month"/>
              <Stat icon={Clock3} label="Avg. Response Time" value="68s" sub="-14s improvement"/>
              <Stat icon={Radio} label="System Reliability" value="99.2%" sub="Fail-forward enabled"/>
            </div>

            <section className="grid-2">
              <Card title="Emergency Detection Matrix" icon={Crosshair} action="View all">
                <div className="detection-grid">
                  <Feature icon={Mic} title="Voice SOS" value="Listening" active/>
                  <Feature icon={AlertTriangle} title="Fall Detection" value="Ready"/>
                  <Feature icon={Timer} title="Safety Check" value="18 active"/>
                  <Feature icon={MessageSquare} title="No-Speech Cards" value="Available"/>
                </div>
              </Card>
              <Card title="Communication Health" icon={Radio}>
                <div className="health-list">
                  <Health icon={Globe2} name="Internet" status={network ? "CONNECTED" : "UNAVAILABLE"} ok={network}/>
                  <Health icon={MessageSquare} name="SMS Gateway" status="READY" ok/>
                  <Health icon={Phone} name="Telephony" status="READY" ok/>
                  <Health icon={Volume2} name="TTS Engine" status="READY" ok/>
                </div>
              </Card>
            </section>

            <section className="grid-2">
              <Card title="Active Incidents" icon={Siren} action="Open dashboard">
                <IncidentList onSelect={(i) => {setSelectedIncident(i);setPage("Responder Dashboard")}}/>
              </Card>
              <Card title="AI Emergency Context" icon={BrainCircuit}>
                <div className="context-card">
                  <div className="context-head"><div className="risk-badge high">HIGH RISK</div><span>LFL-1024</span></div>
                  <h3>Possible medical emergency</h3>
                  <p>Voice phrase indicates distress. Location captured. Contact escalation active.</p>
                  <div className="chips"><span><Mic size={13}/> Voice</span><span><MapPin size={13}/> Location</span><span><BatteryLow size={13}/> 18%</span></div>
                  <div className="confidence"><span>AI confidence</span><b>96%</b><div><i style={{width:"96%"}}/></div></div>
                </div>
              </Card>
            </section>
          </>
        )}

        {page !== "Overview" && (
          <section className="page-panel">
            <div className="page-banner">
              <div><div className="hero-tag"><Bot size={15}/> LIFELINK AI MODULE</div><h2>{page}</h2><p>Interactive prototype module — connected to the LifeLink emergency workflow.</p></div>
              <button className="primary" onClick={startVoiceDemo}><Mic size={17}/> Run emergency demo</button>
            </div>
            {page === "Responder Dashboard" ? <ResponderDashboard incident={selectedIncident}/> : <ModulePage page={page} network={network}/>}
          </section>
        )}
      </main>

      {demoActive && <DemoModal onClose={() => setDemoActive(false)} network={network}/>}
    </div>
  );
}

function Stat({icon: Icon, label, value, sub, danger=false}: any) {
  return <div className="stat"><div className={`stat-icon ${danger ? "danger" : ""}`}><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div>
}

function Card({title, icon: Icon, action, children}: any) {
  return <div className="card"><div className="card-title"><div><Icon size={17}/><b>{title}</b></div>{action && <button>{action}<ArrowUpRight size={14}/></button>}</div>{children}</div>
}

function Feature({icon: Icon, title, value, active=false}: any) {
  return <div className="feature"><div className={`feature-icon ${active ? "active" : ""}`}><Icon size={18}/></div><div><b>{title}</b><span>{value}</span></div><span className={`dot ${active ? "green" : ""}`}></span></div>
}

function Health({icon: Icon, name, status, ok}: any) {
  return <div className="health"><div className="health-name"><Icon size={17}/><b>{name}</b></div><span className={ok ? "ok" : "bad"}>{status}</span></div>
}

function IncidentList({onSelect}: any) {
  return <div className="incident-list">{incidents.map(i => <button className="incident" key={i.id} onClick={() => onSelect(i)}>
    <div className={`incident-icon ${i.risk.toLowerCase()}`}><Siren size={17}/></div>
    <div className="incident-main"><b>{i.id} · {i.type}</b><span>{i.location} · {i.time}</span></div>
    <div className={`risk-badge ${i.risk.toLowerCase()}`}>{i.risk}</div><ChevronRight size={16}/>
  </button>)}</div>
}

function ResponderDashboard({incident}: any) {
  return <div className="dashboard-grid">
    <div>
      <Card title="Active Emergency" icon={Siren}>
        <div className="incident-detail">
          <div className="detail-top"><div><span className="eyebrow">INCIDENT ID</span><h3>{incident.id}</h3></div><div className="risk-badge high">🔴 HIGH RISK</div></div>
          <div className="detail-grid">
            <Detail icon={Mic} label="Trigger" value={incident.trigger}/>
            <Detail icon={MapPin} label="Location" value={incident.location}/>
            <Detail icon={BatteryLow} label="Battery" value={`${incident.battery}%`}/>
            <Detail icon={Clock3} label="Time" value={incident.time}/>
          </div>
          <div className="map"><div className="map-grid"></div><div className="map-pin"><MapPin size={30}/></div><div className="map-label"><LocateFixed size={14}/> Live / Last Known Location</div></div>
          <div className="action-row"><button className="primary"><Navigation size={17}/> ACCEPT INCIDENT</button><button className="secondary"><Phone size={17}/> CONTACT</button><button className="secondary"><Route size={17}/> ROUTE</button></div>
        </div>
      </Card>
      <Card title="Emergency Context AI" icon={BrainCircuit}>
        <div className="ai-summary"><div className="ai-ring">96%</div><div><b>High-confidence medical emergency</b><p>Voice distress detected. Victim may require immediate assistance. Escalation path is active.</p></div></div>
      </Card>
    </div>
    <div>
      <Card title="Incident Timeline" icon={FileClock}><div className="timeline">{timeline.map(([time,text,type]) => <div className="timeline-row" key={time+text}><span>{time}</span><i className={type}></i><div><b>{text}</b><small>LifeLink orchestration engine</small></div></div>)}</div></Card>
      <Card title="Response Status" icon={Activity}><div className="response-bars"><Response label="Parent" status="NO RESPONSE" pct={100}/><Response label="Family" status="ALERTED" pct={72}/><Response label="Ambulance" status="DEMO CONNECTED" pct={88}/><Response label="112 / Police" status="INITIATED" pct={61}/></div></Card>
    </div>
  </div>
}

function Detail({icon: Icon, label, value}: any) { return <div className="detail"><Icon size={16}/><span>{label}</span><b>{value}</b></div> }
function Response({label,status,pct}: any) { return <div className="response"><div><b>{label}</b><span>{status}</span></div><div className="bar"><i style={{width:`${pct}%`}}/></div></div> }

function ModulePage({page, network}: {page:string,network:boolean}) {
  const data: Record<string, {title:string, desc:string, items:string[]}> = {
    "Emergency Monitor": {title:"Multi-signal detection",desc:"Monitor every trigger feeding the emergency intelligence layer.",items:["Voice SOS — “I need help”","Manual SOS button","Fall + impact + no movement","Safety check / check-in failure","No-speech emergency cards"]},
    "AI Risk Engine": {title:"Context-aware risk assessment",desc:"Combine signals instead of relying on a single trigger.",items:["LOW — possible accidental trigger","MEDIUM — verify user","HIGH — activate emergency response","Voice distress + fall + no response → HIGH","AI confidence and reason codes"]},
    "Response Center": {title:"Fail-forward response",desc:"Keep the response moving when one communication path fails.",items:["Internet → SMS → Phone call","Parent → Family → Backup","Emergency services escalation","Dynamic TTS alert generation","Every action recorded in timeline"]},
    "Contacts & Escalation": {title:"Adaptive contact routing",desc:"Prioritize the best available contact based on the incident.",items:["Parent / guardian","Family network","Backup contact","Responder network","Priority based on availability and previous response time"]},
    "Location Intelligence": {title:"Location intelligence",desc:"Give responders the best location information available.",items:["Current GPS location","Last-known location fallback","Map view","Location timestamp","Authorized responder sharing"]},
    "Incident Timeline": {title:"Complete incident history",desc:"Make every emergency auditable and understandable.",items:["Detection timestamp","AI decision","Contact status","Service status","Responder acceptance","Resolution time"]},
    "Analytics": {title:"Response intelligence",desc:"Turn emergency history into measurable improvements.",items:["Average response time","Contact delay analysis","Escalation success rate","Communication reliability","Incident trends"]},
    "Settings": {title:"Platform controls",desc:"Configure LifeLink's emergency orchestration environment.",items:["Emergency contacts","Risk thresholds","Communication priority","Responder permissions","Secure emergency profile / QR"]},
  };
  const d = data[page] || data["Emergency Monitor"];
  return <div className="module-content">
    <div className="module-header"><div className="big-module-icon"><BrainCircuit size={30}/></div><div><h3>{d.title}</h3><p>{d.desc}</p></div><div className="module-status"><span className={network ? "green-dot" : "red-dot"}></span>{network ? "Network ready" : "Offline fallback"}</div></div>
    <div className="module-grid">{d.items.map((x,i)=><div className="module-item" key={x}><div className="number">{String(i+1).padStart(2,"0")}</div><div><b>{x}</b><p>Prototype component ready for backend integration.</p></div><CheckCircle2 size={18}/></div>)}</div>
  </div>
}

function DemoModal({onClose,network}: any) {
  const [step,setStep] = useState(0);
  const steps = [
    ["Voice detected","“I need help” recognized",Mic],
    ["AI risk analysis","HIGH RISK · 96% confidence",BrainCircuit],
    ["Emergency mode","Incident LFL-1024 created",Siren],
    ["Location captured","Current / last-known location attached",MapPin],
    ["Contact escalation","Parent → Family → Backup",Users],
    ["Emergency services","108 / 112 call simulation initiated",Ambulance],
    ["Responder dashboard","Incident accepted",Shield]
  ];
  React.useEffect(() => { const t=setInterval(()=>setStep(s=>s<steps.length-1?s+1:s),900); return ()=>clearInterval(t)},[]);
  const [title,desc,Icon] = steps[step];
  return <div className="modal-backdrop"><div className="demo-modal">
    <button className="close" onClick={onClose}><X/></button>
    <div className="demo-top"><div className="demo-mic"><Mic size={25}/></div><div><span className="eyebrow">LIVE PROTOTYPE DEMO</span><h2>“I NEED HELP”</h2></div></div>
    <div className="demo-progress">{steps.map((_,i)=><i className={i<=step?"done":""} key={i}/>)}</div>
    <div className="demo-stage"><div className="stage-icon"><Icon size={34}/></div><h3>{title}</h3><p>{desc}</p><div className="stage-status"><span></span>{network ? "Primary network available" : "Primary network unavailable · fallback active"}</div></div>
    <div className="demo-note"><AlertTriangle size={15}/> Demo Mode — no real emergency call or message is sent.</div>
  </div></div>
}

createRoot(document.getElementById("root")!).render(<App />);