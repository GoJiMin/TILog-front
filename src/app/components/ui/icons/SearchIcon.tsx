import { RiSearchLine } from "react-icons/ri";

type Props = {
  size?: "small" | "normal";
};

export default function SearchIcon({ size = "normal" }: Props) {
  return <RiSearchLine className={size === "small" ? "w-6 h-6" : "w-8 h-8"} />;
}
