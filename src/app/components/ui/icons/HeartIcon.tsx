import { AiOutlineHeart } from "react-icons/ai";

type Props = {
  size?: "small" | "normal";
};

export default function HeartIcon({ size = "normal" }: Props) {
  return (
    <AiOutlineHeart className={size === "small" ? "w-7 h-7" : "w-8 h-8"} />
  );
}
