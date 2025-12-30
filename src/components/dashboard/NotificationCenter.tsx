const NotificationCenter = () => {
  return (
    <div className="w-full md:w-1/2 bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5 shadow-sm flex items-center gap-4 my-4">
      <div className="shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-base font-semibold">
        ✓
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-blue-900 leading-tight">
          Leave Request Approved
        </h4>
        <p className="text-sm text-blue-700 mt-1 leading-snug">
          Your leave request on{" "}
          <span className="font-medium">24th April 2024</span> has been approved.
        </p>
      </div>
      <button className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition">
        View
      </button>
    </div>
  );
};

export default NotificationCenter;
