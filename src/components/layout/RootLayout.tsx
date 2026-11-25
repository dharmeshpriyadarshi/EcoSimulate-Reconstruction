import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { navigation, siteConfig } from '../../config/site'

export default function RootLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const previousPath = useRef(pathname)

  useEffect(() => {
    const currentPage = navigation.find((item) => item.path === pathname)

    document.title = `${currentPage?.label ?? 'Page not found'} | ${siteConfig.name}`

    if (previousPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      mainRef.current?.focus({ preventScroll: true })
      previousPath.current = pathname
    }
  }, [pathname])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Header key={pathname} />

      <main
        id="main-content"
        className="site-main"
        ref={mainRef}
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
