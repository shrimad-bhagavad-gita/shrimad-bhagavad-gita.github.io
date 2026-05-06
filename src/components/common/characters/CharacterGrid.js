import CharacterItem from './CharacterItem'
import Spinner from '../Spinner'

const CharacterGrid = ({ items, isLoading, isFavorite, toggleFavorite }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {items.map((item) => (
        <CharacterItem
          key={item.char_id || item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </>
  )
}

export default CharacterGrid
