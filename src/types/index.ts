type SetTopicsOptions = { type: 'SET_TOPICS'; payload: Topic[] }
type SetSelectedOptions = { type: 'SET_SELECTED_TOPIC'; payload: Topic | null }
type SetLoadingOptions = { type: 'SET_LOADING'; payload: boolean }
type SetErrorOptions = { type: 'SET_ERROR'; payload: string | null }

type sentimentOptions = {
  positive: number;
  neutral: number;
  negative: number;
};

export type Topic = {
  id: string;
  label: string;
  sentimentScore: number;
  volume: number;
  sentiment: sentimentOptions;
}

export type TopicAction =
  | SetTopicsOptions
  | SetSelectedOptions
  | SetLoadingOptions
  | SetErrorOptions;

export type TopicState ={
  topics: Topic[];
  selectedTopic: Topic | null;
  loading: boolean;
  error: string | null;
}
