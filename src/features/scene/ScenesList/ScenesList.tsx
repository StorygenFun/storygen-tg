"use client";

import { FC, useMemo } from "react";
import { useTranslation } from "@/i18n/client";
import { Spinner } from "@/components/Spinner/Spinner";
import { IStory } from "@/features/story/type";
import { IScene } from "../type";
import styles from "./ScenesList.module.scss";

type Props = {
  story: IStory;
  scenes: IScene[];
  isStoryGenerating: boolean;
};

export const ScenesList: FC<Props> = ({ story, scenes, isStoryGenerating }) => {
  const { t } = useTranslation();

  const output = useMemo(() => {
    return scenes.flatMap((scene) => {
      return [
        { content: scene.title, type: "title" },
        { content: scene.content, type: "description" },
      ];
    });
  }, [scenes]);

  return (
    <section className={styles.scene}>
      {output.map((item, index) => (
        <div key={index}>
          {item.type === "title" && (
            <h3 className={styles.title}>{item.content}</h3>
          )}
          {item.type === "description" && (
            <p className={styles.paragraph}>{item.content}</p>
          )}
        </div>
      ))}

      {isStoryGenerating && scenes.length !== story.scenesNum && (
        <Spinner
          isCompact
          size="default"
          content={t("progress.scenesInProgress", {
            num: scenes.length,
            total: story.scenesNum,
          })}
        />
      )}
    </section>
  );
};
