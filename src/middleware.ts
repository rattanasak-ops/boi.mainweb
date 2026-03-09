import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude /admin and /api/admin from i18n middleware
  matcher: ["/", "/(th|en|ja|zh|ko|de|fr)/:path*"],
};
