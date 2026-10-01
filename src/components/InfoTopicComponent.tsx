import { type InfoTopicProps } from "../types";

export const InfoTopicComponent = ({ selectedTopic }: InfoTopicProps) => {
	if (!selectedTopic) {
		return null;
	}

	const { label, volume, sentiment, sentimentScore } = selectedTopic;

	const isPositive = sentimentScore > 60;
	const isNegative = sentimentScore < 60;

	return (
		<div className="flex items-center justify-center p-4">
			<div className="w-full max-w-lg p-6 md:p-8">
				<p className="mb-4 border-b pb-2 text-xl font-normal text-gray-700">
					<span>Information on topic: </span>
					<strong>{label}</strong>
				</p>

				<div className="space-y-2 text-gray-700">
					<p className="mb-10">
						<span>Total Mentions: </span>
						<span>{volume}</span>
					</p>

					<p>
						<span>Positive Mentions: </span>
						<span className={isPositive ? "text-green-500" : undefined}>
							{sentiment.positive}
						</span>
					</p>

					<p>
						<span>Neutral Mentions: </span>
						<span>{sentiment.neutral}</span>
					</p>

					<p>
						<span>Negative Mentions: </span>
						<span className={isNegative ? "text-red-500" : undefined}>
							{sentiment.negative}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};
