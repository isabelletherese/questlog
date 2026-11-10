import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './pages/Root'
import Games from './pages/Games'
import NotFound from './pages/NotFound'
import GameDetails from './pages/GameDetails'
import NewGame from './pages/NewGame'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Games },
      { path: 'games', Component: Games },
      { path: 'games/:id', Component: GameDetails },
      { path: 'games/new', Component: NewGame },
      { path: '*', Component: NotFound },
    ],
  },
])

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
