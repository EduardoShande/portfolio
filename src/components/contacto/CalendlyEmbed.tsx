"use client";

import { CALENDLY_URL } from "@/lib/constants";
import { InlineWidget } from "react-calendly";

export default function CalendlyEmbed() {
  return (
    <div className="rounded-[2px] overflow-hidden -mx-2">
      <InlineWidget
        url={CALENDLY_URL}
        styles={{ height: "400px", minWidth: "250px" }}
        pageSettings={{
          backgroundColor: "1C1C1C",
          textColor: "F9F9F9",
          primaryColor: "9333EA",
          hideEventTypeDetails: true,
          hideLandingPageDetails: true,
        }}
      />
    </div>
  );
}
