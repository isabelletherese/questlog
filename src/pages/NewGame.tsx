import { useState, type SubmitEvent } from 'react'
import { useSaveGame } from '../hooks/useGames'
import type { Status } from '../types/status'

const inputStyle =
  'w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'

const NewGamePage = () => {
  const { isSaving, error, addGame } = useSaveGame()
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('')
  const [status, setStatus] = useState<Status>('want')

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    addGame({ title, platform, status })
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">New Game</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 rounded-xl border border-gray-800 bg-gray-900 p-6">
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm text-gray-400">
            Title
          </label>
          <input
            id="title"
            className={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="platform" className="text-sm text-gray-400">
            Platform
          </label>
          <input
            id="platform"
            className={inputStyle}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm text-gray-400">
            Status
          </label>
          <select
            id="status"
            className={inputStyle}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="want">Want to play</option>
            <option value="playing">Playing</option>
            <option value="completed">Completed</option>
            <option value="dropped">Dropped</option>
          </select>
        </div>

        <button
          disabled={isSaving}
          className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
          {isSaving ? 'Saving...' : 'Add Game'}
        </button>

        {error && <p className="text-red-400">Could not save game: {error}</p>}
      </form>
    </div>
  )
}

export default NewGamePage
