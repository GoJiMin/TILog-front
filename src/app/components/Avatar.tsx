/* eslint-disable @next/next/no-img-element */

type Props = {
  image?: string;
  size?: string;
};

type SizeType = Record<string, string>;

const imageSize: SizeType = {
  small: "w-10 h-10",
  normal: "w-[68px] h-[68px]",
  big: "w-[90px] h-[90px]",
};

export default function Avatar({ image, size = "normal" }: Props) {
  return (
    <div className={`rounded-full ${imageSize[size]}`}>
      <img
        className='rounded-full p-[0.1rem]'
        src={image ?? undefined}
        alt='Profile Image'
        referrerPolicy='no-referrer'
      />
    </div>
  );
}
