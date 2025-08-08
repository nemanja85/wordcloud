import { type InfoTopicProps } from "../types";

export const InfoTopicComponent = ({
	selectedTopic,
	dispatch,
}: InfoTopicProps) => {
	let sentimentColorClass = "text-gray-700";
	if (selectedTopic?.sentimentScore > 60) {
		sentimentColorClass = "text-green-500";
	} else if (selectedTopic?.sentimentScore < 40) {
		sentimentColorClass = "text-red-500";
	}

	return (
		<div className=" flex items-center justify-center p-4">
			<div className="p-6 md:p-8 w-lg">
				<p className="text-xl font-normal text-gray-800 mb-4 pb-2">
					<span>Information on topic: </span>
					<strong>{selectedTopic?.label}</strong>
				</p>
				<div className="space-y-2 text-gray-700">
					<p className="mb-10">
						<span>Total Mentions: </span>
						<span className={sentimentColorClass}>{selectedTopic?.volume}</span>
					</p>
					<p>
						<span>Positive Mentions: </span>
						<span>{selectedTopic?.sentiment.positive}</span>
					</p>
					<p>
						<span>Neutral Mentions: </span>
						<span>{selectedTopic?.sentiment.neutral}</span>
					</p>
					<p>
						<span>Negative Mentions: </span>
						<span>{selectedTopic?.sentiment.negative}</span>
					</p>
				</div>
			</div>
		</div>
	);
};
