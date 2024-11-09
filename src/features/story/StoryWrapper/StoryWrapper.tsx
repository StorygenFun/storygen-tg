"use client";

import { FC, PropsWithChildren } from "react";

type Props = {
  siteUrl: string;
};

export const StoryWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  siteUrl,
}) => {
  console.log("🚀 ~ siteUrl:", siteUrl);
  return <div>{children}</div>;
};
