import { useSaveGame } from '../hooks/useGames'
import GameForm from '../components/GameForm'

const NewGamePage = () => {
  const { isSaving, error, addGame } = useSaveGame()

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-3xl font-bold">New Game</h1>
      <GameForm
        initialInputs={{ title: '', platform: '', status: 'want' }}
        onSubmit={addGame}
        isSaving={isSaving}
        error={error}
        submitLabel="Add Game"
      />
    </div>
  )
}

export default NewGamePage
