import { useState, type SubmitEvent } from 'react'
import type { Status } from '../types/status'
import type { GameInput } from '../types/game'

type GameFormProps = {
  initialInputs: GameInput
  onSubmit: (input: GameInput) => void
  isSaving: boolean
  error: string
  submitLabel: string
}

const inputStyle =
  'w-full rounded-lg border border-text-primary/10 bg-bg/60 px-3 py-2 text-text-primary placeholder-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent'

const labelStyle = 'text-sm text-text-secondary'

const GameForm = ({
  initialInputs,
  onSubmit,
  isSaving,
  error,
  submitLabel,
}: GameFormProps) => {
  const [title, setTitle] = useState(initialInputs.title)
  const [platform, setPlatform] = useState(initialInputs.platform)
  const [status, setStatus] = useState<Status>(initialInputs.status)

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit({ title, platform, status })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-text-primary/10 bg-surface/90 p-6 shadow-lg shadow-black/20">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelStyle}>
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
        <label htmlFor="platform" className={labelStyle}>
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
        <label htmlFor="status" className={labelStyle}>
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
        className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-sidebar transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
        {isSaving ? 'Saving...' : submitLabel}
      </button>

      {error && <p className="text-dropped">Could not save game: {error}</p>}
    </form>
  )
}

export default GameForm
