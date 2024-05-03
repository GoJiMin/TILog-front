import {
  BarLoader,
  FadeLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  ScaleLoader,
} from "react-spinners";

type Props = {
  size?: string;
};

export default function PulseSpinner({ size = "normal" }: Props) {
  return (
    <PulseLoader
      className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      color="#4af33d"
      margin={4}
      size={size === "small" ? 7 : 13}
    />
  );
}
