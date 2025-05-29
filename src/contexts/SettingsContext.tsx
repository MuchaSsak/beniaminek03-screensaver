import React, { useState, createContext } from "react";

import {
  DEFAULT_GRAPHICS_SETTING,
  DEFAULT_LANGUAGE_SETTING,
  type GraphicsSetting,
  type LanguageSetting,
} from "@/lib/constants";

type SettingsContextValue = {
  language: LanguageSetting;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageSetting>>;
  graphics: GraphicsSetting;
  setGraphics: React.Dispatch<React.SetStateAction<GraphicsSetting>>;
};

const SettingsContext = createContext<SettingsContextValue>({
  language: DEFAULT_LANGUAGE_SETTING,
  setLanguage: () => {},
  graphics: DEFAULT_GRAPHICS_SETTING,
  setGraphics: () => {},
});

function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE_SETTING);
  const [graphics, setGraphics] = useState(DEFAULT_GRAPHICS_SETTING);

  return (
    <SettingsContext.Provider
      value={{ language, setLanguage, graphics, setGraphics }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
