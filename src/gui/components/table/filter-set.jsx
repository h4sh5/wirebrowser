
export default function FilterSet({ model, onModelChange, options = [], defaults = [] }) {
  const selected = new Set(model ?? defaults);
  const toggle = (opt) => {
    const next = new Set(selected);
    next.has(opt) ? next.delete(opt) : next.add(opt);
    onModelChange(next.size ? Array.from(next) : null);
  };
  return (
    <div style={{padding:8}}>
      {options.map(opt => (
        <label key={opt} style={{display:'flex',gap:6}}>
          <input
            type="checkbox"
            checked={selected.has(opt)}
            onChange={() => toggle(opt)}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}
