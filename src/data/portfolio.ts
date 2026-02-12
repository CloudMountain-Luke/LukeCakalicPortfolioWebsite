// Import portfolio images - Web Design
import roiHome from '../assets/images/portfolio/web/roi-home.png'
import roiProducts from '../assets/images/portfolio/web/roi-products.png'
import roiCaseStudies from '../assets/images/portfolio/web/roi-case-studies.png'
import maxxgreenHome from '../assets/images/portfolio/web/maxxgreen-home.png'
import maxxgreenProducts from '../assets/images/portfolio/web/maxxgreen-products.png'
import maxxgreenAbout from '../assets/images/portfolio/web/maxxgreen-about.png'
import nextlinkPortal from '../assets/images/portfolio/web/nextlink-portal.png'
import nextlinkSignin from '../assets/images/portfolio/web/nextlink-signin.png'
import nextlinkAccount from '../assets/images/portfolio/web/nextlink-account.png'
import nextlinkPayments from '../assets/images/portfolio/web/nextlink-payments.png'
import avidHome from '../assets/images/portfolio/web/avid-home.png'
import avaHome from '../assets/images/portfolio/web/ava-home.png'

// Import portfolio images - Vehicle Wraps
import summitsTruckAll from '../assets/images/portfolio/vehicles/7summits-truck-all.jpg'
import summitsTruckDriver from '../assets/images/portfolio/vehicles/7summits-truck-driver.jpg'
import summitsTruckPass from '../assets/images/portfolio/vehicles/7summits-truck-pass.jpg'
import remaxWrap1 from '../assets/images/portfolio/vehicles/remax-wrap-1.jpg'
import remaxWrap2 from '../assets/images/portfolio/vehicles/remax-wrap-2.jpg'
import foodtruckSide from '../assets/images/portfolio/vehicles/foodtruck-side.jpg'

// Import portfolio images - Brand Identity (logos Luke designed)
import avidLogo from '../assets/images/portfolio/brand/avid-logo.png'
import avaLogo from '../assets/images/portfolio/brand/ava-logo.png'
import roiLogo from '../assets/images/portfolio/brand/roi-logo.png'
import ironbridgeLogo from '../assets/images/portfolio/brand/ironbridge-logo.png'
import ecoh2oLogo from '../assets/images/portfolio/brand/ecoh2o-logo.png'
import fuelmaxxLogo from '../assets/images/portfolio/brand/fuelmaxx-logo.png'
import ecoboostLogo from '../assets/images/portfolio/brand/ecoboost-logo.png'
import supermaxxLogo from '../assets/images/portfolio/brand/supermaxx-logo.png'
import portal747Logo from '../assets/images/portfolio/brand/portal747-logo.png'
import upscaleforgeLogo from '../assets/images/portfolio/brand/upscaleforge-logo.png'
import emberpicLogo from '../assets/images/portfolio/brand/emberpic-logo.png'
import avidphotoproLogo from '../assets/images/portfolio/brand/avidphotopro-logo.png'

// Import portfolio images - Print & Other
import gnarlyFolder from '../assets/images/portfolio/print/gnarly-folder.png'
import gnarlyCards from '../assets/images/portfolio/print/gnarly-cards.png'
import seicentoPoster from '../assets/images/portfolio/other/seicento-poster.png'

export const categories = [
  'web-design',
  'vehicle-wraps',
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
    description: 'Complete website redesign for a military and aerospace parts supplier. Modern, professional design with comprehensive product catalog and inquiry system.',
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
    description: 'Clean, modern website for a green technology products company. Focused on showcasing eco-friendly products with engaging visuals.',
    images: [maxxgreenHome, maxxgreenProducts, maxxgreenAbout],
    featured: true,
    year: 2024,
    services: ['Web Design', 'E-commerce', 'Product Photography'],
    imageDisplay: 'cover-top',
  },
  {
    id: 'nextlink-portal',
    title: 'Customer Portal UI Design',
    client: 'Nextlink Internet',
    category: 'web-design',
    description: 'User interface design for a customer self-service portal. Intuitive dashboard design for account management, billing, and service requests.',
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
    description: 'Professional website for home inspection services. Clear service presentation with easy scheduling integration.',
    images: [avidHome],
    featured: false,
    year: 2023,
    services: ['Web Design', 'Service Pages', 'Lead Generation'],
    imageDisplay: 'cover-top',
  },
  {
    id: 'ava-inspections',
    title: 'AVA Inspections Website',
    client: 'AVA Inspections',
    category: 'web-design',
    description: 'Modern website design for inspection services company with booking system integration.',
    images: [avaHome],
    featured: false,
    year: 2022,
    services: ['Web Design', 'Booking Integration'],
    imageDisplay: 'cover-top',
  },

  // Vehicle Wraps - SECONDARY
  {
    id: '7-summits-roofing',
    title: '7 Summits Roofing Fleet',
    client: '7 Summits Roofing',
    category: 'vehicle-wraps',
    description: 'Full fleet wrap design for roofing company trucks and vans. Bold, recognizable design for maximum brand visibility on the road.',
    images: [summitsTruckAll, summitsTruckDriver, summitsTruckPass],
    featured: true,
    year: 2024,
    services: ['Vehicle Wrap Design', 'Fleet Graphics', 'Brand Application'],
  },
  {
    id: 'remax-vehicle-wraps',
    title: 'RE/MAX Vehicle Wraps',
    client: 'RE/MAX Agents',
    category: 'vehicle-wraps',
    description: 'Professional vehicle wrap designs for RE/MAX real estate agents. Eye-catching mobile advertising for local markets.',
    images: [remaxWrap1, remaxWrap2],
    featured: false,
    year: 2023,
    services: ['Vehicle Wrap Design', 'Brand Application'],
  },
  {
    id: 'big-ds-foodtruck',
    title: 'Big D\'s Food Truck',
    client: 'Big D\'s Whaling City Fries',
    category: 'vehicle-wraps',
    description: 'Fun, vibrant food truck wrap design that attracts hungry customers and communicates the menu at a glance.',
    images: [foodtruckSide],
    featured: false,
    year: 2023,
    services: ['Vehicle Wrap Design', 'Food Truck Graphics'],
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
