/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FC, useState } from "react";
import { notification } from "antd";
import { Spinner } from "@/components/Spinner/Spinner";
import { useSceneStore } from "@/features/scene/sceneStore";
import { useTranslation } from "@/i18n/client";
import { StoryProgress } from "../StoryProgress/StoryProgress";
import { StoryWrapper } from "../StoryWrapper/StoryWrapper";
import { useFetchAllStories } from "../hooks/fetch-stories.hook";
import { useStoryStore } from "../storyStore";
import { IStory } from "../type";
import { StoryView } from "./StoryView";

type StoryProps = {
  storyId: string;
  siteUrl: string;
  serviceWallet?: string;
};

export const Story: FC<StoryProps> = ({ storyId, siteUrl }) => {
  const { t } = useTranslation();

  useFetchAllStories();
  const {
    isStoriesLoading,
    currentStep,
    getStoryById,
    changeCurrentStep,
    updateStory,
  } = useStoryStore();
  const { createScene, getScenesByIds, updateScene } = useSceneStore();

  const initialStory = getStoryById(storyId);
  console.log("🚀 ~ initialStory:", initialStory);
  const scenes = getScenesByIds(initialStory?.sceneIds || []);

  const [isStoryGenerating, setIsStoryGenerating] = useState(false);

  const scenesList = getScenesByIds(initialStory?.sceneIds || []);

  const handleCoverGenerate = async (currentStory: IStory) => {
    console.log("🚀 ~ handleCoverGenerate ~ currentStory:", currentStory);
    // TODO: Implement cover generation
  };

  const handleStartGeneration = async (currentStory: IStory) => {
    console.log("🚀 ~ handleStartGeneration ~ currentStory:", currentStory);
    // TODO: Implement story generation
  };

  if (isStoriesLoading) {
    return <Spinner content={t("StoryPage.storiesLoading")} />;
  }

  if (!initialStory) return null;

  return (
    <>
      <StoryProgress
        story={initialStory}
        scenes={scenes}
        isStoryGenerating={isStoryGenerating}
        inProgress={currentStep}
      />

      <StoryWrapper siteUrl={siteUrl}>
        <StoryView
          story={initialStory}
          isStoryGenerating={isStoryGenerating}
          scenesList={scenesList}
          onChange={(story) => updateStory(initialStory.id, story)}
          onGenerateStart={() => handleStartGeneration(initialStory)}
          onGenerateCover={(imageModel) =>
            handleCoverGenerate({ ...initialStory, imageModel })
          }
        />
      </StoryWrapper>
    </>
  );
};
