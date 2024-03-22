import { MoonLoader } from "react-spinners";

type Props = {
  position?: string;
};

type PositionType = Record<string, string>;

const spinnerPosition: PositionType = {
  fixed: "fixed top-[40%]",
  absolute: "absolute top-[55%]",
};

export default function MoonSpinner({ position = "fixed" }: Props) {
  return (
    <div
      className={`${spinnerPosition[position]} left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <MoonLoader color='#000000' size={40} />
    </div>
  );
}
