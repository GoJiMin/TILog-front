type Props = {
  onClose: () => void;
};

export default function BackDrop({ onClose }: Props) {
  return (
    <div
      className='fixed top-0 left-0 w-full h-full bg-black/60'
      onClick={onClose}
    />
  );
}
