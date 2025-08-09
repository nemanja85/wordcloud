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
	type: null,
};

function appReducer(state: TopicAction, action: TopicAction): TopicState {
	switch (action.type) {
		case "SET_TOPICS":
			//@ts-ignore
			return { ...state, topics: action.payload };
		case "SET_SELECTED_TOPIC":
			//@ts-ignore
			return { ...state, selectedTopic: action.payload };
		case "SET_LOADING":
			//@ts-ignore
			return { ...state, loading: action.payload };
		case "SET_ERROR":
			//@ts-ignore
			return { ...state, error: action.payload };
		default:
			//@ts-ignore
			return state;
	}
}
function App() {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const { topics, selectedTopic, loading, error } = state;

	useEffect(() => {
		const getTopics = async () => {
			dispatch({ type: "SET_LOADING", payload: true });
			dispatch({ type: "SET_ERROR", payload: null });
			try {
				const response = await fetch("/topics.json");
				if (!response.ok) {
					throw new Error(`Error status: ${response.status}`);
				}
				const data = await response.json();
				data && Array.isArray(data.topics)
					? dispatch({ type: "SET_TOPICS", payload: data.topics })
					: (() => {
							throw new Error("Data not found.");
						})();
			} catch (err) {
				dispatch({
					type: "SET_ERROR",
					payload: "Data loading failed.",
				});
			} finally {
				dispatch({ type: "SET_LOADING", payload: false });
			}
		};

		getTopics();
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
				<h1 className="text-5xl leading-0.5 font-normal text-gray-700 mb-20">
					My Topics Challenge
				</h1>
				<div className="flex flex-col justify-between lg:flex-row">
					<WordCloudComponent topics={topics} dispatch={dispatch} />
					{selectedTopic && (
						<InfoTopicComponent selectedTopic={selectedTopic} />
					)}
				</div>
			</div>
		</>
	);
}

export default App;
