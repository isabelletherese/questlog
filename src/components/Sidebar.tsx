import { Link, NavLink } from 'react-router'
import { Gamepad2, X } from 'lucide-react'
import { useEffect } from 'react'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-xl px-4 py-3 transition ${
    isActive
      ? 'bg-surface-hover text-accent'
      : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
  }`

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-text-primary/10 bg-sidebar/95 px-5 py-8 transition-transform md:static md:translate-x-0 md:bg-sidebar/30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="absolute right-4 top-4 text-text-secondary md:hidden">
          <X size={24} />
        </button>

        <Link
          to="/"
          onClick={onClose}
          className="mb-16 flex flex-col items-center gap-3">
          <Gamepad2 size={64} strokeWidth={1.5} className="text-accent" />
          <span className="font-heading text-2xl font-semibold">
            Game Library
          </span>
        </Link>

        <nav className="flex flex-col gap-3">
          <NavLink to="/" end onClick={onClose} className={navLinkClass}>
            My Games
          </NavLink>
          <NavLink to="/games/new" onClick={onClose} className={navLinkClass}>
            + Add new game
          </NavLink>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
