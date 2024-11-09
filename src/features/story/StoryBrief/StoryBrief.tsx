"use client";

import { FC, useMemo } from "react";
import { Button, Result } from "antd";
import { Spinner } from "@/components/Spinner/Spinner";
import { useTranslation } from "@/i18n/client";
import { CompactShortScene } from "../type";
import styles from "./StoryBrief.module.scss";

type Props = {
  brief?: CompactShortScene[] | null;
  isStoryGenerating: boolean;
  onClear: () => void;
};

export const StoryBrief: FC<Props> = ({
  brief,
  isStoryGenerating,
  onClear,
}) => {
  const { t } = useTranslation();

  const isWrongFormat = !Array.isArray(brief);

  const output = useMemo(() => {
    if (typeof brief === "string")
      return [{ content: brief, type: "description" }];
    return brief?.flatMap((item) => [
      { content: item.t, type: "title" },
      { content: item.d, type: "description" },
    ]);
  }, [brief]);

  if (!brief && isStoryGenerating) {
    return (
      <Spinner
        isCompact
        size="default"
        content={t("progress.briefInProgress")}
      />
    );
  }

  if (!brief) return null;

  return (
    <div className={styles.brief}>
      <h2 className={styles.h2}>{t("StoryPage.generatedBrief")}</h2>

      {!isWrongFormat ? (
        <section className={styles.content}>
          {output?.map((item, index) => (
            <div key={index}>
              {item.type === "title" && index && (
                <h3 className={styles.title}>{item.content}</h3>
              )}
              {item.type === "description" && index && (
                <p className={styles.paragraph}>{item.content}</p>
              )}
            </div>
          ))}
        </section>
      ) : (
        <Result
          status="warning"
          title={t("modal.wrongAnswerFormat")}
          extra={
            <Button type="primary" onClick={onClear}>
              {t("actions.tryAgain")}
            </Button>
          }
        />
      )}
    </div>
  );
};
