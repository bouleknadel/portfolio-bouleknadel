import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Each HTML entry declares which page it renders via <div id="root" data-page="...">.
// Pages are loaded on demand so the secondary pages don't ship the Three.js hero scene.
const pages = {
  home: () => import('./App.jsx'),
  projects: () => import('./pages/ProjectArchive.jsx'),
  certifications: () => import('./pages/CertificationsPage.jsx'),
}

const root = document.getElementById('root')
const load = pages[root.dataset.page] ?? pages.home

load().then(({ default: Page }) => {
  createRoot(root).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  )
})
