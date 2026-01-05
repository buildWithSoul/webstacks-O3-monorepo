export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div className="mb-4 border border-black-300 rounded-lg p-6 bg-yellow-100">
      <a
        href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <h2 className="text-2xl font-bold mb-2">
          {title} <span>-&gt;</span>
        </h2>
        <p>{children}</p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
         test
        </button>
      </a>
    </div>
  );
}
