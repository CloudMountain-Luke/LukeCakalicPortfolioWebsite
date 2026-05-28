// Build-time prerender entry. vite-prerender-plugin calls this once per
// route — `/` plus each `/work/<slug>` — to snapshot the React tree into
// static HTML that gets injected into the matching dist/.../index.html
// before the JS bundle ships.
//
// Real users still load main.tsx → hydrateRoot, which adopts this static
// markup in place. Crawlers and link-preview bots receive the HTML and
// never need to execute JS.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import './index.css'
import { portfolioItems, type PortfolioItem } from './data/portfolio'

const SITE_ORIGIN = 'https://lukecakalic.com'
const SITE_NAME = 'Cakalic Design'
const HOMEPAGE_TITLE = 'Cakalic Design | Luke Cakalic'
const HOMEPAGE_DESCRIPTION =
  'Web Design, UI/UX, Vehicle Wraps, and Branding by Luke Cakalic — based in Colorado.'
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-cover.jpg`

interface PrerenderArgs {
  ssr: true
  url: string
}

interface HeadElement {
  type: string
  props: Record<string, string>
  children?: string
}

interface HeadReturn {
  title: string
  elements: Set<HeadElement>
}

const categoryLabel: Record<PortfolioItem['category'], string> = {
  'saas-products': 'SaaS Product',
  'web-design': 'Web / UI/UX',
  'brand-identity': 'Brand Identity',
}

export async function prerender({ url }: PrerenderArgs) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  // When prerendering the homepage, feed every /work/<slug> URL into the
  // plugin's discovery queue so each one becomes its own static HTML page.
  // (vite.config.ts can't import portfolio.ts because that file imports
  // .jpg/.png assets — Node loads vite.config before Vite's asset handling
  // exists. Returning links from here sidesteps that.)
  const links =
    url === '/' || url === ''
      ? new Set(portfolioItems.map((p) => `/work/${p.id}`))
      : undefined
  return {
    html,
    head: buildHead(url),
    ...(links && { links }),
  }
}

function buildHead(url: string): HeadReturn {
  // /work/<slug>
  const workMatch = url.match(/^\/work\/([^/]+)\/?$/)
  if (workMatch) {
    const slug = workMatch[1]
    const item = portfolioItems.find((p) => p.id === slug)
    if (item) return buildWorkHead(item)
    return buildNotFoundHead(url)
  }
  if (url === '/' || url === '') return buildHomeHead()
  return buildNotFoundHead(url)
}

function buildHomeHead(): HeadReturn {
  return {
    title: HOMEPAGE_TITLE,
    elements: new Set<HeadElement>([
      m('description', HOMEPAGE_DESCRIPTION),
      link({ rel: 'canonical', href: `${SITE_ORIGIN}/` }),
      og('og:type', 'website'),
      og('og:site_name', SITE_NAME),
      og('og:title', HOMEPAGE_TITLE),
      og('og:description', HOMEPAGE_DESCRIPTION),
      og('og:url', `${SITE_ORIGIN}/`),
      og('og:image', DEFAULT_OG_IMAGE),
      og('og:image:width', '1200'),
      og('og:image:height', '630'),
      og('og:image:alt', 'Cakalic Design — portfolio of Luke Cakalic'),
      tw('twitter:card', 'summary_large_image'),
      tw('twitter:title', HOMEPAGE_TITLE),
      tw('twitter:description', HOMEPAGE_DESCRIPTION),
      tw('twitter:image', DEFAULT_OG_IMAGE),
      jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: 'Luke Cakalic',
            url: `${SITE_ORIGIN}/`,
            jobTitle: 'Designer & Developer',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'CO',
              addressCountry: 'US',
            },
          },
          {
            '@type': 'WebSite',
            url: `${SITE_ORIGIN}/`,
            name: SITE_NAME,
            publisher: { '@type': 'Person', name: 'Luke Cakalic' },
          },
        ],
      }),
    ]),
  }
}

function buildWorkHead(item: PortfolioItem): HeadReturn {
  // Only items with caseStudy data are honestly a "case study"; the rest
  // (logos / brand pieces without a writeup) get a plain "Project" suffix.
  const suffix = item.caseStudy ? 'Case Study' : 'Project'
  const title = `${item.title} — ${suffix} | ${SITE_NAME}`
  const description = item.description
  const canonical = `${SITE_ORIGIN}/work/${item.id}`
  // Hashed asset URLs from Vite are already absolute paths beginning with
  // /assets/... — prefix with origin for OG/Twitter consumers that require
  // absolute URLs.
  const heroImg = item.images[0] ?? ''
  const ogImage = heroImg.startsWith('http')
    ? heroImg
    : `${SITE_ORIGIN}${heroImg}`

  return {
    title,
    elements: new Set<HeadElement>([
      m('description', description),
      link({ rel: 'canonical', href: canonical }),
      og('og:type', 'article'),
      og('og:site_name', SITE_NAME),
      og('og:title', `${item.title} | ${SITE_NAME}`),
      og('og:description', description),
      og('og:url', canonical),
      og('og:image', ogImage),
      og('og:image:alt', `${item.title} — ${categoryLabel[item.category]}`),
      tw('twitter:card', 'summary_large_image'),
      tw('twitter:title', `${item.title} | ${SITE_NAME}`),
      tw('twitter:description', description),
      tw('twitter:image', ogImage),
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: item.title,
        description,
        url: canonical,
        image: ogImage,
        creator: {
          '@type': 'Person',
          name: 'Luke Cakalic',
          url: `${SITE_ORIGIN}/`,
        },
        about: categoryLabel[item.category],
        ...(item.year && { dateCreated: String(item.year) }),
        ...(item.client && { sourceOrganization: { '@type': 'Organization', name: item.client } }),
      }),
    ]),
  }
}

function buildNotFoundHead(url: string): HeadReturn {
  return {
    title: `Not Found | ${SITE_NAME}`,
    elements: new Set<HeadElement>([
      m('description', 'The page you tried to reach is not in the portfolio.'),
      m('robots', 'noindex'),
      link({ rel: 'canonical', href: `${SITE_ORIGIN}${url}` }),
    ]),
  }
}

// ---- tiny meta-tag builders ----
function m(name: string, content: string): HeadElement {
  return { type: 'meta', props: { name, content } }
}
function og(property: string, content: string): HeadElement {
  return { type: 'meta', props: { property, content } }
}
function tw(name: string, content: string): HeadElement {
  return { type: 'meta', props: { name, content } }
}
function link(props: Record<string, string>): HeadElement {
  return { type: 'link', props }
}
function jsonLd(payload: object): HeadElement {
  return {
    type: 'script',
    props: { type: 'application/ld+json' },
    children: JSON.stringify(payload),
  }
}
