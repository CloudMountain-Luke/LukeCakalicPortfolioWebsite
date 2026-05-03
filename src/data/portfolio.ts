// Portfolio images - Web Design
import maxxgreenHome from '../assets/images/portfolio/web/maxxgreen-home.jpg'
import maxxgreenProducts from '../assets/images/portfolio/web/maxxgreen-products.jpg'
import maxxgreenAbout from '../assets/images/portfolio/web/maxxgreen-about.jpg'
import avidHome from '../assets/images/portfolio/web/avid-home.jpg'
import avaHome from '../assets/images/portfolio/web/ava-home.jpg'
import portal747Home from '../assets/images/portfolio/web/portal747-home.png'
import upscaleforgeHome from '../assets/images/portfolio/web/upscaleforge-home.png'
import goinspectHome from '../assets/images/portfolio/web/goinspect-home.png'

// Portfolio images - Brand Identity (logos for SaaS / web / digital products)
import avidLogo from '../assets/images/portfolio/brand/avid-logo.png'
import avaLogo from '../assets/images/portfolio/brand/ava-logo.png'
import ironbridgeLogo from '../assets/images/portfolio/brand/ironbridge-logo-dark.webp'
import ecoh2oLogo from '../assets/images/portfolio/brand/ecoh2o-logo.png'
import fuelmaxxLogo from '../assets/images/portfolio/brand/fuelmaxx-logo.png'
import ecoboostLogo from '../assets/images/portfolio/brand/ecoboost-logo.png'
import supermaxxLogo from '../assets/images/portfolio/brand/supermaxx-logo.png'
import portal747Logo from '../assets/images/portfolio/brand/portal747-logo-dark.png'
import upscaleforgeLogo from '../assets/images/portfolio/brand/upscaleforge-logo-transparent.png'
import goinspectLogo from '../assets/images/portfolio/brand/goinspect-logo.png'

export const categories = [
  'saas-products',
  'web-design',
  'brand-identity',
] as const

export type Category = typeof categories[number]

export type ImageDisplay = 'cover' | 'cover-top' | 'contain'

export interface CaseStudy {
  problem: string
  approach: string
  process: string[]
  outcomes: string
  status?: 'pre-launch' | 'closed-beta' | 'live' | 'shipped'
}

export interface PortfolioItem {
  id: string
  title: string
  client: string
  category: Category
  description: string
  images: string[]
  featured: boolean
  year?: number
  services?: string[]
  imageDisplay?: ImageDisplay
  caseStudy?: CaseStudy
  link?: string
  // For logos designed for light backgrounds (e.g. dark text on transparent
  // PNG). Renders the card / lightbox image area on white so the logo's
  // dark elements stay readable.
  lightCardBg?: boolean
  // Pin a maximum on-card / in-lightbox width for logos that need to read
  // smaller than the default contain fit (e.g. dense PNGs without baked-in
  // transparent margin). Use a CSS length string like '150px'.
  imageMaxWidth?: string
}

export const portfolioItems: PortfolioItem[] = [
  // ============================================
  // SaaS Products (Cloud Mountain Graphics R&D)
  // ============================================
  {
    id: 'portal747',
    title: 'Portal747',
    client: 'Cloud Mountain Graphics R&D',
    category: 'saas-products',
    description:
      'AI Business-in-a-Box. A 23-agent build pipeline that takes a single prompt and produces a full brand and marketing site, copy, image set, video shots, and social posts. Pre-launch.',
    images: [portal747Home],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'AI Agent Systems', 'Brand Systems'],
    imageDisplay: 'cover-top',
    caseStudy: {
      status: 'pre-launch',
      problem:
        'Founders pay agencies tens of thousands and wait eight weeks for a brand and marketing site, or DIY with templates and look like everyone else. The middle ground is missing.',
      approach:
        'An AI agent system that does what a creative agency does, in 30 minutes. Brand-mood research grounds every later step. Copy strategy, image direction, video shots, social posts, and a deployed site all flow from one prompt.',
      process: [
        '23 specialized agents organized into six phases.',
        'Brand-mood research locked first, before any media generation fires.',
        'Cinematographer agent owns the shot list and lens vocabulary.',
        'Prompt-engineer agent quality-checks every prompt before it spends compute.',
        'Producer agent reconciles output across image, video, and social channels.',
        'Cross-provider routing for image and video generation across Replicate and fal.ai.',
      ],
      outcomes:
        'Working pipeline, pre-launch. Biggest design challenge was brand-mood drift: agents would hallucinate aesthetic mid-build. Fix was a beat-keyed subject catalog with cinematography pinned separately from subject vocabulary. Major lesson: AI agent systems need the same production discipline as print preflight, or they spend money producing the wrong thing.',
    },
  },
  {
    id: 'upscale-forge',
    title: 'Upscale Forge',
    client: 'Cloud Mountain Graphics R&D',
    category: 'saas-products',
    description:
      'AI image and video creative suite. Tiered subscription with browser-side ESRGAN for the free tier and a server-side pipeline for higher resolutions and AI generation. Pre-launch.',
    images: [upscaleforgeHome],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'Stripe Subscriptions', 'AI Tooling'],
    imageDisplay: 'cover-top',
    caseStudy: {
      status: 'pre-launch',
      problem:
        'Image upscaling tools split between free and bad (browser-only quality cap) and expensive locked subscriptions on third-party servers. Photographers want both: high quality and control over their files.',
      approach:
        'Tiered subscription with a generous free tier (TensorFlow.js + ESRGAN in a Web Worker, runs entirely in the browser, zero server cost) and progressive paid tiers (server-side Replicate pipeline for higher resolutions and AI generation features).',
      process: [
        'Free-tier upscaling runs in a Web Worker so the UI never freezes.',
        'WebGL via OffscreenCanvas for GPU acceleration when available.',
        'Server pipeline for paid tiers: tile, upscale, stitch, denoise, face-enhance.',
        'Stripe Checkout, billing portal, webhook tier mapping all wired end-to-end.',
        'Multi-domain detection so the same codebase serves Upscale Forge and Portal747.',
      ],
      outcomes:
        'Engineering complete, pre-launch. Lessons on tier design: fragmenting the value proposition (image upscale, video upscale, image gen, video gen) made pricing confusing. Resolved by bundling into clear creative-suite tiers with credits, rather than feature-by-feature add-ons.',
    },
  },
  {
    id: 'goinspect-ai',
    title: 'GoInspect.ai',
    client: 'Cloud Mountain Graphics R&D',
    category: 'saas-products',
    description:
      'Vertical SaaS for home inspectors. AI-native report builder trained on industry vocabulary. 14-day free trial, four subscription tiers, three credit packs. Heading into closed beta with field testers this month.',
    images: [goinspectHome],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'Vertical SaaS', 'AI Training'],
    imageDisplay: 'cover-top',
    caseStudy: {
      status: 'closed-beta',
      problem:
        'Home inspectors spend half their billable hours writing reports. Existing tools (Spectora, ICA) require either steep learning curves or rigid templates that fight the inspector\'s voice and habits.',
      approach:
        'AI-native report builder trained on actual inspector vocabulary from 826 industry transcripts. Free trial up front, tiered subscriptions for active inspectors, credit packs for occasional users.',
      process: [
        '826 transcripts ingested for training (InterNACHI, Spectora, ICA, ASHI sources).',
        '21 database migrations, 24 edge functions, 18 frontend modules.',
        'Two beta testers (working home inspectors) in the loop from day one.',
        'Stripe checkout flow with tier-aware webhook handling.',
      ],
      outcomes:
        'Closed beta starting this month with first real-world inspection. Lessons: vertical SaaS UX is much easier when you have real users in the room from day one. Cost-of-AI question is constant and led to careful tier design with credits instead of unlimited usage.',
    },
  },

  // ============================================
  // Web Design / UI/UX (client work)
  // ============================================
  {
    id: 'maxxgreen-technologies',
    title: 'MAXXGreen Technologies',
    client: 'MAXXGreen Technologies',
    category: 'web-design',
    description:
      'End-to-end web design for a green technology products company with a family of sub-brands. Designed user flows, product pages, and e-commerce experience optimized for conversion.',
    images: [maxxgreenHome, maxxgreenProducts, maxxgreenAbout],
    featured: true,
    year: 2024,
    services: ['Web Design', 'UI/UX', 'E-commerce', 'Brand System'],
    imageDisplay: 'cover-top',
    caseStudy: {
      status: 'shipped',
      problem:
        'Green tech company with a family of sub-brands (EcoH2O, FuelMAXX, EcoBoost, SuperMAXX) needed one site that did not dilute each brand\'s identity but unified them under the parent.',
      approach:
        'Cohesive product brand system with shared design language and per-product accents. E-commerce flow tuned for conversion across the full sub-brand catalog.',
      process: [
        'Brand audit of each sub-brand to extract shared and distinctive elements.',
        'Identity system design at the parent level with per-product variants.',
        'Product page templates that scale across the catalog without loss of identity.',
        'Conversion-focused checkout flow.',
      ],
      outcomes:
        'Site launched. Sub-brand product pages convert across the catalog. The unified system means new product additions slot in without redesign.',
    },
  },
  {
    id: 'avid-inspection',
    title: 'AVID Inspection Specialists',
    client: 'AVID Inspection Specialists',
    category: 'web-design',
    description:
      'Website design for home inspection services. Clear service presentation with scheduling integration and lead-generation UX.',
    images: [avidHome],
    featured: false,
    year: 2023,
    services: ['Web Design', 'UI/UX', 'Lead Generation'],
    imageDisplay: 'cover-top',
  },
  {
    id: 'ava-inspections',
    title: 'AVA Inspections Website',
    client: 'AVA Inspections',
    category: 'web-design',
    description:
      'Website design for inspection services with booking system integration and mobile-first responsive layout.',
    images: [avaHome],
    featured: false,
    year: 2022,
    services: ['Web Design', 'UI/UX', 'Booking Integration'],
    imageDisplay: 'cover-top',
  },

  // ============================================
  // Brand Identity (web / SaaS / digital products)
  // ============================================
  {
    id: 'maxxgreen-brand',
    title: 'MAXXGreen Product Brand System',
    client: 'MAXXGreen Technologies',
    category: 'brand-identity',
    description:
      'Complete product brand family for MAXXGreen Technologies including EcoH2O, FuelMAXX, EcoBoost, and SuperMAXX sub-brands. Cohesive identity system across the product line.',
    images: [ecoh2oLogo, fuelmaxxLogo, ecoboostLogo, supermaxxLogo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand System', 'Product Branding'],
    imageDisplay: 'contain',
  },
  {
    id: 'iron-bridge',
    title: 'Iron Bridge Manufacturing',
    client: 'Iron Bridge Manufacturing & Trading',
    category: 'brand-identity',
    description: 'Industrial brand identity for a manufacturing and trading company.',
    images: [ironbridgeLogo],
    featured: false,
    year: 2023,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
  },
  {
    id: 'avid-brand',
    title: 'AVID Inspection Specialists Logo',
    client: 'AVID Inspection Specialists',
    category: 'brand-identity',
    description: 'Trustworthy logo for a home inspection services company.',
    images: [avidLogo],
    featured: false,
    year: 2023,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
    // Logo's "INSPECTION SPECIALISTS" subtitle is dark grey on transparent
    // bg, so it disappears on the default dark card. Show on white.
    lightCardBg: true,
  },
  {
    id: 'ava-brand',
    title: 'AVA Inspections Logo',
    client: 'AVA Inspections',
    category: 'brand-identity',
    description: 'Modern logo for an inspection services company.',
    images: [avaLogo],
    featured: false,
    year: 2022,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
    imageMaxWidth: '60%',
  },
  {
    id: 'upscale-forge-brand',
    title: 'Upscale Forge Logo',
    client: 'Upscale Forge',
    category: 'brand-identity',
    description: 'Brand identity for a SaaS AI image upscaling and generation platform.',
    images: [upscaleforgeLogo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity', 'SaaS Branding'],
    imageDisplay: 'contain',
  },
  {
    id: 'portal747-brand',
    title: 'Portal747 Logo',
    client: 'Portal747',
    category: 'brand-identity',
    description: 'Logo and brand mark for an AI build pipeline platform.',
    images: [portal747Logo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity', 'SaaS Branding'],
    imageDisplay: 'contain',
  },
  {
    id: 'goinspect-brand',
    title: 'GoInspect.ai Logo',
    client: 'GoInspect.ai',
    category: 'brand-identity',
    description: 'Logo and brand mark for a vertical SaaS for home inspectors.',
    images: [goinspectLogo],
    featured: false,
    year: 2025,
    services: ['Logo Design', 'Brand Identity', 'SaaS Branding'],
    imageDisplay: 'contain',
    imageMaxWidth: '60%',
  },
]
