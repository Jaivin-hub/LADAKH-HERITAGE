export default function CatalogueStatus({ status, retry, empty = false }) {
  if (status === 'ready' && !empty) return null;
  const error = status === 'error';
  return (
    <div
      role={error ? 'alert' : 'status'}
      className="border border-[#d4c5ad] bg-paper px-6 py-14 text-center"
    >
      <h2 className="font-serif text-3xl text-ink">
        {status === 'loading'
          ? 'Loading our collection…'
          : error
            ? 'The collection is temporarily unavailable'
            : 'Our collection is being prepared'}
      </h2>
      <p className="mt-3 text-sm text-[#77715f]">
        {error
          ? 'Please try again in a moment.'
          : status === 'loading'
            ? 'Discoveries are on their way.'
            : 'Please check back soon, or visit our Varkala store.'}
      </p>
      {error && (
        <button onClick={retry} className="mt-5 rounded-[3px] bg-ink px-5 py-3 text-sm text-paper">
          Try again
        </button>
      )}
    </div>
  );
}
