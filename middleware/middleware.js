// import { i18nRouter } from "next-i18n-router";
// import i18nConfig from "./i18nConfig";

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher([
//   "/admin(.*)",
//   "/am/admin(.*)",
//   // "/site-builder(.*)",
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (req.nextUrl.pathname.startsWith("/api")) {
//     const newPathname = req.nextUrl.pathname.replace(/^\/[^/]+/, "");
//     const newUrl = new URL(req.url); // Use req.url instead of req.nextUrl.href
//     newUrl.pathname = newPathname;
//     req.url = newUrl.toString(); // Assign the modified URL back to req.url
//   }

//   if (isProtectedRoute(req)) {
//     console.log("Protecting route...");
//     auth().protect();
//   }
//   return i18nRouter(req, i18nConfig);
// });

// export const config = {
//   matcher: [
//     // Combine the matchers from both middleware functions
//     "/((?!.*\\..*|_next).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

// for django
// import { NextResponse } from "next/server";
// import { i18nRouter } from "next-i18n-router";
// import i18nConfig from "./i18nConfig"; // Your i18n configuration
// import axios from "axios";

// const API_URL = "http://localhost:8000/api/token/verify/";
// export default async function middleware(request) {
//   const { cookies, url } = request;
//   const locale = cookies.get("NEXT_LOCALE");
//   const { pathname, search, origin } = new URL(url);
//   let i18nResponse;
//   console.log(locale);
//   // Check if the URL already has a valid locale ('en' or 'am')
//   const validLocales = ["en", "am"];
//   const urlParts = pathname.split("/");
//   const currentLocale = urlParts[1]; // Assumes locale is the first segment after the origin

//   if (
//     !validLocales.includes(currentLocale) &&
//     validLocales.includes(locale?.value)
//   ) {
//     // No valid locale in URL, add locale from cookie
//     const newUrl = `${origin}/${locale?.value}${pathname}${search}`;
//     return NextResponse.redirect(newUrl);
//   }
//   try {
//     // Attempt internationalization first
//     i18nResponse = await i18nRouter(request, i18nConfig);
//     // return i18nResponse;
//   } catch (error) {
//     console.error("Error during i18n processing:", error);
//     // Handle error appropriately
//   }
//   const token = request.cookies.get("access_token");
//   const refreshToken = request.cookies.get("refresh_token");
//   console.log(token);
//   if (token?.value) {
//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const { user_id } = data;
//         console.log(`User ID: ${user_id}`);

//         // Add user details to request headers or context as needed
//         request.headers.set("x-user-id", user_id);
//       } else {
//         const errorData = await response.json();
//         if (errorData.access) {
//           // Token expired, get new access token
//           const newAccessToken = errorData.access;
//           request.cookies.set("access_token", newAccessToken);

//           const retryResponse = await fetch(API_URL, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ token: newAccessToken }),
//           });

//           if (retryResponse.ok) {
//             const retryData = await retryResponse.json();
//             const { user_id } = retryData;
//             console.log(`User ID: ${user_id}`);

//             // Add user details to request headers or context as needed
//             request.headers.set("x-user-id", user_id);
//           } else {
//             console.error(
//               "Token verification failed on retry:",
//               await retryResponse.json()
//             );
//             return NextResponse.redirect("/auth/login");
//           }
//         } else {
//           console.error("Token verification failed:", errorData);
//           return NextResponse.redirect("http://localhost:3000/auth/login");
//         }
//       }
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       return NextResponse.redirect("http://localhost:3000/auth/login");
//     }
//   } else {
//     if (requiresAuthentication(request.url)) {
//       console.log("No token found, redirecting to login");
//       return NextResponse.redirect("http://localhost:3000/auth/login");
//     }
//   }

//   // Return the i18n response if it exists
//   // if (i18nResponse) {
//   //   return i18nResponse;
//   // }

//   // Token is present or route doesn't require authentication, allow request to proceed
//   console.log("Token found or no authentication required, proceeding");
//   return NextResponse.next();
// }

// function requiresAuthentication(url) {
//   const { pathname } = new URL(url);

//   return (
//     pathname.startsWith("/am/admin") ||
//     pathname.startsWith("/en/admin") ||
//     pathname.startsWith("/en/site-builder") ||
//     pathname.startsWith("/en/prompt") ||
//     pathname.startsWith("/account")
//   );
// }

// export const config = {
//   matcher: [
//     "/((?!.*\\..*|_next).*)", // Exclude routes with query parameters and internal Next.js routes
//     "/(api|trpc)(.*)", // Include API and tRPC routes
//   ],
// };






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
























// middleware.js
// import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// export default withClerkMiddleware(async (req) => {
//   const { userId } = getAuth(req);

//   if (userId) {
//     // Fetch the user from Clerk
//     const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//       },
//     }).then(res => res.json());

//     const role = user?.public_metadata?.role;

//     // Define protected routes for each role
//     const roleBasedRoutes = {
//       admin: ["/admin", "/manager", "/merchant", "/customer"],
//       manager: ["/manager", "/merchant", "/customer"],
//       merchant: ["/merchant", "/customer"],
//       customer: ["/customer"],
//     };

//     const pathname = req.nextUrl.pathname;

//     for (const [roleName, routes] of Object.entries(roleBasedRoutes)) {
//       if (routes.some((route) => pathname.startsWith(route))) {
//         if (role !== roleName) {
//           return NextResponse.redirect(new URL("/unauthorized", req.url));
//         }
//       }
//     }
//   } else {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/manager/:path*",
//     "/merchant/:path*",
//     "/customer/:path*",
//     // Add any other routes that need protection
//   ],
// };
