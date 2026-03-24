export default function ProductsLoading() {
  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="mb-12">
          <div className="h-12 w-64 bg-gray-700 rounded-xl animate-pulse mb-4" />
          <div className="h-6 w-96 bg-gray-800 rounded-lg animate-pulse" />
        </div>
        {/* Filter skeleton */}
        <div className="mb-10 h-16 bg-gray-800/50 rounded-2xl animate-pulse" />
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-800/80 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="h-60 bg-gray-700 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
