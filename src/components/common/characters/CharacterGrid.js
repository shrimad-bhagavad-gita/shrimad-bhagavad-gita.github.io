import CharacterItem from './CharacterItem'
import Spinner from '../Spinner'

const CharacterGrid = ({ items, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {items.map((item) => (
        <CharacterItem key={item.char_id || item.id} item={item} />
      ))}
    </>
  )
}

export default CharacterGrid
