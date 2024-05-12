import { SizeType } from "./Avatar";
import { ColorType } from "./SignInButton";

type Props = {
  text: string;
  onClick: () => void;
  type?: string;
  size?: string;
  disabled?: boolean;
};

const buttonColor: ColorType = {
  follow: "border border-black",
  following: "bg-black text-white",
  default: "bg-black text-white",
};

const buttonSize: SizeType = {
  small: "text-base py-1",
  normal: "text-xl py-1.5 w-full",
};

export default function Button({
  text,
  onClick,
  type = "default",
  size = "normal",
  disabled = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={`${buttonColor[type]} ${buttonSize[size]} ${
        disabled && "opacity-70"
      } min-w-[90px] min-h-[45px] rounded-md font-semibold`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
