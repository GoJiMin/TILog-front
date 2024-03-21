import { AuthUser } from "../model/user";
import Icon from "./ui/Icon";
import {
  HomeIcon,
  HomeFillIcon,
  NewPostIcon,
  SearchIcon,
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
    selectedIcon: <SearchIcon />,
  },
  {
    href: "/new",
    icon: <NewPostIcon />,
    selectedIcon: <NewPostIcon />,
  },
  {
    href: "likes",
    icon: <HeartIcon />,
    selectedIcon: <HeartFillIcon />,
  },
  {
    href: "/mypage",
    icon: <UserIcon />,
    selectedIcon: <UserFillIcon />,
  },
];

type Props = {
  user: AuthUser;
  pathName: string;
};

export default function NavList({ user, pathName }: Props) {
  if (user)
    return (
      <ul className='grid grid-cols-5 w-screen max-w-[620px] justify-items-center'>
        {MENU_LIST.map(({ href, icon, selectedIcon }) => (
          <li className='flex items-center relative' key={href}>
            <Link href={href}>
              <Icon
                icon={pathName === href ? selectedIcon : icon}
                isSelected={pathName === href}
                type={"header"}
              />
            </Link>
          </li>
        ))}
      </ul>
    );

  return <section></section>;
}
