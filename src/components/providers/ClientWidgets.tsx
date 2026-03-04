"use client";

import dynamic from "next/dynamic";

const ScrollNavigator = dynamic(() => import("@/components/ui/ScrollNavigator"), { ssr: false });
const AccessibilityWidget = dynamic(() => import("@/components/ui/AccessibilityWidget"), { ssr: false });
const ThemeToggle = dynamic(() => import("@/components/ui/ThemeToggle"), { ssr: false });
const SectionReorder = dynamic(() => import("@/components/ui/SectionReorder"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/ui/ChatWidget"), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <ScrollNavigator />
      <AccessibilityWidget />
      <ThemeToggle />
      <SectionReorder />
      <CookieConsent />
      <ChatWidget />
    </>
  );
}
