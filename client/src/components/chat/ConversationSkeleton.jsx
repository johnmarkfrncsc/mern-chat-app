const ConversationSkeleton = () => {
  return (
    <div className="flex items-center gap-2 p-3 md:p-1.5 animate-pulse">
      {/* Avatar */}
      <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200" />

      {/* Text */}
      <div className="flex flex-col flex-1 min-w-0 gap-1.5">
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-24" />
          <div className="h-3 bg-gray-200 rounded w-10" />
        </div>
        <div className="h-3 bg-gray-200 rounded w-36" />
      </div>
    </div>
  );
};

export default ConversationSkeleton;
