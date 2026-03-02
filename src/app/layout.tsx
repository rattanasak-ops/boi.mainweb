import type { ReactNode } from "react";

// This layout only exists as a required root layout.
// All rendering happens in /[locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
