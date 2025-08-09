import { type InfoTopicProps } from "../types";

export const InfoTopicComponent = ({ selectedTopic }: InfoTopicProps) => {
	if (!selectedTopic) {
		return null;
	}

	return (
		<div className=" flex items-center justify-center p-4">
			<div className="p-6 md:p-8 w-lg">
				<p className="text-xl font-normal text-gray-700 mb-4 pb-2">
					<span>Information on topic: </span>
					<strong>{selectedTopic?.label}</strong>
				</p>
				<div className="space-y-2 text-gray-700">
					<p className="mb-10">
						<span>Total Mentions: </span>
						<span>{selectedTopic?.volume}</span>
					</p>
					<p>
						<span>Positive Mentions: </span>
						<span
							className={
								selectedTopic.sentimentScore > 60
									? "text-green-500"
									: "text-gray-700"
							}
						>
							{selectedTopic?.sentiment.positive}
						</span>
					</p>
					<p>
						<span>Neutral Mentions: </span>
						<span>{selectedTopic?.sentiment.neutral}</span>
					</p>
					<p>
						<span>Negative Mentions: </span>
						<span
							className={
								selectedTopic.sentimentScore < 60
									? "text-gray-700"
									: "text-red-500"
							}
						>
							{selectedTopic?.sentiment.negative}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};
