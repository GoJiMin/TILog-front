"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "./ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";
import NavList from "./NavList";

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathName = usePathname();

  return (
    <header className='w-full max-w-screen-xl mx-auto flex justify-between items-center py-5'>
      <Link href='/'>
        <h1 className='text-4xl font-semibold'>TILog</h1>
      </Link>
      <NavList user={user} pathName={pathName} />
      {session ? (
        <Button text={"Sign Out"} onClick={() => signOut()} />
      ) : (
        <Button text={"Sign In"} onClick={() => signIn()} />
      )}
    </header>
  );
}
