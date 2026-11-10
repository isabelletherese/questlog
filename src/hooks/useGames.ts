import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import type { Game, GameInput } from '../types/game'
import type { Status } from '../types/status'
import { useNavigate } from 'react-router'

export const useGames = (status: Status | null) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true)
      setError('')

      try {
        const url =
          status !== null
            ? `${API_URL}/games?status=${status}`
            : `${API_URL}/games`

        const response = await fetch(url)
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
  }, [status])

  return { isLoading, error, games }
}

export const useGame = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if (!id) {
      return
    }
    const fetchGame = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(`${API_URL}/games/${id}`)
        const data = await response.json()

        if (!response.ok) {
          setError(data.message ?? 'Something went wrong')
          setIsLoading(false)
          return
        }

        setGame(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown Error')
      } finally {
        setIsLoading(false)
      }
    }
    fetchGame()
  }, [id])

  return { isLoading, error, game }
}

export const useSaveGame = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const addGame = async (newGame: GameInput) => {
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.message ?? 'Something went wrong')
        return
      }
      navigate(`/games/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown Error')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteGame = async (id: string) => {
    setIsSaving(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/games/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message ?? 'Something went wrong')
        return
      }

      navigate(`/games`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown Error')
    } finally {
      setIsSaving(false)
    }
  }
  return { isSaving, error, addGame, deleteGame }
}
