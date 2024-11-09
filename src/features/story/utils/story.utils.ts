import { CompactShortScene, IStory } from "@/features/story/type";

export const getWriterStyleText = (story: IStory) => {
  console.log("🚀 ~ getWriterStyleText ~ story:", story);
  // TODO: Implement writer style text
  return story.writer || story.writer === "own";
};

export const getGenreText = (story: IStory) => {
  // TODO: Implement genre text
  return story.genre;
};

export const getAudienceText = (story: IStory) => {
  // TODO: Implement audience text
  return story.audience;
};

export const getNewStoryTaskText = (story: IStory) => {
  console.log("🚀 ~ getNewStoryTaskText ~ story:", story);
  // TODO: Implement new story task text
  return "";
};

export const buildScenePrompt = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  brief: CompactShortScene[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  num: number
): string => {
  // TODO: Implement scene prompt
  return "";
};

export const extractArrayFromString = (text?: string) => {
  if (!text) return null;

  if (typeof text === "object") {
    return text;
  }

  const WRONG_RESULT = "Wrong result";
  const OBJECTS_LINE_PATTERN = "}{";
  const OBJECTS_N_PATTERN = "}\n{";
  const OBJECTS_FINAL_PATTERN = "},{";

  let isObjects = false;

  let startIndex = text.indexOf("[");
  if (startIndex === -1) {
    startIndex = text.indexOf("{");
    if (startIndex !== -1 && !text.includes('"summary')) {
      isObjects = true;
    }
  }
  if (startIndex === -1) {
    return WRONG_RESULT;
  }

  let endIndex = text.indexOf("]", startIndex);
  if (endIndex === -1) {
    endIndex = text.lastIndexOf("}");
  }
  if (endIndex === -1) {
    return WRONG_RESULT;
  }

  let jsonString = text.substring(startIndex, endIndex + 1);
  if (isObjects) {
    if (text.indexOf(OBJECTS_LINE_PATTERN) !== -1) {
      jsonString = jsonString
        .split(OBJECTS_LINE_PATTERN)
        .join(OBJECTS_FINAL_PATTERN);
    }
    if (text.indexOf(OBJECTS_N_PATTERN) !== -1) {
      jsonString = `[${jsonString
        .split(OBJECTS_N_PATTERN)
        .join(OBJECTS_FINAL_PATTERN)}]`;
    }
  }

  try {
    return JSON.parse(jsonString);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return WRONG_RESULT;
  }
};

export const extractObjectFromString = (text?: string) => {
  if (!text) return null;

  if (typeof text === "object") {
    return text;
  }

  const WRONG_RESULT = "Wrong result";

  const startIndex = text.indexOf("{");
  if (startIndex === -1) {
    return WRONG_RESULT;
  }

  const endIndex = text.indexOf("}", startIndex);
  if (endIndex === -1) {
    return WRONG_RESULT;
  }

  const jsonString = text.substring(startIndex, endIndex + 1);

  try {
    return JSON.parse(jsonString);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return WRONG_RESULT;
  }
};

export const formatBrief = (brief: string): CompactShortScene[] => {
  return extractArrayFromString(brief);
};
