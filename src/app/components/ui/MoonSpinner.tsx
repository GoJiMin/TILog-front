import { MoonLoader } from "react-spinners";

export default function MoonSpinner() {
  return (
    <div className='fixed top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <MoonLoader color='#000000' size={40} />
    </div>
  );
}
