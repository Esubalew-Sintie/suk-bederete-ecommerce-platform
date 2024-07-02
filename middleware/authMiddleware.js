// authMiddleware.js
import { NextResponse } from "next/server";

export default function authMiddleware(request) {
  const { cookies, url } = request;
  const token = cookies.get("access_token");

  if (requiresAuthentication(url)) {
    if (!token) {
      return NextResponse.redirect("/login");
    }
  }

  return null; // Return null if no redirection is needed
}

function requiresAuthentication(url) {
  return url.startsWith("/am/admin") || url.startsWith("/account");
}
