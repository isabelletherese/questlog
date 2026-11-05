import type { Status } from '../types/status'

type StatusFilterProps = {
  filter: Status | null
  setSelectedFilter: (status: Status | null) => void
}

const StatusFilter = ({ filter, setSelectedFilter }: StatusFilterProps) => {
  return (
    <div>
      <button
        disabled={filter === null}
        onClick={() => setSelectedFilter(null)}>
        All
      </button>
      <button
        disabled={filter === 'want'}
        onClick={() => setSelectedFilter('want')}>
        Want to play
      </button>
      <button
        disabled={filter === 'playing'}
        onClick={() => setSelectedFilter('playing')}>
        Playing
      </button>
      <button
        disabled={filter === 'completed'}
        onClick={() => setSelectedFilter('completed')}>
        Completed
      </button>
      <button
        disabled={filter === 'dropped'}
        onClick={() => setSelectedFilter('dropped')}>
        Dropped
      </button>
    </div>
  )
}

export default StatusFilter
