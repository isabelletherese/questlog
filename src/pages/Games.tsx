import { useState, useEffect } from 'react'
import type { Game } from '../types/game'
import { API_URL } from '../config'

const Games = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(API_URL + '/games')
        const data = await response.json()

        if (!response.ok) {
          setError(data.message ?? 'Something went wrong')
          return
        }
        setGames(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown Error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchGames()
  }, [])

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
