import { useMemo } from "react";
import { type WordCloudProps, type WordData } from "../types";

export const WordCloudComponent = ({ topics, dispatch }: WordCloudProps) => {
	const wordCloudData: WordData[] = useMemo(() => {
		if (topics.length === 0) return [];

		const volumes = topics.map((topic) => topic.volume);
		const minVolume = Math.min(...volumes);
		const maxVolume = Math.max(...volumes);
		const numTiers = 5;

		const fontSizeClasses = [
			"text-sx",
			"text-lg",
			"text-xl",
			"text-3xl",
			"text-4xl",
			"text-5xl",
		];

		return topics.map((topic) => {
			let fontSize = 1;
			if (maxVolume > minVolume) {
				fontSize =
					1 +
					Math.floor(
						((topic.volume - minVolume) / (maxVolume - minVolume)) *
							(numTiers - 1),
					);
			}

			const colorClass =
				topic.sentimentScore > 60
					? "text-green-500"
					: topic.sentimentScore < 40
						? "text-gray-700"
						: "text-red-500";

			const fontSizeClass = fontSizeClasses[fontSize - 1];

			return {
				text: topic.label,
				value: topic.volume,
				sentimentScore: topic.sentimentScore,
				topicData: topic,
				colorClass: colorClass,
				fontSizeClass: fontSizeClass,
			};
		});
	}, [topics]);

	return (
		<div className="w-full max-w-4xl h-[300px] p-4 flex flex-wrap items-center justify-center lg:h-[200px]">
			{wordCloudData.length > 0 ? (
				wordCloudData.map((data, index) => (
					<span
						key={index}
						className={`m-4 cursor-pointer transition-opacity duration-200 ${data.colorClass} ${data.fontSizeClass}`}
						onClick={() =>
							dispatch({ type: "SET_SELECTED_TOPIC", payload: data.topicData })
						}
					>
						{data.text}
					</span>
				))
			) : (
				<p className="text-gray-700 text-lg">No topics to display.</p>
			)}
		</div>
	);
};
