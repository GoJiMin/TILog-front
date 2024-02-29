/* eslint-disable @next/next/no-img-element */

import { FaUserLarge } from "react-icons/fa6";

type Props = {
  image?: string;
  size?: string;
};

type SizeType = Record<string, string>;

const containerSize: SizeType = {
  small: "w-11 h-11 ",
  normal: "w-[68px] h-[68px] ",
};

const imageSize: SizeType = {
  small: "w-10 h-10",
  normal: "w-16 h-16",
};

const iconSize: SizeType = {
  small: "w-7 h-7",
  normal: "w-[50px] h-[50px]",
};

export default function Avatar({ image, size = "normal" }: Props) {
  return (
    <div
      className={`rounded-full flex justify-center items-center   ${containerSize[size]} border border-black`}
    >
      {image ? (
        <img
          className={`rounded-full bg-white ${imageSize[size]}`}
          src={image}
          alt='Profile Image'
          referrerPolicy='no-referrer'
        />
      ) : (
        <FaUserLarge className={`${iconSize[size]} p-[0.1rem]`} />
      )}
    </div>
  );
}
