"use client";
import React from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
// components
import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

import PagesDropdown from "../Dropdowns/PagesDropdown";
import { Button } from "@/components/ui/button";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Suk-Bederete
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <PagesDropdown />
              </li>
              {userId ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignedOut>
                  <div className="flex gap-3">
                    <Button className="">
                      <Link href={"/sign-in"}>
                        <SignInButton className="w-full h-full" />
                      </Link>
                    </Button>
                    <Button className="">
                      <Link href={"/sign-up"}>
                        <SignUpButton className="w-full h-full" />
                      </Link>
                    </Button>
                  </div>
                </SignedOut>
              )}
              <LanguageSwitcher />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
