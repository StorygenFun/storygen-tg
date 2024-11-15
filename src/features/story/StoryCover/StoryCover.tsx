"use client";

import { FC, useState } from "react";
import { Button, Form, Select, Spin } from "antd";
import { LLMImageModelList } from "@/features/llm/constants";
import { useTranslation } from "@/i18n/client";
import { IStory } from "../type";
import styles from "./StoryCover.module.scss";

type Props = {
  story: IStory;
  isGenerating: boolean;
  onGenerate: (imageModel: string) => void;
};

export const StoryCover: FC<Props> = ({ story, isGenerating, onGenerate }) => {
  const { t } = useTranslation();

  const [isChanging, setIsChanging] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [imageModel, setImageModel] = useState<string>(
    story.imageModel || "black-forest-labs/FLUX.1-schnell"
  );

  const handleSubmit = () => {
    setIsChanging(false);
    onGenerate(imageModel);
  };

  if (isGenerating) {
    return (
      <div className={styles.cover}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.cover}>
      {story.cover && !isChanging ? (
        <div className={styles.poster}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={story.cover} alt="" className={styles.image} />
        </div>
      ) : (
        <div className={styles.generator}>
          {isStarted ? (
            <div>
              <Form
                layout="vertical"
                initialValues={{ imageModelValue: imageModel }}
              >
                <Form.Item name="imageModelValue">
                  <Select
                    style={{ width: 200 }}
                    options={Array.from(
                      LLMImageModelList,
                      ([value, label]) => ({ value, label })
                    )}
                    onChange={(val) => setImageModel(val)}
                  />
                </Form.Item>

                <Form.Item className={styles.actions}>
                  <div className={styles.actions}>
                    <Button onClick={() => setIsStarted(false)}>Cancel</Button>
                    <Button type="primary" onClick={handleSubmit}>
                      Generate
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <Button onClick={() => setIsStarted(true)}>
              {t("StoryPage.generateCover")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
