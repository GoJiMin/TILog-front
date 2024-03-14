"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "./ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import NavList from "./NavList";
import { SignInIcon, SignOutIcon } from "./ui/icons";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathName = usePathname();

  return (
    <header className='w-full max-w-screen-xl mx-auto grid grid-cols-header content-center h-20'>
      <Link className='flex items-center' href='/'>
        <h1 className='text-4xl font-semibold'>TILog</h1>
      </Link>
      <NavList user={user} pathName={pathName} />
      {/* {session ? (
        <Button text={"Sign Out"} onClick={() => signOut()} />
      ) : (
        <Button text={"Sign In"} onClick={() => signIn()} />
      )} */}
      {session ? (
        <button className='ml-auto' onClick={() => signOut()}>
          <SignOutIcon />
        </button>
      ) : (
        <button className='ml-auto' onClick={() => signIn()}>
          <SignInIcon />
        </button>
      )}
    </header>
  );
}
