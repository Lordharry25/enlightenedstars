export default function AdminBrandsLoading() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="h-9 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 w-36 bg-gray-200 rounded-xl animate-pulse" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 p-6">
              <div className="w-20 h-12 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-5 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="ml-auto flex gap-2">
                <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
                <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
