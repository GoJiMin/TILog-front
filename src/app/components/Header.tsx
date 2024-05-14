"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import NavList from "./NavList";
import { SignInIcon, SignOutIcon } from "./ui/icons";

export default function Header() {
  const { data: session } = useSession();
  const pathName = usePathname();

  return (
    <header className="w-full max-w-screen-xl mx-auto grid grid-cols-header content-center h-20">
      <Link className="flex items-center w-fit" href="/">
        <h1 className="text-4xl font-semibold">TILog</h1>
      </Link>
      {session ? <NavList pathName={pathName} /> : <div />}
      {session ? (
        <button className="ml-auto" onClick={() => signOut()}>
          <SignOutIcon />
        </button>
      ) : (
        <button className="ml-auto" onClick={() => signIn()}>
          <SignInIcon />
        </button>
      )}
    </header>
  );
}
