import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Game } from '../types/game'

export const useGames = () => {
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

  return { isLoading, error, games }
}
