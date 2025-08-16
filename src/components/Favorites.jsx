export default function Favorites({ favorites, onSelect, onRemove }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Mina favoriter</h3>
      <ul data-cy="favorites-list">
        {favorites.map((city) => (
          <li key={city}>
            <button onClick={() => onSelect(city)}>{city}</button>
            <button data-cy="remove-fav" onClick={() => onRemove(city)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
