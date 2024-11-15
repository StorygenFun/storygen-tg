"use client";

import { FC, useCallback } from "react";
import { Button, Form, InputNumber, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ActionBar } from "@/components/ActionBar/ActionBar";
import { LLMImageModelList, LLMTextModelList } from "@/features/llm/constants";
import {
  IStory,
  StoryAudience,
  StoryGenre,
  StoryWriter,
} from "@/features/story/type";
import { useTranslation } from "@/i18n/client";
import styles from "./StoryForm.module.scss";

type modelOption = {
  value: string;
  label: string;
};

type KeyOfIStory = keyof IStory;

type Props = {
  story: IStory;
  onChange: (story: IStory) => void;
  onGenerate: () => void;
};

export const StoryForm: FC<Props> = ({ story, onChange, onGenerate }) => {
  const { t } = useTranslation();

  const buildOptions = (list: string[], translationPrefix: string) => {
    return [
      ...list.map((item) => ({
        value: item,
        label: t(`${translationPrefix}.${item}`),
      })),
      {
        value: "own",
        label: t("StoryPage.ownStyle"),
      },
    ];
  };

  const writerOptions = buildOptions(
    Object.values(StoryWriter),
    "StoryPage.writers"
  );
  const genreOptions = buildOptions(
    Object.values(StoryGenre),
    "StoryPage.genres"
  );
  const audienceOptions = buildOptions(
    Object.values(StoryAudience),
    "StoryPage.audiences"
  );

  const modelsOptions = Array.from(LLMTextModelList, ([value, label]) => {
    if (!(value.startsWith("gpt-") || value.startsWith("claude-"))) {
      return { value, label };
    }
  }).filter(Boolean) as modelOption[];

  const handleChange = useCallback(
    (key: KeyOfIStory, value: IStory[KeyOfIStory]): void => {
      void onChange({ ...story, [key]: value });
    },
    [onChange, story]
  );

  return (
    <div className={styles.storyForm}>
      <Form
        layout="vertical"
        initialValues={{
          promptValue: story.prompt,
          textModelValue: story.textModel,
          imageModelValue: story.imageModel,
          scenesValue: story.scenesNum,
          writerValue: story.writer ? [story.writer] : [],
          genreValue: story.genre,
          audienceValue: story.audience,
          isSimpleValue: story.isSimple,
        }}
      >
        <Form.Item label={t("StoryPage.prompt")} name="promptValue">
          <TextArea
            rows={5}
            value={story.prompt}
            onChange={(e) => handleChange("prompt", e.target.value)}
          />
        </Form.Item>

        <Form.Item name="isSimpleValue">
          <div className={styles.switcherContainer}>
            <Switch
              defaultChecked={story.isSimple}
              onChange={(val) => handleChange("isSimple", val)}
            />
            {t("StoryPage.simpleMode")}
          </div>
        </Form.Item>

        {!story.isSimple && (
          <Form.Item label={t("StoryPage.textModel")} name="textModelValue">
            <Select
              style={{ width: 300 }}
              options={modelsOptions}
              onChange={(val) => handleChange("textModel", val)}
            />
          </Form.Item>
        )}

        {!story.isSimple && (
          <Form.Item label={t("StoryPage.imageModel")} name="imageModelValue">
            <Select
              style={{ width: 300 }}
              options={Array.from(LLMImageModelList, ([value, label]) => ({
                value,
                label,
              }))}
              onChange={(val) => handleChange("imageModel", val)}
            />
          </Form.Item>
        )}

        <Form.Item label={t("StoryPage.writerStyle")} name="writerValue">
          <Select
            style={{ width: 300 }}
            placeholder={t("StoryPage.ownStyle")}
            options={writerOptions}
            onChange={(val) => handleChange("writer", val)}
          />
        </Form.Item>

        <Form.Item label={t("StoryPage.genre")} name="genreValue">
          <Select
            options={genreOptions}
            style={{ width: 300 }}
            onChange={(val) => handleChange("genre", val)}
          />
        </Form.Item>

        <Form.Item label={t("StoryPage.audience")} name="audienceValue">
          <Select
            options={audienceOptions}
            style={{ width: 300 }}
            onChange={(val) => handleChange("audience", val)}
          />
        </Form.Item>

        <Form.Item label={t("StoryPage.numberOfScenes")} name="scenesValue">
          <InputNumber
            min={1}
            max={10}
            onChange={(val) => handleChange("scenesNum", val || 1)}
          />
        </Form.Item>

        <ActionBar
          actionStart={
            <Button type="primary" disabled={false} onClick={onGenerate}>
              Generate!
            </Button>
          }
        />
      </Form>
    </div>
  );
};
