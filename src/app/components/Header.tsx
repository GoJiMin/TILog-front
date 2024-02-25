"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  HomeFillIcon,
  NewPostIcon,
  NewPostFillIcon,
  SearchIcon,
  SearchFillIcon,
  UserIcon,
  UserFillIcon,
} from "./ui/icons";
import Button from "./ui/Button";
import { signIn, signOut, useSession } from "next-auth/react";

const MENU_LIST = [
  {
    href: "/",
    icon: <HomeIcon />,
    selectedIcon: <HomeFillIcon />,
  },
  {
    href: "/new",
    icon: <NewPostIcon />,
    selectedIcon: <NewPostFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    selectedIcon: <SearchFillIcon />,
  },
];

export default function Header() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathName = usePathname();

  return (
    <header className='flex justify-between items-center px-10 py-3'>
      <Link href='/'>
        <h1 className='text-4xl font-semibold'>TILog</h1>
      </Link>
      <ul className='flex items-center gap-[45px] text-3xl'>
        {MENU_LIST.map(({ href, icon, selectedIcon }) => (
          <li key={href}>
            <Link href={href}>{pathName === href ? selectedIcon : icon}</Link>
          </li>
        ))}
        {user && (pathName === "/mypage" ? <UserFillIcon /> : <UserIcon />)}
      </ul>
      {session ? (
        <Button text={"Sign Out"} onClick={() => signOut()} />
      ) : (
        <Button text={"Sign In"} onClick={() => signIn()} />
      )}
    </header>
  );
}
