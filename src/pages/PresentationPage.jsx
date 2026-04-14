import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './PresentationPage.css';

const SLIDES = [
  { type: 'title', theme: 'sketch' },
  { type: 'scope', theme: 'light' },
  { type: 'steps', theme: 'light' },
  { type: 'title-review', theme: 'sketch' },
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
  { type: 'title-diagnose', theme: 'sketch' },
  { type: 'psych-graph', theme: 'light' },
  { type: 'problem', theme: 'light' },
  { type: 'activation', theme: 'light' },
  { type: 'assumptions', theme: 'light' },
  { type: 'title-define', theme: 'sketch' },
  { type: 'personas', theme: 'light' },
  { type: 'title-plan', theme: 'sketch' },
  { type: 'solution-features', theme: 'light' },
  { type: 'type-select', theme: 'light' },
  { type: 'capture-persona', theme: 'light' },
  { type: 'template-output', theme: 'light' },
  { type: 'ai-editor', theme: 'light' },
  { type: 'title-prototype', theme: 'sketch' },
  { type: 'prioritization', theme: 'light' },
  { type: 'validation', theme: 'light' },
  { type: 'metrics', theme: 'light' },
  { type: 'thankyou', theme: 'sketch' },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const total = SLIDES.length;

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.repeat) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  const progress = (current / (total - 1)) * 100;
  const currentSlide = SLIDES[current];
  const bgClass = currentSlide.theme === 'sketch' ? 'pres-bg-sketch'
                : currentSlide.theme === 'dark'   ? 'pres-bg-dark'
                : 'pres-bg-light';

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
          {currentSlide.type === 'onboarding2' && <OnboardingSlide num="2" title="Company Details" description="I'm asked about my company size and role. It feels less like personalization and more like a lead-scoring form. The sales intent is a bit too visible." imagePath="/images/2.png" psychLevel={55} psychChange={-5} />}
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
          {currentSlide.type === 'title-plan' && <SectionTitle step="4" title="Plan Solution" />}
          {currentSlide.type === 'solution-features' && <SlideSolutionFeatures />}
          {currentSlide.type === 'type-select' && <SlideTypeSelect />}
          {currentSlide.type === 'capture-persona' && <SlideCapturePersona />}
          {currentSlide.type === 'template-output' && <SlideTemplateOutput />}
          {currentSlide.type === 'ai-editor' && <SlideAIEditor />}
          {currentSlide.type === 'title-prototype' && <SlideTitlePrototype />}
          {currentSlide.type === 'validation' && <SlideValidation />}
          {currentSlide.type === 'metrics' && <Slide15Metrics />}
          {currentSlide.type === 'prioritization' && <SlidePrioritization />}
          {currentSlide.type === 'thankyou' && <SlideThankYou />}
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
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>What I focused on, and what I left out</p>
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

        {description && (
          <div className="pres-card" style={{ padding: '32px' }}>
            <h3 className="pres-card-title" style={{ color: 'var(--pres-red)' }}>The Problem</h3>
            {Array.isArray(description)
              ? <ul style={{ marginTop: '16px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {description.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--pres-red)', fontWeight: 700, flexShrink: 0, marginTop: '2px', fontSize: '8px' }}>●</span>
                      <p className="pres-card-body" style={{ margin: 0 }}>{item}</p>
                    </li>
                  ))}
                </ul>
              : <p className="pres-card-body" style={{ marginTop: '16px' }}>{description}</p>
            }
          </div>
        )}
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
    title="New dashboard, unfamiliar UI, install popup"
    experience="The wizard ends and drops me into a dashboard I've never seen before. Before I can figure out where I am, a popup is already asking me to install the browser extension."
    description="I've just finished onboarding but now I'm looking at a completely unfamiliar product UI. Before I can even orient myself, a modal blocks the screen asking me to download the browser extension. I haven't learned the dashboard yet, and I'm already being pushed to install something external."
    recommendation="The guide should not stop until the extension is fully installed and used at least once. Walk the user through the whole install from inside the wizard. Don't drop them off halfway."
    principle="Keep the user moving forward"
    imagePath="/images/5.png"
    psychLevel={65}
    psychChange={-10}
  />;
}

function Slide5Friction2() {
  return <FrictionLayout
    num="6"
    title="A pricing popup kills the momentum"
    experience="Right as I'm about to click the extension and start recording, a pricing popup blocks the screen."
    recommendation="Hide pricing until the user has created and shared their first Guidde. Interrupting at this exact moment is the worst possible time."
    principle="Don't break the user's flow"
    imagePath="/images/6.png"
    psychLevel={55}
    psychChange={-10}
  />;
}

function Slide6Friction3() {
  return <FrictionLayout
    num="7"
    title="The Chrome permission warning is scary"
    experience="Chrome warns me this extension can read all data on websites I visit. I pause. That sounds way scarier than I expected."
    recommendation="Add a short note before installation saying: We need this permission to record your screen. That way Chrome's warning feels expected, not alarming."
    principle="Build trust before Chrome asks"
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
          <h2 className="pres-title" style={{ fontSize: '40px' }}>"What are you creating?" with no context to go on</h2>
        </div>

        <p className="pres-card-body" style={{ fontSize: '20px', maxWidth: '800px', marginBottom: '8px' }}>The extension asks me to pick a content type before I record anything. I choose one, but I've never seen what any of these options actually produce.</p>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/images/11.png" alt="What are you creating? extension popup" style={{ maxHeight: '28vh', width: 'auto', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          <div style={{ display: 'none', flexDirection: 'column', color: '#6B7294', textAlign: 'center', fontSize: '20px', width: '100%', minHeight: '20vh', justifyContent: 'center' }}>
            Image not found: /images/11.png
          </div>
        </div>

        <div className="pres-card" style={{ padding: '32px' }}>
          <h3 className="pres-card-title" style={{ color: 'var(--pres-red)' }}>The Problem</h3>
          <p className="pres-card-body" style={{ marginTop: '16px' }}>Five options, zero context. The user picks one without knowing what they'll get. A training guide, a demo video, and an interactive tour look completely different. When the result doesn't match what they imagined, the aha moment turns into a miss and they leave.</p>
        </div>
      </div>
    </div>
  );
}

function Slide7Friction4() {
  return <FrictionLayout
    num="9"
    title="Capture is a black box"
    experience="I start clicking through my workflow. The extension shows a step counter, but I have no idea if my actions are actually being captured."
    description={[
      "The extension shows nothing but a step counter. I have no idea if my clicks are being recorded correctly. One missed step means starting over.",
      "Empty clicks count as steps. If I click somewhere that does nothing, or double-click by mistake, it's recorded as a real step, quietly polluting my Guidde with junk I won't catch until later.",
    ]}
    recommendation="Keep the recording bar visible at all times. Show a live step count next to the last captured action. Let users tap to expand and review all captured steps. Immediate confirmation with no screen clutter."
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
    title="Wait, this isn't quite right"
    description="The auto-generated Guidde looks impressive. But looking closer, some captions are off, a step is missing, and the tone isn't right for my audience. I need to edit this before I can share it."
    imagePath="/images/14.png"
    psychLevel={65}
    psychChange={-10}
  />;
}

function SlideEditorOverwhelm() {
  return <FrictionLayout
    num="12"
    title="The editor is overwhelming"
    experience="I click Edit. The screen fills with panels, toolbars, and controls. I just wanted to fix one caption."
    description="I want to make a simple edit, so I click Edit. It opens a full editor with way too many options at once."
    recommendation="Hide advanced controls by default. Show users a short list of simple actions first and let them go deeper only when they need to."
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
      <h3 className="pres-subtitle">How the user feels across the 12 steps of their first creation</h3>

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
      title: 'The user picks a format they have never seen',
      body: 'The extension asks "What are you creating?" before a single click is recorded, with no preview of what each option produces. The user picks blind. When the result doesn\'t match what they imagined, the aha moment becomes a miss.',
      persona: '✨ Hits Marketing hardest. An interactive demo and a help article look nothing alike. Wrong choice, wrong output.',
      personaColor: '#D97706',
    },
    {
      step: 9,
      color: 'var(--pres-red)',
      label: 'Blind Capture',
      title: 'No feedback during recording, errors stay hidden',
      body: 'The capture bar shows only a step counter. Empty clicks and accidental double-clicks are recorded as real steps with no warning. The only fix is to scrap everything and start over.',
      persona: '🎯 Hits Sales hardest. One junk step ruins a polished client demo, and re-recording isn\'t an option when you have 30 clients waiting.',
      personaColor: '#8B5CF6',
    },
    {
      step: 12,
      color: 'var(--pres-purple)',
      label: 'Editor Overwhelm',
      title: 'The editing interface is built for power users',
      body: 'Opening the editor after the aha moment dumps every advanced control on screen at once. A first-time user trying to fix one caption faces a wall of options with no guided path. Most don\'t make it through.',
      persona: '💬 Hits Support hardest. They just want to fix one caption and publish. The wall of controls turns a 2-minute task into a 20-minute project.',
      personaColor: '#4B7BF5',
    },
  ];

  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">Three Drop-off Points</h2>
      <h3 className="pres-subtitle">Where users leave and why</h3>

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
            A user is only activated when they have <strong>recorded, edited, and shared</strong> their first Guidde.
          </p>
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
          <p className="pres-card-body">First-time users want to fix a caption, trim a step, or adjust a title. Not build composite layers or add animations. The editor should reflect that reality.</p>
        </div>

        <div className="pres-card">
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-purple)' }} />
          <h3 className="pres-card-title">2. Hitting a wall after the aha moment is fatal</h3>
          <p className="pres-card-body">Hitting a wall right after the peak moment causes more drop-off than anything earlier in the flow. The timing makes it uniquely costly.</p>
        </div>

        <div className="pres-card">
          <div className="pres-card-accent-left" style={{ background: 'var(--pres-amber)' }} />
          <h3 className="pres-card-title">3. Good defaults beat full control</h3>
          <p className="pres-card-body">For new users, a focused editor with smart defaults works better than an open editor with full creative freedom. Fewer choices means faster completion.</p>
        </div>
      </div>
    </div>
  );
}

function Slide11Personas() {
  const personas = [
    {
      icon: '💬',
      name: 'Support',
      color: '#4B7BF5',
      colorDim: 'rgba(75,123,245,0.08)',
      tagClass: 'blue',
      tagLabel: 'Help Articles',
      goal: 'Turn repeat tickets into self-serve guides — fast.',
      pains: [
        'Writing step-by-step instructions is slow',
        'Text alone doesn\'t explain UI flows well',
        'Guides go stale with no easy way to update',
      ],
    },
    {
      icon: '🎯',
      name: 'Sales',
      color: '#8B5CF6',
      colorDim: 'rgba(139,92,246,0.08)',
      tagClass: 'purple',
      tagLabel: 'Demo Videos',
      goal: 'Send every prospect a polished walkthrough without spending hours on it.',
      pains: [
        'Live demos fall apart when anything goes wrong',
        'Generic recordings feel impersonal to prospects',
        'High-quality video needs skills the team lacks',
      ],
    },
    {
      icon: '✨',
      name: 'Marketing',
      color: '#D97706',
      colorDim: 'rgba(245,158,11,0.08)',
      tagClass: 'amber',
      tagLabel: 'Interactive Demos',
      goal: 'Let visitors experience the product before signing up — no engineering needed.',
      pains: [
        'Screenshots don\'t convey what the product does',
        'Interactive demos always need developer time',
        'Outdated content stays live after UI changes',
      ],
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '24px' }}>
      <h2 className="pres-title">Who Are We Building For?</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
        {personas.map(({ icon, name, color, colorDim, tagClass, tagLabel, goal, pains }) => (
          <div
            key={name}
            style={{
              background: '#fff',
              borderRadius: '18px',
              border: '1.5px solid var(--g-border)',
              boxShadow: '0 2px 16px rgba(26,31,54,0.07)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Card header */}
            <div style={{
              borderTop: `4px solid ${color}`,
              background: colorDim,
              padding: '20px 22px 16px',
              display: 'flex', flexDirection: 'column', gap: '8px',
            }}>
              <span style={{ fontSize: '28px', lineHeight: 1 }}>{icon}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700, fontSize: '18px',
                  color: 'var(--g-text)', lineHeight: 1,
                }}>{name}</span>
                <span className={`pres-tag ${tagClass}`} style={{ fontSize: '10px', padding: '3px 10px' }}>{tagLabel}</span>
              </div>
            </div>

            {/* Goal */}
            <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--g-border)' }}>
              <p style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--g-muted)', margin: '0 0 6px',
              }}>Goal</p>
              <p style={{
                fontSize: '14px', lineHeight: 1.6,
                color: 'var(--g-text)', margin: 0, fontWeight: 500,
              }}>{goal}</p>
            </div>

            {/* Pain points */}
            <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--g-muted)', margin: 0,
              }}>Pain Points</p>
              {pains.map((pain, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{
                    color, fontWeight: 800, flexShrink: 0,
                    fontSize: '13px', marginTop: '1px', lineHeight: 1.4,
                  }}>✕</span>
                  <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'var(--g-muted)', margin: 0 }}>{pain}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
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

function Slide14Features() {
  const features = [
    {
      icon: '🎯', title: 'Extend the Existing Capture Question',
      body: 'Guidde already asks "what do you want to capture?" before recording. Adding one output-type question to that same screen sets the context for everything that follows. No new screen, no extra steps.',
      friction: 'Removes: Editor overwhelm — output is decided before recording, not after',
      accentColor: 'var(--pres-blue)',
    },
    {
      icon: '💬', title: 'AI Chat Editor',
      body: 'The advanced toolbar is hidden by default. Users type what they want changed and the AI does it. Because it already knows the content type, "make this cleaner" means something different for a help article than it does for a client demo. Changes apply instantly, with undo always available.',
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
      body: 'Before recording starts, the user picks their Guidde type and browses templates so they can see exactly what the output will look like. No more guessing.',
      fixes: ['Choosing without context (step 8)', 'Mismatched output expectations'],
      color: 'var(--pres-blue)',
    },
    {
      num: '02',
      icon: '📋',
      title: 'Smart Capture Bar',
      body: 'The extension bar shows a label for every step in real time. Duplicate clicks and empty interactions are flagged right away so the user can remove them without restarting.',
      fixes: ['No feedback during recording (step 9)', 'Empty and duplicate clicks polluting the Guidde'],
      color: 'var(--pres-purple)',
    },
    {
      num: '03',
      icon: '📄',
      title: 'Template-Driven Output',
      body: 'The auto-generated Guidde is rendered inside the template the user picked before recording. What they see is what they chose, so there is no gap between expectation and delivery.',
      fixes: ['Aha moment turning into a miss (step 10–11)'],
      color: 'var(--pres-green)',
    },
    {
      num: '04',
      icon: '💬',
      title: 'AI Editor with Contextual Suggestions',
      body: 'The editor shows a short list of suggested actions tailored to the Guidde type: "clean up captions", "add a callout", "trim to 3 steps". The full toolbar stays hidden until the user asks for it.',
      fixes: ['Editor overwhelm and blank canvas paralysis (step 12)'],
      color: 'var(--pres-amber)',
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '28px' }}>
      <div>
        <h2 className="pres-title">The Solution: 4 Features</h2>
        <p className="pres-subtitle" style={{ marginTop: '12px' }}>Each feature traces back to a specific drop-off point found in the review</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {features.map(({ num, icon, title, body, color }) => (
          <div key={num} className="pres-card" style={{ padding: '36px 40px', gap: '18px' }}>
            <div className="pres-card-accent-top" style={{ background: color }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color, letterSpacing: '0.08em' }}>{num}</span>
              <span style={{ fontSize: '26px' }}>{icon}</span>
              <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 'clamp(18px,1.8vw,23px)', color: 'var(--pres-text-dark)', lineHeight: 1.2 }}>{title}</span>
            </div>
            <p className="pres-card-body" style={{ fontSize: '17px', lineHeight: 1.65 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Feature 01: Guidde Type + Template Selection ─────────────────────────────

function SlideTypeSelect() {
  const contentTypes = [
    { icon: '📖', label: 'How-To Tutorial',               color: '#4B7BF5', active: true  },
    { icon: '🎓', label: 'Employee Training Guide',        color: '#8B5CF6', active: false },
    { icon: '🎯', label: 'Product Demo',                   color: '#8B5CF6', active: false },
    { icon: '📋', label: 'Standard Operations Procedure',  color: '#10B981', active: false },
    { icon: '✨', label: 'Knowledge Base Article',         color: '#D97706', active: false },
  ];

  const templates = [
    { name: 'Simple 5-Step',   desc: 'Clean sequential numbered format',         selected: true,  fav: true  },
    { name: 'Detailed Guide',  desc: 'In-depth steps with callouts & tips',      selected: false, fav: false },
    { name: 'FAQ Format',      desc: 'Q&A style with collapsible answers',       selected: false, fav: false },
  ];

  const color = '#4B7BF5';

  return (
    <div className="pres-content-wrap" style={{ gap: '24px' }}>
      <div>
        <h2 className="pres-title">Guidde Type + Template Selection</h2>
        <p className="pres-subtitle" style={{ marginTop: '8px' }}>
          Before recording starts, users pick what they're building and see what the output will look like. No guessing, no surprises when the editor opens.
        </p>
      </div>

      {/* Modal mockup */}
      <div style={{ width: '100%', background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(26,31,54,0.14)', border: '1px solid var(--g-border)' }}>

        {/* Modal header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '12px', background: 'white' }}>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#0D1117', letterSpacing: '-0.3px' }}>guidde.</span>
          <div style={{ width: '1px', height: '14px', background: '#E5E7EB' }} />
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>Create a Guidde</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F3F4F6', border: '1.5px solid #E5E7EB', borderRadius: '8px', padding: '5px 10px', width: '180px' }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="#9CA3AF" strokeWidth="1.6"/><path d="M10.5 10.5L13.5 13.5" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>Search templates…</span>
            </div>
          </div>
        </div>

        {/* Body: left content-type list + right template grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '260px' }}>

          {/* Left: content type list */}
          <div style={{ borderRight: '1px solid #E5E7EB', padding: '14px 0', background: '#FAFAFA' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.09em', textTransform: 'uppercase', padding: '0 16px', marginBottom: '8px' }}>Content Type</div>
            {contentTypes.map(({ icon, label, active }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 16px', cursor: 'pointer',
                background: active ? `${color}0e` : 'transparent',
                borderLeft: active ? `3px solid ${color}` : '3px solid transparent',
                transition: 'all 0.12s',
              }}>
                <span style={{ fontSize: '15px' }}>{icon}</span>
                <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? color : '#374151' }}>{label}</span>
                {active && <span style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: color, flexShrink: 0 }} />}
              </div>
            ))}
          </div>

          {/* Right: template grid */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '12px' }}>Templates</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
              {templates.map(({ name, desc, selected, fav }) => (
                <div key={name} style={{
                  borderRadius: '10px', padding: '14px',
                  border: selected ? `2px solid ${color}` : '1.5px solid #E5E7EB',
                  background: selected ? `${color}06` : 'white',
                  boxShadow: selected ? `0 0 0 3px ${color}14` : '0 1px 4px rgba(0,0,0,0.05)',
                  cursor: 'pointer', position: 'relative',
                  transition: 'all 0.15s',
                }}>
                  {/* Thumbnail placeholder */}
                  <div style={{ height: '56px', borderRadius: '7px', background: selected ? `${color}12` : '#F3F4F6', marginBottom: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '8px 10px', gap: '4px' }}>
                    {[70, 50, 35].map((w, i) => (
                      <div key={i} style={{ height: '5px', width: `${w}%`, borderRadius: '3px', background: selected ? `${color}40` : '#D1D5DB' }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: selected ? color : '#111827', marginBottom: '3px' }}>{name}</div>
                  <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.4 }}>{desc}</div>
                  {/* Fav star */}
                  <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '12px', color: fav ? '#F59E0B' : '#D1D5DB' }}>★</div>
                  {/* Selected check */}
                  {selected && (
                    <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '18px', height: '18px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'white', fontWeight: 700 }}>✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', background: '#FAFAFA' }}>
          <div style={{ fontSize: '13px', color: '#6B7280' }}>How-To Tutorial · Simple 5-Step selected</div>
          <div style={{ marginLeft: '16px', padding: '8px 20px', borderRadius: '8px', background: color, color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer', boxShadow: `0 2px 8px ${color}40` }}>
            Start Recording →
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Feature 03: Template-Driven Output ───────────────────────────────────────

function SlideTemplateOutput() {
  const steps = [
    { n: 1, label: 'Go to Settings',   desc: 'Navigate to the main account menu'          },
    { n: 2, label: 'Open Account',     desc: 'Select the Account section from sidebar'    },
    { n: 3, label: 'Click Security',   desc: 'Access security preferences tab'            },
    { n: 4, label: 'Enable 2FA',       desc: 'Toggle 2FA to enable protection'            },
  ];
  const color = '#4B7BF5';

  return (
    <div className="pres-content-wrap" style={{ gap: '24px' }}>
      <div>
        <h2 className="pres-title">Template-Driven Output</h2>
        <p className="pres-subtitle" style={{ marginTop: '8px' }}>
          The auto-generated Guidde opens inside the template the user chose before recording. The output matches what they picked, so the aha moment actually lands.
        </p>
      </div>

      {/* Output viewer mockup */}
      <div style={{ width: '100%', background: '#F3F4F6', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(26,31,54,0.12)', border: '1px solid var(--g-border)' }}>

        {/* Top nav */}
        <div style={{ height: '44px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#6B7280' }}>←</div>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>How to Enable Two-Factor Authentication</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '11px', fontWeight: 600, color: '#374151' }}>↗ Share</div>
            <div style={{ padding: '4px 12px', borderRadius: '6px', background: color, fontSize: '11px', fontWeight: 700, color: 'white', boxShadow: `0 2px 6px ${color}40` }}>✎ Edit</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: '270px' }}>

          {/* TOC sidebar */}
          <div style={{ background: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#374151', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Table of Contents</span>
            </div>
            {/* Video entry */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 10px', background: `${color}10`, border: `1px solid ${color}25`, margin: '6px 8px', borderRadius: '7px', cursor: 'pointer' }}>
              <span style={{ fontSize: '11px', color }}>▶</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color }}>Video</span>
            </div>
            {/* Steps */}
            {steps.map(({ n, label }) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '6px 10px', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', width: '18px', flexShrink: 0 }}>{String(n).padStart(2,'0')}</span>
                <span style={{ fontSize: '12px', color: '#374151' }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div style={{ overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Video thumbnail */}
            <div style={{ width: '100%', aspectRatio: '16/6', background: 'linear-gradient(135deg,#EEF3FE,#DBEAFE)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(75,123,245,0.15)', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>▶</div>
                <span style={{ fontSize: '11px', fontWeight: 600, color }}>1:12 · Help Article</span>
              </div>
              <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '10px', fontWeight: 700, color, background: `${color}18`, padding: '2px 8px', borderRadius: '4px' }}>Simple 5-Step Template</div>
            </div>

            {/* Step cards */}
            {steps.slice(0, 2).map(({ n, label, desc }) => (
              <div key={n} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>{n}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>{label}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.4 }}>{desc}</div>
                  {/* Screenshot placeholder */}
                  <div style={{ marginTop: '8px', height: '44px', background: '#F3F4F6', borderRadius: '7px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '5px', background: '#E5E7EB' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ height: '5px', width: '80px', borderRadius: '3px', background: '#D1D5DB' }} />
                      <div style={{ height: '4px', width: '55px', borderRadius: '3px', background: '#E5E7EB' }} />
                    </div>
                    <div style={{ marginLeft: 'auto', width: '18px', height: '18px', borderRadius: '50%', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color, fontWeight: 700 }}>✦</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideCapturePersona() {
  // Steps shown in the "After" expanded dropdown
  const afterSteps = [
    { n: 1,  text: 'Clicked "Settings"',           warn: null },
    { n: 2,  text: 'Clicked "Security" tab',        warn: null },
    { n: 3,  text: 'Clicked "Security" tab',        warn: 'duplicate' },
    { n: 4,  text: 'Clicked on empty area',         warn: 'empty' },
    { n: 5,  text: 'Toggled "Enable 2FA"',          warn: null },
  ];

  // Icon set recreated from the real bar (image 13)
  const BarIcon = ({ children, title }) => (
    <div title={title} style={{
      width: '28px', height: '28px', display: 'flex', alignItems: 'center',
      justifyContent: 'center', borderRadius: '6px', cursor: 'pointer',
      color: '#6B7280', fontSize: '13px',
      transition: 'background 0.12s',
    }}>{children}</div>
  );

  const warnColor = { duplicate: '#F59E0B', empty: '#EF4444' };
  const warnLabel = { duplicate: 'Duplicate click', empty: 'Empty click, nothing was recorded' };

  return (
    <div className="pres-content-wrap" style={{ gap: '28px' }}>
      <div>
        <h2 className="pres-title">Smart Capture Bar</h2>
        <p className="pres-subtitle" style={{ marginTop: '8px' }}>
          The recording bar now shows what each step actually captured. Users can expand it to review steps, spot duplicate or empty clicks, and remove them on the spot.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <div style={{ width: '100%', maxWidth: '560px' }}>
          <div style={{
            background: '#F3F4F6', borderRadius: '14px', padding: '20px 20px 20px',
            display: 'flex', flexDirection: 'column', gap: '0',
            border: '1.5px solid rgba(75,123,245,0.35)',
            boxShadow: '0 4px 24px rgba(75,123,245,0.12)',
          }}>

            {/* Dropdown panel */}
            <div style={{
              background: '#ffffff', borderRadius: '10px 10px 0 0',
              border: '1px solid #E5E7EB', borderBottom: 'none',
              overflow: 'hidden', marginBottom: '0',
            }}>
              {/* Panel header */}
              <div style={{
                padding: '9px 14px', background: '#F9FAFB',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Captured Steps</span>
                <span style={{ fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>2 issues</span>
              </div>

              {/* Step rows */}
              {afterSteps.map(({ n, text, warn }) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 14px',
                  background: warn ? (warn === 'duplicate' ? 'rgba(245,158,11,0.05)' : 'rgba(239,68,68,0.05)') : 'white',
                  borderBottom: '1px solid #F3F4F6',
                }}>
                  {/* Step number */}
                  <span style={{
                    fontSize: '10px', fontWeight: 700,
                    color: warn ? warnColor[warn] : '#9CA3AF',
                    width: '16px', flexShrink: 0, textAlign: 'right',
                  }}>{n}</span>

                  {/* Warning icon or dot */}
                  {warn
                    ? <span style={{ fontSize: '13px', flexShrink: 0 }}>{warn === 'duplicate' ? '⚠️' : '🚫'}</span>
                    : <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', flexShrink: 0, display: 'inline-block' }} />
                  }

                  {/* Description */}
                  <span style={{ flex: 1, fontSize: '13px', color: warn ? warnColor[warn] : '#1A1F36', fontWeight: warn ? 600 : 400, lineHeight: 1.3 }}>
                    {text}
                    {warn && <span style={{ display: 'block', fontSize: '11px', fontWeight: 400, color: warnColor[warn], opacity: 0.8 }}>{warnLabel[warn]}</span>}
                  </span>

                  {/* Remove button */}
                  <button style={{
                    width: '20px', height: '20px', borderRadius: '4px',
                    border: 'none', background: warn ? `${warnColor[warn]}18` : '#F3F4F6',
                    color: warn ? warnColor[warn] : '#9CA3AF',
                    fontSize: '11px', fontWeight: 700,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, lineHeight: 1,
                  }}>×</button>
                </div>
              ))}
            </div>

            {/* Bar — light mode, matching the real extension style */}
            <div style={{
              background: '#ffffff', borderRadius: '0 0 10px 10px',
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '7px 12px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(26,31,54,0.08)',
            }}>
              {/* Logo */}
              <div style={{
                width: '26px', height: '26px', borderRadius: '7px', background: '#E8322F',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Georgia,serif', fontSize: '14px', fontWeight: 900,
                color: 'white', fontStyle: 'italic', flexShrink: 0,
              }}>g</div>

              {/* Step pill with last-step description */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '4px 12px', borderRadius: '99px',
                background: '#F3F4F6', marginLeft: '4px', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1A1F36' }}>5 Steps</span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#D1D5DB', display: 'inline-block' }} />
                <span style={{ fontSize: '12px', color: '#6B7280' }}>Toggled "Enable 2FA"</span>
                <span style={{ fontSize: '9px', color: '#9CA3AF', marginLeft: '2px' }}>▲</span>
              </div>

              {/* Warning badge */}
              <div style={{
                padding: '3px 9px', borderRadius: '99px',
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                fontSize: '11px', fontWeight: 700, color: '#EF4444', marginLeft: '2px',
              }}>2 issues</div>

              <div style={{ flex: 1 }} />

              {/* Done button */}
              <div style={{
                padding: '5px 14px', borderRadius: '99px',
                background: '#4B7BF5', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer',
              }}>Done</div>

              {/* Icons: pause, trash */}
              <BarIcon title="Pause">⏸</BarIcon>
              <BarIcon title="Delete">🗑</BarIcon>
            </div>
          </div>
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
          Advanced controls are hidden by default. Users just describe what they want changed and the AI handles it, already knowing what kind of Guidde they're editing.
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
            Guidde · Security 2FA Setup Guide
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
          { icon: '🙈', label: 'Advanced controls hidden', sub: 'The icon nav expands one panel at a time. Nothing is thrown at the user all at once.' },
          { icon: '🎯', label: 'Persona-aware AI', sub: '"Make this cleaner" means article clarity for Support, brand polish for Sales' },
          { icon: '⚡', label: 'Auto-approve default', sub: 'Changes apply instantly. Undo is always one click away. Power users can toggle manual review.' },
        ].map(({ icon, label, sub }) => (
          <div key={label} style={{ padding: '16px 18px', background: 'white', borderRadius: '12px', border: '1px solid var(--g-border)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '20px' }}>{icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: '14px', color: 'var(--g-text)', lineHeight: 1.2 }}>{label}</div>
            <div style={{ fontSize: '12px', color: 'var(--g-muted)', lineHeight: 1.45 }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideValidation() {
  const assumptions = [
    { claim: 'Editor is the highest drop-off step', method: 'Funnel analysis', check: 'Measure drop rate at 3 steps: Recording start, Review output, Editor. If editor drop is the highest, AI Editor stays P0. If another step leads, reprioritize accordingly.' },
    { claim: 'Templates cover real use cases per type', method: 'Event data', check: 'Query content type selection distribution from existing sessions. Identify the top use cases per type and confirm templates map to them.' },
    { claim: 'Capture errors go unnoticed', method: 'Support tickets', check: 'Filter tickets tagged "wrong steps" or "duplicate clicks". Low volume weakens the Smart Capture priority.' },
  ];

  const features = [
    { name: 'Template-Driven Output', metric: 'Helpful / Not Helpful rating on first Guidde', success: '75%+ rate Helpful', color: '#DC2626' },
    { name: 'Type + Template Selection', metric: 'Template selection rate + drop-off at selection step', success: '>70% select, no new drop-off', color: '#D97706' },
    { name: 'Smart Capture Bar', metric: '% of sessions where a flagged step is removed before finishing', success: '>30% of flagged sessions fixed', color: '#6B7280' },
    { name: 'AI Editor', metric: 'Editor completion rate (open editor → click Share)', success: '+25% vs. baseline', color: '#6B7280' },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '22px' }}>
      <div>
        <h2 className="pres-title">Validation Plan</h2>
        <p className="pres-subtitle" style={{ marginTop: '8px' }}>Two stages: confirm assumptions before writing code, then measure each feature after it ships.</p>
      </div>

      {/* Stage 1 */}
      <div className="pres-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--g-border)', background: 'rgba(75,123,245,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="pres-tag blue">Stage 1</div>
          <span style={{ fontWeight: 700, fontSize: '16px' }}>Confirm assumptions before building</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1.4fr', padding: '9px 20px', background: '#F9FAFB', borderBottom: '1px solid var(--g-border)', gap: '16px' }}>
          {['Method', 'Assumption', 'What to check'].map(h => (
            <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--g-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>
        {assumptions.map(({ claim, method, check }, i) => (
          <div key={claim} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1.4fr', padding: '13px 20px', borderBottom: i < assumptions.length - 1 ? '1px solid var(--g-border)' : 'none', gap: '16px', alignItems: 'start' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--pres-blue)', background: 'rgba(75,123,245,0.08)', padding: '4px 10px', borderRadius: '6px', textAlign: 'center' }}>{method}</div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{claim}</div>
            <div style={{ fontSize: '13px', color: 'var(--g-muted)', lineHeight: 1.5 }}>{check}</div>
          </div>
        ))}
      </div>

      {/* Stage 2 */}
      <div className="pres-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--g-border)', background: 'rgba(139,92,246,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="pres-tag purple">Stage 2</div>
          <span style={{ fontWeight: 700, fontSize: '16px' }}>Measure each feature after it ships</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', padding: '9px 20px', background: '#F9FAFB', borderBottom: '1px solid var(--g-border)', gap: '16px' }}>
          {['Feature', 'Metric', 'Success if...'].map(h => (
            <div key={h} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--g-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>
        {features.map(({ name, metric, success, color }, i) => (
          <div key={name} style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', padding: '13px 20px', borderBottom: i < features.length - 1 ? '1px solid var(--g-border)' : 'none', gap: '16px', alignItems: 'start' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color, lineHeight: 1.3 }}>{name}</div>
            <div style={{ fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>{metric}</div>
            <div style={{ fontSize: '13px', color: '#059669', fontWeight: 600, lineHeight: 1.4 }}>{success}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide15Metrics() {
  const MetricRow = ({ label, description, target, tagColor }) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr auto',
      alignItems: 'center',
      padding: '14px 20px',
      borderBottom: '1px solid var(--g-border)',
      gap: '24px',
    }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: '17px', color: 'var(--pres-text)', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '14px', color: 'var(--pres-text-muted)' }}>{description}</div>
      </div>
      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, color: tagColor || 'var(--pres-blue)' }}>{target}</div>
      </div>
    </div>
  );

  return (
    <div className="pres-content-wrap">
      <h2 className="pres-title">How To Measure Success</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '36px' }}>

        {/* North Star */}
        <div className="pres-card" style={{ border: '2px solid var(--pres-blue)', background: 'rgba(75, 123, 245, 0.04)', gridColumn: '1 / -1', padding: '0', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '18px 24px', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div className="pres-tag blue">NORTH STAR</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '19px' }}>7-Day Activation Rate</div>
                <div style={{ fontSize: '14px', color: 'var(--pres-text-muted)', marginTop: '2px' }}>Users who create and share their first Guidde within 7 days of install</div>
              </div>
            </div>
            <div style={{ fontSize: '48px', fontWeight: 800, color: 'var(--pres-blue)', lineHeight: 1 }}>+15%</div>
          </div>
        </div>

        {/* Funnel Metrics */}
        <div className="pres-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--g-border)', background: 'rgba(0,0,0,0.02)' }}>
            <div className="pres-tag purple">FUNNEL</div>
          </div>
          <MetricRow
            label="Template Selection Rate"
            description="New users who pick a template before recording"
            target="70%"
            tagColor="var(--pres-purple)"
          />
          <MetricRow
            label="Capture Bar Engagement"
            description="Sessions where user expands the step dropdown"
            target="40%"
            tagColor="var(--pres-purple)"
          />
          <MetricRow
            label="Editor Completion Rate"
            description="Users who open editor and click Share"
            target="+25%"
            tagColor="var(--pres-purple)"
          />
        </div>

        {/* Retention + Business */}
        <div className="pres-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--g-border)', background: 'rgba(0,0,0,0.02)' }}>
            <div className="pres-tag amber">RETENTION + BUSINESS</div>
          </div>
          <MetricRow
            label="Day-30 Return Rate"
            description="Activated users who create a second Guidde within 30 days"
            target="+15%"
            tagColor="var(--pres-amber)"
          />
          <MetricRow
            label="Pro Conversion"
            description="Activated users who upgrade to Pro within 30 days"
            target="+4%"
            tagColor="var(--pres-amber)"
          />
          <MetricRow
            label="First Guidde Rating"
            description="Users who mark their first Guidde as Helpful"
            target="80% Helpful"
            tagColor="var(--pres-amber)"
          />
        </div>


</div>
    </div>
  );
}

function SlideThankYou() {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      width: '100%',
      maxWidth: '900px',
      textAlign: 'center',
    }}>
      {/* Pulsing record-button rings */}
      <div className="ty-ring" style={{ width: '540px', height: '540px', opacity: 0.13, animationDelay: '0s' }} />
      <div className="ty-ring" style={{ width: '380px', height: '380px', opacity: 0.09, animationDelay: '0.7s' }} />
      <div className="ty-ring" style={{ width: '220px', height: '220px', opacity: 0.07, animationDelay: '1.4s' }} />

      {/* Top gradient rule */}
      <div className="ty-line" style={{
        width: '160px', height: '1.5px', marginBottom: '44px',
        background: 'linear-gradient(to right, transparent, var(--g-brand), transparent)',
        animationDelay: '0.05s',
      }} />

      {/* THANK */}
      <div className="ty-reveal" style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(68px, 9.5vw, 112px)',
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        color: 'var(--g-text)',
        position: 'relative', zIndex: 1,
        animationDelay: '0.18s',
      }}>
        THANK
      </div>

      {/* YOU. */}
      <div className="ty-reveal" style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(68px, 9.5vw, 112px)',
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        color: 'var(--g-brand)',
        marginBottom: '40px',
        position: 'relative', zIndex: 1,
        animationDelay: '0.3s',
      }}>
        YOU.
      </div>

      {/* Hairline divider */}
      <div className="ty-line" style={{
        width: '260px', height: '1px',
        background: 'var(--g-border)',
        marginBottom: '28px',
        animationDelay: '0.48s',
      }} />

      {/* Byline */}
      <div className="ty-reveal" style={{
        display: 'flex', gap: '10px', alignItems: 'center',
        position: 'relative', zIndex: 1,
        animationDelay: '0.6s',
      }}>
        <span style={{
          fontSize: '12px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--g-brand)',
        }}>Yam</span>
        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--g-border)', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'var(--g-muted)', letterSpacing: '0.04em' }}>April 2026</span>
        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--g-border)', flexShrink: 0 }} />
        <span style={{ fontSize: '12px', color: 'var(--g-muted)', letterSpacing: '0.04em' }}>Product Manager Assignment</span>
      </div>
    </div>
  );
}

function SlidePrioritization() {
  const features = [
    {
      num: '1',
      name: 'AI Editor',
      priority: 'P0',
      effort: 'High',
      impact: 'High',
      deps: 'None',
      why: 'Directly addresses the confirmed main drop-off. Can ship as a simplified editor before templates exist and get enhanced once they are live.',
      effortColor: '#DC2626',
      impactColor: '#059669',
      priorityColor: '#DC2626',
    },
    {
      num: '2',
      name: 'Template-Driven Output',
      priority: 'P1',
      effort: 'High',
      impact: 'High',
      deps: 'None',
      why: 'Reduces the amount of editing needed in the first place. Also unlocks persona-aware AI rewrites and the template selection screen.',
      effortColor: '#DC2626',
      impactColor: '#059669',
      priorityColor: '#D97706',
    },
    {
      num: '3',
      name: 'Type + Template Selection',
      priority: 'P2',
      effort: 'Medium',
      impact: 'High',
      deps: 'Template-Driven Output',
      why: 'The selection screen only makes sense once templates exist. Users need to see what they are choosing before committing to one.',
      effortColor: '#D97706',
      impactColor: '#059669',
      priorityColor: '#6B7280',
    },
    {
      num: '4',
      name: 'Smart Capture Bar',
      priority: 'P3',
      effort: 'Medium',
      impact: 'Medium',
      deps: 'None',
      why: 'Independent of the template system. Addresses a secondary friction point. Ships last since the editor drop-off is the bigger problem.',
      effortColor: '#D97706',
      impactColor: '#D97706',
      priorityColor: '#6B7280',
    },
  ];

  return (
    <div className="pres-content-wrap" style={{ gap: '28px' }}>
      <div>
        <h2 className="pres-title">Prioritization and Dependencies</h2>
        <p className="pres-subtitle" style={{ marginTop: '8px' }}>AI Editor ships first because it directly fixes the confirmed main drop-off. Templates come second, unlocking the selection screen and enhanced AI rewrites.</p>
      </div>

      {/* Feature table */}
      <div style={{ background: 'white', border: '1px solid var(--g-border)', borderRadius: '14px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '32px 2fr 60px 80px 80px 1fr', padding: '10px 20px', background: '#F9FAFB', borderBottom: '1px solid var(--g-border)', gap: '16px' }}>
          {['#', 'Feature', 'Priority', 'Effort', 'Impact', 'Dependency'].map(h => (
            <div key={h} style={{ fontSize: '12px', fontWeight: 700, color: 'var(--g-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
          ))}
        </div>
        {features.map(({ num, name, priority, effort, impact, deps, why, effortColor, impactColor, priorityColor }, i) => (
          <div key={name} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 60px 80px 80px 1fr', padding: '16px 20px', borderBottom: i < features.length - 1 ? '1px solid var(--g-border)' : 'none', gap: '16px', alignItems: 'start' }}>
            <div style={{ fontWeight: 800, fontSize: '18px', color: '#E5E7EB' }}>{num}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '3px' }}>{name}</div>
              <div style={{ fontSize: '13px', color: 'var(--g-muted)', lineHeight: 1.5 }}>{why}</div>
            </div>
            <div style={{ fontWeight: 800, fontSize: '15px', color: priorityColor }}>{priority}</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: effortColor }}>{effort}</div>
            <div style={{ fontWeight: 700, fontSize: '14px', color: impactColor }}>{impact}</div>
            <div style={{ fontSize: '14px', color: deps === 'None' ? '#059669' : deps.startsWith('Partial') ? '#D97706' : '#6B7280', fontWeight: deps === 'None' ? 600 : 400 }}>{deps}</div>
          </div>
        ))}
      </div>
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
          background: 'var(--g-brand)',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '-0.2px',
          boxShadow: '0 4px 16px rgba(75,123,245,0.35)',
          transition: 'opacity 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(75,123,245,0.5)'; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(75,123,245,0.35)'; }}
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
