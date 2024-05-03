import {
  BarLoader,
  FadeLoader,
  PropagateLoader,
  PuffLoader,
  PulseLoader,
  ScaleLoader,
} from "react-spinners";

export default function PulseSpinner() {
  return (
    <PulseLoader
      className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      color="#4af33d"
      margin={4}
      size={13}
    />
  );
}
