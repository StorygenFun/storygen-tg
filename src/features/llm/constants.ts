import OpenAI from "openai";

export const LLMTextModelList = new Map([
  ["gpt-4o-mini", "GPT 4o Mini"],
  ["claude-3-haiku-20240307", "Claude 3 Haiku"],
  [
    "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    "Llama 3.1 8B Instruct Turbo",
  ],
  ["meta-llama/Llama-3.2-3B-Instruct-Turbo", "Llama 3.2 3B Instruct Turbo"],
  ["Mistral (7B) Instruct v0.3", "mistralai/Mistral-7B-Instruct-v0.3"],
  ["Mixtral-8x7B Instruct (46.7B)", "mistralai/Mixtral-8x7B-Instruct-v0.1"],
]);

export const DEFAULT_TEXT_MODEL = "gpt-4o-mini";

export const LLMImageModelList = new Map([
  ["black-forest-labs/FLUX.1-schnell", "Flux.1 [schnell] (Turbo)"],
  ["Stable Diffusion XL 1.0", "Stable Diffusion XL 1.0"],
]);

export const DEFAULT_IMAGE_MODEL = "black-forest-labs/FLUX.1-schnell";

export const TOGETHER_AI_URL = "https://api.together.xyz/v1";

export const getClient = (key: string, baseURL?: string) => {
  return new OpenAI({
    apiKey: key,
    baseURL,
    dangerouslyAllowBrowser: true,
  });
};
