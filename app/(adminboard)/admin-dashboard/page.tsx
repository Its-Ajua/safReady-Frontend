
const stats = {
  checklistsDone: 0,
  reviewsDone: 0,
  liveSessionsScheduled: 0,
};

const DashBoardList = () => {
  return (
    <div className="min-h-screen shadow-xl flex flex-col items-center justify-center py-10">

      {/* Welcome Message */}
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Welcome SAFReady Admin!</h1>

      {/* Stats Boxes */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-10 w-full max-w-5xl">
        <div className="bg-white text-center p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">{stats.checklistsDone}</h2>
          <p className="text-lg text-gray-700 mt-2">Checklists Completed</p>
        </div>
        <div className="bg-white text-center p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">{stats.reviewsDone}</h2>
          <p className="text-lg text-gray-700 mt-2">Reviews Completed</p>
        </div>
        <div className="bg-white text-center p-6 rounded-xl shadow-lg">
          <h2 className="text-4xl font-bold text-blue-900">{stats.liveSessionsScheduled}</h2>
          <p className="text-lg text-gray-700 mt-2">Live Sessions Scheduled</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardList;