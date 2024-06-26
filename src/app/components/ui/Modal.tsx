import { createPortal } from "react-dom";
import BackDrop from "./BackDrop";
import { CloseIcon } from "./icons";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: Props) {
  if (typeof window === "undefined") {
    return null;
  }
  const element = document.getElementById("modal") as HTMLElement;

  return (
    <>
      {createPortal(
        <section className='fixed top-0 left-0 z-20 w-full h-full flex flex-col justify-center items-center'>
          <BackDrop onClose={onClose} />
          <button className='fixed top-5 right-10 text-white' onClick={onClose}>
            <CloseIcon />
          </button>
          {children}
        </section>,
        element
      )}
    </>
  );
}
