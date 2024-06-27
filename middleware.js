import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "am/admin(.*)",
  "/site-builder(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  return i18nRouter(req, i18nConfig);
});

export const config = {
  matcher: [
    // Combine the matchers from both middleware functions
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};
