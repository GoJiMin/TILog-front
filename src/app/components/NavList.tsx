import { User } from "../model/user";
import {
  HomeIcon,
  HomeFillIcon,
  NewPostIcon,
  NewPostFillIcon,
  SearchIcon,
  SearchFillIcon,
  UserIcon,
  UserFillIcon,
  HeartIcon,
  HeartFillIcon,
} from "./ui/icons";
import Link from "next/link";

const MENU_LIST = [
  {
    href: "/",
    icon: <HomeIcon />,
    selectedIcon: <HomeFillIcon />,
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    selectedIcon: <SearchFillIcon />,
  },
  {
    href: "/new",
    icon: <NewPostIcon />,
    selectedIcon: <NewPostFillIcon />,
  },
];

type Props = {
  user: User;
  pathName: string;
};

export default function NavList({ user, pathName }: Props) {
  return (
    <ul className='flex items-center gap-[85px]'>
      {MENU_LIST.map(({ href, icon, selectedIcon }) => (
        <li key={href}>
          <Link href={href}>{pathName === href ? selectedIcon : icon}</Link>
        </li>
      ))}
      {user && (pathName === "/likes" ? <HeartFillIcon /> : <HeartIcon />)}
      {user && (pathName === "/mypage" ? <UserFillIcon /> : <UserIcon />)}
    </ul>
  );
}
