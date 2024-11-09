"use client";

import { FC } from "react";
import { Select, SelectProps, Space } from "antd";
import { switchLocaleAction } from "@/app/actions/switch-locale";
import { useTranslation } from "@/i18n/client";

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();

  const options: SelectProps["options"] = [
    {
      label: "🇺🇸 English",
      value: "en",
    },
    {
      label: "🇷🇸 Srpski",
      value: "rs",
    },
    {
      label: "🇷🇺 Русский",
      value: "ru",
    },
  ];

  const handleChange = (value: string) => {
    switchLocaleAction(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      onChange={handleChange}
      options={options}
      optionRender={(option) => (
        <Space>
          <span role="img" aria-label={String(option.data.label)}>
            {option.data.label}
          </span>
          {option.data.desc}
        </Space>
      )}
    />
  );
};
