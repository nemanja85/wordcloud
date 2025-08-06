import { useReducer, useEffect } from 'react';
import {  type TopicAction, type TopicState } from './types';
import './index.css';


const initialState: TopicState = {
  topics: [],
  selectedTopic: null,
  loading: true,
  error: null,
};

function appReducer(state: TopicAction, action: TopicAction): TopicState {
  switch (action.type) {
    case 'SET_TOPICS':
      return { ...state, topics: action.payload };
    case 'SET_SELECTED_TOPIC':
      return { ...state, selectedTopic: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
function App() {

    const [state, dispatch] = useReducer(appReducer, initialState);
    const {  loading, error } = state;

      useEffect(() => {
        const fetchTopics = async () => {
          dispatch({ type: 'SET_LOADING', payload: true });
          dispatch({ type: 'SET_ERROR', payload: null });
          try {
            const response = await fetch('/topics.json');
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data && Array.isArray(data.topics)) {
              dispatch({ type: 'SET_TOPICS', payload: data.topics });
            } else {
              throw new Error('Topic not found.');
            }
          } catch (err) {
            dispatch({
              type: 'SET_ERROR',
              payload: 'Failed to load data!',
            });
            console.error(err);
          } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
          }
        };

        fetchTopics();
      }, []);

      if (loading) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
            <p className="text-gray-700 text-lg">Loading topics...</p>
          </div>
        );
      }

      if (error) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 p-4 rounded-lg font-inter">
            <p className="text-lg">{error}</p>
          </div>
        );
      }

  return (
    <>
      <div className="w-full relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter md:flex-row">
        <div className='flex flex-col justify-between'>
          <h1 className="text-xl font-bold text-black mb-8">Topic Word Cloud</h1>
        </div>
        <div className="w-xl bg-opacity-50 p-4">
          <div className=" bg-white rounded-lg shadow-lg p-6 md:p-8 md:max-w-2xl animate-fade-in-up">
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
