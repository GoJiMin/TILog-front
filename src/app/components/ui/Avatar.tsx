/* eslint-disable @next/next/no-img-element */

import { HiUser } from "react-icons/hi2";

type Props = {
  image?: string;
  size?: string;
};

export type SizeType = Record<string, string>;

const containerSize: SizeType = {
  small: "w-10 h-10 ",
  normal: "w-[97px] h-[97px] ",
};

const imageSize: SizeType = {
  small: "w-10 h-10",
  normal: "w-[98px] h-[98px]",
};

const iconSize: SizeType = {
  small: "w-11 h-11",
  normal: "w-[97px] h-[97px]",
};

export default function Avatar({ image, size = "normal" }: Props) {
  return (
    <div
      className={`rounded-full flex justify-center items-center ${containerSize[size]} bg-gray-300`}
    >
      {image ? (
        <img
          className={`rounded-full bg-white object-cover ${imageSize[size]}`}
          src={image}
          alt='Profile Image'
          referrerPolicy='no-referrer'
        />
      ) : (
        <HiUser
          className={`${iconSize[size]} translate-y-2 text-white p-[0.1rem]`}
        />
      )}
    </div>
  );
}
