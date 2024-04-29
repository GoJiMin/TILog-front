import { SizeType } from "./Avatar";
import { ColorType } from "./SignInButton";

type Props = {
  text: string;
  onClick: () => void;
  type: string;
  size?: string;
};

const buttonColor: ColorType = {
  follow: "border border-black",
  following: "bg-black text-white",
};

const buttonSize: SizeType = {
  small: "text-base py-1",
  normal: "text-xl py-1.5",
};

export default function Button({
  text,
  onClick,
  type,
  size = "normal",
}: Props) {
  return (
    <button
      className={`${buttonColor[type]} ${buttonSize[size]} min-w-[90px] rounded-md font-semibold`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
