import { Language } from "@/features/localization/types";
import { UUID } from "@/types/common";

export enum StoryWriter {
  Murakami = "murakami",
  Orwell = "orwell",
  Kafka = "kafka",
  Nabokov = "nabokov",
  King = "king",
  LiuCixin = "liuCixin",
}

export enum StoryGenre {
  Fantasy = "fantasy",
  ScienceFiction = "scienceFiction",
  LiteraryFiction = "literaryFiction",
  Humor = "humor",
  Mystery = "mystery",
  Horror = "horror",
  Thriller = "thriller",
  Detective = "detective",
  Romance = "romance",
  HistoricalFiction = "historicalFiction",
  Memoir = "memoir",
}

export enum StoryAudience {
  Children = "children",
  Teenagers = "teenagers",
  YoungAdults = "youngAdults",
  Adults = "adults",
  MiddleGrade = "middleGrade",
  Seniors = "seniors",
}

export type StoryOptions = {
  systemMessage?: string;
  prompt?: string;
  textModel?: string;
  imageModel?: string;
  lang?: Language;
  scenesNum?: number;
  writer?: StoryWriter | string;
  genre?: StoryGenre;
  audience?: StoryAudience;
  isSimple: boolean;
};

export type IStory = StoryOptions & {
  id: UUID;
  title: string;
  description: string | null;
  summary: string | null;
  summary_en: string | null;
  sceneIds: UUID[];
  cover?: string | null;
  cover_text?: string | null;
  cover_text_en?: string | null;
  brief?: string | null;
  names?: string[];
  payment_transaction?: string;
  payment_date?: string;
  created_at: string;
  updated_at: string;
};

export type ShortScene = {
  title: string;
  description: string;
};

export type CompactShortScene = {
  t: string;
  d: string;
};

export enum GenerationStep {
  Brief = "brief",
  Scenes = "scenes",
  Meta = "meta",
  Cover = "cover",
}
