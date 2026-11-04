import { Link, NavLink, Outlet } from 'react-router'

const Root = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Placeholder for logotype</Link>
          <NavLink to="/games">Games</NavLink>
          <NavLink to="/games/new">+ New Game</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>{new Date().getFullYear()} © All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Root
