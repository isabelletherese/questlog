import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className="flex min-h-[50vh] flex-col mt-20 gap-4 text-center text-text-primary">
      <h1>404 - Page Not Found</h1>
      <Link to="/" className="text-accent hover:underline">
        Back to Games
      </Link>
    </div>
  )
}

export default NotFound
