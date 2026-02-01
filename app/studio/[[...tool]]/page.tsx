import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Sanity Studio | Anil Varma SEO Portfolio',
  description: 'Content management for Anil Varma SEO Portfolio',
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
