// Portfolio images - Web Design
import roiHome from '../assets/images/portfolio/web/roi-home.jpg'
import roiProducts from '../assets/images/portfolio/web/roi-products.jpg'
import roiCaseStudies from '../assets/images/portfolio/web/roi-case-studies.jpg'
import maxxgreenHome from '../assets/images/portfolio/web/maxxgreen-home.jpg'
import maxxgreenProducts from '../assets/images/portfolio/web/maxxgreen-products.jpg'
import maxxgreenAbout from '../assets/images/portfolio/web/maxxgreen-about.jpg'
import nextlinkPortal from '../assets/images/portfolio/web/nextlink-portal.jpg'
import nextlinkSignin from '../assets/images/portfolio/web/nextlink-signin.jpg'
import nextlinkAccount from '../assets/images/portfolio/web/nextlink-account.jpg'
import nextlinkPayments from '../assets/images/portfolio/web/nextlink-payments.jpg'
import avidHome from '../assets/images/portfolio/web/avid-home.jpg'
import avaHome from '../assets/images/portfolio/web/ava-home.jpg'

// Portfolio images - Brand Identity (logos for SaaS / web / digital products)
import avidLogo from '../assets/images/portfolio/brand/avid-logo.png'
import avaLogo from '../assets/images/portfolio/brand/ava-logo.png'
import roiLogo from '../assets/images/portfolio/brand/roi-logo.png'
import ironbridgeLogo from '../assets/images/portfolio/brand/ironbridge-logo.jpg'
import ecoh2oLogo from '../assets/images/portfolio/brand/ecoh2o-logo.png'
import fuelmaxxLogo from '../assets/images/portfolio/brand/fuelmaxx-logo.png'
import ecoboostLogo from '../assets/images/portfolio/brand/ecoboost-logo.png'
import supermaxxLogo from '../assets/images/portfolio/brand/supermaxx-logo.png'
import portal747Logo from '../assets/images/portfolio/brand/portal747-logo.png'
import upscaleforgeLogo from '../assets/images/portfolio/brand/upscaleforge-logo.png'
import emberpicLogo from '../assets/images/portfolio/brand/emberpic-logo.png'
import avidphotoproLogo from '../assets/images/portfolio/brand/avidphotopro-logo.jpg'

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
    images: [portal747Logo],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'AI Agent Systems', 'Brand Systems'],
    imageDisplay: 'contain',
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
    images: [upscaleforgeLogo],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'Stripe Subscriptions', 'AI Tooling'],
    imageDisplay: 'contain',
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
    images: [avidLogo],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'Vertical SaaS', 'AI Training'],
    imageDisplay: 'contain',
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
  {
    id: 'cuberift',
    title: 'CubeRift',
    client: 'Cloud Mountain Graphics R&D',
    category: 'saas-products',
    description:
      'A 3D web experience engine that converts any 2D website into a navigable 3D space. Each page section becomes a six-sided cube the visitor moves through. Live on this site.',
    images: [portal747Logo],
    featured: true,
    year: 2025,
    services: ['3D Web', 'Design Engineering', 'WebGL', 'WebXR'],
    imageDisplay: 'contain',
    caseStudy: {
      status: 'live',
      problem:
        'Every website is a 2D scroll. Some content rewards spatial exploration (portfolios, products, narratives, stores) but no easy way to get there without a proprietary 3D engine.',
      approach:
        'Convert any 2D site into a navigable 3D space, with each page section becoming a 6-sided cube. Two modes per site: classic 2D and CubeRift 3D. Toggle between them.',
      process: [
        'Dual-renderer architecture: Three.js for the world, CSS3D for interactive DOM panels.',
        'Desktop orbit and FPS modes, mobile virtual joystick, WebXR for AR/VR.',
        'Cubes connect in all six directions plus arbitrary angles.',
        'Each cube has an invisible 3D grid; elements positioned by semantic depth (buttons foreground, paragraphs middle, images background).',
      ],
      outcomes:
        'Live, used in production on this portfolio (the 3D Gallery view). Lessons on dual-render: the boundary between WebGL world and CSS3D DOM is the hardest part. Camera-coordinated state has to flow both ways. Productizing as embed and platform plugins (WordPress, Shopify) in progress.',
    },
  },
  {
    id: 'cutbench',
    title: 'CutBench',
    client: 'Cloud Mountain Graphics R&D',
    category: 'saas-products',
    description:
      'Unified creative editor that mixes still composition (Konva), whiteboard (tldraw), animation overlays, and AI tool integration on a single canvas. Multi-platform export pipeline. Pre-launch.',
    images: [emberpicLogo],
    featured: true,
    year: 2025,
    services: ['Product Design', 'Design Engineering', 'Canvas / WebGL', 'AI Integration'],
    imageDisplay: 'contain',
    caseStudy: {
      status: 'pre-launch',
      problem:
        'Creative editors are split across tools: Photoshop for stills, Premiere for video, Figma or Miro for canvas, After Effects for animation. AI workflows want them unified so agents can drive the editor programmatically.',
      approach:
        'Single canvas mixing Konva (stills) and tldraw (whiteboard), with animation overlays on top and AI tool integration through a programmatic Tool API. Multi-platform export takes one composition and fans it out to platform-correct dimensions.',
      process: [
        '10-phase build plan, all phases shipped through Phase 7B.',
        'FFmpeg filter graphs for the multiplatform export side.',
        'Tool API layer so AI agents can drive the editor programmatically.',
        'Animation system uses percent-based positioning so output adapts to any aspect ratio.',
      ],
      outcomes:
        'Pre-launch. Phase 7B (multiplatform export via FFmpeg filter graphs) completed 2026-05-01. Lessons: the AI-driven creative editor category is wide open, but the hard part is making the canvas state machine deterministic enough that agents can reason about it.',
    },
  },

  // ============================================
  // Web Design / UI/UX (client work)
  // ============================================
  {
    id: 'roi-global-tech',
    title: 'ROI Global Tech Website',
    client: 'ROI Global Technologies',
    category: 'web-design',
    description:
      'Full website redesign for a military and aerospace parts supplier. Led UX strategy, information architecture, and responsive UI design for product catalog and inquiry system.',
    images: [roiHome, roiProducts, roiCaseStudies],
    featured: true,
    year: 2024,
    services: ['Web Design', 'UI/UX', 'Information Architecture', 'Responsive Design'],
    imageDisplay: 'cover-top',
    caseStudy: {
      status: 'shipped',
      problem:
        'A military and aerospace parts supplier needed a website that worked as both catalog and inquiry-generation engine. Complex SKUs, technical buyers, B2B audience that does not tolerate friction.',
      approach:
        'Information architecture redesign putting product taxonomy and inquiry flow up front. Authoritative visual brand to match the audience.',
      process: [
        'User research interviews with the sales team to map common buyer questions.',
        'IA documentation and sitemap before any visual design.',
        'Wireframes through high-fidelity prototypes in Figma.',
        'Responsive build with attention to fast load on industrial networks.',
      ],
      outcomes:
        'Site shipped. Sales team uses it as their pitch tool inside customer calls. Inquiry volume up. Cleanest test of the production-grade process delivered to a client.',
    },
  },
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
    id: 'nextlink-portal',
    title: 'Customer Portal UI Design',
    client: 'Nextlink Internet',
    category: 'web-design',
    description:
      'UI/UX design for an ISP customer self-service portal. Created intuitive dashboard with account management, billing, and service request flows. Wireframes through high-fidelity mockups.',
    images: [nextlinkPortal, nextlinkSignin, nextlinkAccount, nextlinkPayments],
    featured: true,
    year: 2023,
    services: ['UI/UX Design', 'Dashboard Design', 'Prototyping', 'Agile / Scrum'],
    imageDisplay: 'cover-top',
    caseStudy: {
      status: 'shipped',
      problem:
        'ISP customers needed self-service for billing, plan changes, and support, but the legacy portal forced too many calls into the support center on tasks that should have been one-click.',
      approach:
        'Redesign with clear primary tasks at the top of the dashboard, reduced step counts on common actions, mobile-first responsive layout.',
      process: [
        'User research interviews with current customers.',
        'Wireframes through high-fidelity Figma mockups.',
        'Stakeholder presentations and iterative refinement with product, engineering, and support.',
        'Handoff to dev team with a documented design system.',
      ],
      outcomes:
        'Designs delivered and implemented by the Nextlink dev team. Reduced support call volume on common self-service tasks. Reference project for Agile-team UX delivery.',
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
    id: 'roi-global-brand',
    title: 'ROI Global Technologies Logo',
    client: 'ROI Global Technologies',
    category: 'brand-identity',
    description:
      'Authoritative logo design for a military and aerospace parts supplier. Clean, technical mark that pairs with the catalog site.',
    images: [roiLogo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity'],
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
    id: 'emberpic',
    title: 'EmberPic Logo',
    client: 'EmberPic',
    category: 'brand-identity',
    description: 'Brand identity for a photo enhancement platform.',
    images: [emberpicLogo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity', 'SaaS Branding'],
    imageDisplay: 'contain',
  },
  {
    id: 'avid-photo-pro',
    title: 'AVID Photo Pro Logo',
    client: 'AVID Photo Pro',
    category: 'brand-identity',
    description: 'Logo for a photography services brand.',
    images: [avidphotoproLogo],
    featured: false,
    year: 2023,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
  },
]
