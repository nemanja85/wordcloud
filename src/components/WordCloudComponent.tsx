import { useMemo } from "react";
import { type WordCloudProps, type WordData } from "../types";

const NUM_TIERS = 6;

const FONT_SIZE_CLASSES = [
	"text-xs",
	"text-lg",
	"text-xl",
	"text-3xl",
	"text-4xl",
	"text-5xl",
] as const;

const getFontSizeClass = (
	volume: number,
	minVolume: number,
	maxVolume: number,
) => {
	if (minVolume === maxVolume) {
		return FONT_SIZE_CLASSES[0];
	}

	const tier = Math.floor(
		((volume - minVolume) / (maxVolume - minVolume)) * (NUM_TIERS - 1),
	);

	return FONT_SIZE_CLASSES[Math.min(tier, NUM_TIERS - 1)];
};

const getSentimentColorClass = (sentimentScore: number) => {
	if (sentimentScore > 60) {
		return "text-green-500";
	}

	if (sentimentScore < 40) {
		return "text-gray-700";
	}

	return "text-red-500";
};

export const WordCloudComponent = ({ topics, dispatch }: WordCloudProps) => {
	const wordCloudData = useMemo<WordData[]>(() => {
		if (!topics.length) {
			return [];
		}

		const volumes = topics.map(({ volume }) => volume);
		const minVolume = Math.min(...volumes);
		const maxVolume = Math.max(...volumes);

		return topics.map((topic) => ({
			text: topic.label,
			value: topic.volume,
			sentimentScore: topic.sentimentScore,
			topicData: topic,
			colorClass: getSentimentColorClass(topic.sentimentScore),
			fontSizeClass: getFontSizeClass(topic.volume, minVolume, maxVolume),
		}));
	}, [topics]);

	if (!wordCloudData.length) {
		return (
			<div className="flex h-[500px] w-full max-w-4xl items-center justify-center p-4 lg:h-[200px]">
				<p className="text-lg text-gray-700">No topics to display.</p>
			</div>
		);
	}

	return (
		<div className="flex h-[500px] w-full max-w-4xl flex-wrap items-center justify-center p-4 lg:h-[200px]">
			{wordCloudData.map((data) => (
				<button
					key={data.topicData.label}
					type="button"
					className={`m-4 cursor-pointer transition-opacity duration-200 hover:opacity-75 ${data.colorClass} ${data.fontSizeClass}`}
					onClick={() =>
						dispatch({
							type: "SET_SELECTED_TOPIC",
							payload: data.topicData,
						})
					}
				>
					{data.text}
				</button>
			))}
		</div>
	);
};
