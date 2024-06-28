import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/am/admin(.*)",
  "/site-builder(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    console.log("Protecting route...");
    auth().protect();
  }
  return i18nRouter(req, i18nConfig);
});

export const config = {
  matcher: [
    // Combine the matchers from both middleware functions
    "/((?!.*\\..*|_next).*)",
    "/(api|trpc)(.*)",
  ],
};

// import { i18nRouter } from "next-i18n-router";
// import i18nConfig from "./i18nConfig"; // Your i18n configuration
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/admin(.*)",
//   "/am/admin(.*)",
//   "/site-builder(.*)",
// ]);

// // Define a wrapper function to apply both middlewares
// async function handleRequest(req, res) {
//   // Handle internationalization first
//   const i18nResult = await i18nRouter(req, i18nConfig);

//   // Check if the request matches any protected routes
//   if (isProtectedRoute(req)) {
//     console.log("Protecting route...");

//     // Use Clerk middleware to protect the route
//     const protectedResult = await clerkMiddleware((auth) => {
//       auth().protect((has) => {
//         // Check for the specific permissions
//         return (
//           has({ permission: "org:create_shop:create_shop" }) ||
//           has({ permission: "org:manage_admin:manage_admin" })
//         );
//       });
//     })(i18nResult);

//     // Return the protected result
//     return protectedResult;
//   }

//   // If the route is not protected, just return the i18n result
//   return i18nResult;
// }

// export default handleRequest;

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next).*)", // Exclude routes with query parameters and internal Next.js routes
//     "/(api|trpc)(.*)", // Include API and tRPC routes
//   ],
// };
