import { AiFillHeart } from "react-icons/ai";

type Props = {
  size?: "small" | "normal";
};

export default function HeartFillIcon({ size = "normal" }: Props) {
  return <AiFillHeart className={size === "small" ? "w-7 h-7" : "w-9 h-9"} />;
}
