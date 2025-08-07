type SetTopicsOptions = { type: 'SET_TOPICS'; payload: Topic[] }
type SetSelectedOptions = { type: 'SET_SELECTED_TOPIC'; payload: Topic | null }
type SetLoadingOptions = { type: 'SET_LOADING'; payload: boolean }
type SetErrorOptions = { type: 'SET_ERROR'; payload: string | null }

type SentimentOptions = {
  positive: number;
  neutral: number;
  negative: number;
};

export type Topic = {
  id: string;
  label: string;
  sentimentScore: number;
  volume: number;
  sentiment: SentimentOptions;
}

export type TopicAction =
  | SetTopicsOptions
  | SetSelectedOptions
  | SetLoadingOptions
  | SetErrorOptions;

export type TopicState = {
  topics: Topic[];
  selectedTopic: Topic | null;
  loading: boolean;
  error: string | null;
}

export type InfoTopicProps = {
  selectedTopic: Topic | null;
  dispatch: React.Dispatch<TopicAction>;
}

export type WordData = {
  text: string;
  value: number;
  sentimentScore: number;
  topicData: Topic;
  colorClass: string;
  fontSizeClass: string;
}

export type WordCloudProps = {
  topics: Topic[];
  dispatch: React.Dispatch<TopicAction>;
}
