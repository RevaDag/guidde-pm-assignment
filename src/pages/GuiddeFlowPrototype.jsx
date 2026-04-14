import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GuiddeFlowPrototype.css';

// ── Persona data ──────────────────────────────────────────────────────────────

const PERSONAS = {
  support: {
    icon: '💬', label: 'Help Article', color: '#4B7BF5', dimBg: '#EEF3FE',
    desc: 'Support team · Text documentation',
    captureSteps: ['Clicked Settings menu', 'Opened Account section', 'Clicked Security tab', 'Enabled 2FA toggle'],
    captureSequence: [
      { label: 'Clicked Settings menu',   type: 'normal'    },
      { label: 'Clicked Settings menu',   type: 'duplicate' },
      { label: 'Opened Account section',  type: 'normal'    },
      { label: 'Clicked on empty area',   type: 'empty'     },
      { label: 'Clicked Security tab',    type: 'normal'    },
      { label: 'Enabled 2FA toggle',      type: 'normal'    },
    ],
    tip: 'Each click becomes a numbered step — transcribing as you go.',
    auto: ['Step text auto-transcribed', 'Screenshot saved per step', 'Callout boxes ready'],
    cta: 'Publish to Help Center',
    chips: ['Clean up captions', 'Add a callout here', 'Simplify language', 'Number the steps'],
    greeting: 'Your help article is ready. Want me to clean up the captions for plain language?',
    reply: {
      'Clean up captions':   'Simplified 4 captions — jargon replaced with plain language. Preview updated.',
      'Add a callout here':  'Added a ⚠️ callout to step 3 highlighting the key security action.',
      'Simplify language':   'All steps rewritten in plain, jargon-free language.',
      'Number the steps':    'Steps now show clear "Step 1:", "Step 2:" prefixes throughout.',
    },
    editorSteps: ['Go to Settings', 'Open Account', 'Click Security', 'Enable 2FA'],
    stepDescs: ['Navigate to the main account menu', 'Select the Account section from sidebar', 'Access security preferences tab', 'Toggle 2FA to enable protection'],
    previewBg: 'linear-gradient(135deg, #EEF3FE 0%, #F5F8FF 60%, #DBEAFE 100%)',
    previewTitle: 'How to Enable Two-Factor Authentication',
    previewStepLabel: 'Step 3 — Security tab',
    previewCaption: 'Navigate to Settings → Account → Security to access two-factor authentication options.',
    coverTitle: 'Enable 2FA on Your Account',
    totalDuration: '1:12',
    stepDurations: ['5.2s', '4.8s', '6.1s', '7.4s'],
  },
  sales: {
    icon: '🎯', label: 'Demo Video', color: '#8B5CF6', dimBg: '#F3EFFE',
    desc: 'Sales team · Branded video demo',
    captureSteps: ['Opened Analytics dashboard', 'Clicked Revenue tab', 'Expanded Q4 report', 'Opened Charts view'],
    captureSequence: [
      { label: 'Opened Analytics dashboard', type: 'normal'    },
      { label: 'Clicked on empty area',      type: 'empty'     },
      { label: 'Clicked Revenue tab',        type: 'normal'    },
      { label: 'Clicked Revenue tab',        type: 'duplicate' },
      { label: 'Expanded Q4 report',         type: 'normal'    },
      { label: 'Opened Charts view',         type: 'normal'    },
    ],
    tip: 'Move deliberately — each step becomes a polished video clip.',
    auto: ['Brand kit auto-applied', 'Logo overlay queued', 'Narration layer ready'],
    cta: 'Send to Client',
    chips: ['Add company logo', 'Apply brand colors', 'Trim dead air', 'Add narration'],
    greeting: 'Nice recording. Should I apply your brand kit and tighten it up for a client send?',
    reply: {
      'Add company logo':   'Logo overlay added to all 4 steps from your saved brand kit.',
      'Apply brand colors': 'Brand colors applied — highlights and overlays match your palette.',
      'Trim dead air':      'Trimmed 2.3s from step 1 and 1.8s from step 3.',
      'Add narration':      'Narration cues added to each step. Record audio when ready.',
    },
    editorSteps: ['Open Analytics', 'Revenue Tab', 'Expand Q4', 'Charts View'],
    stepDescs: ['Navigate to the analytics dashboard', 'Click the Revenue section header', 'Expand Q4 quarterly report details', 'Review charts and performance trends'],
    previewBg: 'linear-gradient(135deg, #F3EFFE 0%, #FAF5FF 60%, #EDE9FE 100%)',
    previewTitle: 'Q4 Revenue Overview',
    previewStepLabel: 'Step 2 — Revenue tab',
    previewCaption: 'Click the Revenue tab to access the full quarterly breakdown and performance charts.',
    coverTitle: 'Q4 Revenue Demo — Acme Analytics',
    totalDuration: '0:46',
    stepDurations: ['6.4s', '5.1s', '8.3s', '7.0s'],
  },
  marketing: {
    icon: '✨', label: 'Interactive Demo', color: '#D97706', dimBg: '#FEF3E2',
    desc: 'Marketing team · Embeddable tour',
    captureSteps: ['Clicked Sign Up button', 'Filled in name field', 'Selected Pro plan', 'Clicked Get Started'],
    captureSequence: [
      { label: 'Clicked Sign Up button', type: 'normal'    },
      { label: 'Clicked on empty area',  type: 'empty'     },
      { label: 'Filled in name field',   type: 'normal'    },
      { label: 'Selected Pro plan',      type: 'normal'    },
      { label: 'Selected Pro plan',      type: 'duplicate' },
      { label: 'Clicked Get Started',    type: 'normal'    },
    ],
    tip: 'Click key elements — hotspots are auto-generated from your clicks.',
    auto: ['Click targets auto-detected', 'Hotspot coordinates mapped', 'Embed code generating'],
    cta: 'Get Embed Code',
    chips: ['Add a hotspot here', 'Make step interactive', 'Add tooltip text', 'Prepare for embed'],
    greeting: 'Solid walkthrough. Want me to add interactive hotspots to the key click targets?',
    reply: {
      'Add a hotspot here':    'Hotspot added. Visitors can now click through this interaction.',
      'Make step interactive': 'Step 3 is interactive — visitors must click to proceed.',
      'Add tooltip text':      'Tooltip added: "Click here to select your plan." Appears on hover.',
      'Prepare for embed':     'Embed code ready. Copy the snippet to add this tour to any webpage.',
    },
    editorSteps: ['Click Sign Up', 'Fill Details', 'Select Plan', 'Get Started'],
    stepDescs: ['Initiate new account creation flow', 'Enter name and work email address', 'Choose the subscription tier', 'Complete setup and enter dashboard'],
    previewBg: 'linear-gradient(135deg, #FEF3E2 0%, #FFFBF0 60%, #FEF3C7 100%)',
    previewTitle: 'Get Started with Acme',
    previewStepLabel: 'Step 3 — Select plan',
    previewCaption: 'Click the plan that fits your team size to continue your account setup.',
    coverTitle: 'Acme Onboarding Walkthrough',
    totalDuration: '0:58',
    stepDurations: ['4.9s', '6.2s', '7.8s', '5.5s'],
  },
};

// ── Content types ─────────────────────────────────────────────────────────────

const CONTENT_TYPES = [
  { id: 'training', label: 'Employee Training Guide',       icon: '🎓', persona: 'support'   },
  { id: 'howto',    label: 'How-To Tutorial',               icon: '📖', persona: 'support'   },
  { id: 'demo',     label: 'Product Demo',                  icon: '🎯', persona: 'sales'     },
  { id: 'sop',      label: 'Standard Operations Procedure', icon: '📋', persona: 'support'   },
  { id: 'kb',       label: 'Knowledge Base Article',        icon: '✨', persona: 'marketing' },
];

// ── Templates per content type ────────────────────────────────────────────────

const TEMPLATES = {
  training: [
    { id: 'tr1', name: 'Step-by-Step Guide',    desc: 'Numbered steps with annotated screenshots', recent: true  },
    { id: 'tr2', name: 'Video Walkthrough',      desc: 'Narrated screen recording with captions',  recent: false },
    { id: 'tr3', name: 'Quick Reference Card',   desc: 'Compact one-pager for fast lookup',        recent: false },
  ],
  howto: [
    { id: 'hw1', name: 'Simple 5-Step',          desc: 'Clean sequential numbered format',          recent: true  },
    { id: 'hw2', name: 'Detailed Guide',          desc: 'In-depth steps with callouts & tips',      recent: false },
    { id: 'hw3', name: 'FAQ Format',              desc: 'Q&A style with collapsible answers',       recent: false },
  ],
  demo: [
    { id: 'dm1', name: 'Feature Highlight',      desc: 'Brand kit applied, logo overlay ready',    recent: true  },
    { id: 'dm2', name: 'Full Product Tour',       desc: 'End-to-end walkthrough, shareable link',   recent: false },
    { id: 'dm3', name: 'Client-Ready Send',       desc: 'Polished, trimmed, one-click delivery',    recent: false },
  ],
  sop: [
    { id: 'so1', name: 'Standard Procedure',     desc: 'Numbered checklist with role labels',      recent: false },
    { id: 'so2', name: 'Decision Tree',           desc: 'Flowchart with conditional branches',      recent: true  },
    { id: 'so3', name: 'Role-Based Guide',        desc: 'Separated by team function',               recent: false },
  ],
  kb: [
    { id: 'kb1', name: 'Interactive Demo',        desc: 'Clickable hotspot tour, embed-ready',      recent: true  },
    { id: 'kb2', name: 'Product Embed Tour',      desc: 'Embeddable snippet for any webpage',       recent: false },
    { id: 'kb3', name: 'Landing Hero',            desc: 'Website hero-section showcase',            recent: false },
  ],
};

const INITIAL_FAVORITES = ['tr1', 'hw1', 'dm2', 'so2', 'kb1'];

// ── SVG icon components ───────────────────────────────────────────────────────

const Icons = {
  Speaker: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="5" y="1" width="6" height="8" rx="3" fill={color} />
      <path d="M2 8a6 6 0 0012 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="8" y1="14" x2="8" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="5" y1="15" x2="11" y2="15" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  Background: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.2" fill={color} opacity="0.75" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.2" fill={color} opacity="0.75" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.2" fill={color} opacity="0.75" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1.2" fill={color} opacity="0.75" />
    </svg>
  ),
  Elements: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke={color} strokeWidth="1.4" />
      <rect x="5" y="5" width="6" height="6" rx="1" fill={color} opacity="0.45" />
    </svg>
  ),
  Text: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M8 4v9M5 13h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Captions: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <line x1="2" y1="5" x2="14" y2="5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="9" x2="11" y2="9" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2" y1="13" x2="7" y2="13" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Audio: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M6 12V5l8-2v7" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="12" r="2" fill={color} />
      <circle cx="12" cy="10" r="2" fill={color} />
    </svg>
  ),
  Media: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={color} strokeWidth="1.4" />
      <circle cx="5.5" cy="7" r="1.5" fill={color} opacity="0.7" />
      <path d="M1.5 11l4-4 3 3 2.5-2.5L15 12" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  Actions: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M7 9.5a3 3 0 004.243 0l1.5-1.5a3 3 0 00-4.243-4.243l-.75.75" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M9 6.5a3 3 0 00-4.243 0L3.257 8a3 3 0 004.243 4.243l.75-.75" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  ),
  Motion: ({ size = 16, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M1 8c1-3 2-3 3-1s2 5 3 3 2-8 3-5 2 4 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  Undo: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M2 6h8a4 4 0 010 8H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6l3-3M2 6l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Redo: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M14 6H6a4 4 0 000 8h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6l-3-3M14 6l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Cloud: ({ size = 14, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 12a3 3 0 010-6 4.5 4.5 0 018.5 1.5A2.5 2.5 0 0112 12H4z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  Mic: ({ size = 10, color = 'currentColor' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="5" y="1" width="6" height="8" rx="3" fill={color} />
      <path d="M3 8a5 5 0 0010 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  ),
};

// ── Browser content mocks ─────────────────────────────────────────────────────

function SettingsPage({ step }) {
  return (
    <div style={{ display: 'flex', height: '100%', background: '#F9FAFB', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ width: '200px', background: 'white', borderRight: '1px solid #E5E7EB', padding: '24px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 20px 12px', fontSize: '11px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Settings</div>
        {['General', 'Account', 'Security', 'Notifications', 'Privacy', 'Advanced'].map((item, i) => (
          <div key={item} style={{ padding: '9px 20px', fontSize: '13px', fontWeight: i === 2 ? 600 : 400, color: i === 2 ? '#4B7BF5' : '#374151', background: i === 2 ? 'rgba(75,123,245,0.06)' : 'transparent', borderLeft: i === 2 ? '3px solid #4B7BF5' : '3px solid transparent', cursor: 'pointer' }}>{item}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: '36px 48px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>Security Settings</h2>
        <p style={{ color: '#6B7280', fontSize: '14px', margin: '0 0 28px' }}>Manage your account security preferences.</p>
        <div style={{ maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '22px', background: 'white', borderRadius: '12px', border: step >= 3 ? '2px solid #4B7BF5' : '1px solid #E5E7EB', boxShadow: step >= 3 ? '0 0 0 4px rgba(75,123,245,0.06)' : 'none', transition: 'all 0.4s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '3px' }}>Two-Factor Authentication</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>Add an extra layer of security</div>
              </div>
              <div style={{ width: '48px', height: '26px', borderRadius: '13px', background: step >= 4 ? '#10B981' : '#E5E7EB', position: 'relative', transition: 'background 0.4s', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: '3px', left: step >= 4 ? '24px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.4s' }} />
              </div>
            </div>
          </div>
          {['Password', 'Active Sessions', 'API Keys'].map((item, i) => (
            <div key={item} style={{ padding: '18px 22px', background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: step >= 2 ? 1 : 0.4, transition: 'opacity 0.4s' }}>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>{item}</div>
              <div style={{ fontSize: '12px', color: '#9CA3AF' }}>Manage →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ step }) {
  const tabs = ['Overview', 'Revenue', 'Users', 'Traffic'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F9FAFB', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ padding: '16px 28px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>Analytics</div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {tabs.map((tab, i) => (
            <div key={tab} style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: i === 1 ? 600 : 400, color: i === 1 ? '#8B5CF6' : '#6B7280', background: i === 1 ? 'rgba(139,92,246,0.08)' : 'transparent', cursor: 'pointer' }}>{tab}</div>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: '8px', background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)', fontSize: '12px', fontWeight: 600, color: '#8B5CF6' }}>Q4 2025</div>
      </div>
      <div style={{ padding: '20px 28px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', flexShrink: 0 }}>
        {[{ label: 'Revenue', val: '$48.2k', d: '+12%' }, { label: 'Active Users', val: '1,247', d: '+8%' }, { label: 'Conversion', val: '3.4%', d: '+0.6%' }].map(({ label, val, d }, i) => (
          <div key={label} style={{ padding: '16px 20px', background: 'white', borderRadius: '12px', border: step >= i + 1 ? '1px solid rgba(139,92,246,0.3)' : '1px solid #E5E7EB', transition: 'border-color 0.4s' }}>
            <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontWeight: 700, fontSize: '22px', color: '#111827' }}>{val}</div>
            <div style={{ fontSize: '12px', color: '#10B981', fontWeight: 600, marginTop: '4px' }}>{d} this month</div>
          </div>
        ))}
      </div>
      <div style={{ margin: '16px 28px', flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '18px', overflow: 'hidden' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>Revenue Trend — Q4 2025</div>
        <svg width="100%" height="120" viewBox="0 0 600 120" preserveAspectRatio="none">
          <defs><linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25" /><stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" /></linearGradient></defs>
          <path d="M0 100 C80 80 140 60 200 52 S320 20 420 30 S530 42 600 36 L600 120 L0 120 Z" fill="url(#dashGrad)" />
          <path d="M0 100 C80 80 140 60 200 52 S320 20 420 30 S530 42 600 36" fill="none" stroke="#8B5CF6" strokeWidth="2.5" />
        </svg>
      </div>
    </div>
  );
}

function SignupPage({ step }) {
  return (
    <div style={{ display: 'flex', height: '100%', background: 'linear-gradient(135deg,#FFFBF0,#FEF3E2)', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ width: '420px', background: 'white', borderRadius: '20px', padding: '36px', boxShadow: '0 8px 40px rgba(0,0,0,0.10)', border: '1px solid #FDE68A' }}>
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: '#D97706', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>A</div>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Get started with Acme</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Create your free account in 60 seconds</p>
        </div>
        {[['Full name', 'Sarah Chen'], ['Work email', 'sarah@company.com']].map(([field, val], i) => (
          <div key={field} style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>{field}</div>
            <div style={{ padding: '10px 14px', borderRadius: '9px', border: step >= i + 1 ? '1.5px solid #D97706' : '1.5px solid #E5E7EB', fontSize: '14px', color: step >= i + 1 ? '#111827' : '#9CA3AF', background: step >= i + 1 ? '#FFFBF0' : 'white', transition: 'all 0.3s' }}>
              {step >= i + 1 ? val : `Enter your ${field.toLowerCase()}`}
            </div>
          </div>
        ))}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Choose your plan</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Free', 'Pro', 'Enterprise'].map((plan, i) => (
              <div key={plan} style={{ flex: 1, padding: '10px 6px', borderRadius: '9px', textAlign: 'center', fontSize: '13px', fontWeight: i === 1 ? 700 : 400, color: step >= 3 && i === 1 ? 'white' : i === 1 ? '#D97706' : '#6B7280', background: step >= 3 && i === 1 ? '#D97706' : i === 1 ? '#FEF3E2' : '#F9FAFB', border: i === 1 ? '1.5px solid #D97706' : '1.5px solid #E5E7EB', cursor: 'pointer', transition: 'all 0.4s' }}>{plan}</div>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px', borderRadius: '10px', background: step >= 4 ? '#D97706' : '#F3F4F6', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: step >= 4 ? 'white' : '#9CA3AF', cursor: 'pointer', transition: 'all 0.4s' }}>
          Get Started →
        </div>
      </div>
    </div>
  );
}

// ── Smart Capture Bar ─────────────────────────────────────────────────────────

function GuiddeBar({ capturedSteps, onRemoveStep, allDone, onDone }) {
  const [open, setOpen] = useState(false);

  const stepCount  = capturedSteps.length;
  const last       = stepCount > 0 ? capturedSteps[stepCount - 1] : null;
  const shortLabel = last ? last.label.split(' ').slice(0, 3).join(' ') : '';

  const isWarning  = (s) => s.type === 'duplicate' || s.type === 'empty';
  const warnCount  = capturedSteps.filter(isWarning).length;

  const typeLabel  = (type) => type === 'duplicate' ? 'DUPLICATE' : type === 'empty' ? 'EMPTY CLICK' : '';

  // Row styles per step state
  const rowBg   = (s, isCurrent) => {
    if (s.type === 'duplicate') return '#FFF7ED';
    if (s.type === 'empty')     return '#FFF7ED';
    if (isCurrent)              return '#F0FDF4';
    return 'transparent';
  };
  const iconColor = (s, isCurrent) => {
    if (isWarning(s)) return '#F97316';
    if (isCurrent)    return '#E8322F';
    return '#10B981';
  };
  const icon = (s, isCurrent) => {
    if (isWarning(s)) return '⚠';
    if (isCurrent)    return '◉';
    return '✓';
  };

  return (
    <div style={{ position: 'absolute', bottom: '24px', left: '24px', zIndex: 30, userSelect: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>

      {/* Expandable steps list — opens upward */}
      {open && stepCount > 0 && (
        <div className="flow-fade-in" style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.14)', padding: '6px 8px', minWidth: '260px', maxWidth: '340px' }}>
          {capturedSteps.map((step, i) => {
            const isCurrent = i === stepCount - 1;
            const warn = isWarning(step);
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 6px',
                borderRadius: '7px', marginBottom: i < stepCount - 1 ? '2px' : 0,
                background: rowBg(step, isCurrent),
                border: warn ? '1px solid #FED7AA' : '1px solid transparent',
                transition: 'background 0.15s',
              }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: iconColor(step, isCurrent), width: '14px', flexShrink: 0, textAlign: 'center' }}>
                  {icon(step, isCurrent)}
                </span>
                <span style={{ flex: 1, fontSize: '12px', color: warn ? '#92400E' : '#374151', lineHeight: 1.4, fontWeight: isCurrent || warn ? 600 : 400 }}>
                  {step.label}
                </span>
                {warn && (
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#F97316', background: '#FED7AA', borderRadius: '4px', padding: '1px 5px', letterSpacing: '0.04em', flexShrink: 0 }}>
                    {typeLabel(step.type)}
                  </span>
                )}
                <div
                  onClick={e => { e.stopPropagation(); onRemoveStep(i); }}
                  title="Remove this step"
                  style={{ width: '20px', height: '20px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#9CA3AF', cursor: 'pointer', flexShrink: 0, transition: 'background 0.1s, color 0.1s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#EF4444'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9CA3AF'; }}
                >✕</div>
              </div>
            );
          })}
          {warnCount > 0 && (
            <div style={{ marginTop: '6px', padding: '5px 8px', borderRadius: '7px', background: '#FFF7ED', border: '1px solid #FED7AA', fontSize: '11px', color: '#92400E', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span>⚠</span>
              <span>{warnCount} step{warnCount > 1 ? 's' : ''} with issues — tap ✕ to remove</span>
            </div>
          )}
        </div>
      )}

      {/* Main pill */}
      <div style={{ background: 'white', borderRadius: '99px', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', border: warnCount > 0 ? '1.5px solid #FED7AA' : '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px 6px 8px', whiteSpace: 'nowrap', transition: 'border-color 0.2s' }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '9px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '16px', fontWeight: 900, color: 'white', fontStyle: 'italic', flexShrink: 0 }}>g</div>

        <div
          onClick={e => { e.stopPropagation(); if (stepCount > 0) setOpen(o => !o); }}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 10px', borderRadius: '99px', background: warnCount > 0 ? '#FFF7ED' : '#F3F4F6', cursor: stepCount > 0 ? 'pointer' : 'default', transition: 'background 0.15s' }}
          onMouseEnter={e => { if (stepCount > 0) e.currentTarget.style.background = warnCount > 0 ? '#FEF0E0' : '#E9EAEC'; }}
          onMouseLeave={e => { e.currentTarget.style.background = warnCount > 0 ? '#FFF7ED' : '#F3F4F6'; }}
        >
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>{stepCount} Steps</span>
          {stepCount > 0 && (
            <>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>·</span>
              <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>{shortLabel}</span>
              {warnCount > 0 && (
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#F97316', background: '#FED7AA', borderRadius: '99px', padding: '1px 6px', marginLeft: '1px' }}>
                  ⚠ {warnCount}
                </span>
              )}
              <span style={{ fontSize: '9px', color: '#9CA3AF', marginLeft: '1px' }}>{open ? '▲' : '▼'}</span>
            </>
          )}
        </div>

        <div style={{ width: '1px', height: '16px', background: '#E5E7EB', flexShrink: 0 }} />
        <div onClick={allDone ? onDone : undefined} style={{ padding: '5px 14px', borderRadius: '99px', background: allDone ? '#10B981' : '#E5E7EB', fontSize: '12px', fontWeight: 700, color: allDone ? 'white' : '#9CA3AF', cursor: allDone ? 'pointer' : 'default', transition: 'all 0.35s' }}>Done</div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[['⏸','Pause'], ['🖼','Screenshot']].map(([ic, title]) => (
            <div key={title} title={title} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', borderRadius: '7px', cursor: 'pointer', color: '#6B7280' }}>{ic}</div>
          ))}
        </div>
        <div className="rec-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444', flexShrink: 0, marginLeft: '2px' }} />
      </div>
    </div>
  );
}

// ── Editor sub-components ─────────────────────────────────────────────────────

function EditorTopNav({ p, onReset }) {
  return (
    <div style={{ height: '48px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px', flexShrink: 0, zIndex: 10 }}>
      {/* App title tab */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 12px', background: '#F3F4F6', borderRadius: '8px', cursor: 'default' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '10px', fontWeight: 900, color: 'white', fontStyle: 'italic', flexShrink: 0 }}>g</div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>My Guidde</span>
        <span style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: 1 }}>×</span>
      </div>

      {/* Video | Document toggle (center) */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '10px', padding: '3px', gap: '2px' }}>
          {['Video', 'Document'].map((tab, i) => (
            <div key={tab} style={{ padding: '5px 18px', borderRadius: '8px', background: i === 0 ? 'white' : 'transparent', fontSize: '12px', fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#111827' : '#6B7280', cursor: 'pointer', boxShadow: i === 0 ? '0 1px 3px rgba(0,0,0,0.10)' : 'none', transition: 'all 0.15s' }}>{tab}</div>
          ))}
        </div>
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {[{ icon: <Icons.Undo />, title: 'Undo' }, { icon: <Icons.Redo />, title: 'Redo' }, { icon: <Icons.Cloud />, title: 'Saved' }].map(({ icon, title }) => (
          <div key={title} title={title} style={{ width: '30px', height: '30px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280', transition: 'background 0.1s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            {icon}
          </div>
        ))}
        <div style={{ width: '1px', height: '16px', background: '#E5E7EB', margin: '0 2px' }} />
        <div style={{ padding: '5px 14px', borderRadius: '7px', border: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer', transition: 'border-color 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#9CA3AF'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#E5E7EB'}>Share</div>
        <div style={{ padding: '5px 14px', borderRadius: '7px', background: '#10B981', fontSize: '12px', fontWeight: 700, color: 'white', cursor: 'pointer', transition: 'filter 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.08)'}
          onMouseLeave={e => e.currentTarget.style.filter = ''}>Done</div>
        <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '16px', color: '#9CA3AF', borderRadius: '6px' }}
          onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>⋮</div>
      </div>
    </div>
  );
}

function EditorIconNav({ color }) {
  const items = [
    { id: 'Speaker',    Icon: Icons.Speaker,    active: true },
    { id: 'Background', Icon: Icons.Background },
    { id: 'Elements',   Icon: Icons.Elements },
    { id: 'Text',       Icon: Icons.Text },
    { id: 'Captions',   Icon: Icons.Captions },
    { id: 'Audio',      Icon: Icons.Audio },
    { id: 'Media',      Icon: Icons.Media },
    { id: 'Actions',    Icon: Icons.Actions },
    { id: 'Motion',     Icon: Icons.Motion },
  ];
  return (
    <div style={{ width: '68px', background: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10px', gap: '2px', flexShrink: 0, overflowY: 'auto' }}>
      {items.map(({ id, Icon, active }) => (
        <div key={id} style={{ width: '56px', padding: '8px 4px 7px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', cursor: 'pointer', background: active ? `${color}12` : 'transparent', transition: 'background 0.15s' }}
          onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F3F4F6'; }}
          onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
          <Icon size={18} color={active ? color : '#9CA3AF'} />
          <span style={{ fontSize: '9px', fontWeight: active ? 700 : 400, color: active ? color : '#9CA3AF', textAlign: 'center', lineHeight: 1.2, letterSpacing: '0.01em' }}>{id}</span>
        </div>
      ))}
    </div>
  );
}

function EditorStepPanel({ p, activeStep, setActiveStep }) {
  return (
    <div style={{ width: '280px', background: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
      {/* Panel header */}
      <div style={{ padding: '11px 14px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827', flex: 1 }}>Speaker</span>
        {[
          { icon: '⤢', title: 'Expand' }, { icon: '⌕', title: 'Search' },
          { icon: 'ℹ', title: 'Info' },   { icon: '⋯', title: 'More' },
          { icon: '×', title: 'Close' },
        ].map(({ icon, title }) => (
          <div key={title} title={title} style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#9CA3AF', cursor: 'pointer', borderRadius: '4px', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>{icon}</div>
        ))}
      </div>

      {/* Step list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Cover */}
        <div style={{ padding: '10px 14px 10px 11px', borderLeft: '3px solid #F59E0B', background: '#FFFBF0', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#111827', flex: 1, lineHeight: 1.35 }}>{p.coverTitle}</span>
            <div style={{ display: 'flex', gap: '2px', flexShrink: 0, marginTop: '1px' }}>
              <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#9CA3AF', cursor: 'pointer' }}>▷</div>
              <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#9CA3AF', cursor: 'pointer' }}>⋯</div>
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#D97706', marginTop: '3px', fontWeight: 500 }}>Cover slide</div>
        </div>
        <div style={{ height: '1px', background: '#E5E7EB' }} />

        {/* Steps */}
        {p.editorSteps.map((title, i) => (
          <div key={i}>
            <div onClick={() => setActiveStep(i)} style={{ padding: '10px 14px 10px 11px', borderLeft: activeStep === i ? `3px solid ${p.color}` : '3px solid transparent', background: activeStep === i ? p.dimBg : 'white', cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { if (activeStep !== i) e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseLeave={e => { if (activeStep !== i) e.currentTarget.style.background = 'white'; }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: activeStep === i ? 700 : 600, color: '#111827', lineHeight: 1.35 }}>0{i + 1}: {title}</span>
                <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#9CA3AF', cursor: 'pointer', flexShrink: 0, marginTop: '1px' }}>⋯</div>
              </div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '3px', lineHeight: 1.4 }}>{p.stepDescs[i]}</div>
            </div>
            {i < p.editorSteps.length - 1 && <div style={{ height: '1px', background: '#E5E7EB', margin: '0 14px' }} />}
          </div>
        ))}
      </div>

      {/* Voice section */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid #E5E7EB', flexShrink: 0, background: 'white' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Voice</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
          <span style={{ fontSize: '18px', lineHeight: 1 }}>🇺🇸</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151', flex: 1 }}>Kai</span>
          <div style={{ width: '26px', height: '26px', borderRadius: '7px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6B7280', fontSize: '12px' }}>✏</div>
        </div>
      </div>
    </div>
  );
}

function EditorCanvas({ p, activeStep, chatState, chatMsg }) {
  return (
    <div style={{ flex: 1, background: '#EBEDF0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', overflow: 'hidden', position: 'relative' }}>
      {/* Slide */}
      <div style={{ width: 'min(700px, 100%)', aspectRatio: '16 / 9', background: p.previewBg, borderRadius: '10px', boxShadow: '0 8px 40px rgba(0,0,0,0.20)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px' }}>
        {/* Step badge */}
        <div style={{ fontSize: '11px', fontWeight: 700, color: p.color, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.7 }}>
          STEP {activeStep + 1} OF {p.editorSteps.length}
        </div>
        {/* Heading */}
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(20px,2.8vw,38px)', fontWeight: 800, color: '#111827', lineHeight: 1.18, textAlign: 'center', marginBottom: '18px' }}>
          {p.previewTitle}
        </div>
        {/* Caption card */}
        <div style={{ padding: '14px 20px', background: 'rgba(255,255,255,0.88)', borderRadius: '10px', border: `1.5px solid ${p.color}28`, fontSize: '13px', color: '#374151', lineHeight: 1.65, textAlign: 'center', maxWidth: '480px', backdropFilter: 'blur(4px)' }}>
          {p.previewCaption}
          {chatState === 'done' && chatMsg && (
            <div style={{ marginTop: '10px', padding: '6px 10px', borderRadius: '6px', background: `${p.color}10`, border: `1px solid ${p.color}25`, fontSize: '11px', color: p.color, fontWeight: 600 }}>
              ✓ {p.reply[chatMsg]}
            </div>
          )}
        </div>
        {/* Brand bug bottom-right */}
        <div style={{ position: 'absolute', bottom: '14px', right: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#1A1F36', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px' }}>🐔</div>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1A1F36', letterSpacing: '0.1em' }}>ACME</span>
        </div>
        {/* Persona badge top-right */}
        <div style={{ position: 'absolute', top: '12px', right: '14px', padding: '3px 9px', borderRadius: '99px', background: `${p.color}12`, border: `1px solid ${p.color}28`, fontSize: '10px', fontWeight: 700, color: p.color }}>
          {p.icon} {p.label}
        </div>
      </div>
    </div>
  );
}

function EditorTimeline({ p, activeStep, setActiveStep }) {
  const [playing, setPlaying] = useState(false);
  const timelineItems = ['Cover', ...p.editorSteps, 'Ending'];
  const totalSteps = p.editorSteps.length;

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= totalSteps - 1) { setPlaying(false); return prev; }
        return prev + 1;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [playing, totalSteps, setActiveStep]);

  return (
    <div style={{ height: '90px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px', flexShrink: 0 }}>
      {/* Play / Pause button */}
      <div onClick={() => setPlaying(v => !v)}
        style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 2px 8px rgba(59,130,246,0.4)', transition: 'filter 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
        onMouseLeave={e => e.currentTarget.style.filter = ''}>
        {playing ? (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <rect x="1" y="1" width="3.5" height="12" rx="1" fill="white" />
            <rect x="7.5" y="1" width="3.5" height="12" rx="1" fill="white" />
          </svg>
        ) : (
          <svg width="14" height="16" viewBox="0 0 12 14" fill="none">
            <path d="M1 1l10 6-10 6V1z" fill="white" />
          </svg>
        )}
      </div>

      {/* Timestamp */}
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
        00:00 / {p.totalDuration}
      </div>

      {/* Intro label */}
      <div style={{ padding: '2px 8px', borderRadius: '4px', background: '#F3F4F6', fontSize: '11px', fontWeight: 600, color: '#6B7280', flexShrink: 0 }}>Intro</div>

      {/* Thumbnail strip */}
      <div style={{ flex: 1, display: 'flex', gap: '7px', overflowX: 'auto', alignItems: 'flex-start', paddingBottom: '2px', scrollbarWidth: 'none' }}>
        {timelineItems.map((label, i) => {
          // Cover = timeline[0], editorSteps[k] = timeline[k+1], Ending = last
          const isStep = i > 0 && i <= p.editorSteps.length;
          const stepIdx = i - 1;
          const isActive = isStep && stepIdx === activeStep;
          const dur = isStep ? p.stepDurations[stepIdx] : (i === 0 ? '3.2s' : '2.8s');
          return (
            <div key={i} onClick={() => { if (isStep) setActiveStep(stepIdx); }} style={{ flexShrink: 0, width: '74px', cursor: isStep ? 'pointer' : 'default' }}>
              {/* Thumbnail card */}
              <div style={{ height: '48px', borderRadius: '6px', background: isActive ? p.dimBg : '#1E2130', border: isActive ? `2px solid ${p.color}` : '1.5px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden', transition: 'all 0.15s', boxShadow: isActive ? `0 0 0 3px ${p.color}20` : 'none' }}>
                {/* Mini content */}
                <div style={{ position: 'absolute', inset: '6px 6px 6px 6px', display: 'flex', flexDirection: 'column', gap: '3px', justifyContent: 'center' }}>
                  <div style={{ height: '3px', borderRadius: '2px', background: isActive ? p.color : 'rgba(255,255,255,0.18)', width: '75%' }} />
                  <div style={{ height: '2px', borderRadius: '2px', background: isActive ? `${p.color}80` : 'rgba(255,255,255,0.10)', width: '55%' }} />
                </div>
                {/* Duration badge */}
                <div style={{ position: 'absolute', top: '3px', right: '3px', padding: '1px 4px', borderRadius: '3px', background: 'rgba(0,0,0,0.55)', fontSize: '8px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{dur}</div>
                {/* Mic icon */}
                <div style={{ position: 'absolute', bottom: '4px', left: '4px' }}>
                  <Icons.Mic size={8} color={isActive ? p.color : 'rgba(255,255,255,0.4)'} />
                </div>
              </div>
              {/* Label */}
              <div style={{ fontSize: '9px', color: isActive ? p.color : '#6B7280', fontWeight: isActive ? 700 : 400, textAlign: 'center', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '0.01em' }}>
                {i === 0 ? 'Cover' : isStep ? `0${i}` : 'Ending'}
              </div>
            </div>
          );
        })}
        {/* Add step */}
        <div style={{ flexShrink: 0, cursor: 'pointer' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '6px', border: '1.5px dashed #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9CA3AF', fontSize: '20px', transition: 'border-color 0.15s, color 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#9CA3AF'; e.currentTarget.style.color = '#6B7280'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.color = '#9CA3AF'; }}>+</div>
          <div style={{ fontSize: '9px', color: '#9CA3AF', textAlign: 'center', marginTop: '4px' }}>Add</div>
        </div>
      </div>
    </div>
  );
}

function EditorAIChat({ p, chatMsg, chatState, handleChip }) {
  const [freeText, setFreeText] = useState('');

  const handleSend = () => {
    const msg = freeText.trim();
    if (!msg || chatState !== 'idle') return;
    setFreeText('');
    handleChip(msg);
  };

  return (
    <div style={{ width: '290px', display: 'flex', flexDirection: 'column', background: 'white', borderLeft: '1px solid #E5E7EB', overflow: 'hidden', flexShrink: 0 }}>
      {/* Chat header */}
      <div style={{ padding: '11px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'linear-gradient(135deg,#4B7BF5,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'white' }}>✦</div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1F36' }}>AI Editor</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '99px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.22)' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399' }} />
          <span style={{ fontSize: '9px', fontWeight: 700, color: '#059669', letterSpacing: '0.04em' }}>AUTO</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '3px 10px', borderRadius: '99px', background: p.dimBg, border: `1px solid ${p.color}28`, fontSize: '10px', color: p.color, fontWeight: 700 }}>{p.icon} {p.label}</div>
        </div>
        <div style={{ display: 'flex', gap: '7px' }} className="flow-fade-in">
          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'linear-gradient(135deg,#4B7BF5,#7C3AED)', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'white' }}>✦</div>
          <div style={{ flex: 1, padding: '9px 12px', borderRadius: '3px 11px 11px 11px', background: '#F3F4F6', fontSize: '12px', color: '#374151', lineHeight: 1.55 }}>
            {p.greeting}
          </div>
        </div>
        {chatMsg && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="flow-fade-in">
            <div style={{ maxWidth: '80%', padding: '8px 12px', borderRadius: '11px 11px 3px 11px', background: p.color, fontSize: '12px', color: 'white', lineHeight: 1.4 }}>
              {chatMsg}
            </div>
          </div>
        )}
        {chatMsg && (
          <div style={{ display: 'flex', gap: '7px' }} className="flow-fade-in">
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'linear-gradient(135deg,#4B7BF5,#7C3AED)', flexShrink: 0, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'white' }}>✦</div>
            <div style={{ flex: 1, padding: '9px 12px', borderRadius: '3px 11px 11px 11px', background: '#F3F4F6', fontSize: '12px', color: '#374151', lineHeight: 1.55 }}>
              {chatState === 'typing' ? (
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '2px 0' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9CA3AF', animation: `dotBounce 0.9s ease ${i * 0.18}s infinite` }} />
                  ))}
                </div>
              ) : (
                <>
                  {p.reply[chatMsg]}
                  <div style={{ marginTop: '7px', padding: '4px 8px', borderRadius: '5px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', fontSize: '11px', color: '#059669', fontWeight: 700 }}>✓ Applied · Undo available</div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick-action chips */}
      {chatState === 'idle' && (
        <div style={{ padding: '8px 14px', borderTop: '1px solid #E5E7EB', display: 'flex', flexWrap: 'wrap', gap: '5px', flexShrink: 0 }}>
          {p.chips.map(chip => (
            <button key={chip} onClick={() => handleChip(chip)}
              style={{ padding: '5px 11px', borderRadius: '99px', background: p.dimBg, border: `1px solid ${p.color}28`, color: p.color, fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = p.color; }}
              onMouseLeave={e => { e.currentTarget.style.background = p.dimBg; e.currentTarget.style.color = p.color; e.currentTarget.style.borderColor = `${p.color}28`; }}>
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Free-text input */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #E5E7EB', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '6px 8px 6px 12px', transition: 'border-color 0.15s' }}
          onFocusCapture={e => e.currentTarget.style.borderColor = p.color}
          onBlurCapture={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
          <input
            value={freeText}
            onChange={e => setFreeText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            disabled={chatState !== 'idle'}
            placeholder={chatState !== 'idle' ? 'AI is working…' : 'Ask AI to edit…'}
            style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '12px', color: '#374151', placeholder: '#9CA3AF' }}
          />
          <button
            onClick={handleSend}
            disabled={!freeText.trim() || chatState !== 'idle'}
            style={{ width: '28px', height: '28px', borderRadius: '7px', background: freeText.trim() && chatState === 'idle' ? p.color : '#E5E7EB', border: 'none', cursor: freeText.trim() && chatState === 'idle' ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Template visual mocks ─────────────────────────────────────────────────────

function DocMock({ color, variant = 0 }) {
  const lineW = ['72%','58%','82%','65%','50%'];
  return (
    <div style={{ width: '100%', height: '100%', background: '#F8FAFC', borderRadius: '6px', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: `${color}20`, border: `1.5px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>📄</div>
        <div style={{ flex: 1 }}>
          <div style={{ height: '8px', borderRadius: '4px', background: '#1A1F3620', width: '60%' }} />
          <div style={{ height: '6px', borderRadius: '3px', background: '#1A1F3610', width: '40%', marginTop: '4px' }} />
        </div>
      </div>
      <div style={{ height: '1px', background: '#E5E7EB' }} />
      {/* Numbered steps */}
      {[0,1,2,3].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: i < 2 ? color : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: i < 2 ? 'white' : '#9CA3AF', flexShrink: 0 }}>{i+1}</div>
          <div style={{ height: '7px', borderRadius: '4px', background: i < 2 ? `${color}30` : '#E5E7EB', width: lineW[(i + variant) % lineW.length] }} />
        </div>
      ))}
      {/* Screenshot placeholder */}
      <div style={{ marginTop: '2px', height: '32px', borderRadius: '6px', background: `${color}10`, border: `1px dashed ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color, fontWeight: 600, opacity: 0.7 }}>screenshot</div>
    </div>
  );
}

function VideoMock({ color }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#1A1F36', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Brand bar */}
      <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '5px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900, color: 'white' }}>A</div>
        <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)', width: '70px' }} />
        <div style={{ marginLeft: 'auto', height: '6px', borderRadius: '3px', background: `${color}80`, width: '40px' }} />
      </div>
      {/* Play button */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 8px ${color}25` }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 1.5l7 4.5-7 4.5V1.5z" fill="white"/></svg>
        </div>
      </div>
      {/* Timeline */}
      <div style={{ padding: '8px 12px', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.12)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '35%', background: color, borderRadius: '2px' }} />
          <div style={{ position: 'absolute', left: '35%', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: 'white', transform: 'translateX(-50%)' }} />
        </div>
        <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
          {[40,28,52,36,44].map((w,i) => (
            <div key={i} style={{ height: '20px', borderRadius: '3px', background: i < 2 ? `${color}60` : 'rgba(255,255,255,0.06)', flex: `0 0 ${w}px` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InteractiveMock({ color }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#F0FDF4', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', border: '1px solid #D1FAE5' }}>
      {/* App chrome */}
      <div style={{ height: '22px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '4px' }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c=><div key={c} style={{ width:'5px', height:'5px', borderRadius:'50%', background:c }} />)}
        <div style={{ flex:1, height:'8px', background:'#F3F4F6', borderRadius:'3px', margin:'0 6px' }} />
      </div>
      {/* Content area */}
      <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '5px', position: 'relative' }}>
        <div style={{ height: '7px', borderRadius: '4px', background: '#1A1F3618', width: '65%' }} />
        <div style={{ height: '5px', borderRadius: '3px', background: '#1A1F3610', width: '80%' }} />
        <div style={{ height: '5px', borderRadius: '3px', background: '#1A1F3610', width: '55%' }} />
        {/* Hotspot */}
        <div style={{ position: 'absolute', top: '22px', right: '24px' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: `${color}25`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
          </div>
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderRadius: '50%', background: color, animation: 'ping 1.5s ease infinite', opacity: 0.5 }} />
        </div>
        {/* Next button */}
        <div style={{ marginTop: 'auto', alignSelf: 'flex-end', padding: '4px 10px', borderRadius: '6px', background: color, fontSize: '9px', fontWeight: 700, color: 'white' }}>Next →</div>
      </div>
    </div>
  );
}

function TemplateMock({ typeId, tplIndex, color }) {
  const persona = CONTENT_TYPES.find(c => c.id === typeId)?.persona;
  if (persona === 'sales') return <VideoMock color={color} />;
  if (persona === 'marketing') return <InteractiveMock color={color} />;
  return <DocMock color={color} variant={tplIndex} />;
}

// ── Template card ─────────────────────────────────────────────────────────────

function TemplateCard({ tpl, tplIndex, typeId, selected, fav, onSelect, onToggleFav, color }) {
  return (
    <div
      onClick={onSelect}
      style={{
        borderRadius: '12px', cursor: 'pointer', overflow: 'hidden',
        border: selected ? `2px solid ${color}` : '1.5px solid #E5E7EB',
        background: 'white',
        boxShadow: selected ? `0 0 0 3px ${color}18, 0 4px 16px rgba(0,0,0,0.08)` : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.15s', display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => { if (!selected) { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)'; e.currentTarget.style.borderColor = '#C8CDD6'; } }}
      onMouseLeave={e => { if (!selected) { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'; e.currentTarget.style.borderColor = '#E5E7EB'; } }}
    >
      {/* Image mock area */}
      <div style={{ height: '200px', padding: '10px', background: '#F5F7FA', borderBottom: '1px solid #E5E7EB', overflow: 'hidden', flexShrink: 0 }}>
        <TemplateMock typeId={typeId} tplIndex={tplIndex} color={color} />
      </div>

      {/* Card body */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
          <div style={{ fontWeight: 700, fontSize: '13px', color: selected ? color : '#111827', lineHeight: 1.3, flex: 1 }}>{tpl.name}</div>
          <div
            onClick={e => { e.stopPropagation(); onToggleFav(); }}
            style={{ fontSize: '13px', opacity: fav ? 1 : 0.2, cursor: 'pointer', transition: 'opacity 0.15s', flexShrink: 0, lineHeight: 1 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = fav ? '1' : '0.2'; }}
          >⭐</div>
        </div>
        <div style={{ fontSize: '11px', color: '#6B7280', lineHeight: 1.4 }}>{tpl.desc}</div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          {selected && (
            <div style={{ fontSize: '10px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <span>✓</span> Selected
            </div>
          )}
          <div style={{ marginLeft: 'auto' }}>
            <button
              onClick={e => { e.stopPropagation(); window.open('/flow', '_blank'); }}
              style={{ padding: '4px 10px', borderRadius: '6px', border: `1px solid ${color}35`, background: `${color}08`, color, fontSize: '10px', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = color; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.color = color; e.currentTarget.style.borderColor = `${color}35`; }}
            >
              Preview <span style={{ fontSize: '9px' }}>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Select phase (large modal) ────────────────────────────────────────────────

function SelectPhase({ onStart }) {
  const [selectedTypeId, setSelectedTypeId]   = useState('howto');
  const [selectedTplId, setSelectedTplId]     = useState(null);
  const [search, setSearch]                   = useState('');
  const [favorites, setFavorites]             = useState(INITIAL_FAVORITES);

  const ct = CONTENT_TYPES.find(c => c.id === selectedTypeId);
  const persona = ct ? PERSONAS[ct.persona] : null;
  const color = persona?.color || '#4B7BF5';

  const allTemplates = TEMPLATES[selectedTypeId] || [];
  const filtered = search.trim()
    ? allTemplates.filter(t => (t.name + t.desc).toLowerCase().includes(search.toLowerCase()))
    : allTemplates;

  const favTpls    = filtered.filter(t => favorites.includes(t.id));
  const recentTpls = filtered.filter(t => t.recent && !favorites.includes(t.id));
  const otherTpls  = filtered.filter(t => !favorites.includes(t.id) && !t.recent);

  const toggleFav = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleTypeSelect = (id) => {
    setSelectedTypeId(id);
    setSelectedTplId(null);
    setSearch('');
  };

  const handleStart = () => {
    if (!selectedTypeId || !selectedTplId) return;
    onStart(ct.persona);
  };

  const Section = ({ label, items }) => items.length === 0 ? null : (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.09em', textTransform: 'uppercase', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {items.map((tpl, tplIndex) => (
          <TemplateCard
            key={tpl.id} tpl={tpl} tplIndex={tplIndex} typeId={selectedTypeId}
            selected={selectedTplId === tpl.id}
            fav={favorites.includes(tpl.id)}
            color={color}
            onSelect={() => setSelectedTplId(tpl.id)}
            onToggleFav={() => toggleFav(tpl.id)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Blurred bg */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#E8EDF8,#D8E2F4)', opacity: 0.5, filter: 'blur(3px)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />

      {/* Large modal */}
      <div className="flow-fade-in" style={{
        position: 'relative', zIndex: 10,
        width: '80vw',
        height: '80vh',
        borderRadius: '20px',
        background: '#FAFAFA',
        boxShadow: '0 32px 80px rgba(0,0,0,0.32)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>

        {/* Modal header */}
        <div style={{ padding: '18px 24px 16px', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '12px', background: 'white' }}>
          <span style={{ fontSize: '18px', fontWeight: 900, color: '#0D1117', letterSpacing: '-0.4px' }}>guidde.</span>
          <div style={{ width: '1px', height: '16px', background: '#E5E7EB' }} />
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#111827' }}>Create a Guidde</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Search bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#F3F4F6', border: '1.5px solid #E5E7EB', borderRadius: '9px', padding: '6px 12px', width: '220px', transition: 'border-color 0.15s' }}
              onFocusCapture={e => e.currentTarget.style.borderColor = color}
              onBlurCapture={e => e.currentTarget.style.borderColor = '#E5E7EB'}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="7" cy="7" r="4.5" stroke="#9CA3AF" strokeWidth="1.6"/>
                <path d="M10.5 10.5L13.5 13.5" stroke="#9CA3AF" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search templates…"
                style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '12px', color: '#374151' }}
              />
              {search && <div onClick={() => setSearch('')} style={{ fontSize: '11px', color: '#9CA3AF', cursor: 'pointer' }}>✕</div>}
            </div>
          </div>
        </div>

        {/* Body: left type list + right template gallery */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

          {/* Left: Guidde type list */}
          <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #E5E7EB', background: 'white', overflowY: 'auto', padding: '12px 8px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#9CA3AF', letterSpacing: '0.09em', textTransform: 'uppercase', padding: '4px 10px 8px' }}>Guidde Type</div>
            {CONTENT_TYPES.map(c => {
              const sel = selectedTypeId === c.id;
              const p2 = PERSONAS[c.persona];
              return (
                <div key={c.id}
                  onClick={() => handleTypeSelect(c.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px',
                    borderRadius: '9px', cursor: 'pointer', marginBottom: '2px',
                    background: sel ? `${p2.color}10` : 'transparent',
                    border: sel ? `1.5px solid ${p2.color}30` : '1.5px solid transparent',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { if (!sel) e.currentTarget.style.background = '#F3F4F6'; }}
                  onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{c.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: sel ? 700 : 500, color: sel ? p2.color : '#374151', lineHeight: 1.3 }}>{c.label}</div>
                    <div style={{ fontSize: '10px', color: '#9CA3AF', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p2.desc}</div>
                  </div>
                  {sel && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M2 6l3 3 5-5" stroke={p2.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: template gallery */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {filtered.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF', fontSize: '13px' }}>
                No templates match "{search}"
              </div>
            ) : (
              <>
                <Section label="⭐  Favorites" items={favTpls} />
                <Section label="🕐  Recent"    items={recentTpls} />
                <Section label="All Templates" items={otherTpls} />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', gap: '14px' }}>
          {selectedTplId && ct && (
            <div className="flow-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '99px', background: `${color}10`, border: `1px solid ${color}28`, fontSize: '12px', color }}>
              <span>{ct.icon}</span>
              <span style={{ fontWeight: 700 }}>{ct.label}</span>
              <span style={{ color: '#9CA3AF' }}>·</span>
              <span style={{ fontWeight: 600 }}>{allTemplates.find(t => t.id === selectedTplId)?.name}</span>
            </div>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px', alignItems: 'center' }}>
            {!selectedTplId && (
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Select a template to continue</span>
            )}
            <button onClick={handleStart} disabled={!selectedTplId}
              style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: selectedTplId ? color : '#E5E7EB', color: selectedTplId ? 'white' : '#9CA3AF', fontSize: '13px', fontWeight: 700, cursor: selectedTplId ? 'pointer' : 'not-allowed', transition: 'all 0.2s', boxShadow: selectedTplId ? `0 2px 8px ${color}40` : 'none', letterSpacing: '0.01em' }}
              onMouseEnter={e => { if (selectedTplId) e.currentTarget.style.filter = 'brightness(1.07)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ''; }}>
              Start Capture →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Review phase (Guidde output viewer) ──────────────────────────────────────

function ReviewPhase({ p, onEdit }) {
  const [tocOpen, setTocOpen]           = useState(true);
  const [activeSection, setActiveSection] = useState(null); // 'video' | 0 | 1 | ...
  const color = p.color;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navIcons = ['⌂', '👤', '🔍', '↻', '✎', '✦', '🗑', '⊞'];

  const stepColors = [color, '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#06B6D4'];

  return (
    <div className="flow-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#F3F4F6', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Top navbar ── */}
      <div style={{ height: '48px', background: 'white', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px', flexShrink: 0, zIndex: 10 }}>
        {/* Back + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>←</div>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '260px' }}>{p.previewTitle}</span>
        </div>

        {/* Action buttons */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          {/* Translate */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '7px', border: '1px solid #D97706', background: 'white', fontSize: '11px', fontWeight: 600, color: '#D97706', cursor: 'pointer' }}>
            <span style={{ fontSize: '12px' }}>🌐</span> Translate
          </button>
          {/* Share */}
          <button style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '7px', border: '1px solid #E5E7EB', background: 'white', fontSize: '11px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
            <span style={{ fontSize: '11px' }}>↗</span> Share
          </button>
          {/* Edit — triggers editor phase */}
          <button
            onClick={onEdit}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 14px', borderRadius: '7px', border: 'none', background: color, fontSize: '11px', fontWeight: 700, color: 'white', cursor: 'pointer', boxShadow: `0 2px 6px ${color}40` }}
          >
            ✎ Edit
          </button>
          {/* More */}
          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer', color: '#6B7280', letterSpacing: '0.05em' }}>…</div>
        </div>
      </div>

      {/* ── Body row ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Far-left icon nav */}
        <div style={{ width: '44px', background: 'white', borderRight: '1px solid #F3F4F6', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: '4px', flexShrink: 0 }}>
          {navIcons.map((ic, i) => (
            <div key={i} style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', cursor: 'pointer', color: i === 4 ? color : '#9CA3AF', background: i === 4 ? `${color}12` : 'transparent', transition: 'background 0.1s' }}
              onMouseEnter={e => { if (i !== 4) e.currentTarget.style.background = '#F3F4F6'; }}
              onMouseLeave={e => { if (i !== 4) e.currentTarget.style.background = 'transparent'; }}
            >{ic}</div>
          ))}
        </div>

        {/* Left TOC sidebar */}
        {tocOpen && (
          <div style={{ width: '210px', background: 'white', borderRight: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden' }}>
            <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', flexShrink: 0 }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#374151', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Table of contents</span>
              <div onClick={() => setTocOpen(false)} style={{ fontSize: '12px', color: '#9CA3AF', cursor: 'pointer', padding: '2px 4px' }}>✕</div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px' }}>
              {/* Video row */}
              <div
                onClick={() => { setActiveSection('video'); scrollTo('review-video'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 8px', borderRadius: '8px', background: activeSection === 'video' ? `${color}18` : `${color}08`, border: `1px solid ${activeSection === 'video' ? color : `${color}20`}`, marginBottom: '4px', cursor: 'pointer', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '12px', color }}>▶</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color }}>Video</span>
              </div>
              {/* Numbered steps — same numbers as content badges */}
              {p.editorSteps.map((step, i) => {
                const isActive = activeSection === i;
                return (
                  <div key={i}
                    onClick={() => { setActiveSection(i); scrollTo(`review-step-${i}`); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '7px', cursor: 'pointer', marginBottom: '2px', background: isActive ? `${color}10` : 'transparent', border: `1px solid ${isActive ? `${color}25` : 'transparent'}`, transition: 'all 0.12s' }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F9FAFB'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: isActive ? color : '#9CA3AF', width: '20px', flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '12px', color: isActive ? color : '#374151', fontWeight: isActive ? 600 : 400, lineHeight: 1.3 }}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>

            {/* Logo + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#E8322F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif', fontSize: '20px', fontWeight: 900, color: 'white', fontStyle: 'italic', flexShrink: 0 }}>g</div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#0D1117', letterSpacing: '-0.4px', lineHeight: 1.2 }}>{p.previewTitle}</h1>
            </div>

            {/* Video player mock */}
            <div id="review-video" style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #E5E7EB', marginBottom: '16px', background: '#0D1117' }}>
              {/* Video screen */}
              <div style={{ position: 'relative', paddingTop: '56.25%', background: 'linear-gradient(135deg, #1a1c2e 0%, #0d1117 100%)' }}>
                {/* Screen content hint */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '16px solid white', marginLeft: '3px' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{p.totalDuration}</span>
                </div>
              </div>
              {/* Controls */}
              <div style={{ background: '#1a1c2e', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px', color: 'white', cursor: 'pointer' }}>▶</span>
                <div style={{ flex: 1, height: '3px', background: 'rgba(255,255,255,0.15)', borderRadius: '99px', position: 'relative', cursor: 'pointer' }}>
                  <div style={{ width: '28%', height: '100%', background: color, borderRadius: '99px' }} />
                  <div style={{ position: 'absolute', top: '50%', left: '28%', transform: 'translate(-50%,-50%)', width: '9px', height: '9px', borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
                </div>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>0:21 / {p.totalDuration}</span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>⛶</span>
              </div>
            </div>

            {/* Feedback row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'white', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'white', flexShrink: 0 }}>H</div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#111827' }}>Hello </span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>· Just now</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #E5E7EB', background: 'white', fontSize: '11px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>👍 Helpful</button>
                <button style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #E5E7EB', background: 'white', fontSize: '11px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>👎 Not helpful</button>
              </div>
            </div>

            {/* Intro paragraph */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, marginTop: '6px', flexShrink: 0 }} />
              <div>
                <p style={{ margin: '0 0 6px', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{p.previewCaption}</p>
                <span style={{ fontSize: '12px', color: color, fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>Go to {p.previewStepLabel} →</span>
              </div>
            </div>

            {/* Step sections */}
            {p.editorSteps.map((step, i) => (
              <div key={i} id={`review-step-${i}`} style={{ marginBottom: '16px', background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: stepColors[i % stepColors.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800, color: 'white', flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>{step}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', lineHeight: 1.5 }}>{p.stepDescs[i]}</div>
                  </div>
                </div>
                {/* Video content card */}
                <div style={{ margin: '0 12px 12px', borderRadius: '8px', background: '#0D1117', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid rgba(255,255,255,0.5)', marginLeft: '2px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Video content</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{p.stepDurations[i]}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>⛶</div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main prototype ────────────────────────────────────────────────────────────

export default function GuiddeFlowPrototype() {
  const navigate = useNavigate();

  const [personaKey, setPersonaKey]         = useState(null);
  const [phase, setPhase]                   = useState('select');
  const [capturedSteps, setCapturedSteps]   = useState([]);   // array of step label strings
  const [chatMsg, setChatMsg]               = useState(null);
  const [chatState, setChatState]           = useState('idle');
  const [activeStep, setActiveStep]         = useState(0);

  const p = personaKey ? PERSONAS[personaKey] : null;

  const startCapture = (pKey) => {
    setPersonaKey(pKey);
    setCapturedSteps([]);
    setChatMsg(null);
    setChatState('idle');
    setPhase('recording');
  };

  const handlePageClick = () => {
    if (!p) return;
    const nextIdx = capturedSteps.length;
    if (nextIdx < p.captureSequence.length) {
      setCapturedSteps(prev => [...prev, p.captureSequence[nextIdx]]);
    }
  };

  const removeStep = (idx) => {
    setCapturedSteps(prev => prev.filter((_, i) => i !== idx));
  };

  const handleChip = (chip) => {
    if (chatState !== 'idle') return;
    setChatMsg(chip);
    setChatState('typing');
    setTimeout(() => setChatState('done'), 1600);
  };

  const handleReset = () => {
    setPersonaKey(null);
    setPhase('select');
    setCapturedSteps([]);
    setChatMsg(null);
    setChatState('idle');
    setActiveStep(0);
  };

  const phases = ['select', 'recording', 'review', 'editor'];
  const phaseIdx = phases.indexOf(phase);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0C0E1A', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Prototype header ── */}
      <div style={{ height: '46px', background: '#080A14', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 18px', gap: '14px', flexShrink: 0 }}>
        <button onClick={() => navigate('/presentation')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '12px', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px' }}>
          ← Presentation
        </button>
        <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>Guidde Creation Flow — Prototype</span>
        {p && <div style={{ padding: '3px 10px', borderRadius: '99px', background: `${p.color}20`, border: `1px solid ${p.color}40`, fontSize: '11px', fontWeight: 700, color: p.color }}>{p.icon} {p.label}</div>}
        {phase !== 'select' && (
          <button onClick={handleReset} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: '12px', cursor: 'pointer', padding: '5px 12px', borderRadius: '7px' }}>
            Restart →
          </button>
        )}
      </div>

      {/* ── Phase stepper ── */}
      <div style={{ height: '38px', background: '#080A14', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexShrink: 0 }}>
        {['1 · Select output type', '2 · Record with guidance', '3 · Review output', '4 · Edit with AI'].map((label, i) => {
          const isActive = phaseIdx === i;
          const isDone   = phaseIdx > i;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '0 14px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: isDone ? '#34D399' : isActive ? (p?.color || '#4B7BF5') : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 700, color: 'white', flexShrink: 0, transition: 'background 0.35s' }}>
                  {isDone ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 400, color: isActive ? 'rgba(255,255,255,0.9)' : isDone ? '#34D399' : 'rgba(255,255,255,0.3)', transition: 'color 0.35s' }}>{label}</span>
              </div>
              {i < 3 && <div style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.08)' }} />}
            </div>
          );
        })}
      </div>

      {/* ── Full-screen content ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Browser chrome (select + recording only) */}
        {(phase === 'select' || phase === 'recording') && (
          <div style={{ height: '40px', background: '#252836', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '10px', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, background: '#1A1C2A', borderRadius: '7px', height: '24px', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '7px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.38)' }}>
                {personaKey === 'support' ? 'app.acme.com/settings/security' : personaKey === 'sales' ? 'app.acme.com/analytics/revenue' : personaKey === 'marketing' ? 'acme.com/signup' : 'app.acme.com'}
              </span>
            </div>
            {phase === 'recording' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '99px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
                <div className="rec-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#EF4444', letterSpacing: '0.06em' }}>RECORDING</span>
              </div>
            )}
          </div>
        )}

        {/* Page content */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>

          {/* ────── SELECT PHASE ────── */}
          {phase === 'select' && <SelectPhase onStart={startCapture} />}

          {/* ────── RECORDING PHASE ────── */}
          {phase === 'recording' && p && (
            <div style={{ height: '100%', position: 'relative' }} className="flow-fade-in">
              <div
                style={{ position: 'absolute', inset: 0, cursor: capturedSteps.length < p.captureSequence.length ? 'crosshair' : 'default' }}
                onClick={handlePageClick}
              >
                {personaKey === 'support'   && <SettingsPage step={capturedSteps.length} />}
                {personaKey === 'sales'      && <DashboardPage step={capturedSteps.length} />}
                {personaKey === 'marketing'  && <SignupPage step={capturedSteps.length} />}

                {capturedSteps.length === 0 && (
                  <div style={{ position: 'absolute', bottom: '28px', left: '50%', transform: 'translateX(-50%)', padding: '8px 18px', borderRadius: '99px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', fontSize: '12px', color: 'white', fontWeight: 500, pointerEvents: 'none', whiteSpace: 'nowrap' }}>
                    Click anywhere on the page to capture steps
                  </div>
                )}
              </div>
              <GuiddeBar
                capturedSteps={capturedSteps}
                onRemoveStep={removeStep}
                allDone={capturedSteps.length >= p.captureSequence.length}
                onDone={() => { setPhase('review'); setActiveStep(0); }}
              />
            </div>
          )}

          {/* ────── REVIEW PHASE ────── */}
          {phase === 'review' && p && (
            <ReviewPhase p={p} onEdit={() => { setPhase('editor'); setActiveStep(0); }} />
          )}

          {/* ────── EDITOR PHASE ────── */}
          {phase === 'editor' && p && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }} className="flow-fade-in">
              <EditorTopNav p={p} onReset={handleReset} />
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                <EditorIconNav color={p.color} />
                <EditorStepPanel p={p} activeStep={activeStep} setActiveStep={setActiveStep} />
                <EditorCanvas p={p} activeStep={activeStep} chatState={chatState} chatMsg={chatMsg} />
                <EditorAIChat p={p} chatMsg={chatMsg} chatState={chatState} handleChip={handleChip} />
              </div>
              <EditorTimeline p={p} activeStep={activeStep} setActiveStep={setActiveStep} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
