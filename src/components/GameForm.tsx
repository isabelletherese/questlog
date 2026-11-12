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

const Required = () => <span className="text-error"> *</span>

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
  const [rating, setRating] = useState(initialInputs.rating?.toString() ?? '')
  const [coverUrl, setCoverUrl] = useState(initialInputs.coverUrl ?? '')
  const [notes, setNotes] = useState(initialInputs.notes ?? '')

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const input: GameInput = {
      title,
      platform,
      status,
      rating: rating === '' ? '' : Number(rating),
      notes,
      coverUrl,
    }
    onSubmit(input)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <p className="text-sm text-text-muted">
        Fields marked with <span className="text-error">*</span> are required.
      </p>

      <div className="flex flex-col gap-1">
        <label htmlFor="title" className={labelStyle}>
          Title
          <Required />
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
          <Required />
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
          <Required />
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

      <div className="flex flex-col gap-1">
        <label htmlFor="rating" className={labelStyle}>
          Rating
        </label>
        <select
          id="rating"
          className={inputStyle}
          value={rating}
          onChange={(e) => setRating(e.target.value)}>
          <option value="">No rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="coverUrl" className={labelStyle}>
          Cover image URL
        </label>
        <input
          id="coverUrl"
          type="url"
          className={inputStyle}
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className={labelStyle}>
          Notes
        </label>
        <textarea
          id="notes"
          rows={4}
          className={inputStyle}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button
        disabled={isSaving}
        className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold text-sidebar transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50">
        {isSaving ? 'Saving...' : submitLabel}
      </button>

      {error && <p className="text-error">Could not save game: {error}</p>}
    </form>
  )
}

export default GameForm
