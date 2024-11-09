export type LLMTextQuery = {
  prompt: string;
  systemMessage?: string;
  textModel?: string;
  stream?: boolean;
};

export type LLMImageQuery = {
  prompt: string;
  imageModel?: string;
};
