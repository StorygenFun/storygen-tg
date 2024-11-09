"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import { Heading } from "@/components/Heading/Heading";
import { Spinner } from "@/components/Spinner/Spinner";
import {
  DEFAULT_IMAGE_MODEL,
  DEFAULT_TEXT_MODEL,
} from "@/features/llm/constants";
import { Language } from "@/features/localization/types";
import { useTranslation } from "@/i18n/client";
import { UUID } from "@/types/common";
import { StoriesList } from "../StoriesList/StoriesList";
import { useFetchAllStories } from "../hooks/fetch-stories.hook";
import { useStoryStore } from "../storyStore";

export const StoriesWrapper: FC = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentLanguage = i18n.language as Language;

  useFetchAllStories();
  const { isStoriesLoading, createStory, getAllStories, deleteStory } =
    useStoryStore();

  const storiesList = getAllStories();

  const handleCreateStory = async () => {
    try {
      const story = await createStory({
        id: uuidv4(),
        title: t("StoryPage.defaultTitle"),
        description: "",
        prompt: "",
        summary: "",
        summary_en: "",
        sceneIds: [],
        scenesNum: 5,
        textModel: DEFAULT_TEXT_MODEL,
        imageModel: DEFAULT_IMAGE_MODEL,
        lang: currentLanguage,
        isSimple: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (story) {
        router.push(`/stories/${story.id}`);
      }
    } catch (error) {
      console.error(error);
    }

    return;
  };

  const handleStoryDelete = async (id: UUID) => {
    await deleteStory(id);
  };

  if (isStoriesLoading) {
    return <Spinner content={t("StoryPage.storiesLoading")} />;
  }

  return (
    <>
      {storiesList?.length > 0 && (
        <Heading
          actions={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateStory}
            >
              {t("StoryPage.createNewStory")}
            </Button>
          }
        >
          {t("StoryPage.yourStories")}
        </Heading>
      )}

      <StoriesList
        list={storiesList}
        onStart={handleCreateStory}
        onStoryDelete={(id) => handleStoryDelete(id)}
      />
    </>
  );
};
