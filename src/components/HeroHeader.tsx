import { AuroraText } from "@/components/magicui/aurora-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import {
  HERO_AURORA_TEXT_COLORS,
  HERO_AURORA_TEXT_SHIFTED_COLORS,
  HERO_SPARKLES_SHIFTED_TEXT_COLORS,
  HERO_SPARKLES_TEXT_COLORS,
  HERO_WELCOME_TEXT,
} from "@/lib/constants";
import useSettings from "@/hooks/useSettings";
import { colorMix } from "@/lib/utils";

function HeroHeader({ scrollProgress }: { scrollProgress: number }) {
  const { language } = useSettings();

  const sparklesTextColors = colorMix(
    HERO_SPARKLES_TEXT_COLORS,
    HERO_SPARKLES_SHIFTED_TEXT_COLORS,
    scrollProgress
  );

  return (
    <main className="flex justify-center pointer-events-none">
      <div className="flex flex-col items-center">
        <h3 className="xs:text-2xl max-xs:text-lg font-medium tracking-wide text-foreground/80 [text-shadow:-1px_-1px_0_#494949,1px_-1px_0_#494949,-1px_1px_0_#494949,1px_1px_0_#494949] font-serif italic relative">
          {HERO_WELCOME_TEXT[language]}
        </h3>

        <SparklesText
          colors={{
            first: sparklesTextColors[0],
            second: sparklesTextColors[1],
          }}
          className="font-formal"
        >
          <AuroraText
            className="md:text-7xl xs:text-5xl max-xs:text-4xl font-black relative"
            colors={colorMix(
              HERO_AURORA_TEXT_COLORS,
              HERO_AURORA_TEXT_SHIFTED_COLORS,
              scrollProgress
            )}
          >
            Beniaminek 03
          </AuroraText>
        </SparklesText>
      </div>
    </main>
  );
}

export default HeroHeader;
