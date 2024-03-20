type Props = {
  children: React.ReactNode;
};

export default function PostModal({ children }: Props) {
  return (
    <section className='z-30 w-4/5 h-4/6 max-w-7xl bg-white rounded-md overflow-hidden'>
      {children}
    </section>
  );
}
