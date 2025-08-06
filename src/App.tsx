import './index.css';

function App() {


  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
        <h1 className="text-4xl font-bold text-gray-100 mb-8 rounded-lg">Topic Word Cloud</h1>
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full bg-white rounded-lg shadow-2xl p-6 md:p-8 md:max-w-2xl animate-fade-in-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2"></h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Total Mentions:</span>
              </p>
              <p>
                <span className="font-semibold">Positive Mentions:</span>
              </p>
              <p>
                <span className="font-semibold">Neutral Mentions:</span>
              </p>
              <p>
                <span className="font-semibold">Negative Mentions:</span>
              </p>
            </div>
            <button className="mt-6 w-full bg-blue-800 text-white uppercase cursor-pointer py-2 px-4 rounded-md hover:bg-blue-500">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
