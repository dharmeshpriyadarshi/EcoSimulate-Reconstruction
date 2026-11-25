import { useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { navigation, siteConfig } from '../../config/site'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          closeMenu()
          menuButton.current?.focus()
        }
      }}
    >
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <span className="brand-name">
            {siteConfig.name}
            <span className="brand-period" aria-hidden="true">.</span>
          </span>

          <span className="brand-subtitle">
            Environmental Research / Est. 2025
          </span>
        </Link>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary navigation"
          className={`site-nav${menuOpen ? ' is-open' : ''}`}
        >
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `nav-link${isActive ? ' active' : ''}`
              }
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
