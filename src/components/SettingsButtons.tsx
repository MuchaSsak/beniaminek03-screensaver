import { Globe, MonitorCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import useSettings from "@/hooks/useSettings";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  GRAPHICS_SETTINGS_LIST,
  LANGUAGES_SETTINGS_LIST,
} from "@/lib/constants";

function SettingsButtons() {
  const { language, setLanguage, graphics, setGraphics } = useSettings();

  return (
    <div className="ml-auto py-2 px-4 gap-2 flex">
      {/* Change language */}
      <Popover>
        <PopoverTrigger title="Language">
          <Globe className="size-5" />
        </PopoverTrigger>
        <PopoverContent>
          {LANGUAGES_SETTINGS_LIST.map(([label, locale]) => (
            <Button
              key={locale}
              variant="ghost"
              onClick={() => setLanguage(locale)}
              className={`justify-end focus-visible:ring-foreground ${
                language === locale
                  ? "bg-[color-mix(in_oklab,var(--color-blue-500)_50%,transparent)!important]"
                  : undefined
              }`}
            >
              {label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>

      {/* Graphic settings */}
      <Popover>
        <PopoverTrigger title="Graphics">
          <MonitorCog className="size-5" />
        </PopoverTrigger>
        <PopoverContent>
          {GRAPHICS_SETTINGS_LIST.map(([label, setting]) => (
            <Button
              key={setting}
              variant="ghost"
              onClick={() => setGraphics(setting)}
              className={`justify-end focus-visible:ring-foreground ${
                graphics === setting
                  ? "bg-[color-mix(in_oklab,var(--color-blue-500)_50%,transparent)!important]"
                  : undefined
              }`}
            >
              {label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SettingsButtons;
