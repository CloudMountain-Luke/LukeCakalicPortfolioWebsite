// Import portfolio images - Web Design
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


// Import portfolio images - Brand Identity (logos Luke designed)
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

// Import portfolio images - Print & Other
import gnarlyFolder from '../assets/images/portfolio/print/gnarly-folder.jpg'
import gnarlyCards from '../assets/images/portfolio/print/gnarly-cards.jpg'
import seicentoPoster from '../assets/images/portfolio/other/seicento-poster.jpg'

export const categories = [
  'web-design',
  'brand-identity',
  'print-marketing',
  'specialized',
] as const

export type Category = typeof categories[number]

export type ImageDisplay = 'cover' | 'cover-top' | 'contain'

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
}

export const portfolioItems: PortfolioItem[] = [
  // Web Design / UI/UX - PRIMARY
  {
    id: 'roi-global-tech',
    title: 'ROI Global Tech Website',
    client: 'ROI Global Technologies',
    category: 'web-design',
    description: 'Full website redesign for a military and aerospace parts supplier. Led UX strategy, information architecture, and responsive UI design for product catalog and inquiry system.',
    images: [roiHome, roiProducts, roiCaseStudies],
    featured: true,
    year: 2024,
    services: ['Web Design', 'UI/UX', 'Responsive Design'],
    imageDisplay: 'cover-top',
  },
  {
    id: 'maxxgreen-technologies',
    title: 'MAXXGreen Technologies',
    client: 'MAXXGreen Technologies',
    category: 'web-design',
    description: 'End-to-end web design for a green technology products company. Designed user flows, product pages, and e-commerce experience optimized for conversion.',
    images: [maxxgreenHome, maxxgreenProducts, maxxgreenAbout],
    featured: true,
    year: 2024,
    services: ['Web Design', 'UI/UX', 'E-commerce'],
    imageDisplay: 'cover-top',
  },
  {
    id: 'nextlink-portal',
    title: 'Customer Portal UI Design',
    client: 'Nextlink Internet',
    category: 'web-design',
    description: 'UI/UX design for a customer self-service portal. Created intuitive dashboard with account management, billing, and service request flows. Designed wireframes through high-fidelity mockups.',
    images: [nextlinkPortal, nextlinkSignin, nextlinkAccount, nextlinkPayments],
    featured: true,
    year: 2023,
    services: ['UI/UX Design', 'Dashboard Design', 'Prototyping'],
    imageDisplay: 'cover-top',
  },
  {
    id: 'avid-inspection',
    title: 'AVID Inspection Specialists',
    client: 'AVID Inspection Specialists',
    category: 'web-design',
    description: 'Website design for home inspection services. Clear service presentation with scheduling integration and lead generation UX.',
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
    description: 'Website design for inspection services company with booking system integration and mobile-first responsive layout.',
    images: [avaHome],
    featured: false,
    year: 2022,
    services: ['Web Design', 'UI/UX', 'Booking Integration'],
    imageDisplay: 'cover-top',
  },


  // Brand Identity - Logos Luke designed
  {
    id: 'maxxgreen-brand',
    title: 'MAXXGreen Product Brand System',
    client: 'MAXXGreen Technologies',
    category: 'brand-identity',
    description: 'Complete product brand family for MAXXGreen Technologies including EcoH2O, FuelMAXX, EcoBoost, and SuperMAXX sub-brands. Cohesive identity system across the product line.',
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
    description: 'Professional logo design for military and aerospace parts supplier. Clean, authoritative mark.',
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
    description: 'Strong industrial brand identity for a manufacturing and trading company.',
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
    description: 'Professional logo for home inspection services company. Clean, trustworthy design.',
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
    description: 'Modern logo design for inspection services company.',
    images: [avaLogo],
    featured: false,
    year: 2022,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
  },
  {
    id: 'upscale-forge',
    title: 'Upscale Forge Logo',
    client: 'Upscale Forge',
    category: 'brand-identity',
    description: 'Brand identity for a SaaS AI image upscaling platform. Modern tech aesthetic.',
    images: [upscaleforgeLogo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity', 'SaaS Branding'],
    imageDisplay: 'contain',
  },
  {
    id: 'portal747',
    title: 'Portal747 Logo',
    client: 'Portal747',
    category: 'brand-identity',
    description: 'Logo design for a web portal platform.',
    images: [portal747Logo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
  },
  {
    id: 'emberpic',
    title: 'EmberPic Logo',
    client: 'EmberPic',
    category: 'brand-identity',
    description: 'Brand identity for a photo enhancement platform. Warm, creative mark.',
    images: [emberpicLogo],
    featured: false,
    year: 2024,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
  },
  {
    id: 'avid-photo-pro',
    title: 'AVID Photo Pro Logo',
    client: 'AVID Photo Pro',
    category: 'brand-identity',
    description: 'Professional logo for photography services brand.',
    images: [avidphotoproLogo],
    featured: false,
    year: 2023,
    services: ['Logo Design', 'Brand Identity'],
    imageDisplay: 'contain',
  },

  // Print Marketing
  {
    id: 'gnarly-fm',
    title: 'Gnarly 101.3 FM Branding',
    client: 'Gnarly 101.3 FM',
    category: 'print-marketing',
    description: 'Complete brand identity and marketing package for radio station including presentation folders, business cards, and promotional materials.',
    images: [gnarlyFolder, gnarlyCards],
    featured: false,
    year: 2022,
    services: ['Brand Identity', 'Print Design', 'Marketing Materials'],
    imageDisplay: 'contain',
  },

  // Specialized
  {
    id: 'seicento-baroque',
    title: 'Concert Promotional Materials',
    client: 'Seicento Baroque Ensemble',
    category: 'specialized',
    description: 'Concert posters and promotional materials for classical music performances. Elegant designs that capture the baroque spirit.',
    images: [seicentoPoster],
    featured: false,
    year: 2022,
    services: ['Poster Design', 'Print Design', 'Concert Materials'],
    imageDisplay: 'contain',
  },
]
