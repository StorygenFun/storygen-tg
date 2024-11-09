"use client";

import { FC } from "react";
import { Heading } from "@/components/Heading/Heading";
import { ScenesList } from "@/features/scene/ScenesList/ScenesList";
import { IScene } from "@/features/scene/type";
import { StoryBrief } from "@/features/story/StoryBrief/StoryBrief";
import { StoryCover } from "@/features/story/StoryCover/StoryCover";
import { StoryForm } from "@/features/story/StoryForm/StoryForm";
import { StoryMeta } from "@/features/story/StoryMeta/StoryMeta";
import { IStory } from "../type";
import { formatBrief } from "../utils/story.utils";
import styles from "./Story.module.scss";

type StoryProps = {
  story: IStory;
  isStoryGenerating: boolean;
  scenesList: IScene[] | undefined;
  onChange: (stroy: IStory) => void;
  onGenerateStart: () => void;
  onGenerateCover: (imageModel: string) => void;
};

export const StoryView: FC<StoryProps> = ({
  story,
  isStoryGenerating,
  scenesList,
  onChange,
  onGenerateStart,
  onGenerateCover,
}) => {
  const formattedBrief = story?.brief ? formatBrief(story?.brief) : null;

  if (!story) return null;

  return (
    <article className={styles.story}>
      <Heading isCentered title={story.title} />

      {!story.brief && !isStoryGenerating && (
        <StoryForm
          story={story}
          onChange={onChange}
          onGenerate={onGenerateStart}
        />
      )}

      {story.sceneIds.length === 0 && (
        <StoryBrief
          brief={formattedBrief}
          isStoryGenerating={isStoryGenerating}
          onClear={() => onChange({ ...story, brief: null })}
        />
      )}

      {story.summary_en && (
        <StoryCover
          story={story}
          isGenerating={isStoryGenerating}
          onGenerate={onGenerateCover}
        />
      )}

      {story.summary_en && (
        <StoryMeta story={story} isStoryGenerating={isStoryGenerating} />
      )}

      {scenesList && scenesList.length > 0 && (
        <ScenesList
          story={story}
          scenes={scenesList}
          isStoryGenerating={isStoryGenerating}
        />
      )}
    </article>
  );
};
