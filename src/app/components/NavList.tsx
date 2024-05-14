import { AuthUser } from "../model/user";
import useProfile from "../utils/hooks/profile";
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
    getHref: (userId: string) => `/user/${userId}`,
    icon: <UserIcon />,
    selectedIcon: <UserFillIcon />,
  },
];

type Props = {
  pathName: string;
};

export default function NavList({ pathName }: Props) {
  const { user } = useProfile();
  const userId = user && user.userid;

  return (
    <ul className="grid grid-cols-4 w-screen max-w-[450px] justify-items-center">
      {MENU_LIST.map(({ href, getHref, icon, selectedIcon }) => {
        const linkHref = getHref ? getHref(userId as string) : href;

        return (
          <li className="flex items-center relative" key={linkHref}>
            <Link href={linkHref}>
              <Icon
                icon={pathName === linkHref ? selectedIcon : icon}
                isSelected={pathName === linkHref}
                type={"header"}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
