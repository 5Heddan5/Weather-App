export default function Favorites({ favorites, onSelect, onRemove }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="favorites-section">
      <div className="favorites-header">
        <h3>Mina favoriter</h3>
        <ul data-cy="favorites-list" className="favorites-list">
          {favorites.map((city) => (
            <li key={city}>
              <button className="fav-select-btn" onClick={() => onSelect(city)}>
                {city}
              </button>
              <button
                className="fav-remove-btn"
                data-cy="remove-fav"
                onClick={() => onRemove(city)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
