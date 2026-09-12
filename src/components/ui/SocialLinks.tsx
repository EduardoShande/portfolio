"use client";

import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  TiktokIcon,
  FacebookIcon,
} from "@/components/ui/BrandIcons";
import { SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICONS: Record<string, (p: { className?: string }) => React.JSX.Element> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  facebook: FacebookIcon,
};

/**
 * One row of social buttons, driven by SOCIALS. A network whose URL is still
 * empty in PROFILE is filtered out upstream, so this never renders a dead
 * link as Eduardo fills each one in.
 */
export default function SocialLinks({
  tone = "default",
  className,
}: {
  tone?: "default" | "band";
  className?: string;
}) {
  if (SOCIALS.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {SOCIALS.map(({ id, href, label }) => {
        const Icon = ICONS[id];
        if (!Icon) return null;
        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
              tone === "band"
                ? "border-white/25 text-white/70 hover:border-accent hover:text-accent"
                : "border-border-theme text-fg-muted hover:border-accent hover:text-accent"
            )}
          >
            <Icon className="h-[17px] w-[17px]" />
          </a>
        );
      })}
    </div>
  );
}
