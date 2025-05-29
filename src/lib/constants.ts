// Window sizes
export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2),
};

// Settings
export type LanguageSetting = "en" | "pl";
export const DEFAULT_LANGUAGE_SETTING: LanguageSetting = "en";
export const LANGUAGES_SETTINGS_LIST: [string, LanguageSetting][] = [
  ["English 🇬🇧", "en"],
  ["Polish 🇵🇱", "pl"],
];
export type GraphicsSetting = "low" | "high";
export const DEFAULT_GRAPHICS_SETTING: GraphicsSetting = "high";
export const GRAPHICS_SETTINGS_LIST: [string, GraphicsSetting][] = [
  ["Low graphics 🥔", "low"],
  ["High graphics ⚡", "high"],
];

// Hero header
export const HERO_WELCOME_TEXT = {
  en: "Welcome to",
  pl: "Witamy w",
};
export const HERO_WORD_ROTATE_WORDS = {
  en: [
    "Sport club",
    "Soccer",
    "Boxing",
    "Kick-boxing",
    "Horse racing",
    "Table tennis",
    "Regular tennis",
  ],
  pl: [
    "Klub sportowy",
    "Piłka nożna",
    "Boks",
    "Kick-boxing",
    "Jeździectwo",
    "Tenis stołowy",
    "Tenis ziemny",
  ],
};
export type ColorToMix = { red: number; green: number; blue: number };
export const HERO_AURORA_TEXT_COLORS: ColorToMix[] = [
  {
    red: 116,
    green: 212,
    blue: 255,
  },
  {
    red: 142,
    green: 197,
    blue: 255,
  },
  {
    red: 43,
    green: 127,
    blue: 255,
  },
];
export const HERO_AURORA_TEXT_SHIFTED_COLORS: ColorToMix[] = [
  {
    red: 225,
    green: 42,
    blue: 251,
  },
  {
    red: 173,
    green: 70,
    blue: 255,
  },
  {
    red: 127,
    green: 34,
    blue: 254,
  },
];
export const HERO_SPARKLES_TEXT_COLORS: ColorToMix[] = [
  {
    red: 125,
    green: 211,
    blue: 252,
  },
  {
    red: 165,
    green: 243,
    blue: 252,
  },
];
export const HERO_SPARKLES_SHIFTED_TEXT_COLORS: ColorToMix[] = [
  {
    red: 237,
    green: 107,
    blue: 255,
  },
  {
    red: 251,
    green: 100,
    blue: 182,
  },
];

// Links
export const BENIAMINEK_LOCATION_GOOGLE_MAPS_LINK = "https://g.co/kgs/qWsjGM5";
export const BENIAMINEK_CONTACT_EMAIL = "beniaminek03ngo@gmail.com";
export const BENIAMINEK_CONTACT_PHONE_NUMBER = "+48 669 000 303";
export const BENIAMINEK_FACEBOOK_LINK = "https://www.facebook.com/Beniaminek03";
