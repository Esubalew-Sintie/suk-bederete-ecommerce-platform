// import { i18nRouter } from "next-i18n-router";
// import i18nConfig from "./i18nConfig";

// export default function middleware(req) {
//   return i18nRouter(req, i18nConfig);
// }

// export const config = {
//   matcher: [
//     // Combine the matchers from both middleware functions
//     "/((?!.*\\..*|_next).*)",
//     "/(api|trpc)(.*)",
//   ],
// };

// for django
import { NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig"; // Your i18n configuration
import axios from "axios";

const API_URL = "http://localhost:8000/api/token/verify/";

export default async function middleware(request) {
  const { cookies, url } = request;
  const locale = cookies.get("NEXT_LOCALE");
  const { pathname, origin } = new URL(url);
  let i18nResponse;

  // Attempt internationalization first
  try {
    i18nResponse = await i18nRouter(request, i18nConfig);
  } catch (error) {
    console.error("Error during i18n processing:", error);
  }

  const token = cookies.get("access_token")?.value;
  const refreshToken = cookies.get("refresh_token")?.value;

  if (token) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          refresh: refreshToken || null,
        }),
      });

      if (!response.ok) {
        console.error("Non-200 response from token verification API", response);
        throw new Error("Non-200 response from token verification API");
      }

      const data = await response.json();
      const { user_id, role, access } = data;

      if (user_id && role) {
        if (access) {
          cookies.set("access_token", access);
        }

        request.headers.set("x-user-id", user_id);
        request.headers.set("x-user-role", role);

        if (
          isUnprotectedPath(pathname) ||
          requiresRoleBasedAccess(pathname, role)
        ) {
          console.log("protected", pathname, role),
            isUnprotectedPath(pathname),
            requiresRoleBasedAccess(pathname, role);
          if (i18nResponse) {
            return i18nResponse;
          }
          return NextResponse.next();
        } else {
          console.error("Access denied. Role not authorized.");
          if (
            !pathname.startsWith(`/${locale?.value || "en"}/auth/unauthorized`)
          ) {
            return NextResponse.redirect(
              `${origin}/${locale?.value || "en"}/auth/unauthorized`
            );
          } else {
            if (i18nResponse) {
              return i18nResponse;
            }
            return NextResponse.next(); // Avoid loop
          }
        }
      } else {
        console.error("Unexpected response:", data);
        if (!pathname.startsWith(`/${locale?.value || "en"}/auth/login`)) {
          return NextResponse.redirect(
            `${origin}/${locale?.value || "en"}/auth/login`
          );
        } else {
          if (i18nResponse) {
            return i18nResponse;
          }
          return NextResponse.next(); // Avoid loop
        }
      }
    } catch (error) {
      console.error("Token verification failed:", error.message || error);
      if (!pathname.startsWith(`/${locale?.value || "en"}/auth/login`)) {
        return NextResponse.redirect(
          `${origin}/${locale?.value || "en"}/auth/login`
        );
      } else {
        if (i18nResponse) {
          return i18nResponse;
        }
        return NextResponse.next(); // Avoid loop
      }
    }
  } else {
    if (requiresAuthentication(pathname)) {
      console.log("No token found, redirecting to login");
      if (!pathname.startsWith(`/${locale?.value || "en"}/auth/login`)) {
        return NextResponse.redirect(
          `${origin}/${locale?.value || "en"}/auth/login`
        );
      } else {
        if (i18nResponse) {
          return i18nResponse;
        }
        return NextResponse.next(); // Avoid loop
      }
    }
  }

  // Return the i18n response if it exists
  if (i18nResponse) {
    return i18nResponse;
  }

  // Token is present or route doesn't require authentication, allow request to proceed
  console.log("Token found or no authentication required, proceeding");
  return NextResponse.next();
}

function requiresAuthentication(pathname) {
  return (
    pathname.includes("/admin") ||
    pathname.includes("/site-builder") ||
    pathname.includes("/prompt") ||
    pathname.includes("/account")
  );
}

function requiresRoleBasedAccess(pathname, role) {
  const roleBasedPaths = {
    merchant: [
      "/site-builder",
      "/am/prompt",
      "/account", // Add other paths merchants should access
    ],
    client: [
      "/shop",
      "/checkout",
      "/orders", // Add other paths clients should access
    ],
  };

  if (role === "admin") {
    console.log("admin");
    return true; // Admins have access to all paths
  }
  console.log(
    roleBasedPaths[role]?.some((path) => pathname.startsWith(path)) || false,
    "check protection"
  );
  return (
    roleBasedPaths[role]?.some((path) => pathname.startsWith(path)) || false
  );
}

function isUnprotectedPath(pathname) {
  const unprotectedPaths = [
    "/",
    "/about",
    "/contact",
    "/shop",
    "/auth/login",
    "/auth/register",
    "/forgot-password",
    "/reset-password",
    "/auth/unauthorized",
  ];

  // Exact match check for the root path
  if (pathname === "/") {
    return true;
  }
  console.log(
    unprotectedPaths.some(
      (path) => pathname.startsWith(path) && pathname !== "/",
      "unprotected"
    )
  );
  // Check for paths that start with any of the unprotected paths
  return unprotectedPaths.some(
    (path) => pathname.startsWith(path) && pathname !== "/"
  );
}

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Exclude routes with query parameters and internal Next.js routes
    "/(api|trpc)(.*)", // Include API and tRPC routes
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
