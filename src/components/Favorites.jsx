export default function Favorites({ favorites, onSelect, onRemove }) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>Mina favoriter</h3>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            <button onClick={() => onSelect(city)}>{city}</button>
            <button onClick={() => onRemove(city)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
