import { SignIn } from "@clerk/nextjs";
import React from "react";
import Auth from "../../layouts/Auth";

export default function Login() {
  return (
    <Auth>
      <div className="flex items-center justify-center">
        <SignIn afterSignInUrl="/auth/afterSign" />
      </div>
    </Auth>
  );
}
