import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PresentationPage.css';

const SLIDES = [
  { type: 'title', theme: 'dark' },
  { type: 'scope', theme: 'light' },
  { type: 'steps', theme: 'light' },
  { type: 'title-review', theme: 'dark' },
  // --- Onboarding Phase ---
  { type: 'onboarding1', theme: 'light' },
  { type: 'onboarding2', theme: 'light' },
  { type: 'onboarding3', theme: 'light' },
  { type: 'onboarding4', theme: 'light' },
  { type: 'friction1', theme: 'light' },
  { type: 'friction2', theme: 'light' },
  { type: 'friction3', theme: 'light' },
  { type: 'friction-content-type', theme: 'light' },
  { type: 'friction4', theme: 'light' },
  // --------------------------------
  { type: 'capture-result', theme: 'light' },
  { type: 'edit-needed', theme: 'light' },
  { type: 'editor-overwhelm', theme: 'light' },
  { type: 'title-diagnose', theme: 'dark' },
  { type: 'psych-graph', theme: 'light' },
  { type: 'problem', theme: 'light' },
  { type: 'activation', theme: 'light' },
  { type: 'assumptions', theme: 'light' },
  { type: 'title-define', theme: 'dark' },
  { type: 'personas', theme: 'light' },
  { type: 'output-formats', theme: 'light' },
  { type: 'persona-flow', theme: 'light' },
  { type: 'title-plan', theme: 'dark' },
  { type: 'solution-features', theme: 'light' },
  { type: 'activation-logic', theme: 'light' },
  { type: 'capture-persona', theme: 'light' },
  { type: 'title-prototype', theme: 'dark' },
  { type: 'validation', theme: 'light' },
  { type: 'metrics', theme: 'light' },
  { type: 'roadmap', theme: 'light' },
  { type: 'risks', theme: 'dark' }
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const total = SLIDES.length;

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  const progress = (current / (total - 1)) * 100;
  const currentSlide = SLIDES[current];
  const bgClass = currentSlide.theme === 'dark' ? 'pres-bg-dark' : 'pres-bg-light';

  return (
    <div className={`pres-root ${bgClass}`}>
      <div className="pres-progress-track">
        <div className="pres-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <button
        className="pres-prototype-btn"
        onClick={() => navigate('/flow')}
      >
        Prototype →
      </button>

      <div className="pres-viewport">
        <div key={current} className="pres-slide">
          {currentSlide.type === 'title' && <Slide1Title />}
          {currentSlide.type === 'scope' && <Slide2Scope />}
          {currentSlide.type === 'steps' && <Slide3Steps />}
          {currentSlide.type === 'title-review' && <SectionTitle step="1" title="Review App" />}
          {currentSlide.type === 'onboarding1' && <OnboardingSlide num="1" title="Setup Workspace Name" description="The very first step after I register asks me to select and define my workspace name to personalize my environment. It feels welcoming." imagePath="/images/1.png" psychLevel={60} psychChange={+10} />}
          {currentSlide.type === 'onboarding2' && <OnboardingSlide num="2" title="Company Details" description="I'm asked about my company size and role. It feels less like personalization and more like a lead-scoring form — the sales intent is a bit too visible." imagePath="/images/2.png" psychLevel={55} psychChange={-5} />}
          {currentSlide.type === 'onboarding3' && <OnboardingSlide num="3" title="User Intent" description="The wizard asks exactly what I want to do with Guidde. This is a crucial step that makes me feel understood regarding my primary goals." imagePath="/images/3.png" psychLevel={60} psychChange={+5} />}
          {currentSlide.type === 'onboarding4' && <OnboardingSlide num="4" title="Brand Kit" description="I'm introduced to the Brand Kit. It automatically scans my website to pull my brand colors and logos, completely removing the need for manual setup! This is mind-blowing." imagePath="/images/4.png" psychLevel={75} psychChange={+15} />}
          {currentSlide.type === 'friction1' && <Slide4Friction1 />}
          {currentSlide.type === 'friction2' && <Slide5Friction2 />}
          {currentSlide.type === 'friction3' && <Slide6Friction3 />}
          {currentSlide.type === 'friction-content-type' && <SlideFrictionContentType />}
          {currentSlide.type === 'friction4' && <Slide7Friction4 />}
          
          {currentSlide.type === 'capture-result' && <SlideCaptureResult />}
          {currentSlide.type === 'edit-needed' && <SlideEditNeeded />}
          {currentSlide.type === 'editor-overwhelm' && <SlideEditorOverwhelm />}

          {currentSlide.type === 'title-diagnose' && <SectionTitle step="2" title="Diagnose Problem" />}
          {currentSlide.type === 'psych-graph' && <SlidePsychGraph />}
          {currentSlide.type === 'problem' && <Slide10Problem />}
          {currentSlide.type === 'activation' && <SlideActivation />}
          {currentSlide.type === 'assumptions' && <SlideAssumptions />}
          {currentSlide.type === 'title-define' && <SectionTitle step="3" title="Define Personas" />}
          {currentSlide.type === 'personas' && <Slide11Personas />}
          {currentSlide.type === 'output-formats' && <SlideOutputFormats />}
          {currentSlide.type === 'persona-flow' && <SlidePersonaFlow />}
          {currentSlide.type === 'title-plan' && <SectionTitle step="4" title="Plan Solution" />}
          {currentSlide.type === 'solution-features' && <SlideSolutionFeatures />}
          {currentSlide.type === 'activation-logic' && <SlideActivationLogic />}
          {currentSlide.type === 'capture-persona' && <SlideCapturePersona />}
          {currentSlide.type === 'title-prototype' && <SlideTitlePrototype />}
          {currentSlide.type === 'validation' && <SlideValidation />}
          {currentSlide.type === 'metrics' && <Slide15Metrics />}
          {currentSlide.type === 'roadmap' && <Slide16Roadmap />}
          {currentSlide.type === 'risks' && <Slide17Risks />}
        </div>
      </div>

      <div className="pres-nav-hints">
        <button className="pres-nav-btn" onClick={prev} disabled={current === 0}>←</button>
        <button className="pres-nav-btn" onClick={next} disabled={current === total - 1}>→</button>
      </div>

      <div
        className="pres-dots"
        style={{ width: 'min(400px, calc(100vw - 180px))', height: '4px', background: 'rgba(128,128,160,0.25)', cursor: 'pointer', position: 'relative' }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const newCurrent = Math.round((clickX / rect.width) * (total - 1));
          setCurrent(Math.max(0, Math.min(newCurrent, total - 1)));
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progress}%`, background: 'var(--g-brand, #6c47ff)', borderRadius: '3px', transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>

      <div className="pres-counter">{current + 1} / {total}</div>
    </div>
  );
}

function Slide1Title() {
  return (
    <div className="pres-section-title-wrap" style={{ gap: '32px' }}>
      <div className="pres-section-ghost-num" style={{ opacity: 0.07, fontSize: 'clamp(120px, 16vw, 220px)' }}>PM</div>
      <div className="pres-section-badge">Product Manager Assignment · Guidde · April 2026</div>
      <h1 className="pres-section-title" style={{ fontSize: 'clamp(52px, 7vw, 96px)', maxWidth: '900px' }}>
        Redesigning Guidde's First Creation Experience
      </h1>
      <div className="pres-footer-text">Yam</div>
    </div>
  );
}

function Slide2Scope() {
  const inScope = [
    { icon: '🧩', title: 'Browser Extension Flow', sub: 'The main way users create Guiddes' },
    { icon: '👤', title: 'Three User Types',        sub: 'Support · Sales · Marketing' },
    { icon: '📅', title: 'First 7 Days',            sub: 'The trial window that matters most' },
    { icon: '🔍', title: 'User Review',             sub: 'Find where users stop and drop off' },
  ];
  const outScope = ['Desktop recorder', 'File uploads', 'Team admin & billing', 'Advanced editing'];

  return (
    <div className="pres-content-wrap" style={{ gap: '32px' }}>
      <div>
        <h2 className="pres-title">Scope of Assignment</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>What I focused on — and what I deliberately left out</p>
      </div>

      {/* 2×2 IN SCOPE grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {inScope.map(({ icon, title, sub }) => (
          <div key={title} className="pres-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '20px', padding: '28px 32px' }}>
            <div style={{
              width: '52px', height: '52px', flexShrink: 0,
              background: 'var(--g-brand-dim, rgba(75,123,245,0.10))',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', lineHeight: 1,
            }}>{icon}</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 'clamp(18px,1.8vw,22px)', color: 'var(--g-text)', lineHeight: 1.2 }}>{title}</div>
              <div style={{ fontSize: 'clamp(14px,1.3vw,17px)', color: 'var(--g-muted)', marginTop: '6px', lineHeight: 1.5 }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* OUT OF SCOPE strip */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
        padding: '20px 28px', borderRadius: '14px',
        background: '#F0F2F8', border: '1.5px solid var(--g-border)',
      }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--g-muted)', whiteSpace: 'nowrap' }}>Out of scope</span>
        <div style={{ width: '1px', height: '18px', background: 'var(--g-border)', flexShrink: 0 }} />
        {outScope.map(item => (
          <span key={item} style={{
            fontSize: '14px', fontWeight: 500, color: 'var(--g-muted)',
            background: 'white', border: '1.5px solid var(--g-border)',
            borderRadius: '99px', padding: '4px 14px',
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function Slide3Steps() {
  return (
    <div className="pres-content-wrap centered">
      <h2 className="pres-title">Time Management (4 Hours)</h2>
      <h3 className="pres-subtitle">How I split my time to solve this assignment</h3>

      <div className="pres-card" style={{ marginTop: '50px', display: 'inline-block', textAlign: 'left', padding: '40px 60px' }}>
        <ul className="pres-list" style={{ fontSize: '24px', gap: '24px' }}>
          <li className="pres-list-item">
            <span style={{ width: '260px', display: 'inline-block', fontWeight: 600 }}>1. Review App</span>
            <span style={{ color: 'var(--pres-text-muted)' }}>30 mins</span>
          </li>
          <li className="pres-list-item">
            <span style={{ width: '260px', display: 'inline-block', fontWeight: 600 }}>2. Diagnose Problem</span>
            <span style={{ color: 'var(--pres-text-muted)' }}>30 mins</span>
          </li>
          <li className="pres-list-item">
            <span style={{ width: '260px', display: 'inline-block', fontWeight: 600 }}>3. Define Personas</span>
            <span style={{ color: 'var(--pres-text-muted)' }}>30 mins</span>
          </li>
          <li className="pres-list-item">
            <span style={{ width: '260px', display: 'inline-block', fontWeight: 600 }}>4. Plan Solution</span>
            <span style={{ color: 'var(--pres-text-muted)' }}>1 hour</span>
          </li>
          <li className="pres-list-item">
            <span style={{ width: '260px', display: 'inline-block', fontWeight: 600, color: 'var(--pres-blue)' }}>5. Presentation</span>
            <span style={{ color: 'var(--pres-text-muted)' }}>45 mins</span>
          </li>
          <li className="pres-list-item">
            <span style={{ width: '260px', display: 'inline-block', fontWeight: 600, color: 'var(--pres-blue)' }}>6. Prototype</span>
            <span style={{ color: 'var(--pres-text-muted)' }}>45 mins</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function PsychMeter({ level, change }) {
  const color = level > 60 ? 'var(--pres-green)' : level > 30 ? 'var(--pres-amber)' : 'var(--pres-red)';
  const dropoffLevel = 35; // Drop-off visual threshold
  const prevLevel = change !== undefined ? level - change : null;
  const prevColor = change > 0 ? 'var(--pres-green)' : 'var(--pres-red)';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      height: '60vh', width: '60px',
      position: 'absolute', left: '60px', top: '50%', transform: 'translateY(-50%)', zIndex: 50
    }}>
      <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '24px', color: 'var(--pres-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', transform: 'rotate(-180deg)', writingMode: 'vertical-rl' }}>
        User Psych
      </div>
      <div style={{
        flex: 1, width: '24px', background: 'rgba(128,128,128,0.2)',
        borderRadius: '12px', position: 'relative', overflow: 'visible'
      }}>
        <div style={{
          position: 'absolute', bottom: `${dropoffLevel}%`, left: 0, right: 0, height: '2px',
          background: 'gray', zIndex: 10, opacity: 0.5
        }} />
        {/* Ghost bar: previous level */}
        {prevLevel !== null && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: `${Math.max(0, prevLevel)}%`,
            background: prevColor, borderRadius: '12px', opacity: 0.2,
          }} />
        )}
        {/* Current bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: `${level}%`,
          background: color, borderRadius: '12px', transition: 'all 0.5s ease'
        }} />
        {change !== undefined && (
          <div style={{
            position: 'absolute', bottom: `${level}%`, left: '150%',
            color: change > 0 ? 'var(--pres-green)' : 'var(--pres-red)',
            fontWeight: 700, fontSize: '24px', whiteSpace: 'nowrap',
            animation: 'presFadeIn 0.5s ease'
          }}>
            {change > 0 ? `+${change}` : change}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper for Friction slides
function FrictionLayout({ num, title, experience, description, recommendation, principle, imagePath, psychLevel, psychChange }) {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
      <PsychMeter level={psychLevel} change={psychChange} />
      <div className="pres-content-wrap" style={{ gap: '24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="pres-num-circle" style={{ width: '56px', height: '56px', fontSize: '28px', flexShrink: 0 }}>{num}</div>
          <h2 className="pres-title" style={{ fontSize: '40px' }}>{title}</h2>
        </div>

        {experience && <p className="pres-card-body" style={{ fontSize: '20px', maxWidth: '800px', marginBottom: '8px' }}>{experience}</p>}

        <img className="pres-friction-image" src={imagePath} alt={`Friction ${num}`} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        <div style={{ display: 'none', flexDirection: 'column', color: '#6B7294', textAlign: 'center', fontSize: '20px', width: '100%', minHeight: '30vh', justifyContent: 'center' }}>
          Image Placeholder<br />{imagePath}
        </div>

        <div className="pres-card" style={{ padding: '32px' }}>
          <h3 className="pres-card-title" style={{ color: 'var(--pres-red)' }}>The Problem</h3>
          {Array.isArray(description)
            ? <ul style={{ marginTop: '16px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {description.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--pres-red)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>—</span>
                    <p className="pres-card-body" style={{ margin: 0 }}>{item}</p>
                  </li>
                ))}
              </ul>
            : <p className="pres-card-body" style={{ marginTop: '16px' }}>{description}</p>
          }
        </div>
      </div>
    </div>
  );
}

function OnboardingSlide({ num, title, description, imagePath, psychLevel, psychChange }) {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
      <PsychMeter level={psychLevel} change={psychChange} />
      <div className="pres-content-wrap" style={{ gap: '24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="pres-num-circle" style={{ width: '56px', height: '56px', fontSize: '28px', flexShrink: 0 }}>{num}</div>
          <h2 className="pres-title" style={{ fontSize: '40px' }}>{title}</h2>
        </div>
        {description && <p className="pres-card-body" style={{ fontSize: '20px', maxWidth: '800px', marginBottom: '8px' }}>{description}</p>}
        <img className="pres-friction-image" src={imagePath} alt={`Onboarding ${num}`} style={{ maxHeight: '45vh', objectFit: 'contain', width: 'auto', maxWidth: '100%' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        <div style={{ display: 'none', flexDirection: 'column', color: '#6B7294', textAlign: 'center', fontSize: '20px', width: '100%', minHeight: '30vh', justifyContent: 'center' }}>
          Image Placeholder<br />{imagePath}
        </div>
      </div>
    </div>
  );
}

function Slide4Friction1() {
  return <FrictionLayout
    num="5"
    title="Wizard stops too soon & popups appear"
    experience="The onboarding guide just... stops. I'm dropped into an empty dashboard with no idea what to do next."
    description="The guide suddenly stops and drops me into an empty dashboard with a popup. I go from knowing exactly what to do to feeling completely lost."
    recommendation="The guide must not stop until the extension is fully installed and used once. The 'finish line' is creating my first Guidde, not just signing up."
    principle="Keeps the user moving forward"
    imagePath="/images/5.png"
    psychLevel={65}
    psychChange={-10}
  />;
}

function Slide5Friction2() {
  return <FrictionLayout
    num="6"
    title="Popup appears out of nowhere"
    experience="Right as I'm about to click the extension and finally start recording, a pricing popup blocks the screen out of nowhere."
    description="Just as I'm about to click the extension button and actually start using Guidde, a pricing popup appears completely out of nowhere and blocks my flow."
    recommendation="Never interrupt momentum. Hide pricing completely until I have successfully created and shared my very first Guidde."
    principle="Don't break the user's flow"
    imagePath="/images/6.png"
    psychLevel={55}
    psychChange={-10}
  />;
}

function Slide6Friction3() {
  return <FrictionLayout
    num="7"
    title="Chrome permission warning is scary"
    experience="Chrome flashes a warning: this extension can 'read all data on websites you visit.' I pause — that sounds way scarier than I expected."
    description="Chrome warns me that the extension can 'read all data'. This feels very scary. Guidde needs it to record screens, but I didn't know that."
    recommendation="Add a message before the installation explaining: 'We need this permission just to record the screen.' This builds trust before Chrome asks."
    principle="Build trust with users"
    imagePath="/images/9.png"
    psychLevel={35}
    psychChange={-20}
  />;
}

function SlideFrictionContentType() {
  return (
    <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', margin: '0 auto', alignItems: 'center' }}>
      <PsychMeter level={30} change={-5} />
      <div className="pres-content-wrap" style={{ gap: '24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="pres-num-circle" style={{ width: '56px', height: '56px', fontSize: '28px', flexShrink: 0 }}>8</div>
          <h2 className="pres-title" style={{ fontSize: '40px' }}>"What are you creating?" — a blind commitment</h2>
        </div>

        <p className="pres-card-body" style={{ fontSize: '20px', maxWidth: '800px', marginBottom: '8px' }}>The extension asks me to pick a content type before I record anything. I choose one — but I've never seen what any of these options actually produce.</p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/images/11.png" alt="What are you creating? extension popup" style={{ maxHeight: '28vh', width: 'auto', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div style={{ display: 'none', flexDirection: 'column', color: '#6B7294', textAlign: 'center', fontSize: '20px', width: '100%', minHeight: '20vh', justifyContent: 'center' }}>
            Image Placeholder — /images/11.png
          </div>
        </div>

        <div className="pres-card" style={{ padding: '32px' }}>
          <h3 className="pres-card-title" style={{ color: 'var(--pres-red)' }}>The Problem</h3>
          <p className="pres-card-body" style={{ marginTop: '16px' }}>Five options, zero context. The user picks one without knowing what the output will look like — a training guide, a demo video, and an interactive tour are very different things. The choice feels arbitrary. When the result doesn't match their mental model, the aha moment turns into a miss and they leave.</p>
        </div>
      </div>
    </div>
  );
}

function Slide7Friction4() {
  return <FrictionLayout
    num="9"
    title="Capture is a black box"
    experience="I start clicking through my workflow. The extension shows a step counter — but I have no idea if my actions are actually being captured."
    description={[
      "The extension shows nothing but a generic step counter. I have no idea if my clicks are being recorded correctly — one missed step means re-recording everything.",
      "Empty clicks count as steps. If I click somewhere that does nothing, or double-click something by mistake, it's recorded as a real step — silently polluting my Guidde with junk I'll only discover after the fact.",
    ]}
    recommendation="Keep the recording bar visible at all times. Show a live step count next to the last captured action (3 words max). Tap to expand and review all captured steps. Immediate confirmation — zero screen clutter."
    principle="Give instant feedback"
    imagePath="/images/13.png"
    psychLevel={25}
    psychChange={-5}
  />;
}

function SlideCaptureResult() {
  return <OnboardingSlide
    num="10"
    title="The 'Aha!' Moment"
    description="After capturing everything, it redirects me to the Guidde it automatically made. The result looks amazing right out of the box."
    imagePath="/images/14.png"
    psychLevel={75}
    psychChange={+50}
  />;
}

function SlideEditNeeded() {
  return <OnboardingSlide
    num="11"
    title="Wait — this isn't quite right"
    description="The auto-generated Guidde looks impressive, but looking closer I can see some captions are off, a step is missing, and the tone isn't right for my audience. I'm going to need to edit this before I can share it."
    imagePath="/images/14.png"
    psychLevel={65}
    psychChange={-10}
  />;
}

function SlideEditorOverwhelm() {
  return <FrictionLayout
    num="12"
    title="Overwhelming Editor"
    experience="I click Edit. The screen fills with panels, toolbars, and controls — I just wanted to fix one caption."
    description="I want to make a simple edit, so I click the 'Edit' button. It sends me to an overwhelming editor with way too many options."
    recommendation="Simplify the default editor interface. Focus on basic needs first, progressively revealing advanced options to reduce cognitive load."
    principle="Reduce cognitive load"
    imagePath="/images/editor.png"
    psychLevel={25}
    psychChange={-40}
  />;
}

function SlidePsychGraph() {
  const data = [
    { step: 1,  label: ['Workspace', 'Name'],     level: 60 },
    { step: 2,  label: ['Company',   'Details'],   level: 55 },
    { step: 3,  label: ['User',      'Intent'],    level: 60 },
    { step: 4,  label: ['Brand',     'Kit'],       level: 75 },
    { step: 5,  label: ['Wizard',    'Stops'],     level: 65 },
    { step: 6,  label: ['Pricing',   'Popup'],     level: 55 },
    { step: 7,  label: ['Chrome',    'Warning'],   level: 35 },
    { step: 8,  label: ['Blind',     'Choice'],    level: 30 },
    { step: 9,  label: ['Blind',     'Capture'],   level: 25 },
    { step: 10, label: ['Aha!',      'Moment'],    level: 75 },
    { step: 11, label: ['Needs',     'Editing'],   level: 65 },
    { step: 12, label: ['Editor',    'Overwhelm'], level: 25 },
  ];

  const W = 1060, H = 440;
  const padL = 52, padR = 96, padT = 52, padB = 92;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const DROPOFF = 35;

  const col = (v) => v > 60 ? '#34D399' : v > 30 ? '#F59E0B' : '#EF4444';
  const px  = (i) => padL + (i / (data.length - 1)) * chartW;
  const py  = (v) => padT + (1 - v / 100) * chartH;

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${px(i).toFixed(1)} ${py(d.level).toFixed(1)}`).join(' ');
  const dropoffY = py(DROPOFF);

  return (
    <div className="pres-content-wrap centered" style={{ gap: '12px' }}>
      <h2 className="pres-title">User Psych Journey</h2>
      <h3 className="pres-subtitle">Emotional arc across the 12 steps of the first-creation experience</h3>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', marginTop: '8px' }}>
        {/* Drop-off zone shading */}
        <rect x={padL} y={dropoffY} width={chartW} height={padT + chartH - dropoffY} fill="rgba(239,68,68,0.06)" />

        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={padL} y1={py(v)} x2={padL + chartW} y2={py(v)} stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            <text x={padL - 10} y={py(v) + 5} textAnchor="end" fill="#9ca3af" fontSize="13">{v}</text>
          </g>
        ))}

        {/* Drop-off threshold line */}
        <line x1={padL} y1={dropoffY} x2={padL + chartW} y2={dropoffY} stroke="#9ca3af" strokeDasharray="6,4" strokeWidth="2" />
        <text x={padL + chartW + 10} y={dropoffY + 5} fill="#9ca3af" fontSize="13" fontWeight="600">drop-off</text>

        {/* Connecting line */}
        <path d={linePath} fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

        {/* Dots */}
        {data.map((d, i) => (
          <circle key={i} cx={px(i)} cy={py(d.level)} r="10" fill={col(d.level)} stroke="white" strokeWidth="3" />
        ))}

        {/* Level labels above dots */}
        {data.map((d, i) => (
          <text key={i} x={px(i)} y={py(d.level) - 17} textAnchor="middle" fill={col(d.level)} fontSize="15" fontWeight="700">{d.level}</text>
        ))}

        {/* X-axis: step number + label */}
        {data.map((d, i) => (
          <g key={i}>
            <text x={px(i)} y={H - padB + 22} textAnchor="middle" fill="#6b7280" fontSize="13" fontWeight="700">{d.step}</text>
            {d.label.map((ln, li) => (
              <text key={li} x={px(i)} y={H - padB + 38 + li * 15} textAnchor="middle" fill="#9ca3af" fontSize="11">{ln}</text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

function Slide10Problem() {
  const points = [
    {
      step: 8,
      color: '#F97316',
      label: 'Blind Choice',
      title: 'The user commits to a format they\'ve never seen',
      body: 'The extension asks "What are you creating?" before a single click is recorded — but shows no preview of what each option produces. The user picks one blind. When the result doesn\'t match their mental model, the aha moment becomes a miss.',
      persona: '✨ Hits Marketing hardest — an interactive demo and a help article look nothing alike. Wrong choice = wrong output.',
      personaColor: '#D97706',
    },
    {
      step: 9,
      color: 'var(--pres-red)',
      label: 'Blind Capture',
      title: 'No feedback during recording — errors stay hidden',
      body: 'The capture bar shows only a step counter. Empty clicks and accidental double-clicks are silently recorded as real steps. The user has no way to review or remove them without scrapping the whole recording and starting over.',
      persona: '🎯 Hits Sales hardest — a single junk step ruins a polished client demo. Re-recording is not an option when you have 30 clients to reach.',
      personaColor: '#8B5CF6',
    },
    {
      step: 12,
      color: 'var(--pres-purple)',
      label: 'Editor Overwhelm',
      title: 'The editing interface is built for power users',
      body: 'Opening the editor after the aha moment exposes every advanced control at once. A first-time user trying to fix one caption faces a blank canvas of options — no guided path, no clear finish line. Most don\'t make it through.',
      persona: '💬 Hits Support hardest — they just want to fix one caption and publish. The wall of controls makes a 2-minute task feel like a 20-minute project.',
      personaColor: '#4B7BF5',
    },
  ];

  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Three Drop-off Points</h2>
      <h3 className="pres-subtitle">Where users leave — and why</h3>

      <div className="pres-cards-col" style={{ marginTop: '32px', gap: '16px' }}>
        {points.map(({ step, color, label, title, body, persona, personaColor }) => (
          <div key={step} className="pres-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '24px', padding: '28px 32px' }}>
            <div className="pres-card-accent-left" style={{ background: color }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0, width: '48px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: 'white' }}>{step}</div>
              <span style={{ fontSize: '10px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center', lineHeight: 1.2 }}>{label}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 className="pres-card-title" style={{ fontSize: '19px' }}>{title}</h3>
              <p className="pres-card-body" style={{ marginTop: '8px' }}>{body}</p>
              {persona && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', padding: '7px 12px', borderRadius: '8px', background: `color-mix(in srgb, ${personaColor} 8%, white)`, border: `1px solid color-mix(in srgb, ${personaColor} 20%, transparent)` }}>
                  <span style={{ fontSize: '12px', color: personaColor, fontWeight: 600, lineHeight: 1.4 }}>{persona}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideActivation() {
  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Defining "Activation"</h2>
      <h3 className="pres-subtitle">What is the right metric for this context?</h3>

      <div className="pres-cards-col" style={{ marginTop: '40px' }}>
        <div className="pres-card" style={{ border: '2px solid var(--pres-blue)', background: 'rgba(75, 123, 245, 0.05)' }}>
          <div className="pres-tag blue" style={{ marginBottom: '12px' }}>THE METRIC</div>
          <h3 className="pres-card-title" style={{ fontSize: '32px' }}>"Time to First Shared Guidde"</h3>
          <p className="pres-card-body" style={{ fontSize: '20px', marginTop: '16px' }}>
            A user is only "Activated" when they have successfully <strong>recorded, edited, and shared or exported</strong> their first Guidde — the editor is the last mile that determines whether that happens.
          </p>
        </div>

        <div className="pres-cards-row">
          <div className="pres-card">
            <h3 className="pres-card-title">Why not just "recorded"?</h3>
            <p className="pres-card-body">The auto-generated Guidde is impressive but raw. Value is only delivered when it's polished and shared — which requires surviving the editor.</p>
          </div>
          <div className="pres-card">
            <h3 className="pres-card-title">The editor is the bottleneck</h3>
            <p className="pres-card-body">Capture is smooth and delightful. The drop-off happens immediately after, when users open the editor and face an interface designed for power users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideAssumptions() {
  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Making Assumptions Explicit</h2>

      <div className="pres-cards-col" style={{ marginTop: '40px' }}>
        <div className="pres-card">
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-blue)' }} />
          <h3 className="pres-card-title">1. Most users only need simple edits</h3>
          <p className="pres-card-body">We assume the majority of first-time users want to fix a caption, trim a step, or adjust a title — not composite layers or add custom animations. The editor should reflect that.</p>
        </div>

        <div className="pres-card">
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-purple)' }} />
          <h3 className="pres-card-title">2. Killing the aha moment is fatal</h3>
          <p className="pres-card-body">We assume that hitting a wall immediately after the peak emotional moment (the auto-generated Guidde) causes a disproportionately high drop-off — higher than friction during setup.</p>
        </div>

        <div className="pres-card">
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">3. Good defaults beat full control</h3>
          <p className="pres-card-body">We assume that for new users, a constrained editor with smart defaults produces better outcomes than an open editor with full creative freedom — fewer choices means faster completion.</p>
        </div>
      </div>
    </div>
  );
}

function Slide11Personas() {
  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Who Are We Building For?</h2>

      <div className="pres-cards-row">
        <div className="pres-card">
          <div className="pres-card-accent-top" style={{ background: 'var(--pres-blue)' }} />
          <h3 className="pres-card-title">💬 Support Team</h3>
          <p className="pres-card-body" style={{ fontWeight: 600 }}>Goal: "Help my users solve problems fast"</p>
          <p className="pres-card-body"><strong>Pain:</strong> "I waste 20 minutes writing text when a 2-minute video would be better."</p>
          <p className="pres-card-body"><strong>Using Now:</strong> "Screenshots + manual writing"</p>
          <div className="pres-tag blue" style={{ marginTop: '16px' }}>Needs text articles</div>
        </div>

        <div className="pres-card">
          <div className="pres-card-accent-top" style={{ background: 'var(--pres-purple)' }} />
          <h3 className="pres-card-title">🎯 Sales Team</h3>
          <p className="pres-card-body" style={{ fontWeight: 600 }}>Goal: "Show my clients the product looks great"</p>
          <p className="pres-card-body"><strong>Pain:</strong> "Live demos are messy. I want perfect videos to send to 30 clients a week."</p>
          <p className="pres-card-body"><strong>Using Now:</strong> "Loom videos + emails"</p>
          <div className="pres-tag purple" style={{ marginTop: '16px' }}>Needs demo videos</div>
        </div>

        <div className="pres-card">
          <div className="pres-card-accent-top" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">✨ Marketing</h3>
          <p className="pres-card-body" style={{ fontWeight: 600 }}>Goal: "Let visitors try the product easily"</p>
          <p className="pres-card-body"><strong>Pain:</strong> "Developers don't have time to build interactive demos for the website."</p>
          <p className="pres-card-body"><strong>Using Now:</strong> "GIFs or other tools"</p>
          <div className="pres-tag amber" style={{ marginTop: '16px' }}>Needs interactives</div>
        </div>
      </div>
    </div>
  );
}

function Slide12Ideation() {
  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Looking at Solutions</h2>

      <div className="pres-cards-row" style={{ flexWrap: 'wrap' }}>
        <div className="pres-card muted" style={{ minWidth: '40%' }}>
          <h3 className="pres-card-title">A: Fix small bugs</h3>
          <p className="pres-card-body">Fix each small problem one by one. But this doesn't fix the core issue.</p>
          <div className="pres-tag" style={{ marginTop: 'auto' }}>Rejected: Too small</div>
        </div>

        <div className="pres-card muted" style={{ minWidth: '40%' }}>
          <h3 className="pres-card-title">B: Add a tutorial</h3>
          <p className="pres-card-body">Add more steps to teach the user how to use the app.</p>
          <div className="pres-tag" style={{ marginTop: 'auto' }}>Rejected: Too many steps</div>
        </div>

        <div className="pres-card highlight" style={{ minWidth: '40%' }}>
          <h3 className="pres-card-title">⭐ C: Ask them first</h3>
          <p className="pres-card-body">Ask the user what they want to build first. Then change the app to help them do it perfectly.</p>
          <div className="pres-tag blue" style={{ marginTop: 'auto' }}>Chosen: Fixes everything</div>
        </div>

        <div className="pres-card muted" style={{ minWidth: '40%' }}>
          <h3 className="pres-card-title">D: AI guessing</h3>
          <p className="pres-card-body">Use AI to guess what the user is trying to do.</p>
          <div className="pres-tag" style={{ marginTop: 'auto' }}>Rejected: Too hard right now</div>
        </div>
      </div>
    </div>
  );
}

function Slide13Solution() {
  return (
    <div className="pres-content-wrap centered">
      <h2 className="pres-title">The New Simple Setup</h2>

      <div className="pres-flow-diagram" style={{ marginTop: '30px' }}>
        <p className="pres-subtitle" style={{ fontSize: '18px', marginBottom: '-20px' }}>BEFORE: Hard, messy, confusing</p>
        <div className="pres-flow-row" style={{ maxWidth: '1000px' }}>
          <div className="pres-flow-box muted">Sign up</div>
          <div className="pres-flow-arrow">→</div>
          <div className="pres-flow-box muted">Dashboard</div>
          <div className="pres-flow-arrow">→</div>
          <div className="pres-flow-box muted">Popup</div>
          <div className="pres-flow-arrow">→</div>
          <div className="pres-flow-box muted">⚠️ Warning</div>
          <div className="pres-flow-arrow">→</div>
          <div className="pres-flow-box muted">Find App</div>
          <div className="pres-flow-arrow">→</div>
          <div className="pres-flow-box muted">Record</div>
          <div className="pres-flow-arrow">→</div>
          <div className="pres-flow-box muted">Hope it works</div>
        </div>

        <div style={{ height: '2px', width: '70%', background: 'rgba(255,255,255,0.2)', margin: '30px 0' }} />

        <p className="pres-subtitle" style={{ fontSize: '18px', marginBottom: '-20px', color: 'var(--pres-blue)', fontWeight: 'bold' }}>AFTER: Easy, smooth, helpful</p>
        <div className="pres-flow-row" style={{ maxWidth: '1000px' }}>
          <div className="pres-flow-box highlight">Sign up correctly</div>
          <div className="pres-flow-arrow" style={{ color: 'white' }}>→</div>
          <div className="pres-flow-box highlight">🎯 Choose goal</div>
          <div className="pres-flow-arrow" style={{ color: 'white' }}>→</div>
          <div className="pres-flow-box highlight">Get tips</div>
          <div className="pres-flow-arrow" style={{ color: 'white' }}>→</div>
          <div className="pres-flow-box highlight">Record easily</div>
          <div className="pres-flow-arrow" style={{ color: 'white' }}>→</div>
          <div className="pres-flow-box highlight">Get perfect result</div>
        </div>
      </div>

      <h3 className="pres-subtitle" style={{ marginTop: '50px', color: 'white', maxWidth: '800px', fontSize: '24px' }}>
        Main Idea: Guidde knows what you want to create before you even start recording.
      </h3>
    </div>
  );
}

function SlideOutputFormats() {
  const personas = [
    {
      icon: '💬', name: 'Support', color: 'var(--pres-blue)',
      selects: 'Training Guide · How-To Tutorial · SOP',
      gets: 'Steps auto-transcribed into a clean annotated text guide — structured, searchable, ready to publish to a help center.',
      detail: ['Auto-transcribed step text', 'Annotated screenshot per step', 'Numbered callout overlays'],
    },
    {
      icon: '🎯', name: 'Sales', color: 'var(--pres-purple)',
      selects: 'Product Demo',
      gets: 'Branded, narrated screen recording — company logo and colours applied automatically, shareable via link or email in one click.',
      detail: ['Brand kit auto-applied', 'Narration layer', 'Shareable video link'],
    },
    {
      icon: '✨', name: 'Marketing', color: 'var(--pres-amber)',
      selects: 'Knowledge Base Article',
      gets: 'Embeddable click-through demo — visitors explore the product at their own pace with zero developer effort required.',
      detail: ['Click hotspot overlay', 'Embed code generated', 'No dev work required'],
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '32px' }}>
      <div>
        <h2 className="pres-title">The Right Output for Each Persona</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>One tool — three distinct outputs, each perfectly matched to how the persona uses content</p>
      </div>

      <div className="pres-cards-row">
        {personas.map(({ icon, name, color, selects, gets, detail }) => (
          <div key={name} className="pres-card" style={{ padding: '32px', gap: '20px' }}>
            <div className="pres-card-accent-top" style={{ background: color }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '28px' }}>{icon}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: '22px', color: 'var(--pres-text-dark)' }}>{name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', color: 'var(--pres-text-muted)' }}>They select</span>
              <span style={{ fontWeight: 700, fontSize: '15px', background: 'rgba(75,123,245,0.09)', color: 'var(--pres-blue)', borderRadius: '8px', padding: '4px 12px' }}>{selects}</span>
            </div>
            <p className="pres-card-body" style={{ fontSize: '17px' }}>{gets}</p>
            <div style={{ borderTop: '1px solid var(--pres-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {detail.map(d => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--pres-text-muted)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  {d}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlidePersonaFlow() {
  const rows = [
    { label: 'Content types',  support: 'Training Guide · How-To Tutorial · SOP', sales: 'Product Demo', marketing: 'Knowledge Base Article' },
    { label: 'Editor default', support: 'Step text + captions front & center', sales: 'Video timeline + brand kit panel', marketing: 'Article layout + SEO hints' },
    { label: 'AI chat chips',  support: 'Clean up captions · Add a callout · Simplify language · Number the steps', sales: 'Add company logo · Apply brand colors · Trim dead air · Add narration', marketing: 'Add a hotspot · Make interactive · Add a tooltip · Prepare for embed' },
    { label: 'Export format',  support: 'Help Center article', sales: 'Shareable video link', marketing: 'Embeddable interactive tour' },
  ];

  const colStyle = (color) => ({
    flex: 1, padding: '20px 24px', background: 'white',
    borderRadius: '14px', border: `1.5px solid ${color}22`,
    boxShadow: '0 2px 12px rgba(26,31,54,0.07)',
  });

  return (
    <div className="pres-content-wrap" style={{ gap: '32px' }}>
      <div>
        <h2 className="pres-title">How the Experience Adapts</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>After selecting their goal, each persona gets a purpose-built editor — not a blank canvas</p>
      </div>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr', gap: '16px', alignItems: 'end' }}>
        <div />
        {[
          { icon: '💬', name: 'Support', selects: 'Help Article', color: 'var(--pres-blue)' },
          { icon: '🎯', name: 'Sales', selects: 'Demo Video', color: 'var(--pres-purple)' },
          { icon: '✨', name: 'Marketing', selects: 'Interactive Demo', color: 'var(--pres-amber)' },
        ].map(({ icon, name, selects, color }) => (
          <div key={name} style={{ textAlign: 'center', padding: '16px', background: 'var(--pres-bg-light)', borderRadius: '14px', border: '1.5px solid var(--pres-border)' }}>
            <div style={{ fontSize: '24px' }}>{icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: '18px', color: 'var(--pres-text-dark)', marginTop: '6px' }}>{name}</div>
            <div style={{ fontSize: '13px', color, fontWeight: 600, marginTop: '4px' }}>"{selects}"</div>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rows.map(({ label, support, sales, marketing }) => (
          <div key={label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr', gap: '16px', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 8px', fontSize: '13px', fontWeight: 700, color: 'var(--pres-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
            {[
              { text: support,   color: '#4B7BF522' },
              { text: sales,     color: '#8B5CF622' },
              { text: marketing, color: '#F59E0B22' },
            ].map(({ text, color }) => (
              <div key={text} style={{ padding: '16px 20px', background: 'white', borderRadius: '12px', border: `1.5px solid ${color}`, fontSize: '15px', color: 'var(--pres-text-dark)', lineHeight: 1.4 }}>
                {text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideActivationLogic() {
  const chain = [
    { label: 'The drop-off point', text: 'Editor Overwhelm', color: 'var(--pres-red)', icon: '⚠️' },
    { label: 'Removed by', text: 'Persona-Aware Editor', color: 'var(--pres-blue)', icon: '🎯', arrow: true },
    { label: 'Which enables', text: 'User Completes First Guidde', color: 'var(--pres-green)', icon: '✅', arrow: true },
    { label: 'Which leads to', text: 'First Shared Guidde ≤ 7 days', color: 'var(--pres-green)', icon: '🚀', arrow: true },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '36px' }}>
      <div>
        <h2 className="pres-title">Why This Increases Activation</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>Fixing the editor is the highest-leverage intervention — it sits right after the aha moment</p>
      </div>

      {/* Causal chain */}
      <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', width: '100%' }}>
        {chain.map(({ label, text, color, icon, arrow }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '28px 16px', background: 'white', borderRadius: '16px', border: `2px solid ${color}33`, boxShadow: '0 2px 12px rgba(26,31,54,0.07)', textAlign: 'center' }}>
              <span style={{ fontSize: '28px' }}>{icon}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--pres-text-muted)' }}>{label}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: '16px', color, lineHeight: 1.3 }}>{text}</span>
            </div>
            {arrow && <div style={{ fontSize: '24px', color: 'var(--pres-text-muted)', padding: '0 8px', flexShrink: 0 }}>→</div>}
          </div>
        ))}
      </div>

      {/* Why the editor is the right lever */}
      <div className="pres-cards-row" style={{ gap: '16px' }}>
        <div className="pres-card" style={{ borderLeft: '5px solid var(--pres-red)', padding: '24px 28px', gap: '10px' }}>
          <h3 className="pres-card-title" style={{ fontSize: '18px' }}>Highest drop-off point</h3>
          <p className="pres-card-body" style={{ fontSize: '16px' }}>The editor is where psych crashes from 75 → 25. No other step produces a drop this severe.</p>
        </div>
        <div className="pres-card" style={{ borderLeft: '5px solid var(--pres-amber)', padding: '24px 28px', gap: '10px' }}>
          <h3 className="pres-card-title" style={{ fontSize: '18px' }}>Post-aha-moment timing</h3>
          <p className="pres-card-body" style={{ fontSize: '16px' }}>Users are at peak excitement when they see their Guidde. Killing that with complexity is uniquely costly.</p>
        </div>
        <div className="pres-card" style={{ borderLeft: '5px solid var(--pres-green)', padding: '24px 28px', gap: '10px' }}>
          <h3 className="pres-card-title" style={{ fontSize: '18px' }}>Target: 15% → 30%</h3>
          <p className="pres-card-body" style={{ fontSize: '16px' }}>Doubling the 7-day activation rate is achievable when the only wall between the aha moment and sharing is removed.</p>
        </div>
      </div>
    </div>
  );
}

function Slide14Features() {
  const features = [
    {
      icon: '🎯', title: 'Extend the Existing Capture Question',
      body: 'Guidde already asks "what do you want to capture?" before recording. Adding one output-type question to that screen — Help Article, Demo Video, or Interactive Demo — sets the context for everything that follows. No new screen. No added steps.',
      friction: 'Removes: Editor overwhelm — output is decided before recording, not after',
      accentColor: 'var(--pres-blue)',
    },
    {
      icon: '💬', title: 'AI Chat Editor',
      body: 'The advanced toolbar is hidden by default. Users edit through a chat panel — type what you want changed, the AI does it. It already knows your persona, so "make this cleaner" produces the right result for a help article vs. a client demo. Auto-approve applies changes instantly; manual-approve shows a diff first.',
      friction: 'Removes: Blank canvas paralysis — no decisions, just intent → result',
      accentColor: 'var(--pres-purple)',
    },
    {
      icon: '🔒', title: 'Friendly Setup Wizard',
      body: 'The wizard no longer stops at workspace creation. It guides the user all the way through Chrome extension install, explains the "read all data" permission before Chrome asks, and ends only after the first recording is complete.',
      friction: 'Removes: Chrome warning fear + dead-end dashboard drop-off',
      accentColor: 'var(--pres-green)',
    },
    {
      icon: '📋', title: 'Live Capture Feed',
      body: "During recording, a small overlay shows each action as it's captured (\"Clicked Save\", \"Scrolled down\"). Users know immediately if something wasn't recorded and can re-do it on the spot.",
      friction: 'Removes: Blind capture anxiety — "did it actually work?"',
      accentColor: 'var(--pres-amber)',
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '28px' }}>
      <div>
        <h2 className="pres-title">Four Features That Remove the Friction</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>Each feature maps directly to a drop-off point found in the review</p>
      </div>

      <div className="pres-cards-col" style={{ gap: '12px' }}>
        {features.map(({ icon, title, body, friction, accentColor }) => (
          <div key={title} className="pres-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '28px', padding: '24px 32px' }}>
            <div className="pres-card-accent-left" style={{ background: accentColor }} />
            <div style={{ width: '48px', height: '48px', flexShrink: 0, background: `${accentColor}18`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{icon}</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 className="pres-card-title" style={{ fontSize: '20px' }}>{title}</h3>
              <p className="pres-card-body" style={{ fontSize: '16px' }}>{body}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', padding: '7px 12px', background: 'var(--pres-bg-light)', borderRadius: '8px', border: '1px solid var(--pres-border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--pres-red)', fontWeight: 700 }}>✕</span>
                <span style={{ fontSize: '13px', color: 'var(--pres-text-muted)', fontWeight: 500 }}>{friction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideSolutionFeatures() {
  const features = [
    {
      num: '01',
      icon: '🎯',
      title: 'Guidde Type + Template Selection',
      body: 'Before recording starts, the user picks their Guidde type and browses a set of templates — seeing exactly what the output will look like. The commitment is informed, not blind.',
      fixes: ['Blind content-type choice (step 8)', 'Mismatched output expectations'],
      color: 'var(--pres-blue)',
    },
    {
      num: '02',
      icon: '📋',
      title: 'Smart Capture Bar',
      body: 'The extension bar shows a label for every step captured in real time. Duplicate clicks and empty interactions are flagged instantly — the user can remove them on the spot without restarting the recording.',
      fixes: ['Blind capture — no feedback (step 9)', 'Empty & duplicate clicks polluting the Guidde'],
      color: 'var(--pres-purple)',
    },
    {
      num: '03',
      icon: '📄',
      title: 'Template-Driven Output',
      body: 'The auto-generated Guidde is rendered inside the template the user selected before recording. The result matches what they saw when they chose it — no gap between expectation and delivery.',
      fixes: ['Aha moment turning into a miss (step 10–11)'],
      color: 'var(--pres-green)',
    },
    {
      num: '04',
      icon: '💬',
      title: 'AI Editor with Contextual Suggestions',
      body: 'The editor surfaces a short list of suggested actions tailored to the Guidde type — "clean up captions", "add a callout", "trim to 3 steps". The advanced toolbar stays hidden until the user asks for it.',
      fixes: ['Editor overwhelm — blank canvas paralysis (step 12)'],
      color: 'var(--pres-amber)',
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '28px' }}>
      <div>
        <h2 className="pres-title">The Solution — 4 Features</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>Each one directly removes a friction point identified in the review</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {features.map(({ num, icon, title, body, fixes, color }) => (
          <div key={num} className="pres-card" style={{ padding: '28px 32px', gap: '14px' }}>
            <div className="pres-card-accent-top" style={{ background: color }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color, letterSpacing: '0.08em' }}>{num}</span>
              <span style={{ fontSize: '22px' }}>{icon}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 'clamp(16px,1.6vw,20px)', color: 'var(--pres-text-dark)', lineHeight: 1.2 }}>{title}</span>
            </div>
            <p className="pres-card-body" style={{ fontSize: '15px', lineHeight: 1.6 }}>{body}</p>
            <div style={{ borderTop: '1px solid var(--pres-border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {fixes.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--pres-text-muted)' }}>
                  <span style={{ color, fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span>Removes: {f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCapturePersona() {
  const capturedSteps = [
    { text: 'Opened Settings menu',     done: true  },
    { text: 'Clicked Security tab',     done: true  },
    { text: 'Scrolled to 2FA section',  done: true  },
    { text: 'Toggled Enable 2FA',       done: false },
  ];

  const personas = [
    {
      icon: '💬', name: 'Support', color: '#4B7BF5',
      steps: 3, lastStep: 'Clicked Security',
      content: ['Settings', 'Security tab', 'Enable 2FA'],
    },
    {
      icon: '🎯', name: 'Sales', color: '#8B5CF6',
      steps: 2, lastStep: 'Opened Dashboard',
      content: ['Analytics', 'Revenue chart'],
    },
    {
      icon: '✨', name: 'Marketing', color: '#D97706',
      steps: 4, lastStep: 'Clicked Sign Up',
      content: ['Landing page', 'Sign up form', 'Email field'],
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '24px' }}>
      <div>
        <h2 className="pres-title">Step Clarity During Recording</h2>
        <p className="pres-subtitle" style={{ marginTop: '8px' }}>
          The Guidde bar stays visible the entire time you record — showing exactly how many steps have been captured and what the last one was.
        </p>
      </div>

      {/* Before / After of the recording bar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>

        {/* BEFORE: plain counter, no context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--pres-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Before</div>
          <div style={{ width: '100%', background: '#EBEDF0', borderRadius: '10px', padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', border: '1.5px solid #E5E7EB', position: 'relative' }}>
            {/* Old bar */}
            <div style={{ background: '#0D1022', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 16px 7px 10px', boxShadow: '0 2px 8px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '7px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '12px', fontWeight: 900, color: 'white', fontStyle: 'italic' }}>g</div>
              <div style={{ padding: '3px 12px', borderRadius: '99px', background: 'rgba(255,255,255,0.09)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>5 Steps</div>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444', flexShrink: 0 }} />
            </div>
            <p style={{ fontSize: '13px', color: 'var(--pres-text-muted)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
              Step count only. No way to know if the last click was actually captured correctly.
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div style={{ fontSize: '28px', color: 'var(--pres-blue)', flexShrink: 0 }}>→</div>

        {/* AFTER: GuiddeBar with step count + description + expanded list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--pres-blue)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>After</div>
          <div style={{ width: '100%', background: '#EBEDF0', borderRadius: '10px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1.5px solid rgba(75,123,245,0.3)', boxShadow: '0 4px 16px rgba(75,123,245,0.1)' }}>
            {/* Expanded step list above bar */}
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '8px 12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              {capturedSteps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', borderBottom: i < capturedSteps.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: s.done ? '#10B981' : '#4B7BF5', width: '14px', flexShrink: 0 }}>{s.done ? '✓' : '◉'}</span>
                  <span style={{ fontSize: '12px', color: '#374151', fontWeight: s.done ? 400 : 600 }}>{s.text}</span>
                </div>
              ))}
            </div>
            {/* New GuiddeBar */}
            <div style={{ background: 'white', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px 6px 8px', boxShadow: '0 2px 10px rgba(0,0,0,0.12)', border: '1px solid #E5E7EB', alignSelf: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '13px', fontWeight: 900, color: 'white', fontStyle: 'italic', flexShrink: 0 }}>g</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '99px', background: '#F3F4F6', cursor: 'pointer' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>3 Steps</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>·</span>
                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Clicked Security</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF', marginLeft: '1px' }}>▲</span>
              </div>
              <div style={{ width: '1px', height: '14px', background: '#E5E7EB' }} />
              <div style={{ padding: '4px 12px', borderRadius: '99px', background: '#10B981', fontSize: '11px', fontWeight: 700, color: 'white' }}>Done</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 columns — GuiddeBar in context per persona */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
        {personas.map(({ icon, name, color, steps, lastStep, content }) => (
          <div key={name} style={{ borderRadius: '12px', overflow: 'hidden', border: `1.5px solid ${color}25`, boxShadow: '0 4px 16px rgba(26,31,54,0.10)' }}>
            {/* Mini browser chrome */}
            <div style={{ background: 'white', height: '20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '4px' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />)}
              <div style={{ flex: 1, height: '10px', background: '#F3F4F6', borderRadius: '3px', margin: '0 6px' }} />
            </div>
            {/* Page */}
            <div style={{ height: '110px', padding: '8px', position: 'relative', background: '#EBEDF0' }}>
              {content.map((item, i) => (
                <div key={i} style={{ background: i === 0 ? 'white' : 'rgba(255,255,255,0.55)', borderRadius: '4px', padding: '4px 8px', marginBottom: '4px', fontSize: '9px', color: '#374151', border: i === 1 ? `1px solid ${color}40` : 'none', fontWeight: i === 1 ? 600 : 400 }}>{item}</div>
              ))}
              {/* GuiddeBar bottom-left */}
              <div style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
                <div style={{ background: 'white', borderRadius: '99px', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px 3px 4px', whiteSpace: 'nowrap' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '5px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '9px', fontWeight: 900, color: 'white', fontStyle: 'italic', flexShrink: 0 }}>g</div>
                  <div style={{ background: color, color: 'white', borderRadius: '99px', padding: '1px 6px', fontSize: '9px', fontWeight: 700 }}>{steps} Steps</div>
                  <span style={{ fontSize: '9px', color: '#6B7280', fontWeight: 500 }}>· {lastStep}</span>
                  <span style={{ fontSize: '8px', color: '#9CA3AF' }}>▼</span>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div style={{ background: 'white', borderTop: `1px solid ${color}18`, padding: '7px 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#111' }}>{name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div style={{ padding: '14px 20px', borderRadius: '10px', background: 'rgba(52,211,153,0.06)', border: '1.5px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '20px', flexShrink: 0 }}>⚡</span>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Why this reduces anxiety — </span>
          <span style={{ fontSize: '13px', color: 'var(--pres-text-dark)', lineHeight: 1.5, fontWeight: 500 }}>
            Users know exactly what was recorded and can verify it instantly. A missed step is caught on the spot — not discovered after the fact when they open the editor.
          </span>
        </div>
      </div>
    </div>
  );
}

function SlideAIEditor() {
  const steps = [
    { n: 1, text: 'Open Settings', active: false },
    { n: 2, text: 'Click Security tab', active: true },
    { n: 3, text: 'Enable 2FA', active: false },
  ];
  const chips = ['Clean up captions', 'Add a callout', 'Simplify language'];

  return (
    <div style={{ width: '100%', maxWidth: '1100px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>

      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 className="pres-title" style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}>The AI Chat Editor</h2>
        <p className="pres-subtitle" style={{ marginTop: '10px', fontSize: 'clamp(16px, 1.6vw, 20px)' }}>
          Advanced controls hidden by default. Users edit through natural language — the AI already knows their content type and goal.
        </p>
      </div>

      {/* Mock editor — light theme matching the prototype */}
      <div style={{ width: '100%', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.55)' }}>

        {/* Browser chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: '#1E2130', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            Guidde — Security 2FA Setup Guide
          </div>
        </div>

        {/* Top nav */}
        <div style={{ height: '44px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: '#F3F4F6', borderRadius: '7px' }}>
            <div style={{ width: '15px', height: '15px', borderRadius: '4px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '9px', fontWeight: 900, color: 'white', fontStyle: 'italic' }}>g</div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>My Guidde</span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>×</span>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '8px', padding: '2px', gap: '2px' }}>
              {['Video', 'Document'].map((t, i) => (
                <div key={t} style={{ padding: '4px 14px', borderRadius: '6px', background: i === 0 ? 'white' : 'transparent', fontSize: '11px', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#111827' : '#6B7280', boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '1px', height: '14px', background: '#E5E7EB', margin: '0 4px' }} />
            <div style={{ padding: '4px 12px', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '11px', fontWeight: 600, color: '#374151' }}>Share</div>
            <div style={{ padding: '4px 12px', borderRadius: '6px', background: '#10B981', fontSize: '11px', fontWeight: 700, color: 'white' }}>Done</div>
          </div>
        </div>

        {/* 4-panel layout: icon nav + step panel + canvas + AI chat */}
        <div style={{ display: 'grid', gridTemplateColumns: '52px 170px 1fr 220px', height: '290px' }}>

          {/* ICON NAV */}
          <div style={{ borderRight: '1px solid #E5E7EB', padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', background: 'white' }}>
            {[['🔊', true], ['🖼', false], ['⊞', false], ['T', false], ['≡', false], ['🎵', false]].map(([ic, active], idx) => (
              <div key={idx} style={{ width: '42px', padding: '5px 4px', borderRadius: '8px', background: active ? 'rgba(75,123,245,0.10)' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '13px', lineHeight: 1 }}>{ic}</span>
                {active && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4B7BF5' }} />}
              </div>
            ))}
          </div>

          {/* STEP PANEL — Speaker */}
          <div style={{ borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', background: 'white', overflow: 'hidden' }}>
            <div style={{ padding: '8px 10px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', flex: 1 }}>Speaker</span>
              <span style={{ fontSize: '13px', color: '#9CA3AF', cursor: 'pointer' }}>×</span>
            </div>
            {/* Cover */}
            <div style={{ padding: '7px 10px 7px 9px', borderLeft: '3px solid #F59E0B', background: '#FFFBF0', flexShrink: 0 }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#111827', lineHeight: 1.3 }}>Security 2FA Guide</div>
              <div style={{ fontSize: '9px', color: '#D97706', marginTop: '2px' }}>Cover slide</div>
            </div>
            <div style={{ height: '1px', background: '#E5E7EB', flexShrink: 0 }} />
            {/* Steps */}
            {steps.map(({ n, text, active }) => (
              <div key={n} style={{ padding: '7px 10px 7px 9px', borderLeft: `3px solid ${active ? '#4B7BF5' : 'transparent'}`, background: active ? 'rgba(75,123,245,0.05)' : 'white', flexShrink: 0 }}>
                <div style={{ fontSize: '10px', fontWeight: active ? 700 : 600, color: '#111827' }}>0{n}: {text}</div>
                <div style={{ fontSize: '9px', color: '#9CA3AF', marginTop: '2px' }}>Step description</div>
              </div>
            ))}
            {/* Voice */}
            <div style={{ marginTop: 'auto', padding: '8px 10px', borderTop: '1px solid #E5E7EB', flexShrink: 0 }}>
              <div style={{ fontSize: '8px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '5px' }}>Voice</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px' }}>🇺🇸</span>
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#374151' }}>Kai</span>
              </div>
            </div>
          </div>

          {/* CANVAS */}
          <div style={{ background: '#EBEDF0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#EEF2FF,#F0FDF4)', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', position: 'relative' }}>
              <div style={{ fontSize: '8px', fontWeight: 700, color: '#4B7BF5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', opacity: 0.7 }}>STEP 2 OF 3</div>
              <div style={{ fontSize: 'clamp(11px,1.2vw,16px)', fontWeight: 800, color: '#111827', textAlign: 'center', marginBottom: '10px' }}>Click the Security Tab</div>
              <div style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.88)', borderRadius: '6px', fontSize: '10px', color: '#374151', textAlign: 'center', lineHeight: 1.5, maxWidth: '240px' }}>
                Navigate to the <strong>Security</strong> section
                <div style={{ marginTop: '5px', padding: '3px 6px', borderRadius: '4px', background: 'rgba(75,123,245,0.1)', border: '1px solid rgba(75,123,245,0.2)', fontSize: '9px', color: '#4B7BF5', fontWeight: 700 }}>✓ Applied · Undo available</div>
              </div>
              <div style={{ position: 'absolute', bottom: '8px', right: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#1A1F36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>🐔</div>
                <span style={{ fontSize: '8px', fontWeight: 800, color: '#1A1F36', letterSpacing: '0.08em' }}>ACME</span>
              </div>
            </div>
          </div>

          {/* AI CHAT */}
          <div style={{ borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', background: 'white', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '8px 12px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: 'linear-gradient(135deg,#4B7BF5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: 'white' }}>✦</div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#111827' }}>AI Editor</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', padding: '2px 7px', borderRadius: '99px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.22)' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399' }} />
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>AUTO</span>
              </div>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '2px 8px', borderRadius: '99px', background: 'rgba(75,123,245,0.08)', border: '1px solid rgba(75,123,245,0.18)', fontSize: '8px', color: '#4B7BF5', fontWeight: 700 }}>💬 Support · How-To Tutorial</div>
              </div>
              <div style={{ background: '#F3F4F6', borderRadius: '3px 8px 8px 8px', padding: '7px 9px', fontSize: '10px', color: '#374151', lineHeight: 1.45 }}>
                I've structured your How-To Tutorial. What would you like to improve?
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ background: '#4B7BF5', borderRadius: '8px 8px 3px 8px', padding: '6px 9px', fontSize: '10px', color: 'white', lineHeight: 1.4, maxWidth: '85%' }}>
                  Add a callout to step 2
                </div>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'linear-gradient(135deg,#4B7BF5,#7C3AED)', flexShrink: 0, marginTop: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', color: 'white' }}>✦</div>
                <div style={{ background: '#F3F4F6', borderRadius: '3px 8px 8px 8px', padding: '7px 9px', fontSize: '10px', color: '#374151', lineHeight: 1.45 }}>
                  Added callout to step 2.
                  <div style={{ marginTop: '4px', padding: '3px 6px', borderRadius: '4px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.18)', fontSize: '9px', color: '#059669', fontWeight: 700 }}>✓ Applied · Undo</div>
                </div>
              </div>
            </div>
            {/* Chips */}
            <div style={{ padding: '6px 8px', borderTop: '1px solid #E5E7EB', display: 'flex', flexWrap: 'wrap', gap: '4px', flexShrink: 0 }}>
              {chips.map((chip, i) => (
                <button key={chip} style={{ padding: '3px 8px', borderRadius: '99px', background: i === 0 ? 'rgba(75,123,245,0.08)' : 'transparent', border: `1px solid ${i === 0 ? 'rgba(75,123,245,0.25)' : '#E5E7EB'}`, color: i === 0 ? '#4B7BF5' : '#6B7280', fontSize: '9px', fontWeight: 600, cursor: 'pointer' }}>
                  {chip}
                </button>
              ))}
            </div>
            {/* Free-text input */}
            <div style={{ padding: '6px 8px', borderTop: '1px solid #E5E7EB', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '5px 6px 5px 10px' }}>
                <span style={{ flex: 1, fontSize: '10px', color: '#9CA3AF' }}>Ask AI to edit…</span>
                <div style={{ width: '22px', height: '22px', borderRadius: '5px', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6h10M7 2l4 4-4 4" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ height: '72px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '10px' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(59,130,246,0.4)' }}>
            <svg width="11" height="13" viewBox="0 0 12 14" fill="none"><path d="M1 1l10 6-10 6V1z" fill="white" /></svg>
          </div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#374151', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>00:00 / 01:24</div>
          <div style={{ padding: '2px 7px', borderRadius: '4px', background: '#F3F4F6', fontSize: '10px', fontWeight: 600, color: '#6B7280', flexShrink: 0 }}>Intro</div>
          <div style={{ flex: 1, display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['Cover','01','02','03','Ending'].map((label, i) => (
              <div key={i} style={{ flexShrink: 0 }}>
                <div style={{ width: '58px', height: '38px', borderRadius: '5px', background: i === 2 ? 'rgba(75,123,245,0.12)' : '#1E2130', border: i === 2 ? '2px solid #4B7BF5' : '1.5px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: '5px', display: 'flex', flexDirection: 'column', gap: '3px', justifyContent: 'center' }}>
                    <div style={{ height: '3px', borderRadius: '2px', background: i === 2 ? '#4B7BF5' : 'rgba(255,255,255,0.18)', width: '75%' }} />
                    <div style={{ height: '2px', borderRadius: '2px', background: i === 2 ? 'rgba(75,123,245,0.6)' : 'rgba(255,255,255,0.10)', width: '55%' }} />
                  </div>
                  {i > 0 && i < 4 && <div style={{ position: 'absolute', top: '2px', right: '2px', padding: '1px 3px', borderRadius: '2px', background: 'rgba(0,0,0,0.55)', fontSize: '7px', color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>3.2s</div>}
                </div>
                <div style={{ fontSize: '8px', color: i === 2 ? '#4B7BF5' : '#6B7280', fontWeight: i === 2 ? 700 : 400, textAlign: 'center', marginTop: '3px' }}>{label}</div>
              </div>
            ))}
            <div style={{ flexShrink: 0 }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '5px', border: '1.5px dashed #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '16px' }}>+</div>
              <div style={{ fontSize: '8px', color: '#9CA3AF', textAlign: 'center', marginTop: '3px' }}>Add</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 callouts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', width: '100%' }}>
        {[
          { icon: '🙈', label: 'Advanced controls hidden', sub: 'The icon nav expands per panel — never visible all at once by default' },
          { icon: '🎯', label: 'Persona-aware AI', sub: '"Make this cleaner" means article clarity for Support, brand polish for Sales' },
          { icon: '⚡', label: 'Auto-approve default', sub: 'Changes apply instantly. Undo is always one click away. Power users can toggle manual review.' },
        ].map(({ icon, label, sub }) => (
          <div key={label} style={{ padding: '16px 18px', background: 'rgba(255,255,255,0.035)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '20px' }}>{icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1.2 }}>{label}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.45 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideValidation() {
  const assumptions = [
    {
      num: '1',
      assumption: 'Most users only need simple edits',
      method: 'Usability test',
      how: 'Recruit 8 new users. Ask them to edit their first auto-generated Guidde. Observe whether they reach for advanced controls without being prompted.',
      signal: 'If <20% touch the advanced toolbar unprompted → assumption confirmed',
      color: 'var(--pres-blue)',
    },
    {
      num: '2',
      assumption: 'Killing the aha moment is fatal',
      method: 'Funnel analysis',
      how: 'In existing data, measure drop-off between "Guidde auto-generated" and "Share clicked." Compare this drop-off rate to every earlier step in the funnel.',
      signal: 'If editor drop-off is >40% and the largest single drop → assumption confirmed',
      color: 'var(--pres-purple)',
    },
    {
      num: '3',
      assumption: 'Good defaults beat full control',
      method: 'A/B test (editor only)',
      how: 'Split existing users: constrained AI editor (new) vs. full editor (control). Measure time-to-share and completion rate — not just clicks.',
      signal: 'If time-to-share drops >25% in treatment → assumption confirmed',
      color: 'var(--pres-amber)',
    },
  ];

  const abRows = [
    { label: 'Split',     value: '50 / 50 — new sign-ups only' },
    { label: 'Duration',  value: '4 weeks (enough for 7-day window + buffer)' },
    { label: 'Primary',   value: 'First Shared Guidde within 7 days' },
    { label: 'Secondary', value: 'Template selection rate · Capture bar expansion · AI chip first-click · Editor completion' },
    { label: 'Ship if',   value: 'Treatment ≥ 25% activation (vs ~15% baseline)' },
    { label: 'Reassess if', value: 'Treatment < 20% — diagnose which funnel step still drops' },
  ];

  const leading = [
    { icon: '🎯', label: 'Template selection rate', sub: 'Did users pick a template before recording? Proxy for: does the new entry point land?' },
    { icon: '📋', label: 'Capture bar interaction rate', sub: 'Did users expand the bar to review steps? Proxy for: does the live feedback reduce anxiety?' },
    { icon: '💬', label: 'AI chat first-click rate', sub: 'Did users click at least one AI chip? Proxy for: does the constrained editor feel approachable?' },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '28px' }}>
      <div>
        <h2 className="pres-title">Validation Plan</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>How I would validate assumptions before building — and the solution after shipping</p>
      </div>

      {/* Part A — Assumptions */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--pres-text-muted)', marginBottom: '12px' }}>A — Validate assumptions first</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {assumptions.map(({ num, assumption, method, how, signal, color }) => (
            <div key={num} className="pres-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '20px', padding: '20px 24px' }}>
              <div className="pres-card-accent-left" style={{ background: color }} />
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', color: 'white', flexShrink: 0 }}>{num}</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: '16px', color: 'var(--pres-text-dark)' }}>"{assumption}"</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, background: `color-mix(in srgb, ${color} 12%, white)`, color, borderRadius: '99px', padding: '3px 10px' }}>{method}</span>
                </div>
                <p className="pres-card-body" style={{ fontSize: '14px', margin: 0 }}>{how}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span style={{ fontWeight: 700, fontSize: '12px', color }}>→</span>
                  <span style={{ fontSize: '12px', color: 'var(--pres-text-muted)', fontStyle: 'italic' }}>{signal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part B + C side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Part B — A/B test */}
        <div className="pres-card" style={{ padding: '20px 24px', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--pres-text-muted)' }}>B — Validate the solution</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {abRows.map(({ label, value }) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: '12px', alignItems: 'start' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--pres-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: '2px' }}>{label}</span>
                <span style={{ fontSize: '13px', color: 'var(--pres-text-dark)', lineHeight: 1.5 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Part C — Leading indicators */}
        <div className="pres-card" style={{ padding: '20px 24px', gap: '12px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--pres-text-muted)' }}>C — Week 1 leading indicators</div>
          <p className="pres-card-body" style={{ fontSize: '13px', margin: 0 }}>Before the 7-day window closes, these proxies tell us if friction was actually removed:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {leading.map(({ icon, label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--pres-text-dark)' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--pres-text-muted)', lineHeight: 1.4, marginTop: '2px' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide15Metrics() {
  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">How To Measure Success</h2>

      <div className="pres-cards-col">
        <div className="pres-card" style={{ border: '2px solid var(--pres-blue)', background: 'rgba(75, 123, 245, 0.05)' }}>
          <div className="pres-tag blue" style={{ marginBottom: '12px' }}>⭐ MAIN METRIC</div>
          <h3 className="pres-card-title" style={{ fontSize: '32px' }}>7-Day Success Rate</h3>
          <p className="pres-card-body">How many users create AND share their first Guidde within 7 days?</p>
          <div style={{ display: 'flex', gap: '40px', marginTop: '24px', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: '16px', color: 'var(--pres-text-muted)' }}>Right Now</div>
              <div className="pres-metric-huge" style={{ color: 'var(--pres-text-muted)', fontSize: '48px' }}>~15%</div>
            </div>
            <div style={{ fontSize: '36px', color: 'var(--pres-text-muted)' }}>→</div>
            <div>
              <div style={{ fontSize: '16px', color: 'var(--pres-blue)', fontWeight: 700 }}>Our Goal</div>
              <div className="pres-metric-huge">30%+ <span style={{ fontSize: '24px', fontWeight: 500 }}>(Double)</span></div>
            </div>
          </div>
        </div>

        <div className="pres-cards-row">
          <div className="pres-card">
            <div className="pres-tag green" style={{ marginBottom: '12px' }}>🛡️ SAFETY METRICS</div>
            <ul className="pres-list" style={{ marginTop: '12px', fontSize: '18px' }}>
              <li className="pres-list-item">People installing the app should not drop</li>
              <li className="pres-list-item">People finishing videos should not drop</li>
              <li className="pres-list-item">Support tickets should not go up</li>
            </ul>
          </div>
          <div className="pres-card">
            <div className="pres-tag purple" style={{ marginBottom: '12px' }}>📊 OTHER METRICS</div>
            <ul className="pres-list" style={{ marginTop: '12px', fontSize: '18px' }}>
              <li className="pres-list-item">Are users happy with their videos?</li>
              <li className="pres-list-item">How many users buy the Pro plan?</li>
              <li className="pres-list-item">Do users come back to create a second video?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slide16Roadmap() {
  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Launch Plan</h2>

      <div className="pres-timeline" style={{ marginTop: '60px' }}>
        <div className="pres-timeline-node">
          <div className="pres-timeline-line">
            <div className="pres-timeline-dot" style={{ background: 'var(--pres-blue)' }} />
          </div>
          <h3 className="pres-card-title">1. Test Ideas</h3>
          <div className="pres-tag blue">Weeks 1-2</div>
          <ul className="pres-list" style={{ fontSize: '18px' }}>
            <li className="pres-list-item">Talk to real users</li>
            <li className="pres-list-item">Look at competitors</li>
            <li className="pres-list-item">Check our own data</li>
          </ul>
        </div>

        <div className="pres-timeline-node">
          <div className="pres-timeline-line">
            <div className="pres-timeline-dot" style={{ background: 'var(--pres-blue)' }} />
          </div>
          <h3 className="pres-card-title">2. Build</h3>
          <div className="pres-tag blue">Weeks 3-5</div>
          <ul className="pres-list" style={{ fontSize: '18px' }}>
            <li className="pres-list-item">Code the new flow</li>
            <li className="pres-list-item">Test with a small group</li>
            <li className="pres-list-item">Fix small bugs</li>
          </ul>
        </div>

        <div className="pres-timeline-node">
          <div className="pres-timeline-line">
            <div className="pres-timeline-dot" style={{ background: 'var(--pres-green)' }} />
          </div>
          <h3 className="pres-card-title">3. Launch</h3>
          <div className="pres-tag green">Weeks 6-8</div>
          <ul className="pres-list" style={{ fontSize: '18px' }}>
            <li className="pres-list-item">Test with half our users</li>
            <li className="pres-list-item">Check if success goes up</li>
            <li className="pres-list-item">Release to everyone</li>
          </ul>
        </div>

        <div className="pres-timeline-node">
          <div className="pres-timeline-line">
            <div className="pres-timeline-dot" style={{ background: 'var(--pres-purple)' }} />
          </div>
          <h3 className="pres-card-title">4. Expand</h3>
          <div className="pres-tag purple">Later</div>
          <ul className="pres-list" style={{ fontSize: '18px' }}>
            <li className="pres-list-item">Make the dashboard better</li>
            <li className="pres-list-item">Add more integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Slide17Risks() {
  return (
    <div className="pres-content-wrap centered">
      <h2 className="pres-title">Risks and Solutions</h2>

      <div className="pres-grid-2x2" style={{ marginTop: '30px' }}>
        <div className="pres-card glass" style={{ textAlign: 'left' }}>
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">Asking users first adds steps</h3>
          <p className="pres-card-body"><strong>Risk:</strong> Users might be lazy and give up.</p>
          <p className="pres-card-body"><strong>Fix:</strong> Add a "Skip" button. If users hate it, we make it optional.</p>
        </div>

        <div className="pres-card glass" style={{ textAlign: 'left' }}>
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">Low quality videos</h3>
          <p className="pres-card-body"><strong>Risk:</strong> The videos we build automatically might look bad.</p>
          <p className="pres-card-body"><strong>Fix:</strong> Start simple. Ask the user if they were happy with the final result.</p>
        </div>

        <div className="pres-card glass" style={{ textAlign: 'left' }}>
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">Chrome is too small</h3>
          <p className="pres-card-body"><strong>Risk:</strong> The live text feed might be too big for the Chrome window.</p>
          <p className="pres-card-body"><strong>Fix:</strong> Design careful tests with our developers early.</p>
        </div>

        <div className="pres-card glass" style={{ textAlign: 'left' }}>
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">Wrong user groups</h3>
          <p className="pres-card-body"><strong>Risk:</strong> Our 3 users (Sales, Support, Marketing) might be wrong.</p>
          <p className="pres-card-body"><strong>Fix:</strong> Add an "Other" option. Look at the data to learn what users really are.</p>
        </div>
      </div>

      <p className="pres-subtitle" style={{ fontSize: '20px', marginTop: '30px', maxWidth: '800px', fontWeight: 600 }}>
        The biggest risk is doing nothing. Competitors are already successfully capturing the users that we are losing.
      </p>
    </div>
  );
}

function SlideTitlePrototype() {
  const navigate = useNavigate();
  return (
    <div className="pres-section-title-wrap">
      <div className="pres-section-ghost-num">6</div>
      <div className="pres-section-badge">Step 6</div>
      <h1 className="pres-section-title">Prototype</h1>
      <button
        onClick={() => navigate('/flow')}
        style={{
          marginTop: '32px',
          padding: '14px 32px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.12)',
          border: '1.5px solid rgba(255,255,255,0.25)',
          color: 'white',
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '-0.2px',
          transition: 'background 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; }}
      >
        Open Prototype →
      </button>
    </div>
  );
}

function SectionTitle({ step, title }) {
  return (
    <div className="pres-section-title-wrap">
      <div className="pres-section-ghost-num">{step}</div>
      <div className="pres-section-badge">Step {step}</div>
      <h1 className="pres-section-title">{title}</h1>
    </div>
  );
}
