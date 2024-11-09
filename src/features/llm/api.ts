import axios from "axios";
import { clog } from "@/utils/common.utils";
import { LLMImageQuery, LLMTextQuery } from "./types";

export const askTextLLM = async (options: LLMTextQuery) => {
  const { systemMessage, prompt, textModel, stream } = options;

  if (!prompt) {
    throw new Error("Prompt to be defined");
  }

  if (systemMessage) {
    clog("System message", systemMessage);
  }
  clog("PROMPT", prompt);

  try {
    const { data } = await axios.post("/api/llm-text", {
      systemMessage: systemMessage || "",
      prompt,
      textModel: textModel || "gpt-4o-mini",
      stream,
    });

    clog("ANSWER", data);

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const askImageLLM = async (options: LLMImageQuery) => {
  const { prompt, imageModel } = options;

  if (!prompt) {
    throw new Error("Prompt to be defined");
  }

  clog("PROMPT", prompt);

  try {
    const { data } = await axios.post("/api/llm-image", {
      prompt,
      imageModel: imageModel || "black-forest-labs/FLUX.1-schnell",
    });

    return data.data[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message);
  }
};
