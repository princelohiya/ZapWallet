export const Skeleton = () => {
  return (
    <div role="status" className="animate-pulse">
      <div className="p-4 border-b border-slate-400 w-full max-w-screen-xl cursor-pointer">
        <div className="flex flex-col gap-2">
          <div className="h-2 bg-gray-200 rounded-full"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="text-xl font-semibold pt-2">
          <div className="h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="text-md font-thin">
          <div className="h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-1">
          <div className="h-2 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
