"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

type Props = {
  type: string;
  text: string;
  onClick: () => void;
};
type ColorType = Record<string, string>;
type IconType = Record<string, JSX.Element>;

const bgColor: ColorType = {
  GitHub: "bg-[#24292e]",
  Google: "bg-[#4285f4]",
  Naver: "bg-[#1EC800]",
  Kakao: "bg-[#FEE500]",
};

const textColor: ColorType = {
  GitHub: "text-[#fafbfc]",
  Google: "text-[#fff]",
  Naver: "text-[#fff]",
  Kakao: "text-[#000000]",
};

const iconStyle: ColorType = {
  GitHub: "text-[#fff] text-4xl",
  Google: "bg-[#fff] text-4xl",
  Naver: "text-[#fff] bg-[#1EC800] text-2xl p-[10px]",
  Kakao: "text-[#000000] text-4xl",
};

const ICON_LIST: IconType = {
  GitHub: <AiFillGithub />,
  Google: <FcGoogle />,
  Naver: <SiNaver />,
  Kakao: <RiKakaoTalkFill />,
};

export default function SignInButton({ text, onClick, type }: Props) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-2 py-1.5  gap-[25px] ${bgColor[type]} rounded-md`}
    >
      <p className={`${iconStyle[type]} p-1 rounded-md `}>{ICON_LIST[type]}</p>
      <p className={`${textColor[type]} pr-8 `}>{text}</p>
    </button>
  );
}
