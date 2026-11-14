import { useState } from 'react'
import { Outlet } from 'react-router'
import { Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import castleBackground from '../assets/castle.webp'

const Root = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="flex min-h-screen text-text-primary"
      style={{
        backgroundColor: 'var(--color-bg)',
        backgroundImage: `linear-gradient(rgba(23, 21, 25, 0.65), rgba(23, 21, 25, 0.85)), url(${castleBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-text-primary/10 bg-sidebar/80 px-4 py-3 lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="text-text-primary">
            <Menu size={28} />
          </button>
          <span className="font-heading text-xl font-semibold">
            Game Library
          </span>
        </header>

        <main className="flex-1 px-6 py-8 md:px-10 lg:px-12">
          <Outlet />
        </main>

        <footer className="border-t border-text-primary/10 px-10 py-5 text-center text-sm text-text-muted">
          {new Date().getFullYear()} © All rights reserved.
        </footer>
      </div>
    </div>
  )
}

export default Root
