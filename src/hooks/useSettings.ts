import { useContext } from "react";

import { SettingsContext } from "@/contexts/SettingsContext";

function useSettings() {
  const settingsContext = useContext(SettingsContext);
  if (settingsContext === undefined)
    throw new Error("useSettings has been used outside of SettingsProvider!");
  return settingsContext;
}

export default useSettings;
