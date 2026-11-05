import { useGames } from '../hooks/useGames'

const Games = () => {
  const { isLoading, error, games } = useGames()

  return (
    <div>
      <h1>Welcome to the Games Page</h1>
      {isLoading && <p>Loading games...</p>}
      {error && <p className="error">Could not load games: {error}</p>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {game.title}
            {game.platform}
            {game.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games
