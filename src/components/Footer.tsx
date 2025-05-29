import { Mail, MapPin, Phone } from "lucide-react";

import {
  BENIAMINEK_CONTACT_EMAIL,
  BENIAMINEK_CONTACT_PHONE_NUMBER,
  BENIAMINEK_FACEBOOK_LINK,
  BENIAMINEK_LOCATION_GOOGLE_MAPS_LINK,
} from "@/lib/constants";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import useSettings from "@/hooks/useSettings";

const CONTACT_BUTTON_TEXT = {
  en: "Contact us",
  pl: "Skontaktuj się",
};

function Footer() {
  const { language } = useSettings();

  return (
    <footer className="bg-background/35 md:h-32 w-screen relative z-10 flex items-center justify-between max-md:flex-col md:p-16 max-md:px-4 max-md:py-2 text-foreground/75">
      {/* Left side */}
      <div className="flex gap-4 flex-1">
        {/* Logo */}
        <a className="[&:focus-visible_img]:scale-105" href="#">
          <img
            className="h-20 w-20 object-contain hover:scale-105 transition-transform duration-300"
            src="/logo_dark.png"
            alt="Klub Sportowy Beniaminek 03 Starogard Gdański Logo"
          />
        </a>

        <div className="flex flex-col gap-1 pt-1">
          <span className="font-medium text-foreground text-lg">
            Klub Sportowy Beniaminek 03
          </span>
          <a
            href={BENIAMINEK_LOCATION_GOOGLE_MAPS_LINK}
            target="_blank"
            className="hover:underline focus-visible:underline hover:text-foreground/90 focus-visible:text-foreground/90 flex items-center gap-1 max-md:hidden"
          >
            <MapPin className="size-5" /> Starogard Gdański, 83-200
          </a>
        </div>
      </div>

      {/* Middle */}
      <div className="flex-1 flex justify-center max-md:pb-2">
        <a href={BENIAMINEK_FACEBOOK_LINK} target="_blank" tabIndex={-1}>
          <RainbowButton
            size="lg"
            className="hover:tracking-wide focus-visible:tracking-wide hover:font-bold focus-visible:font-bold ring-blue-500"
          >
            {CONTACT_BUTTON_TEXT[language]}
          </RainbowButton>
        </a>
      </div>

      {/* Right side */}
      <div className="flex flex-col md:items-end max-md:items-start gap-1 flex-1">
        <a
          href={`mailto:${BENIAMINEK_CONTACT_EMAIL}`}
          target="_blank"
          className="hover:underline focus-visible:underline hover:text-foreground/90 focus-visible:text-foreground/90 flex items-center max-md:flex-row-reverse text-left gap-2"
        >
          {BENIAMINEK_CONTACT_EMAIL} <Mail className="size-5" />
        </a>

        <a
          href={`tel:${BENIAMINEK_CONTACT_PHONE_NUMBER}`}
          target="_blank"
          className="hover:underline focus-visible:underline hover:text-foreground/90 focus-visible:text-foreground/90 flex items-center max-md:flex-row-reverse text-left gap-1.5"
        >
          {BENIAMINEK_CONTACT_PHONE_NUMBER} <Phone className="size-5" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
