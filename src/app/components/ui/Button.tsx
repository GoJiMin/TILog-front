type Props = {
  text: string;
  onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
  return (
    <button
      className='text-lg px-5 py-1 border bg-black rounded-md text-white hover:opacity-85'
      onClick={onClick}
    >
      {text}
    </button>
  );
}
