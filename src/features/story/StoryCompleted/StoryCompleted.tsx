import { FC } from "react";
import Lottie from "lottie-react";
import styles from "./StoryCompleted.module.scss";
import groovyWalkAnimation from "./lottie-completed.json";

export const StoryCompleted: FC = () => {
  return (
    <div className={styles.completed}>
      <Lottie animationData={groovyWalkAnimation} loop={false} />
    </div>
  );
};
