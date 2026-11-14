import type { Status } from '../types/status'

type StatusFilterProps = {
  filter: Status | null
  setSelectedFilter: (status: Status | null) => void
}

const buttonClass = (active: boolean) =>
  `cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
    active
      ? 'border-accent bg-accent text-sidebar shadow-md shadow-black/20'
      : 'border-text-primary/10 bg-surface/80 text-text-secondary hover:border-accent/40 hover:bg-surface-hover hover:text-text-primary'
  }`

const StatusFilter = ({ filter, setSelectedFilter }: StatusFilterProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        className={buttonClass(filter === null)}
        aria-pressed={filter === null}
        onClick={() => setSelectedFilter(null)}>
        All
      </button>

      <button
        className={buttonClass(filter === 'want')}
        aria-pressed={filter === 'want'}
        onClick={() => setSelectedFilter('want')}>
        Want to play
      </button>

      <button
        className={buttonClass(filter === 'playing')}
        aria-pressed={filter === 'playing'}
        onClick={() => setSelectedFilter('playing')}>
        Playing
      </button>

      <button
        className={buttonClass(filter === 'completed')}
        aria-pressed={filter === 'completed'}
        onClick={() => setSelectedFilter('completed')}>
        Completed
      </button>

      <button
        className={buttonClass(filter === 'dropped')}
        aria-pressed={filter === 'dropped'}
        onClick={() => setSelectedFilter('dropped')}>
        Dropped
      </button>
    </div>
  )
}

export default StatusFilter
