import { useEffect, useReducer } from "react";
import { InfoTopicComponent } from "./components/InfoTopicComponent";
import { WordCloudComponent } from "./components/WordCloudComponent";
import "./index.css";
import { type TopicAction, type TopicState } from "./types";

const initialState: TopicState = {
	topics: [],
	selectedTopic: null,
	loading: true,
	error: null,
};

function appReducer(state, action: TopicAction): TopicAction {
	switch (action.type) {
		case "SET_TOPICS":
			return { ...state, topics: action.payload };
		case "SET_SELECTED_TOPIC":
			return { ...state, selectedTopic: action.payload };
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_ERROR":
			return { ...state, error: action.payload };
		default:
			return state;
	}
}
function App() {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const { topics, selectedTopic, loading, error } = state;

	useEffect(() => {
		const fetchTopics = async () => {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_ERROR", payload: null });
			try {
				const response = await fetch("/topics.json");
				if (!response.ok) {
					throw new Error(`Error status: ${response.status}`);
				}
				const data = await response.json();
				if (data && Array.isArray(data.topics)) {
					dispatch({ type: "SET_TOPICS", payload: data.topics });
				} else {
					throw new Error("Topic not found.");
				}
			} catch (err) {
				dispatch({
					type: "SET_ERROR",
					payload: "Failed to load data!",
				});
				console.error(err);
			} finally {
				dispatch({ type: "SET_LOADING", payload: false });
			}
		};

		fetchTopics();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<p className="text-gray-700 text-lg">Loading topics...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen text-red-500 p-4">
				<p className="text-lg">{error}</p>
			</div>
		);
	}

	return (
		<>
			<div className="w-full relative flex flex-col justify-center items-center min-h-screen p-4">
				<h1 className="text-5xl leading-0.5 font-normal text-black mb-20">
					My Topics Challenge
				</h1>
				<div className="flex flex-col justify-between lg:flex-row">
					<WordCloudComponent topics={topics} dispatch={dispatch} />
					{selectedTopic && (
						<InfoTopicComponent
							selectedTopic={selectedTopic}
							dispatch={dispatch}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
